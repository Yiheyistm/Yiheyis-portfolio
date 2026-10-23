export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse payload (Vercel automatically parses JSON bodies)
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: 'Server configuration error: missing Telegram credentials.' });
  }

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const text =
    `📬 <b>New Portfolio Inquiry</b>\n\n` +
    `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
    `📧 <b>Email:</b> <code>${escapeHtml(email)}</code>\n\n` +
    `💬 <b>Message:</b>\n${escapeHtml(message)}\n\n` +
    `📅 <i>${new Date().toLocaleString()}</i>`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const tgData = await tgRes.json().catch(() => ({}));
    if (!tgData.ok) {
      return res.status(502).json({ error: 'Telegram delivery failed', details: tgData });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error delivering message' });
  }
}
