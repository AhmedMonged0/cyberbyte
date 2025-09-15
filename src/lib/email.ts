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
  // إضافة تسجيل مفصل للأخطاء
  debug: process.env.NODE_ENV === 'development',
  logger: process.env.NODE_ENV === 'development',
})

// اختبار الاتصال بـ SMTP
export async function testSMTPConnection() {
  try {
    await transporter.verify()
    console.log('✅ SMTP connection verified successfully')
    return true
  } catch (error) {
    console.error('❌ SMTP connection failed:', error)
    return false
  }
}

export async function sendPasswordResetEmail(email: string, resetToken: string, useCode: boolean = false) {
  // تحديد الرابط الأساسي بناءً على البيئة
  const getBaseUrl = () => {
    // في Vercel أو بيئة الإنتاج
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    }
    // إذا كان متغير NEXTAUTH_URL محدد
    if (process.env.NEXTAUTH_URL) {
      return process.env.NEXTAUTH_URL
    }
    // في بيئة التطوير المحلية
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000'
    }
    // افتراضي للإنتاج
    return process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'
  }
  
  const resetUrl = `${getBaseUrl()}/reset-password?token=${resetToken}`
  
  // في بيئة التطوير، نطبع الرابط في الكونسول أيضاً
  if (process.env.NODE_ENV === 'development') {
    console.log('🔗 Password Reset Link (Development Mode):')
    console.log(`Email: ${email}`)
    console.log(`Reset URL: ${resetUrl}`)
    console.log(`Token: ${resetToken}`)
  }
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'CyberByte <noreply@cyberbyte.com>',
    to: email,
    subject: '🔐 إعادة تعيين كلمة المرور - CyberByte',
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إعادة تعيين كلمة المرور - CyberByte</title>
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
            <h2 style="color: #333; margin-bottom: 25px; font-size: 24px; text-align: center;">🔐 إعادة تعيين كلمة المرور</h2>
            
            <p style="color: #666; line-height: 1.8; margin-bottom: 25px; font-size: 16px;">
              مرحباً،<br><br>
              تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك في <strong>CyberByte</strong>.
            </p>
            
            <p style="color: #666; line-height: 1.8; margin-bottom: 35px; font-size: 16px;">
              اضغط على الزر أدناه لإعادة تعيين كلمة المرور الخاصة بك:
            </p>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 18px 40px; 
                        text-decoration: none; 
                        border-radius: 30px; 
                        font-weight: bold;
                        font-size: 16px;
                        display: inline-block;
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;">
                🔑 إعادة تعيين كلمة المرور
              </a>
            </div>
            
            <!-- Alternative Link -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 30px 0;">
              <p style="color: #666; margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">إذا لم يعمل الزر، انسخ والصق الرابط التالي:</p>
              <p style="color: #667eea; margin: 0; font-size: 12px; word-break: break-all; background: white; padding: 10px; border-radius: 5px; border: 1px solid #e0e0e0;">${resetUrl}</p>
            </div>
            
            <!-- Warning -->
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 10px; padding: 20px; margin: 30px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px; line-height: 1.6;">
                <strong>⚠️ تحذير مهم:</strong><br>
                • هذا الرابط صالح لمدة <strong>15 دقيقة</strong> فقط<br>
                • إذا لم تطلب إعادة تعيين كلمة المرور، تجاهل هذا البريد<br>
                • لا تشارك هذا الرابط مع أي شخص آخر
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
    // اختبار الاتصال أولاً
    console.log('🔍 Testing SMTP connection...')
    const isConnected = await testSMTPConnection()
    
    if (!isConnected) {
      console.error('❌ SMTP connection failed, cannot send email')
      return false
    }

    console.log('📧 Sending password reset email...')
    console.log('📧 Email details:', {
      to: email,
      from: mailOptions.from,
      subject: mailOptions.subject,
      smtpHost: process.env.SMTP_HOST,
      smtpUser: process.env.SMTP_USER
    })

    await transporter.sendMail(mailOptions)
    console.log(`✅ Password reset email sent successfully to: ${email}`)
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    })
    return false
  }
}

export async function sendPasswordResetCode(email: string, resetCode: string) {
  // في بيئة التطوير، نطبع الكود في الكونسول أيضاً
  if (process.env.NODE_ENV === 'development') {
    console.log('🔑 Password Reset Code (Development Mode):')
    console.log(`Email: ${email}`)
    console.log(`Reset Code: ${resetCode}`)
  }
  
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
    // اختبار الاتصال أولاً
    console.log('🔍 Testing SMTP connection...')
    const isConnected = await testSMTPConnection()
    
    if (!isConnected) {
      console.error('❌ SMTP connection failed, cannot send email')
      return false
    }

    console.log('📧 Sending password reset code...')
    console.log('📧 Email details:', {
      to: email,
      from: mailOptions.from,
      subject: mailOptions.subject,
      smtpHost: process.env.SMTP_HOST,
      smtpUser: process.env.SMTP_USER
    })

    await transporter.sendMail(mailOptions)
    console.log(`✅ Password reset code sent successfully to: ${email}`)
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    })
    return false
  }
}
