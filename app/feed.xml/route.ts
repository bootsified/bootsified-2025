import { Feed } from 'feed'
import { prisma } from '@/lib/prisma'
import { SITE_PUBLIC_URL } from '@/utils/constants'
import { markdownToHtml } from '@/lib/markdown'

export const revalidate = 3600 // Regenerate feed every hour

function getMimeType(url: string): string | undefined {
  const ext = url.split('.').pop()?.toLowerCase()
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
  }
  return ext ? mimeTypes[ext] : undefined
}

export async function GET() {
  // Initialize the feed
  const feed = new Feed({
    title: 'The Boots Blog',
    description: "News, stories, thoughts, silliness, recipes… It won't be very often, but when I finally do have something to say, this is where you'll find it.",
    id: `${SITE_PUBLIC_URL}/blog`,
    link: `${SITE_PUBLIC_URL}/blog`,
    language: 'en',
    image: `${SITE_PUBLIC_URL}/images/bootsified-seo-color.jpg`,
    favicon: `${SITE_PUBLIC_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Boots`,
    feedLinks: {
      rss2: `${SITE_PUBLIC_URL}/feed.xml`,
    },
    author: {
      name: 'Boots',
      link: SITE_PUBLIC_URL,
    },
  })

  // Fetch the 20 most recent published blog posts
  const posts = await prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
    },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      featuredImage: true,
      author: true,
      publishedAt: true,
      categories: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 20,
  })

  // Add each post to the feed
  for (const post of posts) {
    const postUrl = `${SITE_PUBLIC_URL}/blog/${post.slug}`
    const htmlContent = await markdownToHtml(post.content)

    const feedItem = {
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      content: htmlContent,
      author: [
        {
          name: post.author,
        },
      ],
      date: new Date(post.publishedAt),
      category: post.categories.map(cat => ({ name: cat.name })),
      image: post.featuredImage || undefined,
    }

    feed.addItem(feedItem)
  }

  // Return the RSS feed as XML
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
