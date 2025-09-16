import { NextRequest, NextResponse } from 'next/server'

// Mock users data
const mockUsers = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@cyberbyte.com',
    createdAt: '2024-01-01T00:00:00Z',
    role: 'admin'
  },
  {
    id: '2',
    firstName: 'Test',
    lastName: 'User',
    email: 'user@cyberbyte.com',
    createdAt: '2024-01-02T00:00:00Z',
    role: 'user'
  },
  {
    id: '3',
    firstName: 'Ahmed',
    lastName: 'Monged',
    email: 'ahmed@test.com',
    createdAt: '2024-01-03T00:00:00Z',
    role: 'user'
  },
  {
    id: '4',
    firstName: 'Sara',
    lastName: 'Ahmed',
    email: 'sara@example.com',
    createdAt: '2024-01-04T00:00:00Z',
    role: 'user'
  },
  {
    id: '5',
    firstName: 'Mohamed',
    lastName: 'Ali',
    email: 'mohamed@example.com',
    createdAt: '2024-01-05T00:00:00Z',
    role: 'user'
  },
  {
    id: '6',
    firstName: 'Fatma',
    lastName: 'Hassan',
    email: 'fatma@example.com',
    createdAt: '2024-01-06T00:00:00Z',
    role: 'user'
  },
  {
    id: '7',
    firstName: 'Omar',
    lastName: 'Ibrahim',
    email: 'omar@example.com',
    createdAt: '2024-01-07T00:00:00Z',
    role: 'user'
  },
  {
    id: '8',
    firstName: 'Nour',
    lastName: 'Mahmoud',
    email: 'nour@example.com',
    createdAt: '2024-01-08T00:00:00Z',
    role: 'user'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    console.log('👥 Admin users request:', { search })

    // Filter users based on search
    let filteredUsers = mockUsers
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredUsers = mockUsers.filter(user => 
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    }

    // Sort by creation date (newest first)
    filteredUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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
