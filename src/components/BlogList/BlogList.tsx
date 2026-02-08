import React from 'react'
import BlogCard from '../BlogCard'
import styles from './BlogList.module.css'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  featuredImage?: string
  publishedAt: Date | string
  author: string
  categories?: { slug: string; name: string }[]
}

interface BlogListProps {
  posts: BlogPost[]
}

const BlogList = ({ posts }: BlogListProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No blog posts yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {posts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
