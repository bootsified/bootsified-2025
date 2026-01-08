import { prisma } from '@/lib/prisma'
import styles from './admin.module.css'

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

export default async function AdminPage() {
  const submissions = await getSubmissions()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Form Submissions</h1>
      
      {submissions.length === 0 ? (
        <p className={styles.emptyState}>No submissions yet.</p>
      ) : (
        <>
          <p className={styles.count}>Total submissions: {submissions.length}</p>
          
          <div className={styles.grid}>
            {submissions.map((submission: ContactSubmission) => (
              <div key={submission.id} className={styles.card}>
                <div className={styles.header}>
                  <h2 className={styles.name}>{submission.name}</h2>
                  <time className={styles.date}>
                    {new Date(submission.createdAt).toLocaleString()}
                  </time>
                </div>
                
                <div className={styles.details}>
                  <div className={styles.field}>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${submission.email}`} className={styles.link}>
                      {submission.email}
                    </a>
                  </div>
                  
                  {submission.phone && (
                    <div className={styles.field}>
                      <strong>Phone:</strong>{' '}
                      <a href={`tel:${submission.phone}`} className={styles.link}>
                        {submission.phone}
                      </a>
                    </div>
                  )}
                  
                  <div className={styles.field}>
                    <strong>Message:</strong>
                    <p className={styles.message}>{submission.message}</p>
                  </div>
                  
                  <div className={styles.meta}>
                    <small>ID: {submission.id}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
