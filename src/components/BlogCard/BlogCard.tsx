import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './BlogCard.module.css'
import { clsx } from 'clsx'

interface Category {
  slug: string
  name: string
}

interface BlogCardProps {
  post: {
    slug: string
    title: string
    excerpt: string
    featuredImage?: string
    publishedAt: Date | string
    author?: string
    categories?: Category[]
  },
	className?: string
}

const BlogCard = ({ post, className }: BlogCardProps) => {
  const { slug, title, excerpt, featuredImage, publishedAt, author, categories } = post

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const categoryBadges = categories?.length
    ? categories.map(c => (
        <span key={c.slug} className={styles.category} aria-label={`category ${c.name}`}>
          {c.name}
        </span>
      ))
    : null

  return (
    <Link href={`/blog/${slug}`} className={clsx(styles.container, className)}>
      {featuredImage && (
        <div className={styles.imageWrapper}>
          <Image
            src={featuredImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <time dateTime={new Date(publishedAt).toISOString()} className={styles.date}>
            {formattedDate}
          </time>
          <span className={styles.author}>by {author}</span>
          <span className={styles.categories}>
            {categoryBadges}
          </span>
        </div>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
    </Link>
  )
}

export default BlogCard
