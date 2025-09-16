import { NextRequest, NextResponse } from 'next/server'

// Mock products data (same as main products API)
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
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
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
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  // Add more products as needed...
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    console.log('📦 Admin products request:', { search, category, page, limit })

    // Filter products based on search and category
    let filteredProducts = mockProducts
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      )
    }

    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category)
    }

    // Sort by creation date (newest first)
    filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const products = filteredProducts.slice(startIndex, endIndex)

    console.log('✅ Found products:', products.length, 'of', filteredProducts.length)

    return NextResponse.json({ 
      products,
      pagination: {
        page,
        limit,
        totalProducts: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNext: page < Math.ceil(filteredProducts.length / limit),
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('❌ Admin products error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
