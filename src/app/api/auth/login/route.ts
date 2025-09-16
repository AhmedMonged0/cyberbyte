import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Mock users for testing
const mockUsers = [
  {
    id: '1',
    email: 'admin@cyberbyte.com',
    password: 'admin123', // In real app, this would be hashed
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@cyberbyte.com',
    password: 'user123',
    firstName: 'Test',
    lastName: 'User',
    role: 'user'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    console.log('🔐 Login attempt:', { email, password: '***' })

    // Find user by email
    const user = mockUsers.find(u => u.email === email)

    if (!user) {
      console.log('❌ User not found:', email)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password (simple comparison for mock)
    if (user.password !== password) {
      console.log('❌ Invalid password for:', email)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('✅ Login successful for:', email)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('❌ Login error:', error)
    
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
