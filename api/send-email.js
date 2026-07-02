import { Resend } from 'resend';

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

    // 4. Send the email using Resend
    const data = await resend.emails.send({
      from: 'Oryx Studios <info@oryxstudios.co>',
      to: ['oryxstudiosng@gmail.com'],
      reply_to: email, // This allows you to hit "Reply" directly in Gmail
      subject: `New Project Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <br/>
        <p><strong>Brief Overview:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (data.error) {
      console.error('Resend Error:', data.error);
      return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    // Return a generic error to the client to avoid leaking stack traces
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
