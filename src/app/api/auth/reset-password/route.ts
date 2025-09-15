import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail, sendPasswordResetCode } from '@/lib/email'
import { z } from 'zod'
import crypto from 'crypto'

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  useCode: z.boolean().optional().default(false), // خيار إرسال كود بدلاً من رابط
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, useCode } = resetPasswordSchema.parse(body)

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account with that email exists, we sent a password reset link.'
      })
    }

    // Generate secure reset token or code
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetCode = useCode ? crypto.randomBytes(3).toString('hex').toUpperCase() : null
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Delete any existing reset tokens for this user
    await prisma.resetToken.deleteMany({
      where: { userId: user.id }
    })

    // Create new reset token
    await prisma.resetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt,
      }
    })

    // Send reset email or code
    let emailSent = false
    if (useCode && resetCode) {
      emailSent = await sendPasswordResetCode(email, resetCode)
    } else {
      emailSent = await sendPasswordResetEmail(email, resetToken)
    }

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: useCode 
        ? 'If an account with that email exists, we sent a password reset code.'
        : 'If an account with that email exists, we sent a password reset link.'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
