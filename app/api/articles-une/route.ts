import { NextRequest, NextResponse } from "next/server"
import { getArticlesALaUne } from "@/lib/articles"

// GET: Fetch articles à la une
// Cache for 5 minutes with stale-while-revalidate
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get("count") || "3", 10)

    // Limit to reasonable range
    const safeCount = Math.min(Math.max(count, 1), 10)

    const articles = await getArticlesALaUne(safeCount)

    return NextResponse.json(
      { articles },
      {
        headers: {
          // Cache for 5 minutes, allow stale content for 1 hour while revalidating
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        },
      }
    )
  } catch (error) {
    console.error("[ARTICLES UNE ERROR]", error)
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 })
  }
}
