import React from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import BlogList from '@/components/BlogList'
import { PageHandleSetter } from '@/components/PageHandleSetter'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'Blog | Boots',
  description: 'Thoughts, tutorials, and updates from Boots',
  openGraph: {
    title: 'Blog | Boots',
    description: 'Thoughts, tutorials, and updates from Boots',
  },
}

export const dynamic = 'force-dynamic'

const BlogPage = async () => {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
    },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      author: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return (
    <main className={styles.main}>
      <PageHandleSetter handle="blog" />
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Thoughts, tutorials, and updates from the workshop
        </p>
      </div>
      <BlogList posts={posts} />
    </main>
  )
}

export default BlogPage
