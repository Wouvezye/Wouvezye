import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Lock, FileText, Settings, Users, BarChart3 } from "lucide-react"
import { MaintenanceToggle } from "@/components/admin/maintenance-toggle"

export const metadata = {
  title: "Administration – Wuvè Zyé",
  description: "Tableau de bord d'administration Wuvè Zyé.",
}

export default async function AdminPage() {
  const user = await getCurrentUser()

  // Redirect if not logged in
  if (!user) {
    redirect("/login?redirect=/admin")
  }

  // Check if user is admin
  if (user.role !== "ADMIN" && user.role !== "REDACTEUR") {
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
            <p className="text-muted-foreground">Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
            <Button asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isAdmin = user.role === "ADMIN"

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-zinc-900 text-white py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au site
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Administration</h1>
          <p className="mt-2 text-white/70">
            Connecté en tant que <span className="font-medium text-white">{user.email}</span>
            <Badge variant="secondary" className="ml-2">
              {user.role}
            </Badge>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Maintenance Toggle - Admin only */}
          {isAdmin && (
            <div className="mb-8">
              <MaintenanceToggle />
            </div>
          )}

          {/* Admin Sections */}
          <h2 className="text-xl font-bold mb-6">Sections d'administration</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Blog Management */}
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Blog</CardTitle>
                    <CardDescription>Gérer les articles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Créer, modifier et publier des articles de blog.
                </p>
                <Button asChild className="w-full">
                  <Link href="/admin/blog">Accéder au blog</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Messages - Admin only */}
            {isAdmin && (
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Messages</CardTitle>
                      <CardDescription>Contact maintenance</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Voir les messages envoyés via le formulaire de maintenance.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/messages">Voir les messages</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Stats - Admin only */}
            {isAdmin && (
              <Card className="hover:border-primary/50 transition-colors opacity-60">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <BarChart3 className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Statistiques</CardTitle>
                      <CardDescription>Bientôt disponible</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Statistiques de visite et d'engagement.
                  </p>
                  <Button disabled variant="outline" className="w-full">
                    Bientôt disponible
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Settings - Admin only */}
            {isAdmin && (
              <Card className="hover:border-primary/50 transition-colors opacity-60">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <Settings className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Paramètres</CardTitle>
                      <CardDescription>Bientôt disponible</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configuration générale du site.
                  </p>
                  <Button disabled variant="outline" className="w-full">
                    Bientôt disponible
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
