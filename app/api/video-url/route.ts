import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')

    if (!path) {
      return NextResponse.json(
        { error: 'Video path is required' },
        { status: 400 }
      )
    }

    // Try to read the JSON metadata file created by next-video
    const jsonPath = join(process.cwd(), `${path}.json`)
    
    try {
      const jsonContent = await readFile(jsonPath, 'utf-8')
      const metadata = JSON.parse(jsonContent)
      
      // Extract the Vercel Blob URL from the metadata
      const blobUrl = metadata.providerMetadata?.['vercel-blob']?.url || 
                     metadata.sources?.[0]?.src
      
      if (blobUrl) {
        return NextResponse.json({ url: blobUrl })
      }
    } catch (fileError) {
      // JSON file doesn't exist, check if in development
      if (process.env.NODE_ENV === 'development') {
        // Return the local path for development
        const localPath = path.startsWith('/') ? path : `/${path}`
        return NextResponse.json({ url: localPath })
      }
    }

    return NextResponse.json(
      { error: 'Video not found. Run `npx next-video sync` after adding new videos.' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching video URL:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching the video' },
      { status: 500 }
    )
  }
}
