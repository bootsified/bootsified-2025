'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
      // Preserve origin in the URL so we can return to it after closing
      // If a from param already exists, reuse it; otherwise create one without nesting `from`
      const searchParams = new URLSearchParams(window.location.search)
      const existingFrom = searchParams.get('from')

      // Remove any existing `from` before computing the current clean URL
      searchParams.delete('from')
      const cleanedSearch = searchParams.toString()
      const currentCleanUrl = `${window.location.pathname}${cleanedSearch ? `?${cleanedSearch}` : ''}`

      const from = existingFrom ?? currentCleanUrl
      const nextUrl = existingFrom
        ? `/work/${categories[0]}/${id}?from=${encodeURIComponent(existingFrom)}`
        : `/work/${categories[0]}/${id}?from=${encodeURIComponent(from)}`

      router.push(nextUrl, { scroll: false })
      return
    }

    // Closing: first try to read the origin from the query param
    const searchParams = new URLSearchParams(window.location.search)
    const fromParam = searchParams.get('from')
    if (fromParam) {
      router.push(fromParam, { scroll: false })
      return
    }

    // Fallback: derive a parent URL from the current path
    const pathSegments = window.location.pathname.split('/').filter(Boolean)
    if (pathSegments.length >= 3) {
      router.push(`/work/${pathSegments[1]}`, { scroll: false })
    } else if (pathSegments.length >= 2) {
      router.push(`/work/${pathSegments[1]}`, { scroll: false })
    } else {
      router.push('/work', { scroll: false })
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
