import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting - simple in-memory store (use Redis for production)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)

  // Clean up expired entries
  if (limit && now > limit.resetAt) {
    rateLimit.delete(ip)
  }

  const current = rateLimit.get(ip)
  
  if (!current) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }) // 1 hour
    return true
  }

  if (current.count >= 3) { // Max 3 submissions per hour
    return false
  }

  current.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, honeypot } = body

    // Check honeypot
    if (honeypot) {
      return NextResponse.json(
        { message: 'Thank you for your submission' },
        { status: 200 }
      )
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    })

    // Send email via Resend
    const emailData = {
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL_RECIPIENT || email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submission ID: ${submission.id}</small></p>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}
Message:
${message}

---
Submission ID: ${submission.id}
Submitted at: ${new Date().toLocaleString()}
      `,
    }

    try {
      await resend.emails.send(emailData)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the request if email fails - data is already saved
    }

    return NextResponse.json(
      { message: 'Message sent successfully', id: submission.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
