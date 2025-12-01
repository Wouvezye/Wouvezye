import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPostBySlug, getPublishedPosts, PostStatus } from "@/lib/posts"
import { getCurrentUser } from "@/lib/auth"
import { Calendar, Lock, ArrowLeft, AlertTriangle, Heart, MessageSquare, Globe } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Article non trouvé" }

  return {
    title: `${post.title} – Wuvè Zyé`,
    description: post.excerpt,
  }
}

function formatDate(date: Date | null): string {
  if (!date) return ""
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Droits: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Protection: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    "Action collective": "bg-accent text-accent-foreground",
    RGPD: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Guide: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
    "Vie de l'asso": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    "Inspirations & luttes": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  }
  return colors[category] || "bg-muted text-muted-foreground"
}

// Get language info from slug suffix
function getLanguageInfo(slug: string): { code: string; label: string; flag: string } | null {
  const langMap: Record<string, { label: string; flag: string }> = {
    "-en": { label: "English", flag: "🇬🇧" },
    "-es": { label: "Español", flag: "🇪🇸" },
    "-mq": { label: "Kréyol Matinitjé", flag: "🇲🇶" },
    "-gp": { label: "Kréyol Gwadloupéyen", flag: "🇬🇵" },
    "-ht": { label: "Kreyòl Ayisyen", flag: "🇭🇹" },
    "-pt": { label: "Português", flag: "🇧🇷" },
  }

  for (const [suffix, info] of Object.entries(langMap)) {
    if (slug.endsWith(suffix)) {
      return { code: suffix.slice(1), ...info }
    }
  }
  return null
}

// Get base slug without language suffix
function getBaseSlug(slug: string): string {
  const suffixes = ["-en", "-es", "-mq", "-gp", "-ht", "-pt"]
  for (const suffix of suffixes) {
    if (slug.endsWith(suffix)) {
      return slug.slice(0, -suffix.length)
    }
  }
  return slug
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Check if post is published (unless user is admin/redacteur)
  const user = await getCurrentUser()
  const isAuthorized = user && (user.role === "ADMIN" || user.role === "REDACTEUR")

  if (post.status !== PostStatus.PUBLISHED && !isAuthorized) {
    notFound()
  }

  const canViewContent = !post.isMembersOnly || user !== null

  // Language handling
  const langInfo = getLanguageInfo(slug)
  const baseSlug = getBaseSlug(slug)

  // Get available translations (we'll check these exist)
  const availableLanguages = [
    { code: "fr", label: "Français", flag: "🇫🇷", slug: baseSlug },
    { code: "en", label: "English", flag: "🇬🇧", slug: `${baseSlug}-en` },
    { code: "es", label: "Español", flag: "🇪🇸", slug: `${baseSlug}-es` },
    { code: "mq", label: "Kréyol Matinitjé", flag: "🇲🇶", slug: `${baseSlug}-mq` },
    { code: "gp", label: "Kréyol Gwadloupéyen", flag: "🇬🇵", slug: `${baseSlug}-gp` },
  ]

  const currentLang = langInfo?.code || "fr"

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="bg-zinc-900 dark:bg-zinc-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
            {langInfo && (
              <Badge variant="outline" className="gap-1 border-white/30 text-white">
                <Globe className="h-3 w-3" />
                {langInfo.flag} {langInfo.label}
              </Badge>
            )}
            {post.isMembersOnly && (
              <Badge variant="outline" className="gap-1 border-white/30 text-white">
                <Lock className="h-3 w-3" />
                Réservé aux membres
              </Badge>
            )}
            {post.status === PostStatus.DRAFT && isAuthorized && (
              <Badge variant="secondary" className="gap-1">
                Brouillon
              </Badge>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance leading-tight">{post.title}</h1>

          <div className="flex items-center gap-2 mt-4 text-white/70">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.publishedAt?.toISOString() ?? undefined}>{formatDate(post.publishedAt)}</time>
            {post.author && (
              <span className="ml-4">Par {post.author.email}</span>
            )}
          </div>

          {/* Language Selector - shown if this is a translated article or base article has translations */}
          {(langInfo || baseSlug === slug) && availableLanguages.length > 1 && (
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
              <span className="text-sm text-white/50">Lire en :</span>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/blog/${lang.slug}`}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      currentLang === lang.code
                        ? "bg-primary text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="hidden sm:inline">{lang.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {canViewContent ? (
            <>
              {/* Article Content */}
              <MarkdownRenderer content={post.content} />

              {/* CTAs */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-xl font-bold mb-6">Et maintenant ?</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Button asChild size="lg" className="w-full gap-2">
                    <Link href="/probleme">
                      <AlertTriangle className="h-4 w-4" />
                      J'ai un problème
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full gap-2 bg-transparent">
                    <Link href="/adhesion-et-dons">
                      <Heart className="h-4 w-4" />
                      Je deviens membre
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg" className="w-full gap-2">
                    <Link href="/adhesion-et-dons#dons">
                      <MessageSquare className="h-4 w-4" />
                      Je finance les audits
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Members Only Block */
            <Card className="border-2 border-dashed">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Contenu réservé aux membres Wuvè Zyé</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Cet article est exclusivement accessible aux membres de l'association. Connectez-vous ou
                  rejoignez-nous pour y accéder.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href={`/login?redirect=/blog/${post.slug}`}>Me connecter</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                    <Link href="/adhesion-et-dons">Devenir membre</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </article>
    </div>
  )
}
