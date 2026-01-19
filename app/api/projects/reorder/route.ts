import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { reorderSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = reorderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', errors: parsed.error.format() }, { status: 400 })
    }

    const { projectIds } = parsed.data

    // Rate limiting for reorder operations (per IP)
    const { checkRateLimitKey } = await import('@/lib/rateLimit')
    const ip = (request as Request).headers.get('x-forwarded-for') || 'unknown'
    if (!(await checkRateLimitKey(`reorder:${ip}`, 5, 60 * 60 * 1000))) {
      return NextResponse.json({ error: 'Too many reorder requests' }, { status: 429 })
    }

    // Update each project's order
    const updates = projectIds.map((id, index) =>
      prisma.project.update({
        where: { id },
        data: { order: index },
      })
    )

    await prisma.$transaction(updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering projects:', error)
    return NextResponse.json(
      { error: 'Failed to reorder projects' },
      { status: 500 }
    )
  }
}
