'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, Mail } from 'lucide-react'
import AuthForm from '@/components/Auth/AuthForm'
import FormField from '@/components/Auth/FormField'
import SubmitButton from '@/components/Auth/SubmitButton'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null)


  const [formData, setFormData] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    token: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const verifyToken = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/verify-reset-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setStep('reset')
      } else {
        toast.error(data.error || 'Invalid or expired token')
        router.push('/login')
      }
    } catch {
      toast.error('حدث خطأ في التحقق من الرابط')
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [token, router])

  useEffect(() => {
    // Only verify token if it exists in URL
    if (token && token.length > 0) {
      verifyToken()
    } else {
      // If no token, start with email step
      setStep('email')
    }
  }, [token, verifyToken])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('تم إرسال كود إعادة التعيين إلى بريدك الإلكتروني')
        setStep('code')
        // Calculate remaining attempts (assuming max 3)
        const attempts = data.attempts || 1
        setRemainingAttempts(3 - attempts)
      } else {
        if (response.status === 429) {
          toast.error(data.error || 'تم تجاوز الحد الأقصى للمحاولات')
        } else {
          toast.error(data.error || 'حدث خطأ في إرسال البريد الإلكتروني')
        }
        setErrors({ email: data.error || 'حدث خطأ في إرسال البريد الإلكتروني' })
      }
    } catch {
      toast.error('حدث خطأ في إرسال البريد الإلكتروني')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: formData.code.toUpperCase() })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setFormData(prev => ({ ...prev, token: data.token }))
        setStep('reset')
        toast.success('الكود صحيح! يمكنك الآن تغيير كلمة المرور')
      } else {
        setErrors({ code: data.message || 'الكود غير صحيح أو منتهي الصلاحية' })
      }
    } catch {
      toast.error('حدث خطأ في التحقق من الكود')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'كلمات المرور غير متطابقة' })
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setErrors({ password: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: token || formData.token, 
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('تم تحديث كلمة المرور بنجاح')
        router.push('/login')
      } else {
        setErrors({ password: data.error || 'حدث خطأ في تحديث كلمة المرور' })
      }
    } catch {
      toast.error('حدث خطأ في تحديث كلمة المرور')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Show email form if step is email
  if (step === 'email') {
    return (
      <AuthForm
        title="نسيان كلمة المرور"
        subtitle="أدخل بريدك الإلكتروني لإرسال كود إعادة التعيين"
        icon={<Lock className="h-6 w-6 text-white" />}
      >
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <FormField
            label="البريد الإلكتروني"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="أدخل بريدك الإلكتروني"
            required
            icon={<Mail className="h-5 w-5 text-text-secondary" />}
          />

          <SubmitButton
            isLoading={isLoading}
            loadingText="جاري الإرسال..."
          >
            إرسال كود إعادة التعيين
          </SubmitButton>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-sm text-text-secondary hover:text-gradient-neon transition-colors"
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        </form>
      </AuthForm>
    )
  }

  // Show code form if step is code
  if (step === 'code') {
    return (
      <AuthForm
        title="إدخال كود إعادة التعيين"
        subtitle="أدخل الكود المكون من 6 أحرف المرسل إلى بريدك الإلكتروني"
        icon={<Lock className="h-6 w-6 text-white" />}
      >
        <form onSubmit={handleCodeSubmit} className="space-y-6">
          <FormField
            label="كود إعادة التعيين"
            type="text"
            name="code"
            value={formData.code}
            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
            error={errors.code}
            placeholder="A1B2C3"
            required
            maxLength={6}
            className="text-center text-2xl font-mono tracking-widest"
            icon={<Lock className="h-5 w-5 text-text-secondary" />}
          />

          <p className="text-sm text-text-secondary text-center">
            الكود صالح لمدة 15 دقيقة فقط
          </p>
          
          {remainingAttempts !== null && remainingAttempts < 3 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-center">
              <p className="text-sm">
                ⚠️ المحاولات المتبقية: {remainingAttempts} من 3
              </p>
            </div>
          )}

          <SubmitButton
            isLoading={isLoading}
            loadingText="جاري التحقق..."
          >
            تحقق من الكود
          </SubmitButton>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={handleEmailSubmit}
              disabled={isLoading}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
            >
              إعادة إرسال الكود
            </button>
            <br />
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-sm text-text-secondary hover:text-gradient-neon transition-colors"
            >
              العودة إلى إدخال البريد الإلكتروني
            </button>
            <br />
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-sm text-text-secondary hover:text-gradient-neon transition-colors"
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        </form>
      </AuthForm>
    )
  }

  return (
    <AuthForm
      title="إعادة تعيين كلمة المرور"
      subtitle={`مرحباً ${user?.firstName || 'عزيزي المستخدم'}، أدخل كلمة المرور الجديدة`}
      icon={<Lock className="h-6 w-6 text-white" />}
    >
      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <FormField
          label="كلمة المرور الجديدة"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="أدخل كلمة المرور الجديدة"
          required
          icon={<Lock className="h-5 w-5 text-text-secondary" />}
          showPasswordToggle={true}
        />

        <FormField
          label="تأكيد كلمة المرور"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          placeholder="أعد إدخال كلمة المرور"
          required
          icon={<Lock className="h-5 w-5 text-text-secondary" />}
          showPasswordToggle={true}
        />

        <SubmitButton
          isLoading={isLoading}
          loadingText="جاري التحديث..."
        >
          تحديث كلمة المرور
        </SubmitButton>

        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-sm text-text-secondary hover:text-gradient-neon transition-colors"
          >
            العودة إلى تسجيل الدخول
          </button>
        </div>
      </form>
    </AuthForm>
  )
}