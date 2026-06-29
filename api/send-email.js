import { sendFormEmails } from '../src/utils/emailService.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // ignore
      }
    }

    const result = await sendFormEmails(body || {});
    return res.status(200).json(result);
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
