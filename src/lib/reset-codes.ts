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
  console.log('🔍 Current reset codes count:', resetCodes.size)
  console.log('🔍 All stored codes:', Array.from(resetCodes.entries()))
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

// Real reset code verification - checks against stored codes
export function verifyResetCodeForProduction(email: string, code: string): { valid: boolean; message: string } {
  console.log('🔐 Real reset code verification:', { email, code })
  console.log('🔍 Current reset codes count:', resetCodes.size)
  console.log('🔍 All stored codes:', Array.from(resetCodes.entries()))
  
  // Check if code exists and is not empty
  if (!code || code.trim().length === 0) {
    console.log('❌ Code is empty')
    return { valid: false, message: 'الكود مطلوب' }
  }
  
  // Trim whitespace
  const trimmedCode = code.trim()
  
  // Check if code is 6 characters
  if (trimmedCode.length !== 6) {
    console.log('❌ Code length is not 6:', trimmedCode.length)
    return { valid: false, message: 'الكود يجب أن يكون 6 أحرف بالضبط' }
  }
  
  // Check if code contains only valid characters (letters and numbers)
  if (!/^[A-Za-z0-9]{6}$/.test(trimmedCode)) {
    console.log('❌ Code contains invalid characters:', trimmedCode)
    return { valid: false, message: 'الكود يجب أن يحتوي على أحرف وأرقام فقط' }
  }
  
  // Check against stored reset codes
  const storedCodeData = resetCodes.get(email)
  if (!storedCodeData) {
    console.log('❌ No reset code found for email:', email)
    return { valid: false, message: 'لم يتم العثور على كود إعادة تعيين لهذا البريد الإلكتروني' }
  }
  
  // Check if code matches
  if (storedCodeData.code !== trimmedCode) {
    console.log('❌ Code mismatch:', { stored: storedCodeData.code, provided: trimmedCode })
    return { valid: false, message: 'الكود غير صحيح' }
  }
  
  // Check if code is expired
  if (storedCodeData.expiresAt < new Date()) {
    console.log('❌ Code expired:', storedCodeData.expiresAt)
    resetCodes.delete(email) // Clean up expired code
    return { valid: false, message: 'الكود منتهي الصلاحية' }
  }
  
  console.log('✅ Reset code verified successfully:', { email, code: trimmedCode })
  return { valid: true, message: 'الكود صحيح' }
}
