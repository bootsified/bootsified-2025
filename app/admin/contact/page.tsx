import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import styles from '../admin.module.css'
import pageStyles from '@/styles/Page.module.css'
import Link from 'next/link'
import { PageHandleSetter } from '@/components/PageHandleSetter'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type ContactSubmission = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  createdAt: Date
}

async function getSubmissions(): Promise<ContactSubmission[]> {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return submissions
  } catch (error) {
    console.error('Failed to fetch submissions:', error)
    return []
  }
}

export default async function ContactPage() {  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }
  const submissions = await getSubmissions()

  return (
    <div className={styles.container}>
      <PageHandleSetter handle="other" />
      <div className={styles.header}>
        <h1 className={styles.heading}>Mail Room</h1>
        <Link href="/admin" className={styles.backLink}>← Dashboard</Link>
      </div>
      <p className={styles.totalSubmissions}>Total submissions: {submissions.length}</p>
      
      <div className={pageStyles.tableWrapper}>
        <table className={pageStyles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
                <td>{submission.name}</td>
                <td>
                  <a className={styles.link} href={`mailto:${submission.email}`}>{submission.email}</a>
                </td>
                <td>
                  {submission.phone ? (
                    <a className={styles.link} href={`tel:${submission.phone}`}>{submission.phone}</a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className={styles.messageCell}>{submission.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
