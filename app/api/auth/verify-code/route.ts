import { type NextRequest, NextResponse } from "next/server"
import { verifyLoginCode, getOrCreateUser, createSession, setAdminIfNeeded, clearRateLimit } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code requis" }, { status: 400 })
    }

    const cleanCode = code.replace(/\D/g, "").slice(0, 6)
    if (cleanCode.length !== 6) {
      return NextResponse.json({ error: "Code invalide" }, { status: 400 })
    }

    const result = verifyLoginCode(cleanCode)
    if (!result.email) {
      return NextResponse.json({ error: result.error || "Code invalide ou expiré" }, { status: 401 })
    }

    // Get or create user
    let user = getOrCreateUser(result.email)
    user = setAdminIfNeeded(user)

    clearRateLimit(result.email)

    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined
    const userAgent = request.headers.get("user-agent") || undefined

    // Create session with metadata
    const sessionId = createSession(user, ipAddress, userAgent)

    // Set cookie with enhanced security
    const cookieStore = await cookies()
    cookieStore.set("wuvezye_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Stricter CSRF protection
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })
  } catch {
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
