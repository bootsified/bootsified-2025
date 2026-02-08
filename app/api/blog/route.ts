import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { PostStatus } from '@prisma/client'
import { validateBlogPostPayload } from '@/lib/validation'

type BlogPostPayload = {
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage?: string
  author?: string
  publishedAt?: string
  status?: string
  categoryIds?: string[]
}

export const dynamic = 'force-dynamic'

// GET all blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const authenticated = await isAuthenticated()

    let posts

    const whereClause = authenticated
      ? {}
      : { status: 'PUBLISHED' as PostStatus }

    if (category && category !== 'all') {
      posts = await prisma.blogPost.findMany({
        where: {
          ...whereClause,
          categories: {
            some: {
              slug: category,
            },
          },
        },
        include: {
          categories: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
      })
    } else {
      posts = await prisma.blogPost.findMany({
        where: whereClause,
        include: {
          categories: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
      })
    }

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST create new blog post
export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    if (!validateBlogPostPayload(data)) {
      return NextResponse.json({ error: 'Invalid blog post payload' }, { status: 400 })
    }

    const payload = data as BlogPostPayload

    // Get the highest order value
    const highestOrder = await prisma.blogPost.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = (highestOrder?.order ?? -1) + 1

    const post = await prisma.blogPost.create({
      data: {
        slug: payload.slug,
        title: payload.title,
        excerpt: payload.excerpt,
        content: payload.content,
        featuredImage: payload.featuredImage || '',
        author: payload.author || 'Boots',
        publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : new Date(),
        status: payload.status as PostStatus || 'DRAFT',
        order: newOrder,
        categories: {
          connect: payload.categoryIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        categories: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
