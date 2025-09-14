import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get total users count
    const totalUsers = await prisma.user.count()
    
    // Get users registered today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const usersToday = await prisma.user.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    })
    
    // Get users registered this week
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const usersThisWeek = await prisma.user.count({
      where: {
        createdAt: {
          gte: weekAgo
        }
      }
    })
    
    // Get users registered this month
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    const usersThisMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: monthAgo
        }
      }
    })
    
    // Get recent users (last 10)
    const recentUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      stats: {
        totalUsers,
        usersToday,
        usersThisWeek,
        usersThisMonth
      },
      recentUsers
    })

  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
