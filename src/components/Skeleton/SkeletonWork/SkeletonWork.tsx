import React from 'react'
import clsx from 'clsx'

import skeletonStyles from '../Skeleton.module.css'
import styles from './SkeletonWork.module.css'

const SkeletonWork = () => {
  return (
    <>
      <div className={clsx(styles.paragraph, skeletonStyles.skeleton)}></div>
      <div className={clsx(styles.projects)}>
        <div className={clsx(styles.project, skeletonStyles.skeleton)}></div>
        <div className={clsx(styles.project, skeletonStyles.skeleton)}></div>
        <div className={clsx(styles.project, skeletonStyles.skeleton)}></div>
        <div className={clsx(styles.project, skeletonStyles.skeleton)}></div>
        <div className={clsx(styles.project, skeletonStyles.skeleton)}></div>
        <div className={clsx(styles.project, skeletonStyles.skeleton)}></div>
      </div>
    </>
  )
}

export default SkeletonWork
