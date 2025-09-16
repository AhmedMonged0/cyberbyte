import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/users'
import { verifyResetCode, updateResetCodeWithToken, verifyResetCodeForProduction } from '@/lib/reset-codes'
import { z } from 'zod'
import crypto from 'crypto'

const verifyCodeSchema = z.object({
  code: z.string().length(6, 'Code must be 6 characters'),
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, email } = verifyCodeSchema.parse(body)

    console.log('🔐 Verify reset code request:', { code, email })

    // Check if user exists
    const user = findUserByEmail(email)
    if (!user) {
      console.log('❌ User not found:', email)
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود'
      }, { status: 400 })
    }

    // Verify reset code using appropriate system
    // For now, use production system for both dev and prod
    const verification = verifyResetCodeForProduction(email, code)
      
    if (!verification.valid) {
      console.log('❌ Reset code verification failed:', verification.message)
      return NextResponse.json({
        success: false,
        message: verification.message
      }, { status: 400 })
    }

    // Generate access token for password change
    const accessToken = crypto.randomBytes(32).toString('hex')

    // Update reset data with access token
    updateResetCodeWithToken(email, accessToken, 15) // 15 minutes

    console.log('✅ Reset code verified successfully for:', email)

    return NextResponse.json({
      success: true,
      message: 'الكود صحيح',
      token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })

  } catch (error) {
    console.error('❌ Verify reset code error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          message: 'البيانات المدخلة غير صحيحة',
          details: error.issues 
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: false,
      message: 'حدث خطأ في الخادم',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
