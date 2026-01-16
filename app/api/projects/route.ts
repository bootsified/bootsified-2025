import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { ProjectType, MediaType } from '@prisma/client'

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

    // Get the highest order value
    const highestOrder = await prisma.project.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = (highestOrder?.order ?? -1) + 1

    const project = await prisma.project.create({
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
        order: newOrder,
        categories: {
          connect: data.categoryIds?.map((id: string) => ({ id })) || [],
        },
        skills: {
          connect: data.skillIds?.map((id: string) => ({ id })) || [],
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
