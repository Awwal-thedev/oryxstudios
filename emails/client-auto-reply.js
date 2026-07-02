export function generateClientAutoReply(name) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #111827;">Oryx Studios</h1>
      </div>
      
      <div style="padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
        <p style="font-size: 16px;">Hi ${name},</p>
        
        <p style="font-size: 16px;">Thank you for reaching out to Oryx Studios! We've successfully received your project details.</p>
        
        <p style="font-size: 16px;">Our team is currently reviewing your request, and we will get back to you within 24 hours to discuss the next steps.</p>
        
        <p style="font-size: 16px;">If you have any urgent details to add, feel free to reply directly to this email.</p>
        
        <br/>
        <p style="font-size: 16px; margin-bottom: 0;">Best regards,</p>
        <p style="font-size: 16px; font-weight: bold; margin-top: 5px;">The Oryx Studios Team</p>
      </div>
      
      <div style="text-align: center; padding: 20px; font-size: 12px; color: #6b7280;">
        <p>© ${new Date().getFullYear()} Oryx Studios. All rights reserved.</p>
      </div>
    </div>
  `;
}
