'use client'

import { useState, FormEvent } from 'react'
import clsx from 'clsx'
import styles from './ContactForm.module.css'
import Button from '../Button'

interface FormData {
	name: string
	email: string
	phone: string
	message: string
	honeypot: string // Hidden field to catch bots
}

interface FormStatus {
	type: 'idle' | 'loading' | 'success' | 'error'
	message?: string
}

interface FormErrors {
	name?: string
	email?: string
	phone?: string
	message?: string
}

const ContactForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		message: '',
		honeypot: '',
	})

	const [status, setStatus] = useState<FormStatus>({ type: 'idle' })
	const [errors, setErrors] = useState<FormErrors>({})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
		// Clear error for this field when user starts typing
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}))
		}
	}

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {}

		// Validate name
		if (!formData.name.trim()) {
			newErrors.name = 'Name is required'
		}

		// Validate email
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address'
		}

		// Validate phone
		// if (!formData.phone.trim()) {
		// 	newErrors.phone = 'Phone number is required'
		// }

		// Validate message
		if (!formData.message.trim()) {
			newErrors.message = 'Message is required'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Check honeypot field (should be empty for legitimate submissions)
		if (formData.honeypot) {
			// Silently reject bot submissions
			setStatus({
				type: 'success',
				message: 'Thank you! Your message has been sent successfully.',
			})
			return
		}

		// Validate form before submission
		if (!validateForm()) {
			setStatus({
				type: 'error',
				message: 'Please fill in all required fields correctly.',
			})
			return
		}

		setStatus({ type: 'loading', message: 'Sending your message...' })

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const data = await response.json()

			if (!response.ok) {
				// Handle rate limiting with custom message
				if (response.status === 429) {
					throw new Error(data.message || 'Too many submissions. Please try again later.')
				}
				throw new Error(data.message || 'Failed to send message')
			}

			setStatus({
				type: 'success',
				message: 'Thank you! Your message has been sent successfully.',
			})
			setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' })
			setErrors({})
		} catch (error) {
			setStatus({
				type: 'error',
				message:
					error instanceof Error
						? error.message
						: 'Failed to send message. Please try again.',
			})
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit} noValidate>
			{status.type !== 'success' && (
				<>
					<div className={styles.formGroup}>
						<label htmlFor="name" className={styles.label}>
							Name <span className={styles.required}>*</span>
						</label>
						<input
							id="name"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							aria-required="true"
							aria-invalid={!!errors.name}
							aria-describedby={errors.name ? 'name-error' : undefined}
							className={styles.input}
							placeholder="Your full name"
						/>
						{errors.name && (
							<span id="name-error" className={styles.error} role="alert">
								{errors.name}
							</span>
						)}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="email" className={styles.label}>
							Email <span className={styles.required}>*</span>
						</label>
						<input
							id="email"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							aria-required="true"
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? 'email-error' : undefined}
							className={styles.input}
							placeholder="your@email.com"
						/>
						{errors.email && (
							<span id="email-error" className={styles.error} role="alert">
								{errors.email}
							</span>
						)}
					</div>

					{/* Honeypot field - hidden from users, but visible to bots */}
					<div className={styles.honeypot} aria-hidden="true">
						<label htmlFor="website">Website</label>
						<input
							id="website"
							type="text"
							name="honeypot"
							value={formData.honeypot}
							onChange={handleChange}
							tabIndex={-1}
							autoComplete="off"
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="phone" className={styles.label}>
							Phone
						</label>
					<input
						id="phone"
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						aria-invalid={!!errors.phone}
						aria-describedby={errors.phone ? 'phone-error' : undefined}
						className={styles.input}
						placeholder="(555) 123-4567"
					/>
						{errors.phone && (
							<span id="phone-error" className={styles.error} role="alert">
								{errors.phone}
							</span>
						)}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="message" className={styles.label}>
							Message <span className={styles.required}>*</span>
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							required
							aria-required="true"
							aria-invalid={!!errors.message}
							aria-describedby={errors.message ? 'message-error' : undefined}
							className={clsx(styles.input, styles.textarea)}
							placeholder="So, what can I do for you?"
							rows={5}
						/>
						{errors.message && (
							<span id="message-error" className={styles.error} role="alert">
								{errors.message}
							</span>
						)}
					</div>
				</>
			)}

			{status.type !== 'idle' && (
				<div
					className={clsx(
						styles.statusMessage,
						styles[`status-${status.type}`]
					)}
					role="status"
					aria-live="polite"
				>
					{status.message}
				</div>
			)}

			{status.type !== 'success' && (
				<Button
					type="submit"
					className={styles.submitButton}
					disabled={status.type === 'loading'}
					aria-busy={status.type === 'loading'}
				>
					{status.type === 'loading' ? 'Sending...' : 'Send'}
				</Button>
			)}
		</form>
	)
}

export default ContactForm
