"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { BookOpen, Loader2 } from "lucide-react"
import type { ArticleALaUne } from "@/lib/articles"

export function ArticlesSection() {
  const [articles, setArticles] = useState<ArticleALaUne[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles-une?count=3")
        if (response.ok) {
          const data = await response.json()
          setArticles(data.articles || [])
        }
      } catch {
        // Ignore errors - section will just not show
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticles()
  }, [])

  // Don't render if no articles or loading
  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-zinc-900 dark:bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-zinc-900 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/20">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Nos articles</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Guides pratiques, décryptages, conseils pour se défendre.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              isMembersOnly={article.isMembersOnly}
              featured={article.featured}
              publishedAt={article.publishedAt}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent font-bold"
          >
            <Link href="/blog">Voir tous les articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
