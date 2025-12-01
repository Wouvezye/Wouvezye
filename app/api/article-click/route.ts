import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// POST: Track article click
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug } = body

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug requis" }, { status: 400 })
    }

    // Find the post by slug
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!post) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 })
    }

    // Upsert the article stats (create if doesn't exist, update if exists)
    await prisma.articleStats.upsert({
      where: { postId: post.id },
      update: {
        clicks: { increment: 1 },
        lastClicked: new Date(),
      },
      create: {
        postId: post.id,
        clicks: 1,
        lastClicked: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[ARTICLE CLICK ERROR]", error)
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 })
  }
}
