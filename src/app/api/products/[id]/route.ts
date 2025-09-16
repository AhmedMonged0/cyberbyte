import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Get single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params

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

    // Parse JSON fields safely
    let images = [product.image];
    let features = [];
    let specifications = {};

    try {
      if (product.images && typeof product.images === 'string') {
        images = JSON.parse(product.images);
      } else if (Array.isArray(product.images)) {
        images = product.images;
      }
    } catch (e) {
      console.warn('Failed to parse images JSON:', e);
    }

    try {
      if (product.features && typeof product.features === 'string') {
        features = JSON.parse(product.features);
      } else if (Array.isArray(product.features)) {
        features = product.features;
      }
    } catch (e) {
      console.warn('Failed to parse features JSON:', e);
    }

    try {
      if (product.specifications && typeof product.specifications === 'object') {
        specifications = product.specifications;
      }
    } catch (e) {
      console.warn('Failed to parse specifications:', e);
    }

    const processedProduct = {
      ...product,
      images,
      features,
      specifications
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
