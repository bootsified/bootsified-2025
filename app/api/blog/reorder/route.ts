import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { validateReorderBlogPostsPayload } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    if (!validateReorderBlogPostsPayload(data)) {
      return NextResponse.json({ error: 'Invalid reorder payload' }, { status: 400 })
    }

    const { postIds } = data as { postIds: string[] }

    // Update order for each post
    await Promise.all(
      postIds.map((id, index) =>
        prisma.blogPost.update({
          where: { id },
          data: { order: index },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to reorder blog posts' },
      { status: 500 }
    )
  }
}
