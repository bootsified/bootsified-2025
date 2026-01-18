import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import ProjectForm from './ProjectForm'
import { PageHandleSetter } from '@/components/PageHandleSetter'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProjectEditPage({ params }: PageProps) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  const { id } = await params
  
  return (
    <>
      <PageHandleSetter handle="other" />
      <ProjectForm projectId={id} />
    </>
  )
}
