import { NextResponse } from "next/server"

export async function GET() {
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true"

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    maintenance: maintenanceMode,
    version: process.env.npm_package_version || "1.0.0",
  })
}
