import React from 'react'
import { sections } from 'app/work/data'
import { SITE_PUBLIC_URL } from '@/utils/constants'
import type { Metadata } from 'next'

import Schema from '@/components/Schema'
import WorkClient from '@/components/Work/WorkClient'
import { PageHandleSetter } from '@/components/PageHandleSetter'

type WorkProps = {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateMetadata({ params }: WorkProps): Promise<Metadata> {
  const { slug } = await params
  const activeSection = slug ? sections.find(item => item.id === slug[0]) : sections[0]
  
  const SEO_DEFAULT_IMAGE = `${SITE_PUBLIC_URL}/images/bootsified-seo-color.jpg`
  
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
  
  // Get project ID from second slug segment (e.g., /work/web/mizzen)
  const projectSlug = slug?.[1]
  const categorySlug = activeSection?.id || 'featured'
  
  // Build page handle for work pages (e.g., 'work', 'work-web', 'work-web-mizzen')
  const pageHandle = slug && slug.length > 0 
    ? `work-${slug.join('-')}` 
    : 'work'

  // Generate schema for category page
  const workURL = slug?.[0] ? `https://boots.dev/work/${slug[0]}` : 'https://boots.dev/work'
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boots.dev/' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: workURL }
    ]
  }

  return (
    <>
      <PageHandleSetter handle={pageHandle} />
      <Schema data={categorySchema} />
      <WorkClient 
        categorySlug={categorySlug}
        projectSlug={projectSlug}
        introText={activeSection?.description}
      />
    </>
  )
}

export default WorkPage
