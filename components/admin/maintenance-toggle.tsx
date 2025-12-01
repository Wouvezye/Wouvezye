"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Wrench, AlertTriangle, Check, Loader2, RefreshCw } from "lucide-react"

interface MaintenanceStatus {
  enabled: boolean
  message?: string
  enabledAt?: string
  enabledBy?: string
}

export function MaintenanceToggle() {
  const [status, setStatus] = useState<MaintenanceStatus>({ enabled: false })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch current status on mount
  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/maintenance")
      const data = await response.json()
      setStatus(data)
      if (data.message) {
        setCustomMessage(data.message)
      }
    } catch {
      setError("Impossible de charger le statut")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMaintenance = async (enabled: boolean) => {
    setIsSaving(true)
    setError(null)
    setShowSuccess(false)

    try {
      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled,
          message: customMessage || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour")
      }

      setStatus((prev) => ({ ...prev, enabled }))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

      // Refresh to get updated status
      await fetchStatus()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Chargement...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`border-2 ${status.enabled ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${status.enabled ? "bg-amber-500/20" : "bg-muted"}`}>
              <Wrench className={`h-6 w-6 ${status.enabled ? "text-amber-600" : "text-muted-foreground"}`} />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Mode maintenance
                {status.enabled ? (
                  <Badge variant="destructive" className="bg-amber-500 hover:bg-amber-600">
                    ACTIF
                  </Badge>
                ) : (
                  <Badge variant="secondary">Inactif</Badge>
                )}
              </CardTitle>
              <CardDescription>Activer ou désactiver le mode maintenance du site</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={fetchStatus} disabled={isLoading || isSaving}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Warning when enabled */}
        {status.enabled && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Le site est actuellement en maintenance</p>
              <p className="mt-1 opacity-80">
                Les visiteurs sont redirigés vers la page de maintenance. Seuls les administrateurs connectés peuvent
                accéder au site.
              </p>
              {status.enabledAt && (
                <p className="mt-2 text-xs opacity-70">
                  Activé le {new Date(status.enabledAt).toLocaleString("fr-FR")}
                  {status.enabledBy && ` par ${status.enabledBy}`}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="space-y-1">
            <Label htmlFor="maintenance-toggle" className="text-base font-medium cursor-pointer">
              {status.enabled ? "Désactiver la maintenance" : "Activer la maintenance"}
            </Label>
            <p className="text-sm text-muted-foreground">
              {status.enabled
                ? "Cliquez pour remettre le site en ligne"
                : "Cliquez pour mettre le site en maintenance"}
            </p>
          </div>
          <Switch
            id="maintenance-toggle"
            checked={status.enabled}
            onCheckedChange={toggleMaintenance}
            disabled={isSaving}
          />
        </div>

        {/* Custom message */}
        <div className="space-y-2">
          <Label htmlFor="maintenance-message">Message personnalisé (optionnel)</Label>
          <Input
            id="maintenance-message"
            placeholder="Ex: Retour prévu vers 18h00..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">
            Ce message sera affiché aux visiteurs sur la page de maintenance.
          </p>
        </div>

        {/* Update message button (only if maintenance is enabled) */}
        {status.enabled && customMessage !== status.message && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => toggleMaintenance(true)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Mise à jour...
              </>
            ) : (
              "Mettre à jour le message"
            )}
          </Button>
        )}

        {/* Success message */}
        {showSuccess && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
            <Check className="h-5 w-5" />
            <span className="text-sm">Modifications enregistrées avec succès</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
