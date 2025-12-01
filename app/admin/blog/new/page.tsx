import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PostForm } from "@/components/post-form"
import { ArrowLeft, Lock } from "lucide-react"

export const metadata = {
  title: "Nouvel article – Administration – Wuvè Zyé",
  description: "Créer un nouvel article de blog.",
}

export default async function NewPostPage() {
  const user = await getCurrentUser()

  // Redirect if not logged in
  if (!user) {
    redirect("/login?redirect=/admin/blog/new")
  }

  // Check if user is admin or redacteur
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

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-zinc-900 text-white py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Nouvel article</h1>
          <p className="mt-2 text-white/70">Créer un nouveau contenu pour le blog</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <PostForm mode="create" />
        </div>
      </section>
    </div>
  )
}
