import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Chemins toujours accessibles pendant la maintenance
const ALLOWED_PATHS = [
  "/maintenance",
  "/login",
  "/admin",
  "/api/auth",
  "/api/contact/maintenance",
  "/api/health",
  "/api/maintenance",
  "/_next",
  "/favicon.ico",
  "/wuvezye-logo.svg",
  "/robots.txt",
  "/og-image.png",
]

// Extensions de fichiers statiques à ne pas bloquer
const STATIC_EXTENSIONS = [".svg", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".css", ".js", ".woff", ".woff2", ".ttf"]

function getClientIP(request: NextRequest): string {
  const cfIP = request.headers.get("cf-connecting-ip")
  const realIP = request.headers.get("x-real-ip")
  const forwarded = request.headers.get("x-forwarded-for")

  if (cfIP) return cfIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(",")[0].trim()
  return "unknown"
}

function isPathAllowed(pathname: string): boolean {
  // Check exact matches and prefixes
  for (const allowed of ALLOWED_PATHS) {
    if (pathname === allowed || pathname.startsWith(allowed + "/") || pathname.startsWith(allowed)) {
      return true
    }
  }

  // Check static file extensions
  for (const ext of STATIC_EXTENSIONS) {
    if (pathname.endsWith(ext)) {
      return true
    }
  }

  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if maintenance mode is enabled via environment variable
  const envMaintenance = process.env.MAINTENANCE_MODE === "true"

  // Also check for maintenance cookie (set by admin toggle)
  const maintenanceCookie = request.cookies.get("maintenance_enabled")
  const cookieMaintenance = maintenanceCookie?.value === "true"

  const maintenanceMode = envMaintenance || cookieMaintenance

  if (!maintenanceMode) {
    // Maintenance mode is off, let everything through
    return NextResponse.next()
  }

  // Maintenance mode is ON - check if this path/IP should be allowed

  // Allow static files and specific paths
  if (isPathAllowed(pathname)) {
    return NextResponse.next()
  }

  // Check if IP is in allowed list (for admins)
  const clientIP = getClientIP(request)
  const allowedIPs = process.env.MAINTENANCE_ALLOWED_IPS?.split(",").map((ip) => ip.trim()) || []

  if (allowedIPs.includes(clientIP)) {
    // Admin IP - let through with a header indicator
    const response = NextResponse.next()
    response.headers.set("X-Maintenance-Bypass", "true")
    return response
  }

  // Check for bypass cookie (set by admin panel)
  const bypassCookie = request.cookies.get("maintenance_bypass")
  const bypassSecret = process.env.MAINTENANCE_BYPASS_SECRET || "wuvezye-bypass-2024"

  if (bypassCookie?.value === bypassSecret) {
    return NextResponse.next()
  }

  // Redirect to maintenance page
  const maintenanceUrl = new URL("/maintenance", request.url)

  // Add original path as query param for potential redirect after maintenance
  maintenanceUrl.searchParams.set("from", pathname)

  return NextResponse.redirect(maintenanceUrl)
}

export const config = {
  // Match all paths except static files in public folder
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
