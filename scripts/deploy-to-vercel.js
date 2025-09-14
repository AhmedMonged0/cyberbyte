const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function deployToVercel() {
  try {
    console.log('Starting Vercel deployment setup...');
    
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@cyberbyte.com' }
    });

    if (existingAdmin) {
      console.log('Admin already exists on Vercel!');
      return;
    }

    // Create admin for Vercel
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

    console.log('Admin created successfully on Vercel!');
    console.log('Email: admin@cyberbyte.com');
    console.log('Password: admin123');
    console.log('Admin ID:', admin.id);

    // Create sample products
    const sampleProducts = [
      {
        name: "Alienware X17 R2 Gaming Laptop",
        description: "The Alienware X17 R2 is a premium gaming laptop that delivers exceptional performance with its powerful RTX 4080 graphics card and high-refresh-rate display. Perfect for gaming enthusiasts and content creators who demand the best.",
        price: 2499,
        originalPrice: 2799,
        category: "laptops",
        brand: "Alienware",
        image: "/images/products/laptops/alienware-x17-r2.jpg",
        images: JSON.stringify([
          "/images/products/laptops/alienware-x17-r2.jpg",
          "/images/products/laptops/alienware-x17-r2.jpg",
          "/images/products/laptops/alienware-x17-r2.jpg",
          "/images/products/laptops/alienware-x17-r2.jpg"
        ]),
        inStock: true,
        stock: 15,
        rating: 4.8,
        reviews: 124,
        features: JSON.stringify(["RTX 4080", "32GB RAM", "1TB SSD", "240Hz Display", "RGB Lighting"]),
        specifications: {
          "Processor": "Intel Core i9-12900HK",
          "Graphics": "NVIDIA GeForce RTX 4080 16GB",
          "Memory": "32GB DDR5-4800MHz",
          "Storage": "1TB PCIe NVMe SSD",
          "Display": "17.3\" FHD 240Hz 3ms",
          "Operating System": "Windows 11 Pro"
        },
        isActive: true,
        isFeatured: true,
        discount: 11
      },
      {
        name: "ASUS ROG Strix G15",
        description: "The ASUS ROG Strix G15 delivers powerful gaming performance with its AMD Ryzen 9 processor and NVIDIA RTX 4070 graphics. Features a high-refresh-rate display and advanced cooling system for optimal gaming experience.",
        price: 1899,
        originalPrice: 2199,
        category: "laptops",
        brand: "ASUS",
        image: "/images/products/laptops/asus-rog-strix-g15.jpg",
        images: JSON.stringify([
          "/images/products/laptops/asus-rog-strix-g15.jpg",
          "/images/products/laptops/asus-rog-strix-g15.jpg",
          "/images/products/laptops/asus-rog-strix-g15.jpg"
        ]),
        inStock: true,
        stock: 8,
        rating: 4.6,
        reviews: 89,
        features: JSON.stringify(["RTX 4070", "16GB RAM", "512GB SSD", "165Hz Display", "RGB Keyboard"]),
        specifications: {
          "Processor": "AMD Ryzen 9 7940HS",
          "Graphics": "NVIDIA GeForce RTX 4070 8GB",
          "Memory": "16GB DDR5-4800MHz",
          "Storage": "512GB PCIe NVMe SSD",
          "Display": "15.6\" FHD 165Hz 3ms",
          "Operating System": "Windows 11 Home"
        },
        isActive: true,
        isFeatured: true,
        discount: 14
      },
      {
        name: "MacBook Pro 16-inch M2 Max",
        description: "The MacBook Pro 16-inch with M2 Max chip delivers exceptional performance for professional workflows. Features a stunning Liquid Retina XDR display and all-day battery life for creators and developers.",
        price: 3299,
        originalPrice: 3499,
        category: "laptops",
        brand: "Apple",
        image: "/images/products/laptops/macbook-pro-16.jpg",
        images: JSON.stringify([
          "/images/products/laptops/macbook-pro-16.jpg",
          "/images/products/laptops/macbook-pro-16.jpg",
          "/images/products/laptops/macbook-pro-16.jpg"
        ]),
        inStock: true,
        stock: 5,
        rating: 4.9,
        reviews: 156,
        features: JSON.stringify(["M2 Max Chip", "32GB RAM", "1TB SSD", "Liquid Retina XDR", "Touch ID"]),
        specifications: {
          "Processor": "Apple M2 Max",
          "Graphics": "38-core GPU",
          "Memory": "32GB unified memory",
          "Storage": "1TB SSD",
          "Display": "16.2\" Liquid Retina XDR",
          "Operating System": "macOS Ventura"
        },
        isActive: true,
        isFeatured: true,
        discount: 6
      }
    ];

    // Clear existing products
    await prisma.product.deleteMany({});
    console.log('Cleared existing products');

    // Create sample products
    for (const product of sampleProducts) {
      await prisma.product.create({
        data: product
      });
    }
    
    console.log(`Successfully created ${sampleProducts.length} products on Vercel`);

  } catch (error) {
    console.error('Error setting up Vercel deployment:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deployToVercel();
