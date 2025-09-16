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



export async function sendPasswordResetCode(email: string, resetCode: string) {
  // Always log the code for debugging
  console.log('🔑 Password Reset Code:')
  console.log(`📧 Email: ${email}`)
  console.log(`🔐 Reset Code: ${resetCode}`)
  
  // Always try to send real email
  
  // في بيئة الإنتاج، نحاول إرسال الإيميل فعلياً
  const mailOptions = {
    from: process.env.SMTP_FROM || 'CyberByte <noreply@cyberbyte.com>',
    to: email,
    subject: '🔐 كود إعادة تعيين كلمة المرور - CyberByte',
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>كود إعادة تعيين كلمة المرور - CyberByte</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">CyberByte</h1>
            <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 16px;">متجر التكنولوجيا الرائد</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #333; margin-bottom: 25px; font-size: 24px; text-align: center;">🔐 كود إعادة تعيين كلمة المرور</h2>
            
            <p style="color: #666; line-height: 1.8; margin-bottom: 25px; font-size: 16px;">
              مرحباً،<br><br>
              تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في <strong>CyberByte</strong>.
            </p>
            
            <p style="color: #666; line-height: 1.8; margin-bottom: 35px; font-size: 16px;">
              استخدم الكود التالي لإعادة تعيين كلمة المرور الخاصة بك:
            </p>
            
            <!-- Code Display -->
            <div style="text-align: center; margin: 40px 0;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 30px; 
                          border-radius: 15px; 
                          font-size: 32px; 
                          font-weight: bold;
                          letter-spacing: 8px;
                          display: inline-block;
                          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                          font-family: 'Courier New', monospace;">
                ${resetCode}
              </div>
            </div>
            
            <!-- Instructions -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 30px 0;">
              <p style="color: #666; margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">تعليمات الاستخدام:</p>
              <ul style="color: #666; margin: 0; font-size: 14px; line-height: 1.6; padding-right: 20px;">
                <li>ادخل هذا الكود في صفحة إعادة تعيين كلمة المرور</li>
                <li>الكود صالح لمدة 15 دقيقة فقط</li>
                <li>لا تشارك هذا الكود مع أي شخص آخر</li>
              </ul>
            </div>
            
            <!-- Warning -->
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 10px; padding: 20px; margin: 30px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.6;">
                <strong>⚠️ تحذير مهم:</strong><br>
                • إذا لم تطلب إعادة تعيين كلمة المرور، تجاهل هذا البريد<br>
                • لا تشارك هذا الكود مع أي شخص آخر<br>
                • احذف هذا البريد بعد استخدام الكود
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 14px; margin: 0 0 10px 0;">
              <strong>CyberByte</strong> - متجر التكنولوجيا الرائد
            </p>
            <p style="color: #adb5bd; font-size: 12px; margin: 0;">
              © 2024 CyberByte. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`✅ Password reset code sent to: ${email}`)
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return false
  }
}

// دالة عامة لإرسال البريد الإلكتروني
export async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'CyberByte <noreply@cyberbyte.com>',
    to,
    subject,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`✅ Email sent to: ${to}`)
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return false
  }
}