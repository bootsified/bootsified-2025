import React from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import BlogList from '@/components/BlogList'
import { PageHandleSetter } from '@/components/PageHandleSetter'
import styles from './blog.module.css'
import TextBlock from '@/components/TextBlock/TextBlock'

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
    <div className="fadeIn">
      <PageHandleSetter handle="blog" />
			<h1 className='srOnly'>Blog</h1>
			<TextBlock padBottom='4em' padTop='1em' narrow>
        <h2 className='h1'>Stuffs & Thangs</h2>
        <p>Thoughts, tutorials, and updates from the workshop</p>
			</TextBlock>
      <BlogList posts={posts} />
    </div>
  )
}

export default BlogPage
