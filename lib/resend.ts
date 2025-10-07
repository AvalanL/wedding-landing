import { Resend } from 'resend'

let resendInstance: Resend | null = null

export const getResendClient = (): Resend | null => {
  // During build time, RESEND_API_KEY might not be available
  // This is OK - emails only work at runtime
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      console.warn('⚠️  RESEND_API_KEY is not set. Email notifications will not work.')
    }
    return null
  }

  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY)
  }

  return resendInstance
}

