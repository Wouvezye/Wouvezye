import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import {
  getPostById,
  updatePost,
  deletePost,
  publishPost,
  unpublishPost,
  isSlugAvailable,
  generateSlug,
} from "@/lib/posts"

type RouteParams = {
  params: Promise<{ id: string }>
}

// GET /api/posts/[id] - Get a single post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const post = await getPostById(id)

    if (!post) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 })
    }

    // Check if user can view draft/members-only posts
    const user = await getCurrentUser()
    const isAuthorized = user && (user.role === "ADMIN" || user.role === "REDACTEUR")

    if (post.status === "DRAFT" && !isAuthorized) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 })
    }

    if (post.isMembersOnly && !user) {
      return NextResponse.json({ error: "Réservé aux membres" }, { status: 403 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération de l'article" }, { status: 500 })
  }
}

// PATCH /api/posts/[id] - Update a post
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser()

    if (!user || (user.role !== "ADMIN" && user.role !== "REDACTEUR")) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const { id } = await params
    const post = await getPostById(id)

    if (!post) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 })
    }

    const body = await request.json()
    const { title, slug, excerpt, content, category, isMembersOnly, status, publishedAt } = body

    // Build update data
    const updateData: Parameters<typeof updatePost>[1] = {}

    if (title !== undefined) updateData.title = title
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (content !== undefined) updateData.content = content
    if (category !== undefined) updateData.category = category
    if (isMembersOnly !== undefined) updateData.isMembersOnly = isMembersOnly
    if (status !== undefined) updateData.status = status
    if (publishedAt !== undefined) {
      updateData.publishedAt = publishedAt ? new Date(publishedAt) : null
    }

    // Handle slug changes
    if (slug && slug !== post.slug) {
      const newSlug = generateSlug(slug)
      if (!(await isSlugAvailable(newSlug, id))) {
        return NextResponse.json({ error: "Ce slug est déjà utilisé" }, { status: 400 })
      }
      updateData.slug = newSlug
    }

    const updatedPost = await updatePost(id, updateData)
    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour de l'article" }, { status: 500 })
  }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const { id } = await params
    const post = await getPostById(id)

    if (!post) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 })
    }

    await deletePost(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression de l'article" }, { status: 500 })
  }
}
