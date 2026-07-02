export function generateContactNotification({ name, email, phone, message }) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-bottom: 2px solid #3b82f6;">
        <h2 style="margin: 0; color: #111827;">New Project Inquiry</h2>
      </div>
      
      <div style="padding: 20px;">
        <h3 style="color: #3b82f6; margin-top: 0;">Client Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
          </tr>
        </table>
        
        <h3 style="color: #3b82f6;">Brief Overview</h3>
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; font-size: 12px; color: #6b7280;">
        <p>This message was sent from the Oryx Studios Website Contact Form.</p>
      </div>
    </div>
  `;
}
