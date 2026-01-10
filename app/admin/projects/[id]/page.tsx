import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import ProjectForm from './ProjectForm'

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
  
  return <ProjectForm projectId={id} />
}
