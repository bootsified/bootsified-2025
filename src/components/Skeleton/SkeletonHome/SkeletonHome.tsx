import React from 'react'
import clsx from 'clsx'

import skeletonStyles from '../Skeleton.module.css'
import styles from './SkeletonHome.module.css'

const SkeletonHome = () => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.text)}>
        <div className={clsx(styles.heading, skeletonStyles.skeleton)}></div>
        <div className={clsx(styles.paragraph, skeletonStyles.skeleton)}></div>
        <div className={styles.links}>
          <div className={clsx(styles.button, skeletonStyles.skeleton)}></div>
        </div>
      </div>
      <div className={clsx(styles.image, skeletonStyles.skeleton)}>
        <div className={styles.img} />
      </div>
    </div>
  )
}

export default SkeletonHome
