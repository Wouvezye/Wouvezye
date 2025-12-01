// Configuration du mode maintenance
// Pour activer/désactiver la maintenance, modifiez cette valeur ou utilisez une variable d'environnement

export interface MaintenanceConfig {
  enabled: boolean
  message?: string
  allowedIPs?: string[] // IPs autorisées à accéder au site pendant la maintenance
  allowedPaths?: string[] // Chemins toujours accessibles (API, assets, etc.)
  estimatedEndTime?: string // ISO date string
}

// Configuration par défaut
// En production, utilisez MAINTENANCE_MODE=true dans les variables d'environnement Cloudflare
export const maintenanceConfig: MaintenanceConfig = {
  // Activer/désactiver via variable d'environnement ou manuellement ici
  enabled: process.env.MAINTENANCE_MODE === "true",

  // Message personnalisé (optionnel)
  message: process.env.MAINTENANCE_MESSAGE || undefined,

  // IPs autorisées à contourner la maintenance (admins, développeurs)
  // Ajoutez vos IPs ici ou via MAINTENANCE_ALLOWED_IPS (séparées par des virgules)
  allowedIPs: process.env.MAINTENANCE_ALLOWED_IPS?.split(",").map((ip) => ip.trim()) || [],

  // Chemins toujours accessibles même en maintenance
  allowedPaths: [
    "/maintenance", // La page de maintenance elle-même
    "/api/contact/maintenance", // API de contact
    "/api/health", // Health check
    "/_next", // Assets Next.js
    "/favicon.ico",
    "/wuvezye-logo.svg",
    "/robots.txt",
  ],

  // Heure de fin estimée (optionnel)
  estimatedEndTime: process.env.MAINTENANCE_END_TIME || undefined,
}

/**
 * Vérifie si une IP est autorisée pendant la maintenance
 */
export function isIPAllowed(ip: string): boolean {
  if (!maintenanceConfig.allowedIPs || maintenanceConfig.allowedIPs.length === 0) {
    return false
  }
  return maintenanceConfig.allowedIPs.includes(ip)
}

/**
 * Vérifie si un chemin est toujours accessible pendant la maintenance
 */
export function isPathAllowed(pathname: string): boolean {
  if (!maintenanceConfig.allowedPaths) return false

  return maintenanceConfig.allowedPaths.some((allowedPath) => {
    if (allowedPath.endsWith("*")) {
      return pathname.startsWith(allowedPath.slice(0, -1))
    }
    return pathname === allowedPath || pathname.startsWith(allowedPath)
  })
}

/**
 * Vérifie si le mode maintenance est actif
 */
export function isMaintenanceMode(): boolean {
  return maintenanceConfig.enabled
}
