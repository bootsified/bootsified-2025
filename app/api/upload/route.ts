import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isAuthenticated } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB
const ALLOWED_MIME_PREFIXES = ['image/', 'video/', 'audio/']

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Basic validations
    if (typeof file.size === 'number' && file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 })
    }

    const mime = (file && typeof (file as File).type === 'string') ? (file as File).type : ''
    const allowed = ALLOWED_MIME_PREFIXES.some((p) => mime.startsWith(p))
    if (!allowed) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
    }

    // Sanitize filename and prefix with UUID to avoid collisions
    const safeName = `${uuidv4()}-${(file.name || 'upload').replace(/[^a-zA-Z0-9._-]/g, '-')}`

    // Upload file to Vercel Blob
    const blob = await put(safeName, file, {
      access: 'public',
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
