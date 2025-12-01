import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import {
  getAllPosts,
  getPublishedPosts,
  createPost,
  generateSlug,
  isSlugAvailable,
  PostStatus,
} from "@/lib/posts"

// GET /api/posts - List posts
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    const { searchParams } = new URL(request.url)
    const includeAll = searchParams.get("all") === "true"

    // Only admins and editors can see all posts (including drafts)
    if (includeAll && user && (user.role === "ADMIN" || user.role === "REDACTEUR")) {
      const posts = await getAllPosts()
      return NextResponse.json({ posts })
    }

    // Public: only published posts
    const posts = await getPublishedPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des articles" }, { status: 500 })
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    // Check authorization
    if (!user || (user.role !== "ADMIN" && user.role !== "REDACTEUR")) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const body = await request.json()
    const { title, excerpt, content, category, isMembersOnly, status, publishedAt } = body

    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: "Titre, extrait, contenu et catégorie sont requis" },
        { status: 400 }
      )
    }

    // Generate slug from title
    let slug = generateSlug(title)

    // Ensure slug is unique
    let counter = 1
    let baseSlug = slug
    while (!(await isSlugAvailable(slug))) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Create post
    const post = await createPost({
      title,
      slug,
      excerpt,
      content,
      category,
      isMembersOnly: isMembersOnly ?? false,
      status: status ?? PostStatus.DRAFT,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
      authorId: user.id,
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Erreur lors de la création de l'article" }, { status: 500 })
  }
}
