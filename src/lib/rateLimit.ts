import Redis from 'ioredis'

// Adapter: if REDIS_URL is provided, use Redis; otherwise fallback to in-memory Map.
type RateEntry = { count: number; resetAt: number }

const inMemoryStore = new Map<string, RateEntry>()

let redis: Redis | null = null
if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL)
    redis.on('error', (err) => {
      console.warn('Redis connection error for rate limiter:', err)
    })
  } catch {
    console.warn('Failed to initialize Redis for rate limiting, falling back to in-memory')
    redis = null
  }
}

export async function checkRateLimitKey(key: string, limit = 10, windowMs = 60 * 60 * 1000): Promise<boolean> {
  const now = Date.now()
  if (redis) {
    const seconds = Math.max(1, Math.ceil(windowMs / 1000))
    // Use INCR followed by EXPIRE when first created to keep it atomic-ish.
    const value = await redis.incr(key)
    if (value === 1) {
      await redis.expire(key, seconds)
    }
    if (value > limit) return false
    return true
  }

  // In-memory fallback
  const entry = inMemoryStore.get(key)
  if (!entry || now > entry.resetAt) {
    inMemoryStore.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}

export async function getRateLimitInfo(key: string) {
  if (redis) {
    const ttl = await redis.pttl(key)
    const countStr = await redis.get(key)
    const count = countStr ? parseInt(countStr, 10) : 0
    const resetAt = ttl > 0 ? Date.now() + ttl : 0
    return { remaining: Math.max(0, count), resetAt }
  }

  const entry = inMemoryStore.get(key)
  if (!entry) return { remaining: 0, resetAt: 0 }
  return { remaining: Math.max(0, entry.count), resetAt: entry.resetAt }
}
