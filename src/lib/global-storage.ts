// Global storage that persists across all API routes
// This is a workaround for Next.js serverless functions

// Global object to store data
declare global {
  var __cyberbyte_storage: {
    resetCodes: Map<string, { code: string; userId: string; expiresAt: Date }>
  } | undefined
}

// Initialize global storage if it doesn't exist
if (!global.__cyberbyte_storage) {
  global.__cyberbyte_storage = {
    resetCodes: new Map()
  }
}

export const globalStorage = global.__cyberbyte_storage

// Reset codes functions using global storage
export function storeResetCode(email: string, code: string, userId: string, expiresInMinutes: number = 15): void {
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000)
  globalStorage.resetCodes.set(email, {
    code,
    expiresAt,
    userId
  })
  console.log('✅ Reset code stored globally for:', email, 'Code:', code, 'Expires:', expiresAt)
  console.log('🔍 Global reset codes count:', globalStorage.resetCodes.size)
  console.log('🔍 All global codes:', Array.from(globalStorage.resetCodes.entries()))
}

export function getResetCode(email: string): { code: string; userId: string; expiresAt: Date } | undefined {
  return globalStorage.resetCodes.get(email)
}

export function verifyResetCode(email: string, code: string): { valid: boolean; message: string } {
  console.log('🔐 Global reset code verification:', { email, code })
  console.log('🔍 Global reset codes count:', globalStorage.resetCodes.size)
  console.log('🔍 All global codes:', Array.from(globalStorage.resetCodes.entries()))
  
  const storedCodeData = globalStorage.resetCodes.get(email)
  if (!storedCodeData) {
    console.log('❌ No reset code found for email:', email)
    return { valid: false, message: 'لم يتم العثور على كود إعادة تعيين لهذا البريد الإلكتروني' }
  }
  
  if (storedCodeData.code !== code) {
    console.log('❌ Code mismatch:', { stored: storedCodeData.code, provided: code })
    return { valid: false, message: 'الكود غير صحيح' }
  }
  
  if (storedCodeData.expiresAt < new Date()) {
    console.log('❌ Code expired:', storedCodeData.expiresAt)
    globalStorage.resetCodes.delete(email)
    return { valid: false, message: 'الكود منتهي الصلاحية' }
  }
  
  console.log('✅ Reset code verified successfully:', { email, code })
  return { valid: true, message: 'الكود صحيح' }
}

export function deleteResetCode(email: string): void {
  globalStorage.resetCodes.delete(email)
  console.log('🗑️ Reset code deleted globally for:', email)
}
