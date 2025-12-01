import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Lock, Mail, Inbox } from "lucide-react"
import { MessagesClient } from "@/components/admin/messages-client"

export const metadata = {
  title: "Messages – Administration Wuvè Zyé",
  description: "Messages reçus pendant la maintenance.",
}

export default async function MessagesPage() {
  const user = await getCurrentUser()

  // Redirect if not logged in
  if (!user) {
    redirect("/login?redirect=/admin/messages")
  }

  // Check if user is admin
  if (user.role !== "ADMIN") {
    return (
      <div className="bg-background min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Accès refusé</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Seuls les administrateurs peuvent accéder à cette page.</p>
            <Button asChild>
              <Link href="/admin">Retour à l'administration</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-zinc-900 text-white py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'administration
          </Link>
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold">Messages de maintenance</h1>
          </div>
          <p className="mt-2 text-white/70">
            Messages envoyés via le formulaire de contact pendant la maintenance.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <MessagesClient />
        </div>
      </section>
    </div>
  )
}
