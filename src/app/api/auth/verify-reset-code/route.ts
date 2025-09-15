import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import crypto from 'crypto'

const verifyCodeSchema = z.object({
  code: z.string().length(6, 'Code must be 6 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = verifyCodeSchema.parse(body)

    // البحث عن الكود في قاعدة البيانات
    const resetToken = await prisma.resetToken.findFirst({
      where: {
        token: code,
        expiresAt: {
          gt: new Date() // الكود لم ينته صلاحيته
        }
      },
      include: {
        user: true
      }
    })

    if (!resetToken) {
      return NextResponse.json({
        success: false,
        message: 'الكود غير صحيح أو منتهي الصلاحية'
      }, { status: 400 })
    }

    // إنشاء token جديد للوصول إلى صفحة تغيير كلمة المرور
    const accessToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 دقيقة

    // حذف الكود القديم
    await prisma.resetToken.delete({
      where: { id: resetToken.id }
    })

    // إنشاء token جديد للوصول
    await prisma.resetToken.create({
      data: {
        token: accessToken,
        userId: resetToken.userId,
        expiresAt,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'الكود صحيح',
      token: accessToken,
      user: {
        id: resetToken.user.id,
        email: resetToken.user.email
      }
    })

  } catch (error) {
    console.error('Verify reset code error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          message: 'الكود يجب أن يكون 6 أحرف',
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
