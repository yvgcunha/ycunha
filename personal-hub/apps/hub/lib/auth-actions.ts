'use server'

import { cookies } from 'next/headers'
import crypto from 'crypto'

const CORRECT_PASSWORD = '130994'
const SESSION_COOKIE_NAME = 'hub_session'
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days in ms

/**
 * Hash a password using SHA256
 */
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

/**
 * Verify password against hash
 */
function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

/**
 * Authenticate with password
 */
export async function authenticateWithPassword(password: string): Promise<{
  success: boolean
  error?: string
  sessionId?: string
}> {
  // Verify password
  const passwordHash = hashPassword(CORRECT_PASSWORD)
  if (!verifyPassword(password, passwordHash)) {
    return {
      success: false,
      error: 'Senha incorreta',
    }
  }

  // Generate session ID
  const sessionId = crypto.randomBytes(32).toString('hex')

  // Set session cookie
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })

  return {
    success: true,
    sessionId,
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)
  return !!sessionId?.value
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

/**
 * Get session
 */
export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null
}
