import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Admin login request:', { email: body.email, passwordLength: body.password?.length })
    
    const { email, password } = adminLoginSchema.parse(body)

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { 
        email,
        isActive: true
      }
    })

    console.log('Admin found:', !!admin)
    if (admin) {
      console.log('Admin email:', admin.email)
      console.log('Admin isActive:', admin.isActive)
    }

    if (!admin) {
      console.log('Admin not found or inactive')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    console.log('Password valid:', isPasswordValid)

    if (!isPasswordValid) {
      console.log('Password verification failed')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return admin data (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...adminWithoutPassword } = admin

    return NextResponse.json({
      message: 'Admin login successful',
      admin: adminWithoutPassword
    })

  } catch (error) {
    console.error('Admin login error:', error)
    
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
