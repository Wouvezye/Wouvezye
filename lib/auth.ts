import { cookies } from "next/headers"
import crypto from "crypto"

// Types
export type UserRole = "MEMBRE" | "ADMIN" | "REDACTEUR"

export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: Date
  lastLoginAt?: Date
}

export interface Session {
  user: User
  expiresAt: Date
  createdAt: Date
  ipAddress?: string
  userAgent?: string
}

interface RateLimitEntry {
  attempts: number
  lastAttempt: Date
  blockedUntil?: Date
}

// In-memory stores (will be replaced by a real database later)
const users = new Map<string, User>()
const sessions = new Map<string, Session>()
const loginCodes = new Map<string, { email: string; expiresAt: Date; attempts: number }>()
const rateLimits = new Map<string, RateLimitEntry>()

// Session cookie name
const SESSION_COOKIE = "wuvezye_session"

const MAX_LOGIN_ATTEMPTS = 5
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const BLOCK_DURATION_MS = 30 * 60 * 1000 // 30 minutes block
const CODE_MAX_ATTEMPTS = 3
const CODE_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes (reduced from 15)
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function generateSecureId(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function generateLoginCode(): string {
  const buffer = crypto.randomBytes(4)
  const number = buffer.readUInt32BE(0) % 1000000
  return number.toString().padStart(6, "0")
}

function hashEmail(email: string): string {
  return crypto.createHash("sha256").update(email.toLowerCase()).digest("hex").substring(0, 16)
}

export function checkRateLimit(email: string): { allowed: boolean; retryAfter?: number } {
  const key = hashEmail(email)
  const entry = rateLimits.get(key)
  const now = new Date()

  if (!entry) {
    return { allowed: true }
  }

  // Check if blocked
  if (entry.blockedUntil && now < entry.blockedUntil) {
    const retryAfter = Math.ceil((entry.blockedUntil.getTime() - now.getTime()) / 1000)
    return { allowed: false, retryAfter }
  }

  // Reset if window expired
  if (now.getTime() - entry.lastAttempt.getTime() > RATE_LIMIT_WINDOW_MS) {
    rateLimits.delete(key)
    return { allowed: true }
  }

  // Check attempts
  if (entry.attempts >= MAX_LOGIN_ATTEMPTS) {
    entry.blockedUntil = new Date(now.getTime() + BLOCK_DURATION_MS)
    rateLimits.set(key, entry)
    const retryAfter = Math.ceil(BLOCK_DURATION_MS / 1000)
    return { allowed: false, retryAfter }
  }

  return { allowed: true }
}

export function recordLoginAttempt(email: string): void {
  const key = hashEmail(email)
  const entry = rateLimits.get(key)
  const now = new Date()

  if (!entry) {
    rateLimits.set(key, { attempts: 1, lastAttempt: now })
  } else {
    entry.attempts += 1
    entry.lastAttempt = now
    rateLimits.set(key, entry)
  }
}

export function clearRateLimit(email: string): void {
  const key = hashEmail(email)
  rateLimits.delete(key)
}

// Store a login code for an email
export function storeLoginCode(email: string): string {
  for (const [code, entry] of loginCodes.entries()) {
    if (entry.email === email) {
      loginCodes.delete(code)
    }
  }

  const code = generateLoginCode()
  const expiresAt = new Date(Date.now() + CODE_EXPIRY_MS)
  loginCodes.set(code, { email, expiresAt, attempts: 0 })
  return code
}

export function verifyLoginCode(code: string): { email: string | null; error?: string } {
  const entry = loginCodes.get(code)

  if (!entry) {
    return { email: null, error: "Code invalide" }
  }

  if (new Date() > entry.expiresAt) {
    loginCodes.delete(code)
    return { email: null, error: "Code expiré" }
  }

  entry.attempts += 1
  if (entry.attempts > CODE_MAX_ATTEMPTS) {
    loginCodes.delete(code)
    return { email: null, error: "Trop de tentatives, demandez un nouveau code" }
  }

  loginCodes.set(code, entry)
  loginCodes.delete(code)
  return { email: entry.email }
}

// Get or create a user by email
export function getOrCreateUser(email: string): User {
  const normalizedEmail = email.toLowerCase().trim()

  // Check if user exists
  for (const user of users.values()) {
    if (user.email === normalizedEmail) {
      user.lastLoginAt = new Date()
      users.set(user.id, user)
      return user
    }
  }

  // Create new user
  const newUser: User = {
    id: generateSecureId(),
    email: normalizedEmail,
    role: "MEMBRE",
    createdAt: new Date(),
    lastLoginAt: new Date(),
  }
  users.set(newUser.id, newUser)
  return newUser
}

export function createSession(user: User, ipAddress?: string, userAgent?: string): string {
  const sessionId = generateSecureId()
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_MS)

  sessions.set(sessionId, {
    user,
    expiresAt,
    createdAt: new Date(),
    ipAddress,
    userAgent,
  })

  return sessionId
}

// Get session from cookie (server-side)
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionId) return null

  const session = sessions.get(sessionId)
  if (!session) return null

  // Check if expired
  if (new Date() > session.expiresAt) {
    sessions.delete(sessionId)
    return null
  }

  return session
}

// Get current user (server-side helper)
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user ?? null
}

// Delete session
export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId)
}

export function deleteAllUserSessions(userId: string): void {
  for (const [sessionId, session] of sessions.entries()) {
    if (session.user.id === userId) {
      sessions.delete(sessionId)
    }
  }
}

// Set admin role for specific emails
export function setAdminIfNeeded(user: User): User {
  const adminEmails = ["wuvezye@gmail.com", "admin@wuvezye.com", "contact@wuvezye.com"]
  if (adminEmails.includes(user.email)) {
    user.role = "ADMIN"
    users.set(user.id, user)
  }
  return user
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().slice(0, 254)
}
