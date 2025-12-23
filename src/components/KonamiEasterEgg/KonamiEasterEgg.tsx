'use client'

import React, { useEffect, useState } from 'react'
import styles from './KonamiEasterEgg.module.css'

interface KonamiEasterEggProps {
  isActive: boolean
  onClose: () => void
}

const KonamiEasterEgg = ({ isActive, onClose }:KonamiEasterEggProps) => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Small delay for dramatic effect
      const timer = setTimeout(() => setShowMessage(true), 100)
      return () => clearTimeout(timer)
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowMessage(false)
    }
  }, [isActive])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isActive) {
        onClose()
      }
    }

    if (isActive) {
      document.addEventListener('keydown', handleEscKey)
      return () => document.removeEventListener('keydown', handleEscKey)
    }
  }, [isActive, onClose])

  if (!isActive) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {showMessage && (
          <>
            <div className={styles.celebration}>💪</div>
            <h2 className={styles.title}>Invincibility Activated! <span className={styles.subtitle}>(not really, but one can dream, amirite?!?)</span></h2>
            <p className={styles.message}>
              Well done! As a mental health practice, 
              we believe in celebrating the small victories and having a little fun along the way. Life can be challenging, but there&rsquo;s always room for moments of joy and discovery! ❤️
            </p>
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close easter egg"
            >
              Continue your journey...
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default KonamiEasterEgg