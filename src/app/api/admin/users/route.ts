import { NextRequest, NextResponse } from 'next/server'
import { getRegularUsers, searchRegularUsers } from '@/lib/users'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    console.log('👥 Admin users request:', { search })

    // Filter regular users based on search (exclude admin)
    const filteredUsers = search ? await searchRegularUsers(search) : await getRegularUsers()

    console.log('✅ Found users:', filteredUsers.length)

    return NextResponse.json({ 
      users: filteredUsers.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt
      }))
    })

  } catch (error) {
    console.error('❌ Admin users error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
