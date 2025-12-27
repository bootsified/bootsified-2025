import React from 'react'
import Image, { StaticImageData } from 'next/image'
import clsx from 'clsx'
import Video from 'next-video';
import { Asset } from 'next-video/dist/assets.js';

import styles from './TextMedia.module.css'

interface TextMediaProps {
  imageSrc: StaticImageData | string
  imageAlt: string
  imageWidth?: number
  imageHeight?: number
	videoSrc?: Asset | string
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
        {videoSrc && <Video src={videoSrc} loop muted autoPlay playsInline controls={false} width={imageWidth} height={imageHeight}>
					<Image
						slot="poster"
						src={imageSrc}
						placeholder="blur"
						alt={imageAlt}
						width={imageWidth}
						height={imageHeight}
					/>
				</Video>}
      </div>
    </section>
  )
}

export default TextMedia
