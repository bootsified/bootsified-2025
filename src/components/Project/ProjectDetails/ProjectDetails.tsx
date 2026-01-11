import React, { useRef, useState } from 'react'
import Video from 'next-video'
import { Asset } from 'next-video/dist/assets.js'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import clsx from 'clsx'
import Image from 'next/image'

import Button from '@/components/Button'

import styles from './ProjectDetails.module.css'
import richStyles from '@styles/rich-text.module.css'

type ProjectProps = {
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
    url: string
    media: string | Asset
    mediaType: string
    skills: string[]
    notes: string
  }
}

const ProjectDetails = ({ project }: ProjectProps) => {
  const {
    title,
    client,
    year,
    projectType,
    agency,
    logo,
    screenshot = '',
    url,
    media,
    skills,
    notes,
  } = project
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showOverlay, setShowOverlay] = useState(true)

  // Determine if media is a next-video Asset object
  const isAsset = typeof media === 'object' && media !== null

  // Extract media URL for string checks (for YouTube/SoundCloud)
  const mediaUrl = typeof media === 'string' ? media : ''

  const handleOverlayClick = () => {
    setShowOverlay(false)
    // Use setTimeout to ensure overlay is hidden before attempting play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Play error:', error)
          })
        }
      }
    }, 0)
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerMedia}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Image src={logo} alt={`${client} Logo`} width={76} height={76} quality={90} />
          </div>
          <h2 className={styles.heading}>
            {title}
            <span className={styles.typeYear}>
              {projectType} &bull; {year}
            </span>
          </h2>
        </div>
        <div className={styles.media}>
          {media !== '' ? (
            mediaUrl.includes('soundcloud') ? (
              <iframe
								width="100%"
								height="100%"
								scrolling="no"
								frameBorder="0"
								allow="autoplay"
								src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(mediaUrl)}&visual=true`}
                style={{ objectFit: 'contain' }}
							/>
            ) : mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be') ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${
                  mediaUrl.includes('youtu.be') 
                    ? mediaUrl.split('youtu.be/')[1]?.split('?')[0]
                    : mediaUrl.split('v=')[1]?.split('&')[0]
                }?autoplay=0&controls=1&modestbranding=1&rel=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ objectFit: 'contain' }}
              />
            ) : isAsset ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Video
                  ref={videoRef}
                  src={media as Asset}
                  controls
                  muted
                  onPlay={() => setShowOverlay(false)}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
                {showOverlay && screenshot && (
                  <div 
                    className={styles.videoOverlay}
                    onClick={handleOverlayClick}
                  >
                    <Image
                      src={screenshot}
                      fill
                      alt={`${title} Preview`}
                      style={{ objectFit: 'contain' }}
                      quality={90}
                    />
                    <div className={styles.overlayDarkness} />
                    <div className={styles.playButton}>
                      <div className={styles.playIcon} />
                      <span className={styles.playText}>Watch Website Walkthrough</span>
                    </div>
                  </div>
                )}
              </div>
            ) : null
          ) : screenshot ? (
            <Image
              src={screenshot}
              width={640}
              height={360}
              alt={`${title} Screenshot`}
              quality={90}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          ) : null}
        </div>

        {url && (
          <div className={styles.cta}>
						<Button href={url} target="_blank" variant='outline'>
							Visit {title} {projectType}
						</Button>
          </div>
        )}
      </div>
      <div className={styles.deetsNotes}>
        <div className={styles.deets}>
          <table>
            <tbody>
              <tr className={styles.deet}>
                <th scope="row">
                  {projectType === 'Song' || projectType === 'Music Video' ? 'Artist' : 'Client'}:
                </th>
                <td>{client}</td>
              </tr>
              {agency !== '' && projectType !== 'Music Video' && (
                <tr className={styles.deet}>
                  <th scope="row">Agency:</th>
                  <td>{agency}</td>
                </tr>
              )}
              <tr className={styles.deet}>
                <th scope="row">Skills used:</th>
                <td>{skills.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {notes !== '' && (
          <div className={clsx(styles.notes, richStyles.richText)}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {notes}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
