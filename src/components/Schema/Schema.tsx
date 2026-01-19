'use client'

import React, { useEffect, useState } from 'react'

interface SchemaProps {
  data: unknown | unknown[]
}

// Renders JSON-LD schema safely. Accepts a single object or an array.
// Client-side only to prevent Safari JSON-LD parsing issues during SSR hydration
const Schema = ({ data }: SchemaProps) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // Defer state update to next animation frame to avoid synchronous setState in effect
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  // If data is already a single object with @context, use it directly
  // Otherwise, wrap array items or ensure @context exists
  let payload: unknown
  
  if (!Array.isArray(data) && data && typeof data === 'object' && '@context' in data) {
    payload = data
  } else {
    const items = Array.isArray(data) ? data : [data]
    // Ensure all schema objects have @context
    const validatedItems = items.map((item) => {
      if (item && typeof item === 'object' && !('@context' in item)) {
        return {
          '@context': 'https://schema.org',
          ...item
        }
      }
      return item
    })
    payload = validatedItems.length === 1 ? validatedItems[0] : validatedItems
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}

export default Schema
