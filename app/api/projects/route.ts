import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { ProjectType, MediaType } from '@prisma/client'
import { validateProjectPayload } from '@/lib/validation'

type ProjectPayload = {
  slug: string
  title: string
  client?: string
  year?: string
  projectType?: string
  agency?: string
  logo?: string
  screenshotNoir?: string
  screenshot?: string
  url?: string
  staticPortfolio?: boolean
  media?: string
  mediaType?: string
  notes?: string
  categoryIds?: string[]
  skillIds?: string[]
}

export const dynamic = 'force-dynamic'

// GET all projects
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let projects

    if (category && category !== 'all') {
      projects = await prisma.project.findMany({
        where: {
          categories: {
            some: {
              slug: category,
            },
          },
        },
        include: {
          categories: true,
          skills: true,
        },
        orderBy: {
          order: 'asc',
        },
      })
    } else {
      projects = await prisma.project.findMany({
        include: {
          categories: true,
          skills: true,
        },
        orderBy: {
          order: 'asc',
        },
      })
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST create new project
export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    if (!validateProjectPayload(data)) {
      return NextResponse.json({ error: 'Invalid project payload' }, { status: 400 })
    }

    const payload = data as ProjectPayload

    // Get the highest order value
    const highestOrder = await prisma.project.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = (highestOrder?.order ?? -1) + 1

    const project = await prisma.project.create({
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
        order: newOrder,
        categories: {
          connect: payload.categoryIds?.map((id: string) => ({ id })) || [],
        },
        skills: {
          connect: payload.skillIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        categories: true,
        skills: true,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
