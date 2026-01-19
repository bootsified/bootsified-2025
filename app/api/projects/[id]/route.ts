import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { ProjectType, MediaType } from '@prisma/client'
import { validateProjectPayload } from '@/lib/validation'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

// GET single project
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        categories: true,
        skills: true,
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT update project
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    const data = await request.json()
    if (!validateProjectPayload(data)) {
      return NextResponse.json({ error: 'Invalid project payload' }, { status: 400 })
    }

    const payload = data as Record<string, any>

    const project = await prisma.project.update({
      where: { id },
      data: {
        slug: payload.slug,
        title: payload.title,
        client: payload.client || '',
        year: payload.year || '',
        projectType: payload.projectType as ProjectType,
        agency: payload.agency || '',
        logo: payload.logo || '',
        screenshotNoir: payload.screenshotNoir || '',
        screenshot: payload.screenshot || '',
        url: payload.url || '',
        staticPortfolio: payload.staticPortfolio ?? false,
        media: payload.media || '',
        mediaType: payload.mediaType as MediaType,
        notes: payload.notes || '',
        categories: {
          set: payload.categoryIds?.map((id: string) => ({ id })) || [],
        },
        skills: {
          set: payload.skillIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        categories: true,
        skills: true,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE project
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
