import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { findUserByEmail, updateUserPassword } from '@/lib/users'
import { getResetToken, deleteResetToken } from '@/lib/shared-storage'

const updatePasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = updatePasswordSchema.parse(body)

    console.log('🔐 Update password request:', { token: token.substring(0, 10) + '...', passwordLength: password.length })

    // البحث عن الـ token في التخزين المؤقت
    const resetTokenData = getResetToken(token)

    if (!resetTokenData) {
      console.log('❌ Token not found:', token.substring(0, 10) + '...')
      return NextResponse.json({
        success: false,
        message: 'الرابط غير صحيح أو منتهي الصلاحية'
      }, { status: 400 })
    }

    // التحقق من انتهاء صلاحية الـ token
    if (resetTokenData.expiresAt < new Date()) {
      console.log('❌ Token expired:', resetTokenData.expiresAt)
      deleteResetToken(token)
      return NextResponse.json({
        success: false,
        message: 'الرابط منتهي الصلاحية'
      }, { status: 400 })
    }

    // البحث عن المستخدم
    const user = await findUserByEmail(resetTokenData.email)
    if (!user) {
      console.log('❌ User not found:', resetTokenData.email)
      return NextResponse.json({
        success: false,
        message: 'المستخدم غير موجود'
      }, { status: 400 })
    }

    // تحديث كلمة المرور (بدون تشفير للبساطة)
    const updateResult = await updateUserPassword(user.id, password)
    
    if (!updateResult.success) {
      console.log('❌ Failed to update password:', updateResult.message)
      return NextResponse.json({
        success: false,
        message: updateResult.message
      }, { status: 400 })
    }

    // حذف الـ token المستخدم
    deleteResetToken(token)

    console.log('✅ Password updated successfully for:', user.email)

    return NextResponse.json({
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح'
    })

  } catch (error) {
    console.error('❌ Update password error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          message: 'بيانات غير صحيحة',
          details: error.issues 
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: false,
      message: 'حدث خطأ في الخادم'
    }, { status: 500 })
  }
}
