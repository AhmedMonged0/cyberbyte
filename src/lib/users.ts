// Shared users storage
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'admin' | 'user'
  createdAt: string
}

// Real users storage (in memory for now)
const realUsers: User[] = [
  {
    id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@cyberbyte.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
]

// Functions to manage users
export function addUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const newUser: User = {
    id: (realUsers.length + 1).toString(),
    ...userData,
    createdAt: new Date().toISOString()
  }
  realUsers.push(newUser)
  console.log('✅ New user added:', newUser.email)
  return newUser
}

export function findUserByEmail(email: string): User | undefined {
  return realUsers.find(u => u.email === email)
}

export function getAllUsers(): User[] {
  return realUsers
}

// Get only regular users (exclude admin)
export function getRegularUsers(): User[] {
  return realUsers.filter(user => user.role === 'user')
}

export function searchUsers(search: string): User[] {
  if (!search) return realUsers
  
  const searchLower = search.toLowerCase()
  return realUsers.filter(user => 
    user.firstName.toLowerCase().includes(searchLower) ||
    user.lastName.toLowerCase().includes(searchLower) ||
    user.email.toLowerCase().includes(searchLower)
  )
}

// Search only regular users (exclude admin)
export function searchRegularUsers(search: string): User[] {
  const regularUsers = getRegularUsers()
  if (!search) return regularUsers
  
  const searchLower = search.toLowerCase()
  return regularUsers.filter(user => 
    user.firstName.toLowerCase().includes(searchLower) ||
    user.lastName.toLowerCase().includes(searchLower) ||
    user.email.toLowerCase().includes(searchLower)
  )
}
