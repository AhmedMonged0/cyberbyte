import { NextRequest, NextResponse } from 'next/server'
import { testSMTPConnection, sendPasswordResetEmail } from '@/lib/email'

export async function GET() {
  try {
    console.log('🧪 Testing email configuration...')
    
    // اختبار الاتصال بـ SMTP
    const isConnected = await testSMTPConnection()
    
    if (!isConnected) {
      return NextResponse.json({
        success: false,
        message: 'SMTP connection failed',
        details: {
          smtpHost: process.env.SMTP_HOST,
          smtpPort: process.env.SMTP_PORT,
          smtpUser: process.env.SMTP_USER,
          hasPassword: !!process.env.SMTP_PASS
        }
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'SMTP connection successful',
      details: {
        smtpHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
        smtpUser: process.env.SMTP_USER,
        hasPassword: !!process.env.SMTP_PASS
      }
    })

  } catch (error) {
    console.error('Email test error:', error)
    return NextResponse.json({
      success: false,
      message: 'Email test failed',
      error: error.message
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'Email is required'
      }, { status: 400 })
    }

    console.log(`🧪 Testing email send to: ${email}`)
    
    // اختبار إرسال بريد إلكتروني
    const testToken = 'test-token-123'
    const emailSent = await sendPasswordResetEmail(email, testToken)
    
    if (!emailSent) {
      return NextResponse.json({
        success: false,
        message: 'Failed to send test email'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent successfully to ${email}`
    })

  } catch (error) {
    console.error('Email send test error:', error)
    return NextResponse.json({
      success: false,
      message: 'Email send test failed',
      error: error.message
    }, { status: 500 })
  }
}
