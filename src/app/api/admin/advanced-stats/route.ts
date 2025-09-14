import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get date ranges
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)

    // Get user statistics
    const [
      totalUsers,
      usersToday,
      usersThisWeek,
      usersThisMonth,
      usersThisYear,
      recentUsers
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: today } }
      }),
      prisma.user.count({
        where: { createdAt: { gte: weekAgo } }
      }),
      prisma.user.count({
        where: { createdAt: { gte: monthAgo } }
      }),
      prisma.user.count({
        where: { createdAt: { gte: yearAgo } }
      }),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true
        }
      })
    ])

    // Get product statistics
    const [
      totalProducts,
      activeProducts,
      outOfStockProducts,
      featuredProducts
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({ where: { stock: 0 } }),
      prisma.product.count({ where: { isFeatured: true } })
    ])

    // Get order statistics
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'pending' } }),
      prisma.order.count({ where: { status: 'delivered' } }),
      prisma.order.aggregate({
        where: { paymentStatus: 'paid' },
        _sum: { totalAmount: true }
      })
    ])

    // Get daily user registrations for the last 30 days
    const dailyRegistrations = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
      
      const count = await prisma.user.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate
          }
        }
      })
      
      dailyRegistrations.push({
        date: date.toISOString().split('T')[0],
        users: count
      })
    }

    // Get monthly revenue for the last 12 months
    const monthlyRevenue = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      
      const revenue = await prisma.order.aggregate({
        where: {
          paymentStatus: 'paid',
          createdAt: {
            gte: date,
            lt: nextDate
          }
        },
        _sum: { totalAmount: true }
      })
      
      monthlyRevenue.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: revenue._sum.totalAmount || 0
      })
    }

    // Get top products by orders
    const topProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { reviews: 'desc' },
      select: {
        id: true,
        name: true,
        price: true,
        rating: true,
        reviews: true,
        image: true
      }
    })

    // Get order status distribution
    const orderStatusDistribution = await prisma.order.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    return NextResponse.json({
      users: {
        total: totalUsers,
        today: usersToday,
        thisWeek: usersThisWeek,
        thisMonth: usersThisMonth,
        thisYear: usersThisYear,
        recent: recentUsers
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        outOfStock: outOfStockProducts,
        featured: featuredProducts
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0
      },
      charts: {
        dailyRegistrations,
        monthlyRevenue,
        orderStatusDistribution
      },
      topProducts
    })

  } catch (error) {
    console.error('Advanced stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
