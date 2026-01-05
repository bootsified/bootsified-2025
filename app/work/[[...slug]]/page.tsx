import React from 'react'
import { projects, sections } from 'app/work/data'
import { SITE_PUBLIC_URL, SEO_DEFAULT_IMAGE } from '@/utils/constants'
import type { Metadata } from 'next'

import Project from '@/components/Project'

import styles from '@components/Work/Work.module.css'

type WorkProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateMetadata({ params }: WorkProps): Promise<Metadata> {
  const { slug } = await params
  const activeSection = slug ? sections.find(item => item.id === slug[0]) : sections[0]
  
  const pageTitle = activeSection?.seoTitle || 'My Projects'
  const pageDescription = activeSection?.seoDescription || "A curated collection of front-end development, music, and creative projects showcasing craft, curiosity, and attention to detail."
  const pageURL = `${SITE_PUBLIC_URL}/work${slug ? `/${slug[0]}` : ''}`

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
  const projectId = slug?.[1]
  
  let filteredProjects = projects

  if (activeSection?.id !== 'all') {
    filteredProjects = projects.filter(proj => proj.category === activeSection?.id)
  }

  return (
    <>
      {activeSection?.description && (
        <p
          className={styles.introText}
          dangerouslySetInnerHTML={{ __html: activeSection?.description }}
        />
      )}
      <div className={styles.projects}>
        {filteredProjects.length ? (
          filteredProjects.map(proj => (
            <Project 
              key={proj.id} 
              project={proj} 
              rotate={proj.rotate}
              initialOpen={projectId === proj.id}
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
