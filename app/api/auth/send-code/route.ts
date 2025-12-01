import { type NextRequest, NextResponse } from "next/server"
import { storeLoginCode, checkRateLimit, recordLoginAttempt, isValidEmail, sanitizeEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 })
    }

    const cleanEmail = sanitizeEmail(email)

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    const rateCheck = checkRateLimit(cleanEmail)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Trop de tentatives. Réessayez plus tard.",
          retryAfter: rateCheck.retryAfter,
        },
        { status: 429 },
      )
    }

    recordLoginAttempt(cleanEmail)

    // Generate and store code
    const code = storeLoginCode(cleanEmail)

    // In production, send email here
    // For demo, we'll log it and return it (REMOVE in production!)
    console.log(`[Wuvè Zyé] Code de connexion pour ${cleanEmail}: ${code}`)

    return NextResponse.json({
      success: true,
      message: "Si cette adresse est valide, vous recevrez un code par email.",
      // DEMO ONLY - remove in production
      _devCode: code,
    })
  } catch {
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
