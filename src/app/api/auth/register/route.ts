import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { addUser, findUserByEmail } from '@/lib/users'

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Registration attempt');
    const body = await request.json()
    console.log('📝 Request body:', { ...body, password: '***' });
    
    const { firstName, lastName, email, password } = registerSchema.parse(body)
    console.log('✅ Parsed data:', { firstName, lastName, email });

    // Check if user already exists
    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      console.log('❌ User already exists:', email);
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Create new user
    const newUser = await addUser({
      firstName,
      lastName,
      email,
      password, // In real app, this would be hashed
      role: 'user'
    })

    console.log('✅ User created:', { id: newUser.id, email: newUser.email });

    // Return user data without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    }, { status: 201 })

  } catch (error) {
    console.error('❌ Registration error:', error)
    
    if (error instanceof z.ZodError) {
      console.log('❌ Validation error:', error.issues);
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
