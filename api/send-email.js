import { Resend } from 'resend';
import { generateContactNotification } from '../emails/contact-notification.js';
import { generateClientAutoReply } from '../emails/client-auto-reply.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Method Security: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. CORS/Origin Security: Restrict who can call this API
  const origin = req.headers.origin || req.headers.referer || '';
  const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
  
  // Define allowed domains here to prevent abuse from other sites
  const allowedDomains = ['oryxstudios.co', 'localhost', '127.0.0.1'];
  const isAllowedOrigin = isDevelopment || allowedDomains.some(domain => origin.includes(domain));

  if (!isAllowedOrigin && origin !== '') {
    return res.status(403).json({ error: 'Forbidden: Invalid Origin' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // 3. Input Validation Security
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // 4. Send the emails in a batch using Resend
    const { data, error } = await resend.batch.send([
      {
        from: 'Oryx Studios <info@oryxstudios.co>',
        to: ['oryxstudiosng@gmail.com'],
        subject: `New Project Inquiry from ${name}`,
        html: generateContactNotification({ name, email, phone, message }),
        reply_to: email,
      },
      {
        from: 'Oryx Studios <info@oryxstudios.co>',
        to: [email],
        subject: 'We received your request - Oryx Studios',
        html: generateClientAutoReply(name),
      }
    ]);

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    // Return a generic error to the client to avoid leaking stack traces
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
