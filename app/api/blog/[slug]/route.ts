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

type RouteContext = {
  params: Promise<{
    slug: string
  }>
}

// GET single blog post by slug or ID
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { slug } = await context.params
    const authenticated = await isAuthenticated()
    
    // Check if we should lookup by ID instead of slug
    const { searchParams } = new URL(request.url)
    const byId = searchParams.get('byId') === 'true'

    const post = await prisma.blogPost.findUnique({
      where: byId ? { id: slug } : { slug },
      include: {
        categories: true,
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Only allow viewing drafts if authenticated
    if (post.status !== 'PUBLISHED' && !authenticated) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT update blog post
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await context.params
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    // Check if we should lookup by ID instead of slug
    const { searchParams } = new URL(request.url)
    const byId = searchParams.get('byId') === 'true'

    const data = await request.json()
    if (!validateBlogPostPayload(data)) {
      return NextResponse.json({ error: 'Invalid blog post payload' }, { status: 400 })
    }

    const payload = data as BlogPostPayload

    const post = await prisma.blogPost.update({
      where: byId ? { id: slug } : { slug },
      data: {
        slug: payload.slug,
        title: payload.title,
        excerpt: payload.excerpt,
        content: payload.content,
        featuredImage: payload.featuredImage || '',
        author: payload.author || 'Boots',
        publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : undefined,
        status: payload.status as PostStatus,
        categories: {
          set: payload.categoryIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        categories: true,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE blog post
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = await context.params
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    // Check if we should lookup by ID instead of slug
    const { searchParams } = new URL(request.url)
    const byId = searchParams.get('byId') === 'true'

    await prisma.blogPost.delete({
      where: byId ? { id: slug } : { slug },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
