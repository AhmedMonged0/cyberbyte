import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetCode } from '@/lib/email'
import { z } from 'zod'
import crypto from 'crypto'

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = resetPasswordSchema.parse(body)

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

    // Generate secure reset code
    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Delete any existing reset tokens for this user
    await prisma.resetToken.deleteMany({
      where: { userId: user.id }
    })

    // Create new reset token with the code
    await prisma.resetToken.create({
      data: {
        token: resetCode,
        userId: user.id,
        expiresAt,
      }
    })

    // Send reset code
    const emailSent = await sendPasswordResetCode(email, resetCode)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'If an account with that email exists, we sent a password reset code.'
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
