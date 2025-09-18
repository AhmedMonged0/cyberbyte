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

import { prisma } from './prisma'

// Functions to manage users
export async function addUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      }
    })
    
    const user: User = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      role: 'user', // Default role for new users
      createdAt: newUser.createdAt.toISOString()
    }
    
    console.log('✅ New user added to database:', user.email)
    return user
  } catch (error) {
    console.error('❌ Error adding user:', error)
    throw error
  }
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) return undefined
    
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: 'user', // Default role for database users
      createdAt: user.createdAt.toISOString()
    }
  } catch (error) {
    console.error('❌ Error finding user by email:', error)
    return undefined
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: 'user' as const,
      createdAt: user.createdAt.toISOString()
    }))
  } catch (error) {
    console.error('❌ Error getting all users:', error)
    return []
  }
}

// Get only regular users (exclude admin)
export async function getRegularUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: 'user' as const,
      createdAt: user.createdAt.toISOString()
    }))
  } catch (error) {
    console.error('❌ Error getting regular users:', error)
    return []
  }
}

export async function searchUsers(search: string): Promise<User[]> {
  try {
    if (!search) return await getAllUsers()
    
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: 'user' as const,
      createdAt: user.createdAt.toISOString()
    }))
  } catch (error) {
    console.error('❌ Error searching users:', error)
    return []
  }
}

// Search only regular users (exclude admin)
export async function searchRegularUsers(search: string): Promise<User[]> {
  return await searchUsers(search) // All users in database are regular users
}

// Delete user by ID (only regular users, not admin)
export async function deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return { success: false, message: 'المستخدم غير موجود أو لا يمكن حذفه' }
    }
    
    await prisma.user.delete({
      where: { id: userId }
    })
    
    console.log('🗑️ User deleted from database:', user.email)
    return { success: true, message: 'تم حذف المستخدم بنجاح' }
  } catch (error) {
    console.error('❌ Error deleting user:', error)
    return { success: false, message: 'حدث خطأ في حذف المستخدم' }
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) return undefined
    
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: 'user' as const,
      createdAt: user.createdAt.toISOString()
    }
  } catch (error) {
    console.error('❌ Error getting user by ID:', error)
    return undefined
  }
}

// Update user password
export async function updateUserPassword(userId: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return { success: false, message: 'المستخدم غير موجود' }
    }
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword }
    })
    
    console.log('🔐 Password updated for user:', user.email)
    return { success: true, message: 'تم تحديث كلمة المرور بنجاح' }
  } catch (error) {
    console.error('❌ Error updating password:', error)
    return { success: false, message: 'حدث خطأ في تحديث كلمة المرور' }
  }
}
