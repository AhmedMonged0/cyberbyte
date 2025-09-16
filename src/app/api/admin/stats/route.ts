import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('📊 Admin stats request')

    // Mock statistics data
    const stats = {
      totalUsers: 8,
      totalProducts: 16,
      totalOrders: 24,
      totalRevenue: 45680,
      recentOrdersCount: 5,
      lowStockProducts: 3,
      monthlyGrowth: {
        users: 12.5,
        products: 8.3,
        revenue: 15.7
      },
      topCategories: [
        { name: 'Monitors', count: 5, revenue: 12500 },
        { name: 'Laptops', count: 4, revenue: 18900 },
        { name: 'Storage', count: 3, revenue: 8900 },
        { name: 'Peripherals', count: 4, revenue: 5380 }
      ],
      recentUsers: [
        { id: '8', name: 'Nour Mahmoud', email: 'nour@example.com', joinedAt: '2024-01-08T00:00:00Z' },
        { id: '7', name: 'Omar Ibrahim', email: 'omar@example.com', joinedAt: '2024-01-07T00:00:00Z' },
        { id: '6', name: 'Fatma Hassan', email: 'fatma@example.com', joinedAt: '2024-01-06T00:00:00Z' }
      ],
      recentOrders: [
        { id: '1', customer: 'Ahmed Monged', total: 2499, status: 'completed', date: '2024-01-08T10:30:00Z' },
        { id: '2', customer: 'Sara Ahmed', total: 899, status: 'shipped', date: '2024-01-07T14:20:00Z' },
        { id: '3', customer: 'Mohamed Ali', total: 199, status: 'pending', date: '2024-01-06T09:15:00Z' }
      ]
    }

    console.log('✅ Stats generated successfully')

    return NextResponse.json({ stats })

  } catch (error) {
    console.error('❌ Admin stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
