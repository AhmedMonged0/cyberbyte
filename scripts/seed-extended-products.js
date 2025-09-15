const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  // ===== LAPTOPS =====
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
    name: 'Dell XPS 15 OLED',
    description: 'Premium ultrabook with 4K OLED display, Intel i7-12700H, 16GB RAM, and 512GB SSD. Perfect for creative professionals.',
    price: 1799,
    originalPrice: 1999,
    category: 'laptops',
    brand: 'Dell',
    image: '/images/products/laptops/dell-xps-15.jpg',
    images: JSON.stringify([
      '/images/products/laptops/dell-xps-15.jpg',
      '/images/products/laptops/dell-xps-15-2.jpg'
    ]),
    inStock: true,
    stock: 6,
    rating: 4.7,
    reviews: 98,
    features: JSON.stringify(['4K OLED Display', 'Intel i7-12700H', '16GB RAM', '512GB SSD', 'RTX 4050']),
    specifications: {
      processor: 'Intel Core i7-12700H',
      graphics: 'NVIDIA GeForce RTX 4050',
      memory: '16GB DDR5',
      storage: '512GB NVMe SSD',
      display: '15.6" 4K OLED (3840x2160)',
      weight: '1.8 kg'
    },
    isActive: true,
    isFeatured: false,
    discount: 10
  },
  {
    name: 'Razer Blade 15 Advanced',
    description: 'Sleek gaming laptop with RTX 4060, Intel i7-13620H, 16GB RAM, and 1TB SSD. Perfect for gaming on the go.',
    price: 2199,
    originalPrice: 2499,
    category: 'laptops',
    brand: 'Razer',
    image: '/images/products/laptops/razer-blade-15.jpg',
    images: JSON.stringify([
      '/images/products/laptops/razer-blade-15.jpg',
      '/images/products/laptops/razer-blade-15-2.jpg'
    ]),
    inStock: true,
    stock: 4,
    rating: 4.5,
    reviews: 76,
    features: JSON.stringify(['RTX 4060', 'Intel i7-13620H', '16GB RAM', '1TB SSD', '15.6" QHD 240Hz']),
    specifications: {
      processor: 'Intel Core i7-13620H',
      graphics: 'NVIDIA GeForce RTX 4060',
      memory: '16GB DDR5',
      storage: '1TB NVMe SSD',
      display: '15.6" QHD (2560x1440) 240Hz',
      weight: '2.0 kg'
    },
    isActive: true,
    isFeatured: false,
    discount: 12
  },
  {
    name: 'MSI GE76 Raider',
    description: 'Powerful gaming laptop with RTX 4070, Intel i7-12700H, 32GB RAM, and 1TB SSD. Built for serious gamers.',
    price: 2499,
    originalPrice: 2799,
    category: 'laptops',
    brand: 'MSI',
    image: '/images/products/laptops/msi-ge76-raider.jpg',
    images: JSON.stringify([
      '/images/products/laptops/msi-ge76-raider.jpg',
      '/images/products/laptops/msi-ge76-raider-2.jpg'
    ]),
    inStock: true,
    stock: 7,
    rating: 4.6,
    reviews: 112,
    features: JSON.stringify(['RTX 4070', 'Intel i7-12700H', '32GB RAM', '1TB SSD', '17.3" FHD 360Hz']),
    specifications: {
      processor: 'Intel Core i7-12700H',
      graphics: 'NVIDIA GeForce RTX 4070',
      memory: '32GB DDR5',
      storage: '1TB NVMe SSD',
      display: '17.3" FHD (1920x1080) 360Hz',
      weight: '2.9 kg'
    },
    isActive: true,
    isFeatured: false,
    discount: 11
  },

  // ===== ACCESSORIES =====
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
    isFeatured: true,
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
    isFeatured: true,
    discount: 17
  },
  {
    name: 'SteelSeries Arctis 7P+ Wireless Headset',
    description: 'Premium wireless gaming headset with 30-hour battery life, 7.1 surround sound, and crystal clear microphone.',
    price: 179,
    originalPrice: 199,
    category: 'accessories',
    brand: 'SteelSeries',
    image: '/images/products/accessories/steelseries-arctis-7p.jpg',
    images: JSON.stringify([
      '/images/products/accessories/steelseries-arctis-7p.jpg',
      '/images/products/accessories/steelseries-arctis-7p-2.jpg'
    ]),
    inStock: true,
    stock: 12,
    rating: 4.6,
    reviews: 156,
    features: JSON.stringify(['Wireless', '30-hour Battery', '7.1 Surround', 'Noise Cancelling Mic', 'Comfortable']),
    specifications: {
      connectivity: 'Wireless 2.4GHz',
      battery: '30 hours',
      frequency: '20-20000 Hz',
      impedance: '32 Ohm',
      weight: '350 g'
    },
    isActive: true,
    isFeatured: false,
    discount: 10
  },
  {
    name: 'Samsung 49" Odyssey G9 Gaming Monitor',
    description: 'Ultra-wide curved gaming monitor with 240Hz refresh rate, QHD resolution, and HDR1000 support.',
    price: 899,
    originalPrice: 1099,
    category: 'accessories',
    brand: 'Samsung',
    image: '/images/products/accessories/samsung-odyssey-g9.jpg',
    images: JSON.stringify([
      '/images/products/accessories/samsung-odyssey-g9.jpg',
      '/images/products/accessories/samsung-odyssey-g9-2.jpg'
    ]),
    inStock: true,
    stock: 3,
    rating: 4.9,
    reviews: 87,
    features: JSON.stringify(['49" Ultra-wide', '240Hz Refresh', 'QHD Resolution', 'HDR1000', '1000R Curvature']),
    specifications: {
      size: '49 inches',
      resolution: '5120x1440 QHD',
      refreshRate: '240Hz',
      responseTime: '1ms',
      curvature: '1000R'
    },
    isActive: true,
    isFeatured: false,
    discount: 18
  },
  {
    name: 'HyperX Alloy FPS Pro Mechanical Keyboard',
    description: 'Compact mechanical keyboard with Cherry MX Blue switches, red LED backlighting, and anti-ghosting technology.',
    price: 79,
    originalPrice: 99,
    category: 'accessories',
    brand: 'HyperX',
    image: '/images/products/accessories/hyperx-alloy-fps-pro.jpg',
    images: JSON.stringify([
      '/images/products/accessories/hyperx-alloy-fps-pro.jpg',
      '/images/products/accessories/hyperx-alloy-fps-pro-2.jpg'
    ]),
    inStock: true,
    stock: 18,
    rating: 4.4,
    reviews: 203,
    features: JSON.stringify(['Cherry MX Blue', 'Red LED', 'Anti-ghosting', 'Compact Design', 'Gaming Optimized']),
    specifications: {
      switches: 'Cherry MX Blue',
      lighting: 'Red LED',
      connectivity: 'USB 2.0',
      dimensions: '359 x 129 x 36 mm',
      weight: '0.8 kg'
    },
    isActive: true,
    isFeatured: false,
    discount: 20
  },

  // ===== COMPONENTS =====
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
    isFeatured: true,
    discount: 11
  },
  {
    name: 'NVIDIA RTX 4090',
    description: 'Flagship graphics card with 24GB GDDR6X memory, 16384 CUDA cores, and 4K gaming performance.',
    price: 1599,
    originalPrice: 1799,
    category: 'components',
    brand: 'NVIDIA',
    image: '/images/products/components/nvidia-rtx-4090.jpg',
    images: JSON.stringify([
      '/images/products/components/nvidia-rtx-4090.jpg',
      '/images/products/components/nvidia-rtx-4090-2.jpg'
    ]),
    inStock: true,
    stock: 5,
    rating: 4.8,
    reviews: 145,
    features: JSON.stringify(['24GB GDDR6X', '16384 CUDA Cores', '4K Gaming', 'Ray Tracing', 'DLSS 3']),
    specifications: {
      memory: '24GB GDDR6X',
      cudaCores: 16384,
      baseClock: '2230 MHz',
      boostClock: '2520 MHz',
      memoryBus: '384-bit',
      tdp: '450W'
    },
    isActive: true,
    isFeatured: true,
    discount: 11
  },
  {
    name: 'AMD Ryzen 9 7950X',
    description: 'High-end desktop processor with 16 cores, 32 threads, and boost up to 5.7GHz. Perfect for content creation.',
    price: 699,
    originalPrice: 799,
    category: 'components',
    brand: 'AMD',
    image: '/images/products/components/amd-ryzen-9-7950x.jpg',
    images: JSON.stringify([
      '/images/products/components/amd-ryzen-9-7950x.jpg',
      '/images/products/components/amd-ryzen-9-7950x-2.jpg'
    ]),
    inStock: true,
    stock: 8,
    rating: 4.7,
    reviews: 76,
    features: JSON.stringify(['16 Cores', '32 Threads', '5.7GHz Boost', 'AM5 Socket', 'DDR5 Support']),
    specifications: {
      cores: 16,
      threads: 32,
      baseClock: '4.5 GHz',
      boostClock: '5.7 GHz',
      socket: 'AM5',
      tdp: '170W'
    },
    isActive: true,
    isFeatured: false,
    discount: 13
  },
  {
    name: 'ASUS ROG Strix RTX 4080',
    description: 'High-performance graphics card with 16GB GDDR6X memory, advanced cooling, and RGB lighting.',
    price: 1199,
    originalPrice: 1299,
    category: 'components',
    brand: 'ASUS',
    image: '/images/products/components/asus-rog-strix-rtx-4080.jpg',
    images: JSON.stringify([
      '/images/products/components/asus-rog-strix-rtx-4080.jpg',
      '/images/products/components/asus-rog-strix-rtx-4080-2.jpg'
    ]),
    inStock: true,
    stock: 6,
    rating: 4.6,
    reviews: 89,
    features: JSON.stringify(['16GB GDDR6X', 'Advanced Cooling', 'RGB Lighting', '4K Gaming', 'Ray Tracing']),
    specifications: {
      memory: '16GB GDDR6X',
      cudaCores: 9728,
      baseClock: '2205 MHz',
      boostClock: '2505 MHz',
      memoryBus: '256-bit',
      tdp: '320W'
    },
    isActive: true,
    isFeatured: false,
    discount: 8
  },
  {
    name: 'Corsair Vengeance LPX 32GB DDR5-5600',
    description: 'High-performance memory kit with 32GB capacity, 5600MHz speed, and low-profile design.',
    price: 199,
    originalPrice: 249,
    category: 'components',
    brand: 'Corsair',
    image: '/images/products/components/corsair-vengeance-lpx-32gb.jpg',
    images: JSON.stringify([
      '/images/products/components/corsair-vengeance-lpx-32gb.jpg',
      '/images/products/components/corsair-vengeance-lpx-32gb-2.jpg'
    ]),
    inStock: true,
    stock: 25,
    rating: 4.5,
    reviews: 167,
    features: JSON.stringify(['32GB Capacity', '5600MHz Speed', 'DDR5', 'Low Profile', 'XMP Ready']),
    specifications: {
      capacity: '32GB (2x16GB)',
      speed: '5600MHz',
      type: 'DDR5',
      voltage: '1.25V',
      latency: 'CL36',
      formFactor: '288-pin DIMM'
    },
    isActive: true,
    isFeatured: false,
    discount: 20
  },
  {
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    description: 'Ultra-fast NVMe SSD with 2TB capacity, 7000MB/s read speed, and PCIe 4.0 interface.',
    price: 299,
    originalPrice: 399,
    category: 'components',
    brand: 'Samsung',
    image: '/images/products/components/samsung-980-pro-2tb.jpg',
    images: JSON.stringify([
      '/images/products/components/samsung-980-pro-2tb.jpg',
      '/images/products/components/samsung-980-pro-2tb-2.jpg'
    ]),
    inStock: true,
    stock: 15,
    rating: 4.8,
    reviews: 134,
    features: JSON.stringify(['2TB Capacity', '7000MB/s Read', 'PCIe 4.0', 'NVMe', '5-year Warranty']),
    specifications: {
      capacity: '2TB',
      interface: 'PCIe 4.0 x4 NVMe',
      readSpeed: '7000 MB/s',
      writeSpeed: '5100 MB/s',
      endurance: '1200 TBW',
      formFactor: 'M.2 2280'
    },
    isActive: true,
    isFeatured: false,
    discount: 25
  }
];

async function seedExtendedProducts() {
  try {
    console.log('🌱 Starting to seed extended products...');
    
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
    
    // Verify products by category
    const laptopCount = await prisma.product.count({
      where: { category: 'laptops' }
    });
    const accessoryCount = await prisma.product.count({
      where: { category: 'accessories' }
    });
    const componentCount = await prisma.product.count({
      where: { category: 'components' }
    });
    const featuredCount = await prisma.product.count({
      where: { isFeatured: true }
    });
    
    console.log('\n📊 Products by category:');
    console.log(`💻 Laptops: ${laptopCount}`);
    console.log(`🎮 Accessories: ${accessoryCount}`);
    console.log(`🔧 Components: ${componentCount}`);
    console.log(`⭐ Featured: ${featuredCount}`);
    console.log(`📦 Total: ${laptopCount + accessoryCount + componentCount}`);
    
  } catch (error) {
    console.error('❌ Error seeding extended products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  seedExtendedProducts()
    .then(() => {
      console.log('🎉 Extended products seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Extended products seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedExtendedProducts };
