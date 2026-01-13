import React from 'react'
import Image, { StaticImageData } from 'next/image'
import clsx from 'clsx'
import NativeVideo from '@/components/NativeVideo'

import styles from './TextMedia.module.css'

interface TextMediaProps {
  imageSrc: StaticImageData | string
  imageAlt: string
  imageWidth?: number
  imageHeight?: number
	videoSrc?: string
  reverse?: boolean
  className?: string
  children?: React.ReactNode
}

const TextMedia = ({
  children,
  imageSrc,
  imageAlt,
  imageWidth = 640,
  imageHeight,
	videoSrc,
  reverse = false,
  className = '',
}: TextMediaProps) => {
  return (
    <section className={clsx(styles.wrapper, reverse && styles.reverse, className)}>
      <div className={styles.text}>
        {children}
      </div>
      <div className={styles.image}>
        {!videoSrc && <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} />}
        {videoSrc && (
          <NativeVideo 
            src={videoSrc} 
            poster={typeof imageSrc === 'string' ? imageSrc : imageSrc.src}
            loop 
            muted 
            autoPlay 
            playsInline 
            preload="metadata"
            width={imageWidth} 
            height={imageHeight} 
            aria-label={imageAlt}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </section>
  )
}

export default TextMedia
