import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { getAllPosts, PostStatus } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Lock, Plus, Edit, Eye, FileText, Clock } from "lucide-react"

export const metadata = {
  title: "Administration Blog – Wuvè Zyé",
  description: "Espace d'administration du blog Wuvè Zyé.",
}

function formatDate(date: Date | null): string {
  if (!date) return "—"
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function AdminBlogPage() {
  const user = await getCurrentUser()

  // Redirect if not logged in
  if (!user) {
    redirect("/login?redirect=/admin/blog")
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

  const posts = await getAllPosts()
  const publishedCount = posts.filter((p) => p.status === PostStatus.PUBLISHED).length
  const draftCount = posts.filter((p) => p.status === PostStatus.DRAFT).length
  const membersOnlyCount = posts.filter((p) => p.isMembersOnly).length

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
          <h1 className="text-2xl md:text-3xl font-bold">Administration du blog</h1>
          <p className="mt-2 text-white/70">
            Connecté en tant que <span className="font-medium text-white">{user.email}</span>
            <Badge variant="secondary" className="ml-2">{user.role}</Badge>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total articles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{posts.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Publiés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Brouillons</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-600">{draftCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Réservés aux membres</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{membersOnlyCount}</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Articles</h2>
            <Button asChild className="gap-2">
              <Link href="/admin/blog/new">
                <Plus className="h-4 w-4" />
                Nouvel article
              </Link>
            </Button>
          </div>

          {/* Posts Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                    <TableHead className="hidden sm:table-cell">Statut</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="hidden lg:table-cell">Accès</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="font-medium line-clamp-1">{post.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                          {post.category} • {formatDate(post.publishedAt)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">{post.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {post.status === PostStatus.PUBLISHED ? (
                          <Badge className="gap-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            <FileText className="h-3 w-3" />
                            Publié
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" />
                            Brouillon
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {formatDate(post.publishedAt)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {post.isMembersOnly ? (
                          <Badge variant="outline" className="gap-1">
                            <Lock className="h-3 w-3" />
                            Membres
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Public</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/blog/${post.slug}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Voir</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/blog/${post.id}/edit`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Modifier</span>
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
