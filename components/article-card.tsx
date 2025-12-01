"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Lock, ArrowRight, Clock, Star } from "lucide-react"

interface ArticleCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  isMembersOnly: boolean
  featured?: boolean
  publishedAt: Date | string | null
  status?: string
  showFeaturedBadge?: boolean
  variant?: "default" | "featured"
}

function formatDate(date: Date | string | null): string {
  if (!date) return ""
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function isDraft(publishedAt: Date | string | null, status?: string): boolean {
  if (status === "DRAFT") return true
  if (!publishedAt) return true
  return new Date(publishedAt) > new Date()
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

// Track click - fire and forget
async function trackClick(slug: string) {
  try {
    await fetch("/api/article-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
  } catch {
    // Ignore errors - don't block navigation
  }
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  isMembersOnly,
  featured = false,
  publishedAt,
  status,
  showFeaturedBadge = false,
  variant = "default",
}: ArticleCardProps) {
  const isComingSoon = isDraft(publishedAt, status)

  const handleClick = () => {
    if (!isComingSoon) {
      trackClick(slug)
    }
  }

  return (
    <Card
      className={`flex flex-col h-full transition-shadow ${
        isComingSoon ? "opacity-75" : "hover:shadow-lg"
      } ${variant === "featured" ? "border-primary/50 bg-primary/5" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={getCategoryColor(category)}>{category}</Badge>
          {isMembersOnly && (
            <Badge variant="outline" className="gap-1">
              <Lock className="h-3 w-3" />
              Membres
            </Badge>
          )}
          {showFeaturedBadge && featured && (
            <Badge className="gap-1 bg-primary/20 text-primary border-primary/30">
              <Star className="h-3 w-3" />
              À la une
            </Badge>
          )}
          {isComingSoon && (
            <Badge
              variant="secondary"
              className="gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            >
              <Clock className="h-3 w-3" />
              Bientôt
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-bold mt-3 leading-tight text-balance">
          {isComingSoon ? (
            <span className="text-muted-foreground">{title}</span>
          ) : (
            <Link
              href={`/blog/${slug}`}
              className="hover:text-primary transition-colors"
              onClick={handleClick}
            >
              {title}
            </Link>
          )}
        </h2>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground leading-relaxed line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isComingSoon ? (
            <span className="italic">En préparation</span>
          ) : (
            <>
              <Calendar className="h-4 w-4" />
              <time dateTime={new Date(publishedAt!).toISOString()}>{formatDate(publishedAt)}</time>
            </>
          )}
        </div>
        {!isComingSoon && (
          <Button variant="ghost" size="sm" asChild className="gap-1" onClick={handleClick}>
            <Link href={`/blog/${slug}`}>
              Lire
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
