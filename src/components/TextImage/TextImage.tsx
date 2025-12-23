import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './TextImage.module.css'

interface TextImageProps {
  heading?: string
  body?: React.ReactNode
  imageSrc: string
  imageAlt: string
  imageWidth?: number
  imageHeight?: number
  reverse?: boolean
  className?: string
  children?: React.ReactNode
}

const TextImage = ({
  heading,
  body,
  children,
  imageSrc,
  imageAlt,
  imageWidth = 640,
  imageHeight = 480,
  reverse = false,
  className = '',
}: TextImageProps) => {
  return (
    <section className={clsx(styles.wrapper, reverse && styles.reverse, className)}>
      <div className={styles.text}>
        {heading ? <h3>{heading}</h3> : null}
        {body ? <div className={styles.body}>{body}</div> : null}
        {children}
      </div>
      <div className={styles.image}>
        <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} />
      </div>
    </section>
  )
}

export default TextImage
