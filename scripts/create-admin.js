const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@cyberbyte.com' }
    });

    if (existingAdmin) {
      console.log('Admin already exists!');
      return;
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

    console.log('Admin created successfully!');
    console.log('Email: admin@cyberbyte.com');
    console.log('Password: admin123');
    console.log('Admin ID:', admin.id);

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
