import React from 'react'
import { prisma } from '@/lib/prisma'
import { getVideoAsset } from '@/utils/videoAssets'

import Project from '@/components/Project'

import Button from '../Button'

import styles from './FeaturedProjects.module.css'

// Helper function to generate a random rotation value (-0.125 to 0.125)
function generateRotate() {
  return (Math.random() - 0.5) * 0.25
}

const FeaturedProjects = async () => {
  // Fetch first 3 projects from database
  const projects = await prisma.project.findMany({
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
    take: 3,
  })

  // Transform to match the expected format
  const featuredArray = projects.map(project => ({
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

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Some featured projects</h2>
      <div className={styles.list}>
        {featuredArray.length &&
          featuredArray.map(proj => <Project key={proj.id} project={proj} rotate={proj.rotate} />)}
      </div>
      <p className={styles.cta}>
				<Button href="/work" variant="outline">
					See more of my work
				</Button>
      </p>
    </section>
  )
}

export default FeaturedProjects
