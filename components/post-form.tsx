"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Send, Eye, Trash2 } from "lucide-react"
import { POST_CATEGORIES } from "@/lib/posts"

interface PostFormProps {
  post?: {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    isMembersOnly: boolean
    status: string
    publishedAt: Date | null
  }
  mode: "create" | "edit"
}

export function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    category: post?.category ?? "Autre",
    isMembersOnly: post?.isMembersOnly ?? false,
  })

  const handleSubmit = async (action: "draft" | "publish") => {
    setIsLoading(true)
    setError(null)

    try {
      const endpoint = mode === "create" ? "/api/posts" : `/api/posts/${post?.id}`
      const method = mode === "create" ? "POST" : "PATCH"

      const body = {
        ...formData,
        status: action === "publish" ? "PUBLISHED" : "DRAFT",
        publishedAt: action === "publish" ? new Date().toISOString() : null,
      }

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue")
      }

      router.push("/admin/blog")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublishToggle = async () => {
    if (!post) return
    setIsLoading(true)
    setError(null)

    try {
      const isPublished = post.status === "PUBLISHED"
      const response = await fetch(`/api/posts/${post.id}/publish`, {
        method: isPublished ? "DELETE" : "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue")
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm("Supprimer cet article ? Cette action est irréversible.")) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue")
      }

      router.push("/admin/blog")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Contenu</CardTitle>
          <CardDescription>Titre, extrait et contenu de l'article</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Titre de l'article"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Extrait *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Court résumé affiché dans la liste des articles"
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu (Markdown) *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Contenu de l'article en Markdown..."
              rows={15}
              className="font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">
              Utilisez ## pour les titres, ### pour les sous-titres, **texte** pour le gras, - pour les listes.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
          <CardDescription>Catégorie et accès</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {POST_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="membersOnly">Réservé aux membres</Label>
              <p className="text-sm text-muted-foreground">
                L'article ne sera visible que par les membres connectés
              </p>
            </div>
            <Switch
              id="membersOnly"
              checked={formData.isMembersOnly}
              onCheckedChange={(checked) => setFormData({ ...formData, isMembersOnly: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {mode === "edit" && post && (
          <>
            <Button
              variant="outline"
              onClick={() => router.push(`/blog/${post.slug}`)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Voir l'article
            </Button>

            <Button
              variant={post.status === "PUBLISHED" ? "secondary" : "default"}
              onClick={handlePublishToggle}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : post.status === "PUBLISHED" ? (
                <>Dépublier</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Publier
                </>
              )}
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              className="gap-2 sm:ml-auto"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </Button>
          </>
        )}

        {mode === "create" && (
          <>
            <Button
              variant="outline"
              onClick={() => handleSubmit("draft")}
              disabled={isLoading || !formData.title || !formData.excerpt || !formData.content}
              className="gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Enregistrer comme brouillon
            </Button>

            <Button
              onClick={() => handleSubmit("publish")}
              disabled={isLoading || !formData.title || !formData.excerpt || !formData.content}
              className="gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Publier
            </Button>
          </>
        )}

        {mode === "edit" && (
          <Button
            onClick={() => handleSubmit(post?.status === "PUBLISHED" ? "publish" : "draft")}
            disabled={isLoading || !formData.title || !formData.excerpt || !formData.content}
            className="gap-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Enregistrer
          </Button>
        )}
      </div>
    </div>
  )
}
