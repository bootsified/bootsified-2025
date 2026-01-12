'use client'

import React from 'react'
import { Asset } from 'next-video/dist/assets.js'
import Project from '@/components/Project'
import styles from './Work.module.css'

type ProjectData = {
  id: string
  rotate: number
  title: string
  client: string
  year: string
  projectType: string
  categories: string[]
  agency: string
  logo: string
  screenshotNoir: string
  screenshot: string
  url: string
  media: string | Asset
  mediaType: string
  skills: string[]
  notes: string
}

type WorkClientProps = {
  projects: ProjectData[]
  categorySlug?: string
  projectSlug?: string
  introText?: string
}

const WorkClient = ({ projects, categorySlug = 'featured', projectSlug, introText }: WorkClientProps) => {
  // Filter projects based on active category
  const visibleProjects = categorySlug === 'all' 
    ? projects 
    : projects.filter(proj => proj.categories.includes(categorySlug))
  
  return (
    <div className="fadeIn">
      {introText && (
        <p
          className={styles.introText}
          dangerouslySetInnerHTML={{ __html: introText }}
        />
      )}
      <div className={styles.projects}>
        {visibleProjects.length ? (
          visibleProjects.map(proj => (
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
    </div>
  )
}

export default WorkClient
