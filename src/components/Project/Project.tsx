'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import Modal from '../Modal'
import ProjectDetails from './ProjectDetails'

import styles from './Project.module.css'

interface ProjectProps {
	rotate?: number | string
  project: {
    id: string
    title: string
    client: string
    year: string
    projectType: string
    category: string
    agency: string
    logo: string
    screenshot?: string
    url: string
    media: string
    mediaType: string
    skills: string[]
    notes: string
  }
}

const Project = ({ rotate = '', project }: ProjectProps) => {
  const [open, setOpen] = useState(false)

  const {
    title,
    client,
    year,
    projectType,
    category,
    agency,
    logo,
    screenshot = '',
    url,
    media,
    mediaType,
    skills,
    notes,
  } = project

  const ctaLabel =
    projectType === 'Song'
      ? 'Listen Now'
      : projectType.includes('Video')
      ? 'Watch Now'
      : projectType === 'photo'
      ? 'View Photo'
      : 'More Info'

  return (
    <>
      <Modal
        trigger={
          <button
            className={styles.container}
            data-category={category.replace('-', ' ')}
						style={{ '--rotation': rotate ? `${rotate}deg` : '0deg' } as React.CSSProperties}
            type="button"
          >
            <h2 className={styles.heading}>
              {title}{' '}
              <span>
                {projectType} &bull; {year}
              </span>
            </h2>
            <div className={styles.logo}>
              <Image src={logo} height={100} width={100} alt={`${client} Logo`} />
            </div>
            <div className={styles.content}>
              <div className={styles.screenshot}>
								{screenshot && (
									<Image
										src={screenshot}
										height={225}
										width={400}
										alt={`${title} Screenshot`}
										loading="lazy"
									/>
								)}
              </div>
              <div className={styles.cta}>
                <span className={styles.ctaLive}>{url !== '' && <>Live!</>}</span>
                <span className={styles.ctaLabel}>{ctaLabel}</span>
              </div>
            </div>
          </button>
        }
        open={open}
        onOpenChange={() => {
          setOpen(!open)
        }}
        fullscreenMobile
        size="flex"
      >
        <ProjectDetails project={project} />
      </Modal>
    </>
  )
}

export default Project
