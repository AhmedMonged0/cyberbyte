import { NextRequest, NextResponse } from 'next/server'
import { deleteUser, getUserById } from '@/lib/users'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params

    console.log('🗑️ Admin delete user request:', { userId })

    // Check if user exists
    const user = getUserById(userId)
    if (!user) {
      console.log('❌ User not found:', userId)
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود'
      }, { status: 404 })
    }

    // Check if trying to delete admin
    if (user.role === 'admin') {
      console.log('❌ Cannot delete admin user:', userId)
      return NextResponse.json({
        success: false,
        message: 'لا يمكن حذف حساب الأدمن'
      }, { status: 403 })
    }

    // Delete user
    const result = deleteUser(userId)
    
    if (!result.success) {
      console.log('❌ Failed to delete user:', result.message)
      return NextResponse.json({
        success: false,
        message: result.message
      }, { status: 400 })
    }

    console.log('✅ User deleted successfully:', userId)

    return NextResponse.json({
      success: true,
      message: result.message,
      deletedUser: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    })

  } catch (error) {
    console.error('❌ Delete user error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ في الخادم',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
