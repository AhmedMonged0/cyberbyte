'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function TestEmailPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  const testSMTPConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-email')
      const data = await response.json()
      setTestResults(data)
      
      if (data.success) {
        toast.success('SMTP connection successful!')
      } else {
        toast.error('SMTP connection failed!')
      }
    } catch (error) {
      toast.error('Test failed!')
      console.error('Test error:', error)
    } finally {
      setLoading(false)
    }
  }

  const testEmailSend = async () => {
    if (!email) {
      toast.error('Please enter an email address')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success(`Test email sent to ${email}!`)
      } else {
        toast.error('Failed to send test email!')
      }
    } catch (error) {
      toast.error('Test failed!')
      console.error('Test error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">🧪 Email Test</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="test@example.com"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={testSMTPConnection}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test SMTP Connection'}
            </button>

            <button
              onClick={testEmailSend}
              disabled={loading || !email}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>

          {testResults && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">Test Results:</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-medium text-yellow-800 mb-2">Environment Variables Check:</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <div>SMTP_HOST: {process.env.NEXT_PUBLIC_SMTP_HOST || 'Not set'}</div>
            <div>SMTP_PORT: {process.env.NEXT_PUBLIC_SMTP_PORT || 'Not set'}</div>
            <div>SMTP_USER: {process.env.NEXT_PUBLIC_SMTP_USER || 'Not set'}</div>
            <div>SMTP_PASS: {process.env.NEXT_PUBLIC_SMTP_PASS ? '***' : 'Not set'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
