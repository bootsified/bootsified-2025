'use client'

import React from 'react'
import Project from '@/components/Project'
import { useWork } from '@/context/WorkContext'
import styles from './Work.module.css'

type WorkClientProps = {
  categorySlug?: string
  projectSlug?: string
  introText?: string
}

const WorkClient = ({ categorySlug = 'featured', projectSlug, introText }: WorkClientProps) => {
  const { projects, isLoading } = useWork()
  
  // Filter projects based on active category
  const visibleProjects = categorySlug === 'all' 
    ? projects 
    : projects.filter(proj => proj.categories.includes(categorySlug))
  
  if (isLoading) {
    return null // Layout loading.tsx will handle the loading state
  }
  
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
