import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(1),
  honeypot: z.any().optional(),
})

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  client: z.string().optional(),
  year: z.string().optional(),
  projectType: z.string().optional(),
  agency: z.string().optional(),
  logo: z.string().optional(),
  screenshotNoir: z.string().optional(),
  screenshot: z.string().optional(),
  url: z.string().optional(),
  staticPortfolio: z.boolean().optional(),
  media: z.string().optional(),
  mediaType: z.string().optional(),
  notes: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  skillIds: z.array(z.string()).optional(),
})

export const reorderSchema = z.object({
  projectIds: z.array(z.string()).max(200),
})

export const loginSchema = z.object({
  password: z.string().min(1),
  action: z.string().optional(),
})

export type ContactSchema = z.infer<typeof contactSchema>
export type ProjectSchema = z.infer<typeof projectSchema>
