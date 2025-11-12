// /netlify/functions/submit.js
const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing Telegram credentials');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, phone, car, zip, message, photoUrls } = data || {};

    // ---- validation
    const errors = [];
    if (!name || !name.trim()) errors.push('name');
    if (!car || !car.trim()) errors.push('car');
    if (!zip || !zip.trim()) errors.push('zip');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) errors.push('email');
    if (!phone || !/^[+()\-\s\d]{7,20}$/.test(String(phone))) errors.push('phone');

    const zipPattern = /^\d{5}(-\d{4})?$/;
    if (zip && !zipPattern.test(String(zip))) errors.push('zip_format');

    if (errors.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid fields', fields: errors }) };
    }
    // ---- /validation

    // Compose Telegram message (не вставляем base64 картинок в текст)
    let text = '';
    text += '🚗 <b>New Scratch Lab Request</b>\n\n';
    text += `👤 <b>Name:</b> ${escapeHtml(name)}\n`;
    text += `📧 <b>Email:</b> ${escapeHtml(email)}\n`;
    text += `📞 <b>Phone:</b> ${escapeHtml(phone)}\n`;
    text += `🚘 <b>Car:</b> ${escapeHtml(car)}\n`;
    text += `📍 <b>ZIP:</b> ${escapeHtml(zip)}\n`;
    if (message && String(message).trim()) {
      text += `📝 <b>Description:</b>\n${escapeHtml(String(message))}\n`;
    }
    if (Array.isArray(photoUrls) && photoUrls.length > 0) {
      text += `\n📸 <b>Photos:</b> ${photoUrls.length} attached by client\n`;
    }

    const sendMessageUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await sendTelegramMessage(sendMessageUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    console.error('Error processing request:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to process request' }) };
  }
};

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function sendTelegramMessage(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
    };

    const req = https.request(options, res => {
      let responseData = '';
      res.on('data', chunk => { responseData += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(responseData || '{}'));
        else reject(new Error(`Telegram API error: ${res.statusCode} ${responseData}`));
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}
