// /netlify/functions/submit.js
// Отправляет лид в Telegram: сначала текст, затем (опционально) до 5 фото.
// Поддерживает dataURL (base64) из формы. Валидация ZIP на сервере.
// Как протестировать на своем ID:
//   Укажи в Netlify переменную TELEGRAM_TEST_CHAT_ID = <твой_chat_id>,
//   задеплой — заявки будут идти ТЕБЕ. Потом удали TELEGRAM_TEST_CHAT_ID,
//   и всё вернется к TELEGRAM_CHAT_ID (Андрей).

const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  // Приоритет тестового ID (для твоей проверки), иначе — прод ID Андрея
  const CHAT_ID =
    process.env.TELEGRAM_TEST_CHAT_ID?.trim() ||
    process.env.TELEGRAM_CHAT_ID?.trim();

  if (!TOKEN || !CHAT_ID) {
    console.error('Missing Telegram credentials');
    return json(500, { error: 'Server configuration error' });
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, car, zip, message, photoUrls } = data;

    if (!name || !car || !zip) {
      return json(400, { error: 'Missing required fields' });
    }

    const zipPattern = /^\d{5}(-\d{4})?$/;
    if (!zipPattern.test(zip)) {
      return json(400, { error: 'Invalid ZIP code format' });
    }

    // 1) Текст
    let text = '🚗 <b>New Scratch Lab Request</b>\n\n';
    text += `👤 <b>Name:</b> ${escapeHtml(name)}\n`;
    text += `🚘 <b>Car:</b> ${escapeHtml(car)}\n`;
    text += `📍 <b>ZIP:</b> ${escapeHtml(zip)}\n`;
    if (message) text += `📝 <b>Description:</b>\n${escapeHtml(message)}\n`;

    await tgSendMessage(TOKEN, CHAT_ID, text);

    // 2) Фото (до 5), если пришли как dataURL
    if (Array.isArray(photoUrls) && photoUrls.length) {
      const max = Math.min(photoUrls.length, 5);
      for (let i = 0; i < max; i++) {
        const parsed = parseDataUrl(photoUrls[i]);
        if (!parsed) continue;
        const filename = `photo_${i + 1}${parsed.ext}`;
        await tgSendPhoto(TOKEN, CHAT_ID, parsed.buffer, filename, parsed.mime);
      }
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('Error processing request:', err);
    return json(500, { error: 'Failed to process request' });
  }
};

// ---------- helpers ----------

function json(statusCode, obj) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(obj)
  };
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function tgSendMessage(token, chatId, htmlText) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = JSON.stringify({ chat_id: chatId, text: htmlText, parse_mode: 'HTML' });
  return httpsPostJson(url, payload);
}

function tgSendPhoto(token, chatId, buffer, filename, mime) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2);
  const line = `--${boundary}\r\n`;
  const tail = `\r\n--${boundary}--\r\n`;

  const parts = [];

  // chat_id
  parts.push(
    line +
      'Content-Disposition: form-data; name="chat_id"\r\n\r\n' +
      chatId +
      '\r\n'
  );

  // photo
  parts.push(
    line +
      `Content-Disposition: form-data; name="photo"; filename="${filename}"\r\n` +
      `Content-Type: ${mime}\r\n\r\n`
  );

  const headBuf = Buffer.concat(parts.map(p => Buffer.from(p, 'utf8')));
  const tailBuf = Buffer.from(tail, 'utf8');
  const bodyBuf = Buffer.concat([headBuf, buffer, tailBuf]);

  const u = new URL(`https://api.telegram.org/bot${token}/sendPhoto`);
  const options = {
    hostname: u.hostname,
    port: 443,
    path: u.pathname,
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': bodyBuf.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve();
        else reject(new Error(`sendPhoto ${res.statusCode}: ${data}`));
      });
    });
    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
}

function httpsPostJson(url, payload) {
  const u = new URL(url);
  const options = {
    hostname: u.hostname,
    port: 443,
    path: u.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve();
        else reject(new Error(`Telegram API error: ${res.statusCode} ${data}`));
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function parseDataUrl(dataUrl) {
  if (typeof dataUrl !== 'string') return null;
  const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!m) return null;
  const mime = m[1].toLowerCase();
  const buf = Buffer.from(m[2], 'base64');
  const ext = mime === 'image/png' ? '.png' : mime === 'image/webp' ? '.webp' : '.jpg';
  return { buffer: buf, mime, ext };
}
