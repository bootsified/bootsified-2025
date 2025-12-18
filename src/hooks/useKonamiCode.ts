'use client'

import { useEffect, useState, useCallback } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp', 
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
]

export const useKonamiCode = () => {
  const [sequence, setSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)

  const resetSequence = useCallback(() => {
    setSequence([])
  }, [])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Ignore if user is typing in an input field
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement) {
      return
    }

    const key = event.code
    
    setSequence(currentSequence => {
      const newSequence = [...currentSequence, key]
      
      // Check if we're still on the right track
      const isOnTrack = KONAMI_CODE.every((konamiKey, index) => {
        if (index >= newSequence.length) return true
        return konamiKey === newSequence[index]
      })
      
      if (!isOnTrack) {
        // Reset if we deviate from the pattern
        return key === KONAMI_CODE[0] ? [key] : []
      }
      
      // Check if we completed the sequence
      if (newSequence.length === KONAMI_CODE.length) {
        setIsActivated(true)
        return []
      }
      
      return newSequence
    })
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const deactivate = useCallback(() => {
    setIsActivated(false)
    setSequence([])
  }, [])

  return {
    isActivated,
    progress: sequence.length,
    totalLength: KONAMI_CODE.length,
    deactivate,
    resetSequence
  }
}