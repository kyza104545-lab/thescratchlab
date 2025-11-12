const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing Telegram credentials');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, car, zip, message, photoUrls } = data;

    if (!name || !car || !zip) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const zipPattern = /^\d{5}(-\d{4})?$/;
    if (!zipPattern.test(zip)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid ZIP code format' })
      };
    }

    let telegramMessage = `🚗 <b>New Scratch Lab Request</b>\n\n`;
    telegramMessage += `👤 <b>Name:</b> ${escapeHtml(name)}\n`;
    telegramMessage += `🚘 <b>Car:</b> ${escapeHtml(car)}\n`;
    telegramMessage += `📍 <b>ZIP:</b> ${escapeHtml(zip)}\n`;

    if (message) {
      telegramMessage += `📝 <b>Description:</b>\n${escapeHtml(message)}\n`;
    }

    if (photoUrls && photoUrls.length > 0) {
      telegramMessage += `\n📸 <b>Photos:</b>\n`;
      photoUrls.forEach((url, index) => {
        telegramMessage += `${index + 1}. ${url}\n`;
      });
    }

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await sendTelegramMessage(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
      parse_mode: 'HTML'
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ ok: true })
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' })
    };
  }
};

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function sendTelegramMessage(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Telegram API error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}
