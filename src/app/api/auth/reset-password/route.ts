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

    // Check reset attempts limit
    const MAX_ATTEMPTS = 3 // الحد الأقصى 3 محاولات
    const BLOCK_DURATION = 30 * 60 * 1000 // 30 دقيقة
    const RESET_ATTEMPTS_DURATION = 60 * 60 * 1000 // ساعة واحدة لإعادة تعيين العداد

    let resetAttempt = null
    try {
      resetAttempt = await prisma.resetAttempt.findUnique({
        where: { email }
      })
    } catch (error) {
      console.log('ResetAttempt table not available, skipping rate limiting:', error instanceof Error ? error.message : 'Unknown error')
      // Continue without rate limiting if table doesn't exist
    }

    // Check if email is blocked
    if (resetAttempt?.blockedUntil && new Date() < resetAttempt.blockedUntil) {
      const remainingTime = Math.ceil((resetAttempt.blockedUntil.getTime() - Date.now()) / (1000 * 60))
      return NextResponse.json({
        error: `تم حظر هذا البريد الإلكتروني مؤقتاً. حاول مرة أخرى بعد ${remainingTime} دقيقة.`
      }, { status: 429 })
    }

    // Check if attempts exceeded
    if (resetAttempt && resetAttempt.attempts >= MAX_ATTEMPTS) {
      // Check if enough time has passed to reset attempts
      const timeSinceLastAttempt = Date.now() - resetAttempt.lastAttempt.getTime()
      if (timeSinceLastAttempt < RESET_ATTEMPTS_DURATION) {
        // Block the email for 30 minutes
        const blockedUntil = new Date(Date.now() + BLOCK_DURATION)
        try {
          await prisma.resetAttempt.update({
            where: { email },
            data: {
              attempts: 0,
              blockedUntil,
              lastAttempt: new Date()
            }
          })
        } catch (error) {
          console.log('Failed to update reset attempts for blocking:', error instanceof Error ? error.message : 'Unknown error')
        }

        return NextResponse.json({
          error: `تم تجاوز الحد الأقصى للمحاولات (${MAX_ATTEMPTS}). تم حظر البريد الإلكتروني لمدة 30 دقيقة.`
        }, { status: 429 })
      } else {
        // Reset attempts after 1 hour
        try {
          await prisma.resetAttempt.update({
            where: { email },
            data: {
              attempts: 0,
              blockedUntil: null,
              lastAttempt: new Date()
            }
          })
        } catch (error) {
          console.log('Failed to reset attempts:', error instanceof Error ? error.message : 'Unknown error')
        }
      }
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account with that email exists, we sent a password reset code.'
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

    // Update or create reset attempt record
    try {
      if (resetAttempt) {
        await prisma.resetAttempt.update({
          where: { email },
          data: {
            attempts: resetAttempt.attempts + 1,
            lastAttempt: new Date(),
            blockedUntil: null // Reset block if exists
          }
        })
      } else {
        await prisma.resetAttempt.create({
          data: {
            email,
            attempts: 1,
            lastAttempt: new Date()
          }
        })
      }
    } catch (error) {
      console.log('Failed to update reset attempts, continuing without rate limiting:', error instanceof Error ? error.message : 'Unknown error')
      // Continue without updating attempts if table doesn't exist
    }

    return NextResponse.json({
      message: 'If an account with that email exists, we sent a password reset code.',
      attempts: resetAttempt ? resetAttempt.attempts + 1 : 1
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
