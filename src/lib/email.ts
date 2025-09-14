import nodemailer from 'nodemailer'

// إعداد nodemailer (يمكن تغييره لخدمة أخرى مثل SendGrid, AWS SES, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'test@example.com',
    pass: process.env.SMTP_PASS || 'test-password',
  },
})

export async function sendPasswordResetEmail(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
  
  // في بيئة التطوير، نطبع الرابط في الكونسول بدلاً من إرسال إيميل
  if (process.env.NODE_ENV === 'development' || !process.env.SMTP_USER) {
    console.log('🔗 Password Reset Link (Development Mode):')
    console.log(`Email: ${email}`)
    console.log(`Reset URL: ${resetUrl}`)
    console.log(`Token: ${resetToken}`)
    return true
  }
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@cyberbyte.com',
    to: email,
    subject: 'إعادة تعيين كلمة المرور - CyberByte',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">CyberByte</h1>
          <p style="color: #e0e0e0; margin: 10px 0 0 0;">متجر التكنولوجيا الرائد</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">إعادة تعيين كلمة المرور</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            مرحباً،<br>
            تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في CyberByte.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            اضغط على الزر أدناه لإعادة تعيين كلمة المرور الخاصة بك:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      font-weight: bold;
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
              إعادة تعيين كلمة المرور
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.6; margin-top: 30px;">
            إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.<br>
            هذا الرابط صالح لمدة 15 دقيقة فقط.
          </p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              © 2024 CyberByte. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Password reset email sent to: ${email}`)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
