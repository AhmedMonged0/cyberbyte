// Shared storage for all API routes
// This ensures data persistence across different API calls

export interface ResetTokenData {
  userId: string
  email: string
  expiresAt: Date
}

// Global storage objects
export const resetTokens = new Map<string, ResetTokenData>()

// Reset token functions
export function storeResetToken(token: string, userId: string, email: string, expiresInMinutes: number = 15): void {
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes)
  
  resetTokens.set(token, { userId, email, expiresAt })
  console.log('🔐 Reset token stored:', { token: token.substring(0, 10) + '...', email, expiresAt })
}

export function getResetToken(token: string): ResetTokenData | undefined {
  return resetTokens.get(token)
}

export function deleteResetToken(token: string): void {
  resetTokens.delete(token)
  console.log('🗑️ Reset token deleted:', token.substring(0, 10) + '...')
}

export function cleanExpiredTokens(): void {
  const now = new Date()
  for (const [token, data] of resetTokens.entries()) {
    if (data.expiresAt < now) {
      resetTokens.delete(token)
      console.log('🧹 Expired token cleaned:', token.substring(0, 10) + '...')
    }
  }
}
