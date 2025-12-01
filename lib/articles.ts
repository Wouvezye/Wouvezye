import { prisma } from "@/lib/db"

export interface ArticleALaUne {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  isMembersOnly: boolean
  featured: boolean
  publishedAt: Date | null
  clicks: number
}

/**
 * Get articles "à la une" with intelligent selection
 *
 * Logic:
 * 1. Featured articles are always included first
 * 2. For normal articles, calculate a score:
 *    score = (clicks * 0.7) + (random * 0.3)
 *    This allows popular articles to stay visible while giving
 *    less-clicked articles a chance to appear
 * 3. Return the top [count] articles
 */
export async function getArticlesALaUne(count: number = 3): Promise<ArticleALaUne[]> {
  // Get all published articles with their stats
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: {
        lte: new Date(),
      },
    },
    include: {
      stats: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  })

  if (posts.length === 0) {
    return []
  }

  // Separate featured and normal articles
  const featuredArticles: ArticleALaUne[] = []
  const normalArticles: Array<ArticleALaUne & { score: number }> = []

  // Find max clicks for normalization
  const maxClicks = Math.max(...posts.map((p) => p.stats?.clicks || 0), 1)

  for (const post of posts) {
    const article: ArticleALaUne = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      isMembersOnly: post.isMembersOnly,
      featured: post.featured,
      publishedAt: post.publishedAt,
      clicks: post.stats?.clicks || 0,
    }

    if (post.featured) {
      featuredArticles.push(article)
    } else {
      // Calculate score: 70% clicks (normalized) + 30% random
      const normalizedClicks = (post.stats?.clicks || 0) / maxClicks
      const randomFactor = Math.random()
      const score = normalizedClicks * 0.7 + randomFactor * 0.3

      normalArticles.push({ ...article, score })
    }
  }

  // Sort normal articles by score (descending)
  normalArticles.sort((a, b) => b.score - a.score)

  // Combine: featured first, then by score
  const result: ArticleALaUne[] = []

  // Add featured articles first (up to count)
  for (const article of featuredArticles) {
    if (result.length >= count) break
    result.push(article)
  }

  // Fill remaining slots with normal articles by score
  for (const article of normalArticles) {
    if (result.length >= count) break
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { score, ...articleWithoutScore } = article
    result.push(articleWithoutScore)
  }

  return result
}

/**
 * Get all published articles sorted by date
 */
export async function getAllPublishedArticles() {
  return prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: {
        lte: new Date(),
      },
    },
    include: {
      stats: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  })
}

/**
 * Track article click (fire and forget)
 */
export async function trackArticleClick(slug: string): Promise<void> {
  try {
    await fetch("/api/article-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
  } catch {
    // Fire and forget - don't block navigation
  }
}
