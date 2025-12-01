"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Inbox, RefreshCw, Loader2, Mail, Clock, User } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: number
  ip: string
}

export function MessagesClient() {
  const [messages, setMessages] = useState<Message[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || "wuvezye-admin-2024"
      const response = await fetch("/api/contact/maintenance", {
        headers: {
          Authorization: `Bearer ${adminSecret}`,
        },
      })

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des messages")
      }

      const data = await response.json()
      setMessages(data.messages || [])
      setTotal(data.total || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (isLoading) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Chargement des messages...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="py-12 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchMessages} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (messages.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Aucun message</h3>
          <p className="text-muted-foreground">
            Les messages envoyés via le formulaire de maintenance apparaîtront ici.
          </p>
          <Button onClick={fetchMessages} variant="outline" className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {messages.length} message{messages.length > 1 ? "s" : ""}
          </h2>
          {total > messages.length && (
            <p className="text-sm text-muted-foreground">
              Affichage des {messages.length} derniers sur {total} total
            </p>
          )}
        </div>
        <Button onClick={fetchMessages} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((message) => (
            <Card key={message.id} className="hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{message.subject}</CardTitle>
                    <CardDescription className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {message.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <a href={`mailto:${message.email}`} className="hover:underline text-primary">
                          {message.email}
                        </a>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(message.timestamp).toLocaleString("fr-FR")}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono shrink-0">
                    {message.id.slice(0, 12)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">IP: {message.ip}</span>
                  <Button asChild size="sm" variant="outline">
                    <a href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Répondre
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
