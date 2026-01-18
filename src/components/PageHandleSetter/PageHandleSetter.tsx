'use client'

import { useEffect } from 'react'
import { useUIContext } from '@/context/UIContext'

type PageHandleSetterProps = {
  handle: string
}

/**
 * Client component to set the page handle in UIContext
 * Used in server components to communicate the page identity
 */
export const PageHandleSetter = ({ handle }: PageHandleSetterProps) => {
  const { setPageHandle } = useUIContext()

  useEffect(() => {
    setPageHandle(handle)
  }, [handle, setPageHandle])

  return null
}
