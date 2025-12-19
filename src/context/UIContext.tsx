'use client'

import React, { useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useKonamiCode } from '@/hooks/useKonamiCode'

type UIContextInterface = {
  isNavigating: boolean
  setIsNavigating: (isNavigating: boolean) => void
  navOpen: boolean
  setNavOpen: (open: boolean) => void
  toggleNav: () => void
  pageHandle: string
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

const formatPageHandle = (pathname: string | null): string => {
  if (!pathname || pathname === '/') return 'home'

  return pathname
    .replace(/^\/+|\/+$/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-_]/gi, '')
    .toLowerCase() || 'home'
}

export const UIProvider = ({ children }: UIProviderProps) => {
  const [isNavigating, setIsNavigating] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()
  const pageHandle = formatPageHandle(pathname)
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

  useEffect(() => {
    if (typeof document === 'undefined') return

    const body = document.body

    body.dataset.currentPage = pageHandle

    return () => {
      delete body.dataset.currentPage
    }
  }, [pageHandle])

  return (
    <UIContext.Provider
      value={{
        isNavigating,
        setIsNavigating,
        navOpen,
        setNavOpen,
        toggleNav,
        pageHandle,
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
