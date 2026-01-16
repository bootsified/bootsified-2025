import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { ProjectType, MediaType } from '@prisma/client'

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
    const data = await request.json()

    const project = await prisma.project.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        client: data.client,
        year: data.year,
        projectType: data.projectType as ProjectType,
        agency: data.agency || '',
        logo: data.logo,
        screenshotNoir: data.screenshotNoir,
        screenshot: data.screenshot,
        url: data.url || '',
        staticPortfolio: data.staticPortfolio ?? false,
        media: data.media || '',
        mediaType: data.mediaType as MediaType,
        notes: data.notes,
        categories: {
          set: data.categoryIds?.map((id: string) => ({ id })) || [],
        },
        skills: {
          set: data.skillIds?.map((id: string) => ({ id })) || [],
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
