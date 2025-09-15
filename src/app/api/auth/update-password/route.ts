import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

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
    const { token, password, confirmPassword } = updatePasswordSchema.parse(body)

    // البحث عن الـ token في قاعدة البيانات
    const resetToken = await prisma.resetToken.findFirst({
      where: {
        token: token,
        expiresAt: {
          gt: new Date() // الـ token لم ينته صلاحيته
        }
      },
      include: {
        user: true
      }
    })

    if (!resetToken) {
      return NextResponse.json({
        success: false,
        message: 'الرابط غير صحيح أو منتهي الصلاحية'
      }, { status: 400 })
    }

    // تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(password, 12)

    // تحديث كلمة المرور
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    })

    // حذف الـ token المستخدم
    await prisma.resetToken.delete({
      where: { id: resetToken.id }
    })

    // حذف جميع الـ tokens الأخرى للمستخدم (لأمان إضافي)
    await prisma.resetToken.deleteMany({
      where: { userId: resetToken.userId }
    })

    return NextResponse.json({
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح'
    })

  } catch (error) {
    console.error('Update password error:', error)
    
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