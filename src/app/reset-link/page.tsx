'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Lock, Copy, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ResetLinkPage() {
  const searchParams = useSearchParams()
  const [resetUrl, setResetUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')
    const email = searchParams.get('email')
    
    if (token && email) {
      const url = `${window.location.origin}/reset-password?token=${token}`
      setResetUrl(url)
    }
  }, [searchParams])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(resetUrl)
      setCopied(true)
      toast.success('تم نسخ الرابط!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('فشل في نسخ الرابط')
    }
  }

  if (!resetUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
          <Lock className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">رابط إعادة التعيين غير متوفر</h1>
          <p className="text-gray-300">يرجى المحاولة مرة أخرى</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <Lock className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">رابط إعادة تعيين كلمة المرور</h1>
          <p className="text-gray-300">انسخ الرابط أدناه وألصقه في المتصفح لإعادة تعيين كلمة المرور</p>
        </div>

        <div className="bg-black/20 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <code className="text-green-400 text-sm break-all flex-1">
              {resetUrl}
            </code>
            <button
              onClick={copyToClipboard}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  نسخ الرابط
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-yellow-400 text-lg">⚠️</div>
            <div className="text-yellow-100 text-sm">
              <p className="font-semibold mb-1">ملاحظة مهمة:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>هذا الرابط صالح لمدة 15 دقيقة فقط</li>
                <li>لا تشارك هذا الرابط مع أي شخص آخر</li>
                <li>إذا انتهت صلاحية الرابط، اطلب رابطاً جديداً</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href={resetUrl}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-block"
          >
            فتح صفحة إعادة التعيين
          </a>
        </div>
      </div>
    </div>
  )
}
