import { NextRequest, NextResponse } from "next/server"

// Rate limiting: store IP -> timestamp mapping
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3

// In-memory storage for messages (in production, use database)
const messages: {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: number
  ip: string
}[] = []

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfIP = request.headers.get("cf-connecting-ip")

  if (cfIP) return cfIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(",")[0].trim()
  return "unknown"
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }

  record.count++
  return { allowed: true }
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 5000) // Limit length
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)

    // Rate limiting
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Trop de requêtes. Veuillez réessayer dans ${rateLimit.retryAfter} secondes.`,
          retryAfter: rateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
          },
        }
      )
    }

    const body = await request.json()
    const { name, email, subject, message, timestamp } = body

    // Validate timestamp (must be within last 5 minutes - prevent replay attacks)
    const now = Date.now()
    if (!timestamp || now - timestamp > 5 * 60 * 1000 || timestamp > now) {
      return NextResponse.json({ error: "Requête invalide. Veuillez recharger la page." }, { status: 400 })
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email).toLowerCase()
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)

    // Validate field lengths
    if (sanitizedName.length < 2) {
      return NextResponse.json({ error: "Le nom doit contenir au moins 2 caractères." }, { status: 400 })
    }

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json({ error: "L'adresse email n'est pas valide." }, { status: 400 })
    }

    if (sanitizedSubject.length < 5) {
      return NextResponse.json({ error: "Le sujet doit contenir au moins 5 caractères." }, { status: 400 })
    }

    if (sanitizedMessage.length < 20) {
      return NextResponse.json({ error: "Le message doit contenir au moins 20 caractères." }, { status: 400 })
    }

    // Check for spam patterns
    const spamPatterns = [
      /\b(viagra|cialis|casino|lottery|winner|bitcoin|crypto|investment|click here|buy now)\b/i,
      /\b(http[s]?:\/\/){2,}/i, // Multiple URLs
      /(.)(\1{10,})/, // Repeated characters
    ]

    const combinedText = `${sanitizedName} ${sanitizedSubject} ${sanitizedMessage}`
    for (const pattern of spamPatterns) {
      if (pattern.test(combinedText)) {
        // Silently accept but don't store (looks like spam)
        return NextResponse.json({ success: true, id: generateId() })
      }
    }

    // Store message
    const newMessage = {
      id: generateId(),
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
      timestamp: now,
      ip,
    }

    messages.push(newMessage)

    // Keep only last 1000 messages in memory
    if (messages.length > 1000) {
      messages.shift()
    }

    // Log for admin (in production, send email or store in DB)
    console.log("[MAINTENANCE CONTACT]", {
      id: newMessage.id,
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      messageLength: sanitizedMessage.length,
      timestamp: new Date(now).toISOString(),
    })

    return NextResponse.json({
      success: true,
      id: newMessage.id,
      message: "Votre message a bien été envoyé.",
    })
  } catch (error) {
    console.error("[MAINTENANCE CONTACT ERROR]", error)
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 })
  }
}

// GET endpoint for admin to retrieve messages (protected)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  // Simple auth check - in production, use proper admin authentication
  const adminSecret = process.env.ADMIN_SECRET || "wuvezye-admin-2024"
  if (authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  return NextResponse.json({
    messages: messages.slice(-100), // Return last 100 messages
    total: messages.length,
  })
}
