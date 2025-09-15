'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function ResetCodePage() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!code || code.length !== 6) {
      toast.error('الكود يجب أن يكون 6 أحرف')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase() })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('الكود صحيح! يمكنك الآن تغيير كلمة المرور')
        router.push(`/reset-password?token=${data.token}`)
      } else {
        toast.error(data.message || 'الكود غير صحيح أو منتهي الصلاحية')
      }
    } catch (error) {
      toast.error('حدث خطأ، حاول مرة أخرى')
      console.error('Verify code error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      toast.error('يرجى إدخال البريد الإلكتروني أولاً')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email,
          useCode: true 
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('تم إرسال كود جديد إلى بريدك الإلكتروني')
      } else {
        toast.error(data.message || 'فشل في إرسال الكود')
      }
    } catch (error) {
      toast.error('حدث خطأ، حاول مرة أخرى')
      console.error('Resend code error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            🔐 إدخال كود إعادة التعيين
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            أدخل الكود المكون من 6 أحرف المرسل إلى بريدك الإلكتروني
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                كود إعادة التعيين
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-2xl font-mono tracking-widest"
                  placeholder="A1B2C3"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                الكود صالح لمدة 15 دقيقة فقط
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !code || !email}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'جاري التحقق...' : 'تحقق من الكود'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading || !email}
                className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
              >
                إعادة إرسال الكود
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/login')}
                className="text-sm text-gray-600 hover:text-gray-500"
              >
                العودة إلى تسجيل الدخول
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
