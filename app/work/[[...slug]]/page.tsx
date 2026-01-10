import React from 'react'
import { sections } from 'app/work/data'
import { prisma } from '@/lib/prisma'
import { SITE_PUBLIC_URL } from '@/utils/constants'
import { getVideoAsset } from '@/utils/videoAssets'
import type { Metadata } from 'next'

import Project from '@/components/Project'
import Schema from '@/components/Schema'

import styles from '@components/Work/Work.module.css'

// Helper function to generate a random rotation value (-0.125 to 0.125)
function generateRotate() {
  return (Math.random() - 0.5) * 0.25
}

async function getProjects(categorySlug?: string) {
  try {
    const projects = await prisma.project.findMany({
      where: categorySlug && categorySlug !== 'all' ? {
        categories: {
          some: {
            slug: categorySlug,
          },
        },
      } : undefined,
      include: {
        categories: {
          select: {
            slug: true,
            name: true,
          },
        },
        skills: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })

    // Transform to match the expected format with generated rotate values
    return projects.map(project => ({
      id: project.slug,
      rotate: generateRotate(),
      title: project.title,
      client: project.client,
      year: project.year,
      projectType: project.projectType.replace('_', ' '),
      categories: project.categories.map(c => c.slug),
      agency: project.agency,
      logo: project.logo,
      screenshotNoir: project.screenshotNoir,
      screenshot: project.screenshot,
      url: project.url,
      media: getVideoAsset(project.media || ''),
      mediaType: project.mediaType.toLowerCase(),
      skills: project.skills.map(s => s.name),
      notes: project.notes,
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

type WorkProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateMetadata({ params }: WorkProps): Promise<Metadata> {
  const { slug } = await params
  const activeSection = slug ? sections.find(item => item.id === slug[0]) : sections[0]
  const projectSlug = slug?.[1]
  
  let activeProject = null
  if (projectSlug) {
    const projects = await getProjects()
    activeProject = projects.find(p => p.id === projectSlug)
  }
  
  const SEO_DEFAULT_IMAGE = `${SITE_PUBLIC_URL}/images/bootsified-seo.jpg`
  
  const pageTitle = activeSection?.seoTitle || 'My Projects'
  const pageDescription = activeSection?.seoDescription || "A curated collection of front-end development, music, and creative projects showcasing craft, curiosity, and attention to detail."
  const pageURL = activeProject 
    ? `${SITE_PUBLIC_URL}/work/${activeProject.categories[0]}/${activeProject.id}`
    : `${SITE_PUBLIC_URL}/work${slug ? `/${slug[0]}` : ''}`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageURL
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      images: [SEO_DEFAULT_IMAGE],
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageURL,
      images: [
        {
          url: SEO_DEFAULT_IMAGE,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

const WorkPage = async ({ params }: WorkProps) => {
  const { slug } = await params
  const activeSection = slug ? sections.find(item => item.id === slug[0]) : sections[0]
  
  // Get project ID from second slug segment (e.g., /work/web-dev/mizzen)
  const projectSlug = slug?.[1]
  
  // Fetch projects from database
  const categorySlug = activeSection?.id
  const projects = await getProjects(categorySlug)
  
  const activeProject = projectSlug ? projects.find(p => p.id === projectSlug) : null

  // Generate schema for individual project if one is selected
  let projectSchema = null
  if (activeProject) {
    const hasExternalLink = activeProject.url && activeProject.url !== ''
    const schemaType = hasExternalLink ? 'WebSite' : 'CreativeWork'
    const projectURL = `https://boots.dev/work/${activeProject.categories[0]}/${activeProject.id}`
    
    projectSchema = [
      {
        '@context': 'https://schema.org',
        '@type': schemaType,
        '@id': projectURL,
        name: activeProject.title,
        dateCreated: activeProject.year,
        about: activeProject.skills.join(', '),
        description: activeProject.skills.join(', '),
        keywords: activeProject.skills,
        image: `${SITE_PUBLIC_URL}${activeProject.screenshot}`,
        ...(hasExternalLink && { url: activeProject.url }),
        creator: { '@id': 'https://boots.dev/#person' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boots.dev/' },
          { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://boots.dev/work' },
          { '@type': 'ListItem', position: 3, name: activeProject.title, item: projectURL }
        ]
      }
    ]
  } else {
    // Category or main work page - just breadcrumbs
    const workURL = slug?.[0] ? `https://boots.dev/work/${slug[0]}` : 'https://boots.dev/work'
    projectSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boots.dev/' },
        { '@type': 'ListItem', position: 2, name: 'Work', item: workURL }
      ]
    }
  }

  return (
    <>
      {projectSchema && <Schema data={projectSchema} />}
      {activeSection?.description && (
        <p
          className={styles.introText}
          dangerouslySetInnerHTML={{ __html: activeSection?.description }}
        />
      )}
      <div className={styles.projects}>
        {projects.length ? (
          projects.map(proj => (
            <Project 
              key={proj.id} 
              project={proj} 
              rotate={proj.rotate}
              initialOpen={projectSlug === proj.id}
            />
          ))
        ) : (
          <p className={styles.noResults}>
            Oooops... There aren&rsquo;t any results for&nbsp;this&nbsp;category :(
          </p>
        )}
      </div>
    </>
  )
}

export default WorkPage
