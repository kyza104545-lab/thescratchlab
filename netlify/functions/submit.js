// netlify/functions/submit.js
const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const BOT = process.env.TELEGRAM_BOT_TOKEN; // 8326075219:AAFSpkOCuTuyw5YSwmiAqUT7a5WtwCgiyEE
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // 1070085460  (потом поменяешь на Андрея)

  if (!BOT || !CHAT_ID) {
    console.error('Missing Telegram credentials');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, phone, car, zip, message, photoUrls } = data;

    // validations
    const errs = [];
    if (!name) errs.push('name');
    if (!email) errs.push('email');
    if (!phone) errs.push('phone');
    if (!car) errs.push('car');
    if (!zip) errs.push('zip');
    if (errs.length) {
      return { statusCode: 400, body: JSON.stringify({ error: `Missing required: ${errs.join(', ')}` }) };
    }
    const zipPattern = /^\d{5}(-\d{4})?$/;
    if (!zipPattern.test(zip)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid ZIP code' }) };
    }

    // message
    let text = '🚗 <b>New Scratch Lab Request</b>\n\n';
    text += `🧑‍💻 <b>Name:</b> ${escapeHtml(name)}\n`;
    text += `📩 <b>Email:</b> ${escapeHtml(email)}\n`;
    text += `📞 <b>Phone:</b> ${escapeHtml(phone)}\n`;
    text += `🚘 <b>Car:</b> ${escapeHtml(car)}\n`;
    text += `📍 <b>ZIP:</b> ${escapeHtml(zip)}\n`;
    if (message) text += `📝 <b>Description:</b>\n${escapeHtml(message)}\n`;
    if (Array.isArray(photoUrls) && photoUrls.length) {
      text += `\n📸 <b>Photos:</b> ${photoUrls.length} attached by client`;
    }

    // 1) send the text message
    await postJSON(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });

    // 2) send each image as multipart
    if (Array.isArray(photoUrls) && photoUrls.length) {
      for (let i = 0; i < Math.min(photoUrls.length, 5); i++) {
        const { buffer, filename, mime } = dataUrlToFile(photoUrls[i], i);
        await sendPhotoAsMultipart(BOT, CHAT_ID, buffer, filename, mime);
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('submit error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to process request' }) };
  }
};

// helpers
function escapeHtml(t = '') {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(t).replace(/[&<>"']/g, (m) => map[m]);
}

function postJSON(url, payload) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const body = JSON.stringify(payload);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'POST',
        port: 443,
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => (res.statusCode >= 200 && res.statusCode < 300 ? resolve() : reject(new Error(`HTTP ${res.statusCode}`))));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function dataUrlToFile(dataUrl, idx = 0) {
  // format: data:image/jpeg;base64,AAAA...
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    throw new Error('Bad data URL');
  }
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/^data:([^;]+);base64$/)?.[1] || 'image/jpeg';
  const buffer = Buffer.from(base64, 'base64');
  const ext = mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : 'jpg';
  const filename = `photo_${Date.now()}_${idx}.${ext}`;
  return { buffer, filename, mime };
}

function sendPhotoAsMultipart(BOT, chatId, fileBuffer, filename, mime) {
  return new Promise((resolve, reject) => {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2);
    const u = new URL(`https://api.telegram.org/bot${BOT}/sendPhoto`);

    const head =
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="chat_id"\r\n\r\n${chatId}\r\n` +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="photo"; filename="${filename}"\r\n` +
      `Content-Type: ${mime}\r\n\r\n`;
    const tail = `\r\n--${boundary}--\r\n`;

    const bodyLen = Buffer.byteLength(head) + fileBuffer.length + Buffer.byteLength(tail);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname,
        method: 'POST',
        port: 443,
        headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': bodyLen },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => (res.statusCode >= 200 && res.statusCode < 300 ? resolve() : reject(new Error(`TG photo HTTP ${res.statusCode}`))));
      }
    );
    req.on('error', reject);
    req.write(head);
    req.write(fileBuffer);
    req.write(tail);
    req.end();
  });
}
