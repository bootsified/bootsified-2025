'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const Modal = dynamic(() => import('../Modal'))
const ProjectDetails = dynamic(() => import('./ProjectDetails'), { ssr: false })

import styles from './Project.module.css'

interface ProjectProps {
	rotate?: number | string
  project: {
    id: string
    title: string
    client: string
    year: string
    projectType: string
    categories: string[]
    agency: string
    logo: string
    screenshot?: string
    screenshotNoir?: string
    url: string
    media: string
    mediaType: string
    skills: string[]
    notes: string
  }
  initialOpen?: boolean
}

const Project = ({ rotate = '', project, initialOpen = false }: ProjectProps) => {
  const [open, setOpen] = useState(initialOpen)
  const router = useRouter()

  const {
    id,
    title,
    client,
    year,
    projectType,
    categories,
    logo,
    screenshot = '',
		screenshotNoir = '',
    url,
  } = project

  const ctaLabel =
    projectType === 'Song'
      ? 'Listen Now'
      : projectType.includes('Video')
      ? 'Watch Now'
      : projectType === 'photo'	
      ? 'View Photo'
      : 'More Info'

  // Sync modal state with URL parameter
  useEffect(() => {
    setOpen(initialOpen)
  }, [initialOpen])

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Just open the modal without changing the URL
      setOpen(true)
      return
    }

    // Closing: check if we're on a deep link URL
    const isDeepLink = window.location.pathname.includes(`/work/${categories[0]}/${id}`)
    
    if (isDeepLink) {
      // Navigate back to the category page for deep-linked modals
      router.push(`/work/${categories[0]}`, { scroll: false })
    } else {
      // Just close the modal for click-opened modals
      setOpen(false)
    }
  }

  return (
    <>
      <Modal
        trigger={
          <button
            className={styles.container}
            data-category={categories[0].replace('-', ' ')}
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
								{screenshotNoir && (
									<Image
										src={screenshotNoir}
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
        onOpenChange={(newOpen) => {
          handleOpenChange(newOpen)
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
