const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  // ===== LAPTOPS =====
  {
    name: 'MacBook Pro 16-inch M2 Max',
    description: 'Apple MacBook Pro with M2 Max chip, 32GB unified memory, and 1TB SSD storage. Perfect for professional work and creative projects.',
    price: 3499,
    originalPrice: 3699,
    category: 'laptops',
    brand: 'Apple',
    image: '/images/products/laptops/macbook-pro-16.jpg',
    images: JSON.stringify([
      '/images/products/laptops/macbook-pro-16.jpg',
      '/images/products/laptops/macbook-pro-16-2.jpg',
      '/images/products/laptops/macbook-pro-16-3.jpg'
    ]),
    inStock: true,
    stock: 8,
    rating: 4.8,
    reviews: 156,
    features: JSON.stringify([
      'M2 Max Chip',
      '32GB Unified Memory',
      '1TB SSD Storage',
      '16-inch Liquid Retina XDR Display',
      'macOS Ventura',
      'Up to 22 hours battery life'
    ]),
    specifications: {
      processor: 'Apple M2 Max',
      memory: '32GB Unified Memory',
      storage: '1TB SSD',
      display: '16.2-inch Liquid Retina XDR',
      resolution: '3456 x 2234',
      graphics: '32-core GPU',
      weight: '2.15 kg',
      battery: 'Up to 22 hours',
      ports: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3'
    },
    isActive: true,
    isFeatured: true,
    discount: 5
  },
  {
    name: 'Alienware X17 R2 Gaming Laptop',
    description: 'Ultimate gaming laptop with RTX 4080, Intel i9-12900H, 32GB RAM, and 1TB SSD. Perfect for gaming and content creation.',
    price: 2999,
    originalPrice: 3299,
    category: 'laptops',
    brand: 'Alienware',
    image: '/images/products/laptops/alienware-x17-r2.jpg',
    images: JSON.stringify([
      '/images/products/laptops/alienware-x17-r2.jpg',
      '/images/products/laptops/alienware-x17-r2-2.jpg',
      '/images/products/laptops/alienware-x17-r2-3.jpg'
    ]),
    inStock: true,
    stock: 5,
    rating: 4.9,
    reviews: 127,
    features: JSON.stringify([
      'RTX 4080 Graphics',
      'Intel i9-12900H Processor',
      '32GB DDR5 RAM',
      '1TB NVMe SSD',
      '17.3" 4K Display',
      'AlienFX RGB Lighting'
    ]),
    specifications: {
      processor: 'Intel Core i9-12900H',
      graphics: 'NVIDIA GeForce RTX 4080',
      memory: '32GB DDR5-4800',
      storage: '1TB NVMe SSD',
      display: '17.3" 4K UHD (3840x2160)',
      refresh_rate: '120Hz',
      weight: '3.2 kg',
      battery: '87Wh',
      ports: '3x USB-A, 1x USB-C, HDMI 2.1, Mini DisplayPort'
    },
    isActive: true,
    isFeatured: true,
    discount: 9
  },
  {
    name: 'ASUS ROG Strix G15',
    description: 'High-performance gaming laptop with RTX 4070, AMD Ryzen 9 7940HS, 16GB RAM, and 512GB SSD.',
    price: 1899,
    originalPrice: 2199,
    category: 'laptops',
    brand: 'ASUS',
    image: '/images/products/laptops/asus-rog-strix-g15.jpg',
    images: JSON.stringify([
      '/images/products/laptops/asus-rog-strix-g15.jpg',
      '/images/products/laptops/asus-rog-strix-g15-2.jpg'
    ]),
    inStock: true,
    stock: 12,
    rating: 4.7,
    reviews: 89,
    features: JSON.stringify([
      'RTX 4070 Graphics',
      'AMD Ryzen 9 7940HS',
      '16GB DDR5 RAM',
      '512GB NVMe SSD',
      '15.6" FHD Display',
      'ROG Intelligent Cooling'
    ]),
    specifications: {
      processor: 'AMD Ryzen 9 7940HS',
      graphics: 'NVIDIA GeForce RTX 4070',
      memory: '16GB DDR5-4800',
      storage: '512GB NVMe SSD',
      display: '15.6" FHD (1920x1080)',
      refresh_rate: '165Hz',
      weight: '2.3 kg',
      battery: '90Wh',
      ports: '3x USB-A, 1x USB-C, HDMI 2.1, RJ45'
    },
    isActive: true,
    isFeatured: false,
    discount: 14
  },

  // ===== MONITORS =====
  {
    name: 'Samsung Odyssey G7 32-inch',
    description: '32-inch QHD gaming monitor with 240Hz refresh rate, 1ms response time, and HDR support.',
    price: 699,
    originalPrice: 799,
    category: 'monitors',
    brand: 'Samsung',
    image: '/api/placeholder/400/300',
    images: JSON.stringify([
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]),
    inStock: true,
    stock: 15,
    rating: 4.6,
    reviews: 52,
    features: JSON.stringify([
      '32-inch QHD Display',
      '240Hz Refresh Rate',
      '1ms Response Time',
      'HDR Support',
      'G-Sync Compatible',
      'Curved Design'
    ]),
    specifications: {
      screen_size: '32 inches',
      resolution: '2560 x 1440 (QHD)',
      refresh_rate: '240Hz',
      response_time: '1ms GtG',
      panel_type: 'VA',
      brightness: '600 cd/m²',
      contrast: '2500:1',
      ports: '2x HDMI 2.0, 1x DisplayPort 1.4, 2x USB 3.0'
    },
    isActive: true,
    isFeatured: true,
    discount: 13
  },
  {
    name: 'LG UltraGear 27GN950-B',
    description: '27-inch 4K gaming monitor with 144Hz refresh rate, Nano IPS technology, and G-Sync compatibility.',
    price: 899,
    originalPrice: 999,
    category: 'monitors',
    brand: 'LG',
    image: '/api/placeholder/400/300',
    images: JSON.stringify([
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]),
    inStock: true,
    stock: 12,
    rating: 4.7,
    reviews: 38,
    features: JSON.stringify([
      '27-inch 4K Display',
      '144Hz Refresh Rate',
      'Nano IPS Technology',
      'G-Sync Compatible',
      'HDR600 Support',
      '1ms Response Time'
    ]),
    specifications: {
      screen_size: '27 inches',
      resolution: '3840 x 2160 (4K)',
      refresh_rate: '144Hz',
      response_time: '1ms GtG',
      panel_type: 'Nano IPS',
      brightness: '600 cd/m²',
      contrast: '1000:1',
      ports: '2x HDMI 2.1, 1x DisplayPort 1.4, 2x USB 3.0'
    },
    isActive: true,
    isFeatured: true,
    discount: 10
  },

  // ===== KEYBOARDS =====
  {
    name: 'Corsair K95 RGB Platinum XT',
    description: 'Mechanical gaming keyboard with Cherry MX switches, RGB lighting, and macro keys.',
    price: 199,
    originalPrice: 249,
    category: 'peripherals',
    brand: 'Corsair',
    image: '/api/placeholder/400/300',
    images: JSON.stringify([
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]),
    inStock: true,
    stock: 25,
    rating: 4.7,
    reviews: 89,
    features: JSON.stringify([
      'Cherry MX Speed Switches',
      'RGB Backlighting',
      '6 Macro Keys',
      'USB Passthrough',
      'Aluminum Frame',
      'Programmable Keys'
    ]),
    specifications: {
      switches: 'Cherry MX Speed',
      backlighting: 'RGB per-key',
      macro_keys: '6 dedicated',
      connectivity: 'USB 2.0',
      cable: 'Detachable USB-C',
      dimensions: '472 x 165 x 36 mm',
      weight: '1.2 kg'
    },
    isActive: true,
    isFeatured: false,
    discount: 20
  },

  // ===== MICE =====
  {
    name: 'Logitech MX Master 3S',
    description: 'Wireless mouse with precision tracking, ergonomic design, and multi-device connectivity.',
    price: 99,
    originalPrice: 119,
    category: 'peripherals',
    brand: 'Logitech',
    image: '/api/placeholder/400/300',
    images: JSON.stringify([
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]),
    inStock: true,
    stock: 30,
    rating: 4.6,
    reviews: 234,
    features: JSON.stringify([
      'Wireless Connectivity',
      'Precision Tracking',
      'Ergonomic Design',
      'Multi-Device Support',
      '70-Day Battery Life',
      'Quiet Clicks'
    ]),
    specifications: {
      connectivity: 'Wireless (USB receiver + Bluetooth)',
      dpi: '8000 DPI',
      battery_life: '70 days',
      buttons: '7 programmable',
      scroll: 'MagSpeed electromagnetic',
      weight: '141g',
      dimensions: '126 x 84 x 51 mm'
    },
    isActive: true,
    isFeatured: true,
    discount: 17
  },

  // ===== STORAGE =====
  {
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    description: 'High-speed NVMe SSD with PCIe 4.0 support for gaming and content creation.',
    price: 299,
    originalPrice: 399,
    category: 'storage',
    brand: 'Samsung',
    image: '/api/placeholder/400/300',
    images: JSON.stringify([
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ]),
    inStock: true,
    stock: 18,
    rating: 4.8,
    reviews: 67,
    features: JSON.stringify([
      'PCIe 4.0 Interface',
      '7000 MB/s Read Speed',
      '2TB Capacity',
      '5-Year Warranty',
      'M.2 Form Factor',
      'Samsung V-NAND'
    ]),
    specifications: {
      capacity: '2TB',
      interface: 'PCIe 4.0 x4',
      read_speed: '7000 MB/s',
      write_speed: '5000 MB/s',
      form_factor: 'M.2 2280',
      warranty: '5 years',
      endurance: '1200 TBW'
    },
    isActive: true,
    isFeatured: true,
    discount: 25
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Starting to seed clean products...');
    
    // Clear existing products
    console.log('🧹 Clearing existing products...');
    await prisma.product.deleteMany({});
    console.log('✅ Cleared existing products');
    
    // Create new products
    console.log('📦 Creating products...');
    for (const product of products) {
      await prisma.product.create({
        data: product
      });
    }
    
    console.log(`✅ Successfully created ${products.length} products`);
    
    // Show summary
    const laptops = products.filter(p => p.category === 'laptops').length;
    const monitors = products.filter(p => p.category === 'monitors').length;
    const peripherals = products.filter(p => p.category === 'peripherals').length;
    const storage = products.filter(p => p.category === 'storage').length;
    const featured = products.filter(p => p.isFeatured).length;
    
    console.log('\n📊 Products by category:');
    console.log(`💻 Laptops: ${laptops}`);
    console.log(`🖥️ Monitors: ${monitors}`);
    console.log(`⌨️ Peripherals: ${peripherals}`);
    console.log(`💾 Storage: ${storage}`);
    console.log(`⭐ Featured: ${featured}`);
    console.log(`📦 Total: ${products.length}`);
    
    console.log('\n🎉 Clean products seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();

