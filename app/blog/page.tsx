import React from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import BlogList from '@/components/BlogList'
import { PageHandleSetter } from '@/components/PageHandleSetter'
import styles from './blog.module.css'
import TextBlock from '@/components/TextBlock/TextBlock'
import { isAuthenticated } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'The Boots Blog | John "Boots" Highland',
  description: "News, thoughts, stories... It won't be very often, but when I have something to say, you’ll find it here.",
  openGraph: {
    title: 'The Boots Blog | John "Boots" Highland',
    description: "News, thoughts, stories... It won't be very often, but when I have something to say, you’ll find it here.",
  },
	twitter: {
		title: 'The Boots Blog | John "Boots" Highland',
		description: "News, thoughts, stories... It won't be very often, but when I have something to say, you’ll find it here.",
	},
}

export const dynamic = 'force-dynamic'

const BlogPage = async () => {
  const isAdmin = await isAuthenticated()
  
  const posts = await prisma.blogPost.findMany({
    where: isAdmin ? undefined : {
      status: 'PUBLISHED',
    },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      author: true,
      status: true,
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return (
    <div className="fadeIn">
      <PageHandleSetter handle="blog" />
			<h1 className='srOnly'>Blog</h1>
			<TextBlock padBottom='3em' padTop='1em'>
        <h2 className='h1'>Stuffs & Thangs</h2>
        <p>News, stories, thoughts, silliness, <s>recipes</s>&hellip; It probably won&rsquo;t be very often, but when I finally do have something to say, this is where you&rsquo;ll find it.</p>
			</TextBlock>
      <BlogList posts={posts} isAdmin={isAdmin} />
    </div>
  )
}

export default BlogPage
