import Image, { StaticImageData } from 'next/image'
import clsx from 'clsx'

import styles from './FullWidthImage.module.css'

interface FullWidthImageProps {
  src: string | StaticImageData
  alt: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  className?: string
	padTop?: string
	padBottom?: string
}

const FullWidthImage = ({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
	padTop = '',
	padBottom = '',
}: FullWidthImageProps) => {
  return (
    <div className={clsx(styles.wrapper, className)} style={{ paddingTop: padTop, paddingBottom: padBottom }}>
      <div className={styles.image}>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					sizes={sizes}
					priority={priority}
				/>
			</div>
    </div>
  )
}

export default FullWidthImage
