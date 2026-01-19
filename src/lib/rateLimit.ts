// Simple in-memory rate limiter. For production use a distributed store like Redis.
type RateEntry = { count: number; resetAt: number }

const store = new Map<string, RateEntry>()

export function checkRateLimitKey(key: string, limit = 10, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}

export function getRateLimitInfo(key: string) {
  const entry = store.get(key)
  if (!entry) return { remaining: 0, resetAt: 0 }
  return { remaining: Math.max(0, entry.count), resetAt: entry.resetAt }
}
