import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    console.log('Setting up Vercel database...')
    
    // Create admin
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@cyberbyte.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'super_admin',
        isActive: true
      }
    })

    console.log('✅ Admin created:', admin.email)

    // Create sample products
    const sampleProducts = [
      {
        name: "Alienware X17 R2 Gaming Laptop",
        description: "The Alienware X17 R2 is a premium gaming laptop that delivers exceptional performance with its powerful RTX 4080 graphics card and high-refresh-rate display.",
        price: 2499,
        originalPrice: 2799,
        category: "laptops",
        brand: "Alienware",
        image: "/images/products/laptops/alienware-x17-r2.jpg",
        images: JSON.stringify([
          "/images/products/laptops/alienware-x17-r2.jpg",
          "/images/products/laptops/alienware-x17-r2.jpg"
        ]),
        inStock: true,
        stock: 15,
        rating: 4.8,
        reviews: 124,
        features: JSON.stringify(["RTX 4080", "32GB RAM", "1TB SSD", "240Hz Display"]),
        specifications: {
          "Processor": "Intel Core i9-12900HK",
          "Graphics": "NVIDIA GeForce RTX 4080 16GB",
          "Memory": "32GB DDR5-4800MHz",
          "Storage": "1TB PCIe NVMe SSD",
          "Display": "17.3\" FHD 240Hz 3ms"
        },
        isActive: true,
        isFeatured: true,
        discount: 11
      },
      {
        name: "ASUS ROG Strix G15",
        description: "The ASUS ROG Strix G15 delivers powerful gaming performance with its AMD Ryzen 9 processor and NVIDIA RTX 4070 graphics.",
        price: 1899,
        originalPrice: 2199,
        category: "laptops",
        brand: "ASUS",
        image: "/images/products/laptops/asus-rog-strix-g15.jpg",
        images: JSON.stringify([
          "/images/products/laptops/asus-rog-strix-g15.jpg",
          "/images/products/laptops/asus-rog-strix-g15.jpg"
        ]),
        inStock: true,
        stock: 8,
        rating: 4.6,
        reviews: 89,
        features: JSON.stringify(["RTX 4070", "16GB RAM", "512GB SSD", "165Hz Display"]),
        specifications: {
          "Processor": "AMD Ryzen 9 7940HS",
          "Graphics": "NVIDIA GeForce RTX 4070 8GB",
          "Memory": "16GB DDR5-4800MHz",
          "Storage": "512GB PCIe NVMe SSD",
          "Display": "15.6\" FHD 165Hz 3ms"
        },
        isActive: true,
        isFeatured: true,
        discount: 14
      }
    ]

    // Clear existing products
    await prisma.product.deleteMany({})
    console.log('✅ Cleared existing products')

    // Create sample products
    for (const product of sampleProducts) {
      await prisma.product.create({
        data: product
      })
    }
    
    console.log(`✅ Created ${sampleProducts.length} products`)

    return NextResponse.json({ 
      message: 'Database set up successfully!',
      admin: { email: admin.email, name: admin.name },
      products: sampleProducts.length,
      loginUrl: '/admin/login'
    })

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    return NextResponse.json(
      { error: 'Failed to set up database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
