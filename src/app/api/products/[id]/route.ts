import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        originalPrice: true,
        category: true,
        brand: true,
        image: true,
        images: true,
        inStock: true,
        stock: true,
        rating: true,
        reviews: true,
        features: true,
        specifications: true,
        isFeatured: true,
        discount: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const processedProduct = {
      ...product,
      images: product.images ? JSON.parse(product.images) : [product.image],
      features: product.features ? JSON.parse(product.features) : [],
      specifications: product.specifications || {}
    }

    return NextResponse.json(processedProduct)

  } catch (error) {
    console.error('Get product error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
