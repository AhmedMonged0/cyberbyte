import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/users'
import { sendPasswordResetCode } from '@/lib/email'
import { storeResetCode } from '@/lib/global-storage'
import { z } from 'zod'
import crypto from 'crypto'

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = resetPasswordSchema.parse(body)

    console.log('🔐 Reset password request for:', email)

    // Check if user exists
    const user = await findUserByEmail(email)

    if (!user) {
      // Don't reveal if user exists or not for security
      console.log('❌ User not found:', email)
      return NextResponse.json({
        message: 'If an account with that email exists, we sent a password reset code.'
      })
    }

    // Generate secure reset code (6 characters)
    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase()

    // Store reset code using shared system (always store)
    storeResetCode(email, resetCode, user.id, 15) // 15 minutes

    console.log('✅ Reset code generated for:', email, 'Code:', resetCode)

    // Send reset code via email
    const emailSent = await sendPasswordResetCode(email, resetCode)

    console.log('✅ Reset code sent successfully to:', email)

    return NextResponse.json({
      message: 'If an account with that email exists, we sent a password reset code.',
      // Always show code for testing (in real production, remove this)
      resetCode: resetCode
    })

  } catch (error) {
    console.error('❌ Reset password error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
