'use client'

import React from 'react'
import { useUIContext } from '@/context/UIContext'
import styles from './KonamiProgress.module.css'

const KonamiProgress = () => {
  const { konamiCode } = useUIContext()
  
  // Only show progress when user has made some progress but hasn't completed it
  if (konamiCode.progress === 0 || konamiCode.isActivated) {
    return null
  }
  
  const progressPercentage = (konamiCode.progress / konamiCode.totalLength) * 100
  
  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progress} 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className={styles.hint}>
        Keep going... {konamiCode.progress}/{konamiCode.totalLength}
      </div>
    </div>
  )
}

export default KonamiProgress