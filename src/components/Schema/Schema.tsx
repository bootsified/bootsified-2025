import React from 'react'

type SchemaProps = {
  data: any | any[]
}

// Renders JSON-LD schema safely. Accepts a single object or an array.
const Schema = ({ data }: SchemaProps) => {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}

export default Schema
