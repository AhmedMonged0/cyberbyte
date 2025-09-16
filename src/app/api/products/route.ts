import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// GET - Get all products (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const featured = searchParams.get('featured') === 'true'
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isActive: true // Only show active products
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (category) {
      where.category = category
    }
    
    if (featured) {
      where.isFeatured = true
    }

    // Build orderBy clause
    const orderBy: any = {}
    if (sortBy === 'price') {
      orderBy.price = sortOrder
    } else if (sortBy === 'rating') {
      orderBy.rating = sortOrder
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    // Mock data for now to test the frontend
    const mockProducts = [
      // Monitors
      {
        id: '1',
        name: 'ASUS ROG Swift PG32UQX',
        description: '32-inch 4K gaming monitor with 144Hz refresh rate and HDR support',
        price: 2499,
        originalPrice: 2799,
        category: 'monitors',
        brand: 'ASUS',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 8,
        rating: 4.8,
        reviews: 45,
        features: ['4K UHD', '144Hz', 'HDR1000', 'G-Sync', 'IPS Panel'],
        specifications: { 'Screen Size': '32 inches', Resolution: '3840 x 2160' },
        isFeatured: true,
        discount: 11,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'LG UltraGear 27GN950-B',
        description: '27-inch 4K gaming monitor with 144Hz refresh rate',
        price: 899,
        originalPrice: 999,
        category: 'monitors',
        brand: 'LG',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 12,
        rating: 4.7,
        reviews: 38,
        features: ['4K UHD', '144Hz', 'Nano IPS', 'G-Sync Compatible'],
        specifications: { 'Screen Size': '27 inches', Resolution: '3840 x 2160' },
        isFeatured: true,
        discount: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Samsung Odyssey G7 32-inch',
        description: '32-inch QHD gaming monitor with 240Hz refresh rate',
        price: 699,
        originalPrice: 799,
        category: 'monitors',
        brand: 'Samsung',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 15,
        rating: 4.6,
        reviews: 52,
        features: ['QHD', '240Hz', 'VA Panel', 'G-Sync Compatible'],
        specifications: { 'Screen Size': '32 inches', Resolution: '2560 x 1440' },
        isFeatured: false,
        discount: 13,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // Laptops
      {
        id: '4',
        name: 'Alienware X17 R2 Gaming Laptop',
        description: 'High-performance gaming laptop with RTX 4080 and 17.3-inch display',
        price: 2999,
        originalPrice: 3299,
        category: 'laptops',
        brand: 'Alienware',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 5,
        rating: 4.9,
        reviews: 28,
        features: ['RTX 4080', 'Intel i9', '32GB RAM', '1TB SSD', '17.3" 4K'],
        specifications: { 'GPU': 'RTX 4080', 'CPU': 'Intel i9-12900H', 'RAM': '32GB' },
        isFeatured: true,
        discount: 9,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'MacBook Pro 16-inch M2 Max',
        description: 'Apple MacBook Pro with M2 Max chip and 16-inch Liquid Retina XDR display',
        price: 3499,
        originalPrice: 3699,
        category: 'laptops',
        brand: 'Apple',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 7,
        rating: 4.8,
        reviews: 156,
        features: ['M2 Max', '32GB RAM', '1TB SSD', '16" XDR Display', 'macOS'],
        specifications: { 'Chip': 'M2 Max', 'RAM': '32GB', 'Storage': '1TB SSD' },
        isFeatured: true,
        discount: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // Peripherals
      {
        id: '6',
        name: 'Corsair K95 RGB Keyboard',
        description: 'Mechanical gaming keyboard with Cherry MX switches and RGB lighting',
        price: 199,
        originalPrice: 249,
        category: 'peripherals',
        brand: 'Corsair',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 25,
        rating: 4.7,
        reviews: 89,
        features: ['Cherry MX', 'RGB Lighting', 'Macro Keys', 'USB Passthrough'],
        specifications: { 'Switches': 'Cherry MX Speed', 'Backlighting': 'RGB', 'Connectivity': 'USB' },
        isFeatured: false,
        discount: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Logitech MX Master 3S',
        description: 'Wireless mouse with precision tracking and ergonomic design',
        price: 99,
        originalPrice: 119,
        category: 'peripherals',
        brand: 'Logitech',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 30,
        rating: 4.6,
        reviews: 234,
        features: ['Wireless', 'Precision Tracking', 'Ergonomic', 'Multi-Device'],
        specifications: { 'Connectivity': 'Wireless', 'DPI': '8000', 'Battery': '70 days' },
        isFeatured: false,
        discount: 17,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // Storage
      {
        id: '8',
        name: 'Samsung 980 PRO 2TB NVMe SSD',
        description: 'High-speed NVMe SSD with PCIe 4.0 support for gaming and content creation',
        price: 299,
        originalPrice: 399,
        category: 'storage',
        brand: 'Samsung',
        image: '/api/placeholder/400/300',
        images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        inStock: true,
        stock: 18,
        rating: 4.8,
        reviews: 67,
        features: ['PCIe 4.0', '7000 MB/s', '2TB Capacity', '5-year Warranty'],
        specifications: { 'Capacity': '2TB', 'Interface': 'PCIe 4.0', 'Speed': '7000 MB/s' },
        isFeatured: true,
        discount: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Filter products based on category
    let filteredProducts = mockProducts;
    if (category) {
      filteredProducts = mockProducts.filter(product => product.category === category);
    }
    
    // Filter products based on featured
    if (featured) {
      filteredProducts = filteredProducts.filter(product => product.isFeatured === true);
    }
    
    // Apply pagination
    const startIndex = skip;
    const endIndex = startIndex + limit;
    const products = filteredProducts.slice(startIndex, endIndex);
    const totalProducts = filteredProducts.length;

    // No need to parse JSON fields since we're using mock data
    const processedProducts = products

    const totalPages = Math.ceil(totalProducts / limit)

    return NextResponse.json({
      products: processedProducts,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('Get products error:', error)
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
