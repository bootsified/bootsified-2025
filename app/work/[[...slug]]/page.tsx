import React from 'react'
import { projects, sections } from 'app/work/data'

import Project from '@/components/Project'

import styles from '@components/Work/Work.module.css'

type WorkProps = {
  params: Promise<{
    slug?: string[]
  }>
}

const WorkPage = async ({ params }: WorkProps) => {
  const { slug } = await params
  const activeSection = slug ? sections.find(item => item.id === slug[0]) : sections[0]
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
          filteredProjects.map(proj => <Project key={proj.id} project={proj} rotate={proj.rotate} />)
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
