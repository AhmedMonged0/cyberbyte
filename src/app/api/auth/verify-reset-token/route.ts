import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const verifyTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = verifyTokenSchema.parse(body)

    // Find the reset token
    const resetToken = await prisma.resetToken.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (resetToken.expiresAt < new Date()) {
      // Delete expired token
      await prisma.resetToken.delete({
        where: { id: resetToken.id }
      })
      
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      )
    }

    // Check if token is already used
    if (resetToken.used) {
      return NextResponse.json(
        { error: 'Reset token has already been used' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Token is valid',
      user: {
        id: resetToken.user.id,
        email: resetToken.user.email,
        firstName: resetToken.user.firstName,
        lastName: resetToken.user.lastName,
      }
    })

  } catch (error) {
    console.error('Verify token error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
