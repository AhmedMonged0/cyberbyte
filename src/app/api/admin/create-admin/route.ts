import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@cyberbyte.com' }
    });

    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin already exists',
        admin: {
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        }
      });
    }

    // Create admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@cyberbyte.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'super_admin',
        isActive: true
      }
    });

    // Return admin data without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...adminWithoutPassword } = admin

    return NextResponse.json({
      message: 'Admin created successfully',
      admin: adminWithoutPassword
    });

  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
