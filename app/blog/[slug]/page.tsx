import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import clsx from 'clsx'
import { PageHandleSetter } from '@/components/PageHandleSetter'
import styles from './post.module.css'
import richStyles from '@/styles/rich-text.module.css'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      featuredImage: true,
    },
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | The Boots Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
    },
		twitter: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  }
}

const BlogPostPage = async ({ params }: Props) => {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      categories: true,
    },
  })

  if (!post || post.status !== 'PUBLISHED') {
    notFound()
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
  }

  return (
    <>
      <PageHandleSetter handle="blog" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={clsx(styles.article, 'fadeIn')}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <time dateTime={post.publishedAt.toISOString()} className={styles.date}>
              {formattedDate}
            </time>
            <span className={styles.author}>by {post.author}</span>
          </div>
					<Link href="/blog" className={styles.backBtn}>← Blog</Link>
        </header>

        {post.featuredImage && (
          <div className={styles.featuredImage}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={630}
              quality={90}
              priority
              className={styles.image}
            />
          </div>
        )}

        <div className={clsx(styles.content, richStyles.richText)}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  )
}

export default BlogPostPage
