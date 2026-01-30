export function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

export function isEmail(v: unknown): v is string {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-')
}

export function validateProjectPayload(data: unknown) {
  if (!data || typeof data !== 'object') return false
  const { slug, title, client, year, projectType } = data as Record<string, unknown>
  if (!isNonEmptyString(slug) || !isNonEmptyString(title)) return false
  if (client && typeof client !== 'string') return false
  if (year && typeof year !== 'string') return false
  if (projectType && typeof projectType !== 'string') return false
  return true
}

export function validateReorderPayload(data: unknown) {
  if (!data || typeof data !== 'object') return false
  const { projectIds } = data as Record<string, unknown>
  if (!Array.isArray(projectIds)) return false
  if (projectIds.length > 200) return false
  return projectIds.every((id) => typeof id === 'string')
}

export function validateBlogPostPayload(data: unknown) {
  if (!data || typeof data !== 'object') return false
  const { slug, title, excerpt, content } = data as Record<string, unknown>
  if (!isNonEmptyString(slug) || !isNonEmptyString(title)) return false
  if (!isNonEmptyString(excerpt) || !isNonEmptyString(content)) return false
  return true
}

export function validateReorderBlogPostsPayload(data: unknown) {
  if (!data || typeof data !== 'object') return false
  const { postIds } = data as Record<string, unknown>
  if (!Array.isArray(postIds)) return false
  if (postIds.length > 200) return false
  return postIds.every((id) => typeof id === 'string')
}
