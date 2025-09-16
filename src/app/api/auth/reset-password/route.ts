import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/users'
import { sendPasswordResetCode } from '@/lib/email'
import { z } from 'zod'
import crypto from 'crypto'

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// Simple in-memory storage for reset codes
const resetCodes = new Map<string, { code: string; expiresAt: Date; userId: string }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = resetPasswordSchema.parse(body)

    console.log('🔐 Reset password request for:', email)

    // Check if user exists
    const user = findUserByEmail(email)

    if (!user) {
      // Don't reveal if user exists or not for security
      console.log('❌ User not found:', email)
      return NextResponse.json({
        message: 'If an account with that email exists, we sent a password reset code.'
      })
    }

    // Generate secure reset code
    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Store reset code
    resetCodes.set(email, {
      code: resetCode,
      expiresAt,
      userId: user.id
    })

    console.log('✅ Reset code generated for:', email, 'Code:', resetCode)

    // Send reset code via email
    const emailSent = await sendPasswordResetCode(email, resetCode)

    if (!emailSent) {
      console.log('❌ Failed to send email to:', email)
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      )
    }

    console.log('✅ Reset code sent successfully to:', email)

    return NextResponse.json({
      message: 'If an account with that email exists, we sent a password reset code.',
      // For development only - show code in console and response
      resetCode: process.env.NODE_ENV === 'development' ? resetCode : undefined
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
