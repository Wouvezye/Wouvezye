import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { promises as fs } from "fs"
import path from "path"

// File-based maintenance mode storage (works in dev and simple deployments)
// For production with Cloudflare, use KV or environment variables
const MAINTENANCE_FILE = path.join(process.cwd(), ".maintenance-mode")

async function getMaintenanceStatus(): Promise<{
  enabled: boolean
  message?: string
  enabledAt?: string
  enabledBy?: string
}> {
  // First check environment variable (takes precedence)
  if (process.env.MAINTENANCE_MODE === "true") {
    return {
      enabled: true,
      message: process.env.MAINTENANCE_MESSAGE || undefined,
    }
  }

  // Then check file-based status
  try {
    const data = await fs.readFile(MAINTENANCE_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return { enabled: false }
  }
}

async function setMaintenanceStatus(
  enabled: boolean,
  message?: string,
  enabledBy?: string
): Promise<void> {
  if (enabled) {
    const data = {
      enabled: true,
      message,
      enabledAt: new Date().toISOString(),
      enabledBy,
    }
    await fs.writeFile(MAINTENANCE_FILE, JSON.stringify(data, null, 2))
  } else {
    try {
      await fs.unlink(MAINTENANCE_FILE)
    } catch {
      // File doesn't exist, that's fine
    }
  }
}

// GET: Check maintenance status
export async function GET() {
  try {
    const status = await getMaintenanceStatus()
    return NextResponse.json(status)
  } catch (error) {
    console.error("[MAINTENANCE STATUS ERROR]", error)
    return NextResponse.json({ enabled: false })
  }
}

// POST: Toggle maintenance mode (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé. Réservé aux administrateurs." }, { status: 403 })
    }

    const body = await request.json()
    const { enabled, message } = body

    if (typeof enabled !== "boolean") {
      return NextResponse.json({ error: "Le champ 'enabled' est requis (boolean)" }, { status: 400 })
    }

    await setMaintenanceStatus(enabled, message, user.email)

    // If enabling, also set a cookie for this admin to bypass
    const response = NextResponse.json({
      success: true,
      enabled,
      message: enabled ? "Mode maintenance activé" : "Mode maintenance désactivé",
    })

    // Set maintenance_enabled cookie (read by middleware)
    response.cookies.set("maintenance_enabled", enabled ? "true" : "false", {
      httpOnly: false, // Needs to be readable
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: enabled ? 60 * 60 * 24 * 7 : 0, // 7 days or delete
      path: "/",
    })

    if (enabled) {
      // Set bypass cookie for this admin
      const bypassSecret = process.env.MAINTENANCE_BYPASS_SECRET || "wuvezye-bypass-2024"
      response.cookies.set("maintenance_bypass", bypassSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
    } else {
      // Clear bypass cookie when disabling
      response.cookies.delete("maintenance_bypass")
    }

    return response
  } catch (error) {
    console.error("[MAINTENANCE TOGGLE ERROR]", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// DELETE: Force disable maintenance (admin only)
export async function DELETE() {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    await setMaintenanceStatus(false)

    const response = NextResponse.json({
      success: true,
      message: "Mode maintenance désactivé",
    })

    // Clear bypass cookie
    response.cookies.delete("maintenance_bypass")

    return response
  } catch (error) {
    console.error("[MAINTENANCE DISABLE ERROR]", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
