import React from 'react'
import { projects } from 'app/work/data'
import Link from 'next/link'

import Project from '@/components/Project'

import Button from '../Button'

import styles from './FeaturedProjects.module.css'

const FeaturedProjects = () => {
  const featuredArray = projects.slice(0, 3)

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Some featured projects</h2>
      <div className={styles.list}>
        {featuredArray.length &&
          featuredArray.map(proj => <Project key={proj.id} project={proj} rotate={proj.rotate} />)}
      </div>
      <p className={styles.cta}>
        <Link href="/work">
          <Button variant="outline" isLink>
            See more of my work
          </Button>
        </Link>
      </p>
    </section>
  )
}

export default FeaturedProjects
