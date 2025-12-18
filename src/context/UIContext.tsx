'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useKonamiCode } from '@/hooks/useKonamiCode'

type UIContextInterface = {
  isNavigating: boolean
  setIsNavigating: (isNavigating: boolean) => void
  navOpen: boolean
  setNavOpen: (open: boolean) => void
  toggleNav: () => void
  konamiCode: {
    isActivated: boolean
    progress: number
    totalLength: number
    deactivate: () => void
    resetSequence: () => void
  }
}

type UIProviderProps = {
  children: React.ReactNode
}

export const UIContext = React.createContext<UIContextInterface | null>(null)

export const UIProvider = ({ children }: UIProviderProps) => {
  const [isNavigating, setIsNavigating] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const konamiCode = useKonamiCode()

  const toggleNav = () => setNavOpen((v) => !v)

  // Centralize the DOM class toggle on the root element (<html>) here
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (navOpen) root.classList.add('nav-open')
    else root.classList.remove('nav-open')

    return () => {
      root.classList.remove('nav-open')
    }
  }, [navOpen])

  return (
    <UIContext.Provider
      value={{
        isNavigating,
        setIsNavigating,
        navOpen,
        setNavOpen,
        toggleNav,
        konamiCode,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUIContext = () => {
  const context = useContext(UIContext)

  if (context === null) {
    throw new Error('useUIContext must be used within a UIProvider')
  }

  return context
}
