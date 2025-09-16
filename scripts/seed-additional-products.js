const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
})

const additionalProducts = [
  // Monitors
  {
    name: "ASUS ROG Swift PG32UQX",
    description: "32-inch 4K gaming monitor with 144Hz refresh rate and HDR support. Perfect for professional gaming and content creation with exceptional color accuracy.",
    price: 2499,
    originalPrice: 2799,
    category: "monitors",
    brand: "ASUS",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 8,
    rating: 4.8,
    reviews: 45,
    features: JSON.stringify(["4K UHD", "144Hz", "HDR1000", "G-Sync", "IPS Panel"]),
    specifications: {
      "Screen Size": "32 inches",
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "144Hz",
      "Response Time": "1ms GtG",
      "Panel Type": "IPS",
      "HDR": "HDR1000",
      "Adaptive Sync": "NVIDIA G-Sync Ultimate",
      "Connectivity": "DisplayPort 1.4, HDMI 2.1, USB-C",
      "Color Gamut": "99% DCI-P3",
      "Brightness": "1000 nits",
      "Contrast": "1000:1",
      "Viewing Angle": "178°"
    },
    isActive: true,
    isFeatured: true,
    discount: 11
  },
  {
    name: "LG UltraGear 27GN950-B",
    description: "27-inch 4K gaming monitor with 144Hz refresh rate and Nano IPS technology. Delivers stunning visuals with fast response times for competitive gaming.",
    price: 899,
    originalPrice: 1099,
    category: "monitors",
    brand: "LG",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 15,
    rating: 4.7,
    reviews: 89,
    features: JSON.stringify(["4K UHD", "144Hz", "Nano IPS", "G-Sync Compatible", "HDR600"]),
    specifications: {
      "Screen Size": "27 inches",
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "144Hz",
      "Response Time": "1ms GtG",
      "Panel Type": "Nano IPS",
      "HDR": "HDR600",
      "Adaptive Sync": "G-Sync Compatible",
      "Connectivity": "DisplayPort 1.4, HDMI 2.1",
      "Color Gamut": "98% DCI-P3",
      "Brightness": "600 nits"
    },
    isActive: true,
    isFeatured: true,
    discount: 18
  },
  {
    name: "Samsung Odyssey G7 32-inch",
    description: "32-inch curved gaming monitor with 240Hz refresh rate and QHD resolution. Perfect for immersive gaming with excellent contrast and color reproduction.",
    price: 699,
    originalPrice: 799,
    category: "monitors",
    brand: "Samsung",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 12,
    rating: 4.6,
    reviews: 67,
    features: JSON.stringify(["QHD", "240Hz", "1000R Curved", "G-Sync Compatible", "HDR600"]),
    specifications: {
      "Screen Size": "32 inches",
      "Resolution": "2560 x 1440 (QHD)",
      "Refresh Rate": "240Hz",
      "Response Time": "1ms GtG",
      "Panel Type": "VA",
      "Curvature": "1000R",
      "HDR": "HDR600",
      "Adaptive Sync": "G-Sync Compatible",
      "Connectivity": "DisplayPort 1.4, HDMI 2.0",
      "Color Gamut": "125% sRGB"
    },
    isActive: true,
    isFeatured: false,
    discount: 13
  },
  {
    name: "Dell UltraSharp U2723QE",
    description: "27-inch 4K professional monitor with excellent color accuracy and USB-C connectivity. Perfect for content creators and professionals who need precise color reproduction.",
    price: 649,
    originalPrice: 749,
    category: "monitors",
    brand: "Dell",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 20,
    rating: 4.8,
    reviews: 124,
    features: JSON.stringify(["4K UHD", "IPS Black", "USB-C", "99% sRGB", "HDR400"]),
    specifications: {
      "Screen Size": "27 inches",
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "60Hz",
      "Response Time": "5ms GtG",
      "Panel Type": "IPS Black",
      "HDR": "HDR400",
      "Connectivity": "USB-C, DisplayPort, HDMI",
      "Color Gamut": "99% sRGB, 95% DCI-P3",
      "Brightness": "400 nits"
    },
    isActive: true,
    isFeatured: false,
    discount: 13
  },

  // Peripherals
  {
    name: "Corsair K95 RGB Platinum XT",
    description: "Premium mechanical gaming keyboard with Cherry MX switches, RGB lighting, and dedicated macro keys. Perfect for gamers and power users who demand the best.",
    price: 199,
    originalPrice: 229,
    category: "peripherals",
    brand: "Corsair",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 25,
    rating: 4.7,
    reviews: 156,
    features: JSON.stringify(["Cherry MX Speed", "RGB Lighting", "6 Macro Keys", "Volume Wheel", "USB Passthrough"]),
    specifications: {
      "Switch Type": "Cherry MX Speed Silver",
      "Layout": "Full-size (104 keys)",
      "Backlighting": "Per-key RGB",
      "Macro Keys": "6 dedicated macro keys",
      "Connectivity": "USB 2.0",
      "Cable": "Detachable USB-C",
      "Dimensions": "472 x 164 x 36 mm",
      "Weight": "1.2 kg",
      "Compatibility": "Windows, macOS, Linux"
    },
    isActive: true,
    isFeatured: true,
    discount: 13
  },
  {
    name: "Logitech MX Master 3S",
    description: "Advanced wireless mouse with precision tracking, ergonomic design, and multi-device connectivity. Perfect for professionals and power users.",
    price: 99,
    originalPrice: 119,
    category: "peripherals",
    brand: "Logitech",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 30,
    rating: 4.8,
    reviews: 234,
    features: JSON.stringify(["8000 DPI", "70-day Battery", "Multi-device", "Ergonomic", "Silent Clicks"]),
    specifications: {
      "Sensor": "Darkfield 8000 DPI",
      "Connectivity": "Bluetooth, USB receiver",
      "Battery Life": "70 days",
      "Charging": "USB-C",
      "Buttons": "7 programmable buttons",
      "Scroll": "MagSpeed electromagnetic",
      "Compatibility": "Windows, macOS, Linux, iPad",
      "Dimensions": "126 x 84 x 51 mm",
      "Weight": "141g"
    },
    isActive: true,
    isFeatured: true,
    discount: 17
  },
  {
    name: "SteelSeries Arctis Pro Wireless",
    description: "Premium wireless gaming headset with dual wireless connectivity, swappable batteries, and exceptional audio quality. Perfect for competitive gaming.",
    price: 329,
    originalPrice: 379,
    category: "peripherals",
    brand: "SteelSeries",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 18,
    rating: 4.6,
    reviews: 89,
    features: JSON.stringify(["Dual Wireless", "Swappable Battery", "DTS Headphone:X", "ClearCast Mic", "OLED Base Station"]),
    specifications: {
      "Driver Size": "40mm neodymium",
      "Frequency Response": "10-40000 Hz",
      "Impedance": "32 Ohm",
      "Connectivity": "2.4GHz wireless, Bluetooth",
      "Battery Life": "20+ hours",
      "Microphone": "Bidirectional, noise-canceling",
      "Compatibility": "PC, PS4, PS5, Switch, Mobile",
      "Weight": "370g"
    },
    isActive: true,
    isFeatured: false,
    discount: 13
  },
  {
    name: "Razer DeathAdder V3 Pro",
    description: "Ultra-lightweight wireless gaming mouse with 30K DPI sensor and 90-hour battery life. Perfect for competitive gaming and esports.",
    price: 149,
    originalPrice: 169,
    category: "peripherals",
    brand: "Razer",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 22,
    rating: 4.7,
    reviews: 112,
    features: JSON.stringify(["30K DPI", "90h Battery", "Ultra-lightweight", "Gen-3 Optical Switches", "USB-C"]),
    specifications: {
      "Sensor": "Focus Pro 30K DPI",
      "Connectivity": "Razer HyperSpeed Wireless, USB-C",
      "Battery Life": "90 hours",
      "Weight": "63g",
      "Switches": "Gen-3 Optical",
      "Polling Rate": "1000Hz",
      "Acceleration": "750 IPS",
      "Compatibility": "Windows, macOS"
    },
    isActive: true,
    isFeatured: false,
    discount: 12
  },

  // Storage
  {
    name: "Samsung 980 PRO 2TB NVMe SSD",
    description: "High-performance NVMe SSD with PCIe 4.0 support and exceptional read/write speeds. Perfect for gaming, content creation, and professional workloads.",
    price: 199,
    originalPrice: 249,
    category: "storage",
    brand: "Samsung",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 35,
    rating: 4.9,
    reviews: 278,
    features: JSON.stringify(["PCIe 4.0", "7000 MB/s Read", "5000 MB/s Write", "2TB Capacity", "5-year Warranty"]),
    specifications: {
      "Capacity": "2TB",
      "Interface": "PCIe 4.0 x4 NVMe",
      "Sequential Read": "7000 MB/s",
      "Sequential Write": "5000 MB/s",
      "Random Read": "1000K IOPS",
      "Random Write": "1000K IOPS",
      "Form Factor": "M.2 2280",
      "NAND Type": "Samsung V-NAND 3-bit MLC",
      "Controller": "Samsung Elpis",
      "Warranty": "5 years",
      "TBW": "1200 TBW"
    },
    isActive: true,
    isFeatured: true,
    discount: 20
  },
  {
    name: "WD Black SN850X 1TB NVMe SSD",
    description: "Next-generation NVMe SSD with PCIe 4.0 support and gaming-optimized performance. Perfect for gamers and content creators who need fast storage.",
    price: 129,
    originalPrice: 159,
    category: "storage",
    brand: "WD",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 28,
    rating: 4.8,
    reviews: 145,
    features: JSON.stringify(["PCIe 4.0", "7300 MB/s Read", "6300 MB/s Write", "Gaming Mode", "WD Dashboard"]),
    specifications: {
      "Capacity": "1TB",
      "Interface": "PCIe 4.0 x4 NVMe",
      "Sequential Read": "7300 MB/s",
      "Sequential Write": "6300 MB/s",
      "Random Read": "800K IOPS",
      "Random Write": "1100K IOPS",
      "Form Factor": "M.2 2280",
      "NAND Type": "3D TLC NAND",
      "Controller": "WD_BLACK G2",
      "Warranty": "5 years",
      "TBW": "600 TBW"
    },
    isActive: true,
    isFeatured: true,
    discount: 19
  },
  {
    name: "Seagate BarraCuda 4TB HDD",
    description: "High-capacity internal hard drive with 7200 RPM speed and reliable performance. Perfect for bulk storage, backups, and media libraries.",
    price: 89,
    originalPrice: 109,
    category: "storage",
    brand: "Seagate",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 40,
    rating: 4.5,
    reviews: 89,
    features: JSON.stringify(["4TB Capacity", "7200 RPM", "SATA 6Gb/s", "64MB Cache", "2-year Warranty"]),
    specifications: {
      "Capacity": "4TB",
      "Interface": "SATA 6Gb/s",
      "RPM": "7200 RPM",
      "Cache": "64MB",
      "Form Factor": "3.5-inch",
      "Data Transfer Rate": "210 MB/s",
      "Power Consumption": "6.8W (active)",
      "Warranty": "2 years",
      "MTBF": "1,000,000 hours"
    },
    isActive: true,
    isFeatured: false,
    discount: 18
  },
  {
    name: "Crucial MX4 2TB SATA SSD",
    description: "Reliable SATA SSD with excellent performance and endurance. Perfect for upgrading older systems or adding fast storage to any computer.",
    price: 149,
    originalPrice: 179,
    category: "storage",
    brand: "Crucial",
    image: "/api/placeholder/400/300",
    images: JSON.stringify([
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ]),
    inStock: true,
    stock: 32,
    rating: 4.7,
    reviews: 167,
    features: JSON.stringify(["2TB Capacity", "560 MB/s Read", "510 MB/s Write", "SATA III", "5-year Warranty"]),
    specifications: {
      "Capacity": "2TB",
      "Interface": "SATA 6Gb/s",
      "Sequential Read": "560 MB/s",
      "Sequential Write": "510 MB/s",
      "Random Read": "95K IOPS",
      "Random Write": "90K IOPS",
      "Form Factor": "2.5-inch",
      "NAND Type": "Micron 3D TLC NAND",
      "Controller": "SMI SM2258",
      "Warranty": "5 years",
      "TBW": "700 TBW"
    },
    isActive: true,
    isFeatured: false,
    discount: 17
  }
]

async function main() {
  console.log('Starting to seed additional products...')
  
  try {
    // Create additional products
    for (const product of additionalProducts) {
      await prisma.product.create({
        data: product
      })
    }
    
    console.log(`Successfully created ${additionalProducts.length} additional products`)
    
    // Update category counts
    const monitors = await prisma.product.count({ where: { category: 'monitors' } })
    const peripherals = await prisma.product.count({ where: { category: 'peripherals' } })
    const storage = await prisma.product.count({ where: { category: 'storage' } })
    
    console.log(`Category counts updated:`)
    console.log(`- Monitors: ${monitors} products`)
    console.log(`- Peripherals: ${peripherals} products`)
    console.log(`- Storage: ${storage} products`)
    
  } catch (error) {
    console.error('Error seeding additional products:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
