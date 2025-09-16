import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Mock users storage (in real app, this would be a database)
let mockUsers = [
  {
    id: '1',
    email: 'admin@cyberbyte.com',
    password: 'admin123',
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
    console.log('🔐 Registration attempt');
    const body = await request.json()
    console.log('📝 Request body:', { ...body, password: '***' });
    
    const { firstName, lastName, email, password } = registerSchema.parse(body)
    console.log('✅ Parsed data:', { firstName, lastName, email });

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)

    if (existingUser) {
      console.log('❌ User already exists:', email);
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      firstName,
      lastName,
      email,
      password, // In real app, this would be hashed
      role: 'user'
    }

    // Add to mock users
    mockUsers.push(newUser)

    console.log('✅ User created:', { id: newUser.id, email: newUser.email });

    // Return user data without password
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
