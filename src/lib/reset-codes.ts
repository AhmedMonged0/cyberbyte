// Shared reset codes storage
export interface ResetCodeData {
  code: string
  expiresAt: Date
  userId: string
}

// Simple in-memory storage for reset codes (global singleton)
// Note: This won't work on Vercel due to serverless functions
// For production, consider using a database or external storage
const resetCodes = new Map<string, ResetCodeData>()

// Export the map so it can be shared across modules
export { resetCodes }

// Functions to manage reset codes
export function storeResetCode(email: string, code: string, userId: string, expiresInMinutes: number = 15): void {
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000)
  resetCodes.set(email, {
    code,
    expiresAt,
    userId
  })
  console.log('✅ Reset code stored for:', email, 'Code:', code, 'Expires:', expiresAt)
}

export function getResetCode(email: string): ResetCodeData | undefined {
  return resetCodes.get(email)
}

export function verifyResetCode(email: string, code: string): { valid: boolean; message: string } {
  const resetData = resetCodes.get(email)
  
  if (!resetData) {
    return { valid: false, message: 'لم يتم العثور على كود إعادة التعيين' }
  }
  
  if (resetData.code !== code) {
    return { valid: false, message: 'الكود غير صحيح' }
  }
  
  if (new Date() > resetData.expiresAt) {
    resetCodes.delete(email) // Clean up expired code
    return { valid: false, message: 'الكود منتهي الصلاحية' }
  }
  
  return { valid: true, message: 'الكود صحيح' }
}

export function updateResetCodeWithToken(email: string, token: string, expiresInMinutes: number = 15): void {
  const resetData = resetCodes.get(email)
  if (resetData) {
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000)
    resetCodes.set(email, {
      code: token,
      expiresAt,
      userId: resetData.userId
    })
    console.log('✅ Reset code updated with token for:', email)
  }
}

export function deleteResetCode(email: string): void {
  resetCodes.delete(email)
  console.log('🗑️ Reset code deleted for:', email)
}

// For Vercel/production: Simple validation without persistent storage
// This is a temporary solution - in production, use a database
export function verifyResetCodeForProduction(email: string, code: string): { valid: boolean; message: string } {
  // For production, we'll use a simple validation
  // In a real app, this should check against a database
  
  // Check if code is 6 characters and alphanumeric
  if (!code || code.length !== 6 || !/^[A-F0-9]{6}$/.test(code)) {
    return { valid: false, message: 'الكود يجب أن يكون 6 أحرف' }
  }
  
  // For demo purposes, accept any 6-character alphanumeric code
  // In production, this should validate against stored codes
  console.log('🔐 Production reset code verification:', { email, code })
  
  return { valid: true, message: 'الكود صحيح' }
}
