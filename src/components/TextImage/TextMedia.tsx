import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './TextMedia.module.css'

interface TextMediaProps {
  imageSrc?: string
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
  imageHeight = 480,
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
        {imageSrc && <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} />}
        {videoSrc && <video src={videoSrc} width={imageWidth} height={imageHeight} controls />}
      </div>
    </section>
  )
}

export default TextMedia
