import { prisma } from "./db"
import type { Post, User } from "@prisma/client"

// Post status constants
export const PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
} as const

export type PostStatusType = (typeof PostStatus)[keyof typeof PostStatus]

// User role constants
export const UserRole = {
  ADMIN: "ADMIN",
  REDACTEUR: "REDACTEUR",
  MEMBRE: "MEMBRE",
  INVITE: "INVITE",
} as const

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole]

// Post with author type
export type PostWithAuthor = Post & {
  author: User | null
}

// Get all published posts (public)
export async function getPublishedPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  })
}

// Get all posts (for admin)
export async function getAllPosts(): Promise<PostWithAuthor[]> {
  return prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

// Get public posts (non-members-only, published)
export async function getPublicPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      isMembersOnly: false,
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  })
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<PostWithAuthor | null> {
  return prisma.post.findUnique({
    where: { slug },
    include: { author: true },
  })
}

// Get post by ID
export async function getPostById(id: string): Promise<PostWithAuthor | null> {
  return prisma.post.findUnique({
    where: { id },
    include: { author: true },
  })
}

// Create a new post
export async function createPost(data: {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  isMembersOnly?: boolean
  status?: PostStatusType
  publishedAt?: Date | null
  authorId?: string
}): Promise<Post> {
  return prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      isMembersOnly: data.isMembersOnly ?? false,
      status: data.status ?? PostStatus.DRAFT,
      publishedAt: data.publishedAt,
      authorId: data.authorId,
    },
  })
}

// Update a post
export async function updatePost(
  id: string,
  data: Partial<{
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    isMembersOnly: boolean
    status: PostStatusType
    publishedAt: Date | null
  }>
): Promise<Post> {
  return prisma.post.update({
    where: { id },
    data,
  })
}

// Delete a post
export async function deletePost(id: string): Promise<Post> {
  return prisma.post.delete({
    where: { id },
  })
}

// Publish a post
export async function publishPost(id: string): Promise<Post> {
  return prisma.post.update({
    where: { id },
    data: {
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  })
}

// Unpublish a post (set to draft)
export async function unpublishPost(id: string): Promise<Post> {
  return prisma.post.update({
    where: { id },
    data: {
      status: PostStatus.DRAFT,
    },
  })
}

// Check if slug is available
export async function isSlugAvailable(slug: string, excludeId?: string): Promise<boolean> {
  const existing = await prisma.post.findFirst({
    where: {
      slug,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
  })
  return !existing
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .substring(0, 100) // Limit length
}

// Post categories
export const POST_CATEGORIES = [
  "RGPD",
  "Action collective",
  "Vie de l'asso",
  "Droits",
  "Protection",
  "Guide",
  "Autre",
] as const

export type PostCategory = (typeof POST_CATEGORIES)[number]
