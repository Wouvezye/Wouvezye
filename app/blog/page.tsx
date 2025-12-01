import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPublishedPosts } from "@/lib/posts"
import { getArticlesALaUne } from "@/lib/articles"
import { ArticleCard } from "@/components/article-card"
import { Star } from "lucide-react"

export const metadata = {
  title: "Blog – Wuvè Zyé",
  description: "Actualités, conseils et guides pour les consommateurs martiniquais. Défendez vos droits avec Wuvè Zyé.",
}

export default async function BlogPage() {
  // Fetch articles à la une (3) and all posts in parallel
  const [articlesUne, posts] = await Promise.all([getArticlesALaUne(3), getPublishedPosts()])

  // Get slugs of articles à la une to exclude from "Tous les articles"
  const uneSlugs = new Set(articlesUne.map((a) => a.slug))

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-zinc-900 dark:bg-zinc-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">Le blog de Wuvè Zyé</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Actualités, conseils pratiques et guides pour défendre vos droits de consommateur en Martinique.
          </p>
        </div>
      </section>

      {/* À la une Section */}
      {articlesUne.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">À la une</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articlesUne.map((article) => (
                <ArticleCard
                  key={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  isMembersOnly={article.isMembersOnly}
                  featured={article.featured}
                  publishedAt={article.publishedAt}
                  showFeaturedBadge={true}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tous les articles */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Tous les articles</h2>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun article publié pour le moment.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts
                .filter((post) => !uneSlugs.has(post.slug))
                .map((post) => (
                  <ArticleCard
                    key={post.id}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    isMembersOnly={post.isMembersOnly}
                    featured={post.featured}
                    publishedAt={post.publishedAt}
                    status={post.status}
                  />
                ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Vous avez un problème de consommation ?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Wuvè Zyé est là pour vous accompagner dans vos démarches.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/probleme">Signaler un problème</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              <Link href="/adhesion-et-dons">Devenir membre</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
