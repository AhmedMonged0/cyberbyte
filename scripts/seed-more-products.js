const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
})

const moreProducts = [
  // More Monitors
  {
    name: "Dell S2721QS 27-inch 4K Monitor",
    description: "Affordable 4K monitor with excellent color accuracy and USB-C connectivity. Perfect for content creators and professionals.",
    price: 399,
    originalPrice: 499,
    category: "monitors",
    brand: "Dell",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 25,
    rating: 4.5,
    reviews: 78,
    features: JSON.stringify(["4K UHD", "60Hz", "IPS Panel", "USB-C", "HDR10"]),
    specifications: {
      "Screen Size": "27 inches",
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "60Hz",
      "Response Time": "4ms GtG",
      "Panel Type": "IPS",
      "HDR": "HDR10",
      "Connectivity": "USB-C, DisplayPort, HDMI",
      "Color Gamut": "99% sRGB"
    },
    isActive: true,
    isFeatured: false,
    discount: 20
  },
  {
    name: "Acer Predator XB273K 27-inch 4K Gaming Monitor",
    description: "High-performance 4K gaming monitor with 144Hz refresh rate and G-Sync support. Perfect for competitive gaming.",
    price: 799,
    originalPrice: 899,
    category: "monitors",
    brand: "Acer",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 12,
    rating: 4.6,
    reviews: 45,
    features: JSON.stringify(["4K UHD", "144Hz", "G-Sync", "HDR400", "IPS Panel"]),
    specifications: {
      "Screen Size": "27 inches",
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "144Hz",
      "Response Time": "1ms GtG",
      "Panel Type": "IPS",
      "HDR": "HDR400",
      "Adaptive Sync": "NVIDIA G-Sync",
      "Connectivity": "DisplayPort 1.4, HDMI 2.0"
    },
    isActive: true,
    isFeatured: true,
    discount: 11
  },

  // More Peripherals
  {
    name: "Razer BlackWidow V4 Pro Mechanical Keyboard",
    description: "Premium mechanical gaming keyboard with Razer Green switches, RGB lighting, and dedicated media controls.",
    price: 229,
    originalPrice: 279,
    category: "peripherals",
    brand: "Razer",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 18,
    rating: 4.7,
    reviews: 92,
    features: JSON.stringify(["Razer Green Switches", "RGB Lighting", "Media Controls", "USB Passthrough", "Aluminum Frame"]),
    specifications: {
      "Switch Type": "Razer Green Mechanical",
      "Layout": "Full-size (104 keys)",
      "Backlighting": "Per-key RGB",
      "Connectivity": "USB 2.0",
      "Cable": "Detachable USB-C",
      "Dimensions": "475 x 170 x 40 mm",
      "Weight": "1.3 kg",
      "Compatibility": "Windows, macOS"
    },
    isActive: true,
    isFeatured: true,
    discount: 18
  },
  {
    name: "SteelSeries Rival 650 Wireless Gaming Mouse",
    description: "High-performance wireless gaming mouse with TrueMove3+ sensor and customizable weight system.",
    price: 99,
    originalPrice: 129,
    category: "peripherals",
    brand: "SteelSeries",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 20,
    rating: 4.5,
    reviews: 67,
    features: JSON.stringify(["TrueMove3+ Sensor", "Wireless", "Customizable Weight", "RGB Lighting", "60h Battery"]),
    specifications: {
      "Sensor": "TrueMove3+ 12000 CPI",
      "Connectivity": "2.4GHz wireless, USB",
      "Battery Life": "60 hours",
      "Weight": "121g (with weights)",
      "Switches": "SteelSeries switches",
      "Polling Rate": "1000Hz",
      "Compatibility": "Windows, macOS"
    },
    isActive: true,
    isFeatured: false,
    discount: 23
  },
  {
    name: "HyperX Cloud Alpha S Gaming Headset",
    description: "Premium gaming headset with 7.1 surround sound, detachable noise-canceling microphone, and comfortable memory foam ear cushions.",
    price: 99,
    originalPrice: 119,
    category: "peripherals",
    brand: "HyperX",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 30,
    rating: 4.6,
    reviews: 134,
    features: JSON.stringify(["7.1 Surround Sound", "Detachable Mic", "Memory Foam", "Aluminum Frame", "Multi-platform"]),
    specifications: {
      "Driver Size": "50mm neodymium",
      "Frequency Response": "13-27000 Hz",
      "Impedance": "65 Ohm",
      "Connectivity": "3.5mm, USB",
      "Microphone": "Detachable, noise-canceling",
      "Compatibility": "PC, PS4, PS5, Xbox, Switch, Mobile",
      "Weight": "320g"
    },
    isActive: true,
    isFeatured: false,
    discount: 17
  },

  // More Storage
  {
    name: "Samsung 970 EVO Plus 1TB NVMe SSD",
    description: "High-performance NVMe SSD with PCIe 3.0 support and excellent reliability. Perfect for gaming and professional applications.",
    price: 129,
    originalPrice: 159,
    category: "storage",
    brand: "Samsung",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 40,
    rating: 4.8,
    reviews: 189,
    features: JSON.stringify(["PCIe 3.0", "3500 MB/s Read", "3300 MB/s Write", "1TB Capacity", "5-year Warranty"]),
    specifications: {
      "Capacity": "1TB",
      "Interface": "PCIe 3.0 x4 NVMe",
      "Sequential Read": "3500 MB/s",
      "Sequential Write": "3300 MB/s",
      "Random Read": "620K IOPS",
      "Random Write": "560K IOPS",
      "Form Factor": "M.2 2280",
      "NAND Type": "Samsung V-NAND 3-bit MLC",
      "Warranty": "5 years",
      "TBW": "600 TBW"
    },
    isActive: true,
    isFeatured: true,
    discount: 19
  },
  {
    name: "Crucial P5 Plus 2TB NVMe SSD",
    description: "Next-generation NVMe SSD with PCIe 4.0 support and exceptional performance. Perfect for content creators and power users.",
    price: 199,
    originalPrice: 249,
    category: "storage",
    brand: "Crucial",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 22,
    rating: 4.7,
    reviews: 76,
    features: JSON.stringify(["PCIe 4.0", "6600 MB/s Read", "5000 MB/s Write", "2TB Capacity", "5-year Warranty"]),
    specifications: {
      "Capacity": "2TB",
      "Interface": "PCIe 4.0 x4 NVMe",
      "Sequential Read": "6600 MB/s",
      "Sequential Write": "5000 MB/s",
      "Random Read": "750K IOPS",
      "Random Write": "700K IOPS",
      "Form Factor": "M.2 2280",
      "NAND Type": "Micron 176-layer 3D TLC NAND",
      "Warranty": "5 years",
      "TBW": "1200 TBW"
    },
    isActive: true,
    isFeatured: true,
    discount: 20
  },
  {
    name: "WD Blue 4TB SATA HDD",
    description: "Reliable SATA hard drive with 5400 RPM speed and excellent value. Perfect for bulk storage and backups.",
    price: 79,
    originalPrice: 99,
    category: "storage",
    brand: "WD",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 50,
    rating: 4.4,
    reviews: 112,
    features: JSON.stringify(["4TB Capacity", "5400 RPM", "SATA 6Gb/s", "64MB Cache", "2-year Warranty"]),
    specifications: {
      "Capacity": "4TB",
      "Interface": "SATA 6Gb/s",
      "RPM": "5400 RPM",
      "Cache": "64MB",
      "Form Factor": "3.5-inch",
      "Data Transfer Rate": "150 MB/s",
      "Power Consumption": "5.1W (active)",
      "Warranty": "2 years",
      "MTBF": "1,000,000 hours"
    },
    isActive: true,
    isFeatured: false,
    discount: 20
  },
  {
    name: "SanDisk Extreme Pro 1TB Portable SSD",
    description: "High-speed portable SSD with USB 3.2 Gen 2 support and rugged design. Perfect for professionals on the go.",
    price: 149,
    originalPrice: 179,
    category: "storage",
    brand: "SanDisk",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 15,
    rating: 4.6,
    reviews: 58,
    features: JSON.stringify(["1TB Capacity", "1050 MB/s Read", "1000 MB/s Write", "USB 3.2 Gen 2", "Rugged Design"]),
    specifications: {
      "Capacity": "1TB",
      "Interface": "USB 3.2 Gen 2",
      "Sequential Read": "1050 MB/s",
      "Sequential Write": "1000 MB/s",
      "Form Factor": "Portable",
      "NAND Type": "3D NAND",
      "Warranty": "5 years",
      "Dimensions": "100 x 55 x 9.5 mm",
      "Weight": "77g"
    },
    isActive: true,
    isFeatured: false,
    discount: 17
  }
]

async function main() {
  console.log('Starting to seed more products...')
  
  try {
    // Create more products
    for (const product of moreProducts) {
      await prisma.product.create({
        data: product
      })
    }
    
    console.log(`Successfully created ${moreProducts.length} more products`)
    
    // Update category counts
    const monitors = await prisma.product.count({ where: { category: 'monitors' } })
    const peripherals = await prisma.product.count({ where: { category: 'peripherals' } })
    const storage = await prisma.product.count({ where: { category: 'storage' } })
    
    console.log(`Updated category counts:`)
    console.log(`- Monitors: ${monitors} products`)
    console.log(`- Peripherals: ${peripherals} products`)
    console.log(`- Storage: ${storage} products`)
    
  } catch (error) {
    console.error('Error seeding more products:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
