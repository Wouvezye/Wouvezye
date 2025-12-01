import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getPostById, publishPost, unpublishPost } from "@/lib/posts"

type RouteParams = {
  params: Promise<{ id: string }>
}

// POST /api/posts/[id]/publish - Publish a post
export async function POST(request: NextRequest, { params }: RouteParams) {
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

    const updatedPost = await publishPost(id)
    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    console.error("Error publishing post:", error)
    return NextResponse.json({ error: "Erreur lors de la publication de l'article" }, { status: 500 })
  }
}

// DELETE /api/posts/[id]/publish - Unpublish a post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const updatedPost = await unpublishPost(id)
    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    console.error("Error unpublishing post:", error)
    return NextResponse.json({ error: "Erreur lors de la dépublication de l'article" }, { status: 500 })
  }
}
