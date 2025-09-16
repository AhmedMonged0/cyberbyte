import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Mock admin data
const mockAdmins = [
  {
    id: '1',
    email: 'admin@cyberbyte.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    isActive: true
  },
  {
    id: '2',
    email: 'superadmin@cyberbyte.com',
    password: 'superadmin123',
    name: 'Super Admin',
    role: 'super_admin',
    isActive: true
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('🔐 Admin login request:', { email: body.email, passwordLength: body.password?.length })
    
    const { email, password } = adminLoginSchema.parse(body)

    // Find admin by email
    const admin = mockAdmins.find(a => a.email === email && a.isActive)

    console.log('👤 Admin found:', !!admin)
    if (admin) {
      console.log('📧 Admin email:', admin.email)
      console.log('✅ Admin isActive:', admin.isActive)
    }

    if (!admin) {
      console.log('❌ Admin not found or inactive')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password (simple comparison for mock)
    const isPasswordValid = admin.password === password
    console.log('🔑 Password valid:', isPasswordValid)

    if (!isPasswordValid) {
      console.log('❌ Password verification failed')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ Admin login successful for:', email)

    // Return admin data (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...adminWithoutPassword } = admin

    return NextResponse.json({
      message: 'Admin login successful',
      admin: adminWithoutPassword
    })

  } catch (error) {
    console.error('❌ Admin login error:', error)
    
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
