import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import BlogForm from './BlogForm'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function BlogPostEditPage({ params }: Props) {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/admin/login')
  }

  const { id } = await params

  return <BlogForm postId={id} />
}
