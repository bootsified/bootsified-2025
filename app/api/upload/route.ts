import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isAuthenticated } from '@/lib/auth'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const fileType = file.type
    const isVideo = fileType.startsWith('video/')

    // Upload videos to Vercel Blob, save images locally
    if (isVideo) {
      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      })
      return NextResponse.json({ url: blob.url })
    } else {
      // Save images to public/images/work directory
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Determine the appropriate subdirectory based on file name or type
      let subDir = 'logos' // default to logos
      if (file.name.toLowerCase().includes('screenshot')) {
        subDir = 'screenshots'
      }

      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(process.cwd(), 'public', 'images', 'work', subDir, fileName)

      await writeFile(filePath, buffer)

      // Return the public URL path
      return NextResponse.json({ url: `/images/work/${subDir}/${fileName}` })
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
