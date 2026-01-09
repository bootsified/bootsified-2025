import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

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
    media: string
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
  const mediaPlayerRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

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
            media.includes('soundcloud') ? (
              <iframe
								width="100%"
								height="100%"
								scrolling="no"
								frameBorder="0"
								allow="autoplay"
								src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(media)}&visual=true`}
							/>
            ) : media.includes('.mp4') ? (
              <ReactPlayer
                ref={mediaPlayerRef}
                src={media}
                light={screenshot}
                muted={!playing}
                controls
                playing={playing}
                width="100%"
                height="100%"
                onClickPreview={() => {
                  setPlaying(true)
                }}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              />
            ) : (
              <ReactPlayer src={media} controls width="100%" height="100%" />
            )
          ) : (
            <Image
              src={screenshot}
              width={640}
              height={360}
              alt={`${title} Screenshot`}
              quality={90}
            />
          )}
        </div>

        {url && (
          <div className={styles.cta}>
            <Link href={url} target="_blank">
              <Button isLink variant='outline'>
                Visit {title} {projectType}
              </Button>
            </Link>
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
          <div
            className={clsx(styles.notes, richStyles.richText)}
            dangerouslySetInnerHTML={{ __html: notes }}
          />
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
