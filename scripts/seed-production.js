const { PrismaClient } = require('@prisma/client');

// Use production schema
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

const products = [
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
    rating: 4.8,
    reviews: 127,
    features: JSON.stringify(['RTX 4080', 'Intel i9-12900H', '32GB RAM', '1TB SSD', '17.3" 4K Display']),
    specifications: {
      processor: 'Intel Core i9-12900H',
      graphics: 'NVIDIA GeForce RTX 4080',
      memory: '32GB DDR5',
      storage: '1TB NVMe SSD',
      display: '17.3" 4K UHD (3840x2160)',
      weight: '3.2 kg'
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
    stock: 8,
    rating: 4.6,
    reviews: 89,
    features: JSON.stringify(['RTX 4070', 'AMD Ryzen 9 7940HS', '16GB RAM', '512GB SSD', '15.6" FHD 300Hz']),
    specifications: {
      processor: 'AMD Ryzen 9 7940HS',
      graphics: 'NVIDIA GeForce RTX 4070',
      memory: '16GB DDR5',
      storage: '512GB NVMe SSD',
      display: '15.6" FHD (1920x1080) 300Hz',
      weight: '2.3 kg'
    },
    isActive: true,
    isFeatured: true,
    discount: 14
  },
  {
    name: 'MacBook Pro 16-inch M2 Max',
    description: 'Apple\'s most powerful laptop with M2 Max chip, 32GB unified memory, and 1TB SSD. Perfect for professionals.',
    price: 3499,
    originalPrice: 3699,
    category: 'laptops',
    brand: 'Apple',
    image: '/images/products/laptops/macbook-pro-16.jpg',
    images: JSON.stringify([
      '/images/products/laptops/macbook-pro-16.jpg',
      '/images/products/laptops/macbook-pro-16-2.jpg'
    ]),
    inStock: true,
    stock: 3,
    rating: 4.9,
    reviews: 156,
    features: JSON.stringify(['M2 Max Chip', '32GB Unified Memory', '1TB SSD', '16.2" Liquid Retina XDR', '22-hour battery']),
    specifications: {
      processor: 'Apple M2 Max',
      graphics: '38-core GPU',
      memory: '32GB unified memory',
      storage: '1TB SSD',
      display: '16.2" Liquid Retina XDR',
      weight: '2.1 kg'
    },
    isActive: true,
    isFeatured: true,
    discount: 5
  },
  {
    name: 'Corsair K95 RGB Keyboard',
    description: 'Premium mechanical gaming keyboard with Cherry MX Speed switches, RGB lighting, and programmable keys.',
    price: 199,
    originalPrice: 249,
    category: 'accessories',
    brand: 'Corsair',
    image: '/images/products/accessories/corsair-k95-rgb.jpg',
    images: JSON.stringify([
      '/images/products/accessories/corsair-k95-rgb.jpg',
      '/images/products/accessories/corsair-k95-rgb-2.jpg'
    ]),
    inStock: true,
    stock: 15,
    rating: 4.7,
    reviews: 234,
    features: JSON.stringify(['Cherry MX Speed', 'RGB Backlighting', '6 Programmable Keys', 'Aluminum Frame', 'USB Passthrough']),
    specifications: {
      switches: 'Cherry MX Speed',
      connectivity: 'USB 2.0',
      lighting: 'Per-key RGB',
      dimensions: '472 x 164 x 35 mm',
      weight: '1.2 kg'
    },
    isActive: true,
    isFeatured: false,
    discount: 20
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Advanced wireless mouse with precision tracking, ergonomic design, and multi-device connectivity.',
    price: 99,
    originalPrice: 119,
    category: 'accessories',
    brand: 'Logitech',
    image: '/images/products/accessories/logitech-mx-master-3s.jpg',
    images: JSON.stringify([
      '/images/products/accessories/logitech-mx-master-3s.jpg',
      '/images/products/accessories/logitech-mx-master-3s-2.jpg'
    ]),
    inStock: true,
    stock: 20,
    rating: 4.8,
    reviews: 189,
    features: JSON.stringify(['8000 DPI', '70-day Battery', 'Multi-device', 'Ergonomic Design', 'Quiet Clicks']),
    specifications: {
      sensor: 'Darkfield 8000 DPI',
      connectivity: 'Bluetooth, USB-C',
      battery: '70 days',
      dimensions: '126 x 84 x 51 mm',
      weight: '141 g'
    },
    isActive: true,
    isFeatured: false,
    discount: 17
  },
  {
    name: 'Intel Core i9-13900K',
    description: 'High-performance desktop processor with 24 cores, 32 threads, and boost up to 5.8GHz.',
    price: 589,
    originalPrice: 659,
    category: 'components',
    brand: 'Intel',
    image: '/images/products/components/intel-core-i9-13900k.jpg',
    images: JSON.stringify([
      '/images/products/components/intel-core-i9-13900k.jpg',
      '/images/products/components/intel-core-i9-13900k-2.jpg'
    ]),
    inStock: true,
    stock: 12,
    rating: 4.9,
    reviews: 98,
    features: JSON.stringify(['24 Cores', '32 Threads', '5.8GHz Boost', 'LGA 1700', 'DDR5 Support']),
    specifications: {
      cores: 24,
      threads: 32,
      baseClock: '3.0 GHz',
      boostClock: '5.8 GHz',
      socket: 'LGA 1700',
      tdp: '125W'
    },
    isActive: true,
    isFeatured: false,
    discount: 11
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting to seed production database...');
    
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
    
    // Verify products
    const count = await prisma.product.count();
    console.log(`📊 Total products in database: ${count}`);
    
    const featuredCount = await prisma.product.count({
      where: { isFeatured: true }
    });
    console.log(`⭐ Featured products: ${featuredCount}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Database seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
