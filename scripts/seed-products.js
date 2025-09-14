const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const sampleProducts = [
  {
    name: "Alienware X17 R2 Gaming Laptop",
    description: "The Alienware X17 R2 is a premium gaming laptop that delivers exceptional performance with its powerful RTX 4080 graphics card and high-refresh-rate display. Perfect for gaming enthusiasts and content creators who demand the best.",
    price: 2499,
    originalPrice: 2799,
    category: "laptops",
    brand: "Alienware",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
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
      "Operating System": "Windows 11 Home",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.2",
      "Ports": "3x USB-A, 1x USB-C, HDMI 2.1, RJ-45",
      "Battery": "97Whr",
      "Weight": "3.2 kg",
      "Dimensions": "394 x 295 x 20.9 mm"
    },
    isActive: true,
    isFeatured: true,
    discount: 11
  },
  {
    name: "ASUS ROG Strix G15",
    description: "High-performance gaming laptop with RTX 4070 graphics and premium build quality. Perfect for gamers who want the best performance without compromising on portability.",
    price: 1899,
    originalPrice: 2199,
    category: "laptops",
    brand: "ASUS",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 8,
    rating: 4.7,
    reviews: 89,
    features: JSON.stringify(["RTX 4070", "16GB RAM", "512GB SSD", "144Hz Display"]),
    specifications: {
      "Processor": "AMD Ryzen 9 6900HX",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB",
      "Memory": "16GB DDR5-4800MHz",
      "Storage": "512GB PCIe NVMe SSD",
      "Display": "15.6\" FHD 144Hz",
      "Operating System": "Windows 11 Home"
    },
    isActive: true,
    isFeatured: true,
    discount: 14
  },
  {
    name: "MacBook Pro 16-inch M2 Max",
    description: "Apple's most powerful laptop with the M2 Max chip. Perfect for professional content creators, developers, and power users who need maximum performance.",
    price: 3299,
    originalPrice: 3299,
    category: "laptops",
    brand: "Apple",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 12,
    rating: 4.9,
    reviews: 203,
    features: JSON.stringify(["M2 Max", "32GB RAM", "1TB SSD", "Liquid Retina XDR"]),
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
    discount: null
  },
  {
    name: "Razer Blade 15 Advanced",
    description: "Sleek and powerful gaming laptop with premium build quality and excellent performance. Perfect for gamers who want both power and portability.",
    price: 2199,
    originalPrice: 2499,
    category: "laptops",
    brand: "Razer",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: false,
    stock: 0,
    rating: 4.6,
    reviews: 67,
    features: JSON.stringify(["RTX 4070", "16GB RAM", "1TB SSD", "240Hz Display"]),
    specifications: {
      "Processor": "Intel Core i7-12800H",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB",
      "Memory": "16GB DDR5-4800MHz",
      "Storage": "1TB PCIe NVMe SSD",
      "Display": "15.6\" QHD 240Hz",
      "Operating System": "Windows 11 Home"
    },
    isActive: true,
    isFeatured: false,
    discount: 12
  },
  {
    name: "MSI GE76 Raider",
    description: "High-performance gaming laptop with excellent cooling and RGB lighting. Perfect for gamers who want maximum performance and visual appeal.",
    price: 1999,
    originalPrice: 2299,
    category: "laptops",
    brand: "MSI",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 6,
    rating: 4.5,
    reviews: 45,
    features: JSON.stringify(["RTX 4060", "16GB RAM", "512GB SSD", "RGB Keyboard"]),
    specifications: {
      "Processor": "Intel Core i7-12700H",
      "Graphics": "NVIDIA GeForce RTX 4060 8GB",
      "Memory": "16GB DDR4-3200MHz",
      "Storage": "512GB PCIe NVMe SSD",
      "Display": "17.3\" FHD 144Hz",
      "Operating System": "Windows 11 Home"
    },
    isActive: true,
    isFeatured: false,
    discount: 13
  },
  {
    name: "Dell XPS 15 OLED",
    description: "Premium laptop with stunning OLED display and excellent build quality. Perfect for content creators and professionals who need color accuracy.",
    price: 1799,
    originalPrice: 1999,
    category: "laptops",
    brand: "Dell",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 10,
    rating: 4.7,
    reviews: 156,
    features: JSON.stringify(["RTX 4050", "16GB RAM", "512GB SSD", "OLED Display"]),
    specifications: {
      "Processor": "Intel Core i7-12700H",
      "Graphics": "NVIDIA GeForce RTX 4050 6GB",
      "Memory": "16GB DDR5-4800MHz",
      "Storage": "512GB PCIe NVMe SSD",
      "Display": "15.6\" OLED 3.5K",
      "Operating System": "Windows 11 Home"
    },
    isActive: true,
    isFeatured: false,
    discount: 10
  }
]

async function main() {
  console.log('Starting to seed products...')
  
  try {
    // Clear existing products
    await prisma.product.deleteMany({})
    console.log('Cleared existing products')
    
    // Create sample products
    for (const product of sampleProducts) {
      await prisma.product.create({
        data: product
      })
    }
    
    console.log(`Successfully created ${sampleProducts.length} products`)
  } catch (error) {
    console.error('Error seeding products:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
