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
			from: process.env.EMAIL_FROM || 'donotreply@notifications.boots.dev',
			to: process.env.CONTACT_EMAIL_RECIPIENT || 'hello@boots.dev',
			replyTo: email,
			subject: `New contact form submission from ${name}`,
			html: `
				<!DOCTYPE html>
				<html>
					<head>
						<style>
							body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background: #B00075; color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
							.field { margin-bottom: 1em; }
							.label { font-weight: 700; color: #333; text-transform: uppercase; font-size: 1em; }
							.value { color: #444; margin-top: 5px; font-size: 1.25em; }
							.message-content { background: #f9f9f9; padding: 1.25em; border-left: 4px solid #B00075; margin-top: 10px; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h2>New Contact Form Submission</h2>
							</div>
							
							<div class="field">
								<div class="label">Name:</div>
								<div class="value">${name}</div>
							</div>
							
							<div class="field">
								<div class="label">Email:</div>
								<div class="value"><a style="color: #B00075;" href="mailto:${email}">${email}</a></div>
							</div>
							
							<div class="field">
								<div class="label">Phone:</div>
								<div class="value"><a style="color: #B00075;" href="tel:${phone}">${phone}</a></div>
							</div>
							
							<div class="field">
								<div class="label">Message:</div>
								<div class="message-content">
									${message.replace(/\n/g, '<br>')}
								</div>
							</div>
						</div>
					</body>
				</html>
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
