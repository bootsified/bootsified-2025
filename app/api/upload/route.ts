import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isAuthenticated } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import { sanitizeFilename } from '@/lib/validation'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB
const ALLOWED_MIME_PREFIXES = ['image/', 'video/', 'audio/']

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Rate limit uploads per IP to prevent abuse
    const { checkRateLimitKey } = await import('@/lib/rateLimit')
    const ip = (request as Request).headers.get('x-forwarded-for') || 'unknown'
    if (!(await checkRateLimitKey(`upload:${ip}`, 20, 60 * 60 * 1000))) {
      return NextResponse.json({ error: 'Too many uploads' }, { status: 429 })
    }
    const contentType = (request as Request).headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }

    const formData = await request.formData()
    const maybeFile = formData.get('file')

    if (!maybeFile || !(maybeFile instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const file = maybeFile as File

    // Validate size
    if (typeof file.size === 'number' && file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 })
    }

    // Validate MIME type
    const mime = typeof file.type === 'string' ? file.type : ''
    const allowed = ALLOWED_MIME_PREFIXES.some((p) => mime.startsWith(p))
    if (!allowed) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
    }

    // Sanitize filename and prefix with UUID to avoid collisions
    const originalName = file.name || 'upload'
    const safeBase = sanitizeFilename(originalName)
    const safeName = `${uuidv4()}-${safeBase}`

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
