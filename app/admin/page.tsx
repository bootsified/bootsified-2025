import { prisma } from '@/lib/prisma'
import styles from './admin.module.css'
import pageStyles from '@/styles/Page.module.css'

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
      <h1>Mail Room</h1>
      <p>Total submissions: {submissions.length}</p>
      
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
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  No submissions yet.
                </td>
              </tr>
            ) : (
              submissions.map((submission: ContactSubmission) => {
                  const date = new Date(submission.createdAt)
                  const dateStr = date.toLocaleDateString('en-US')
                  const timeStr = date.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  })
                  
                  return (
                  <tr key={submission.id}>
                    <td>
                      {dateStr}<br />{timeStr}
                    </td>
                    <td>{submission.name}</td>
                    <td>
                      <a href={`mailto:${submission.email}`} className={styles.link}>
                        {submission.email}
                      </a>
                    </td>
                    <td>
                      {submission.phone ? (
                        <a href={`tel:${submission.phone}`} className={styles.link}>
                          {submission.phone}
                        </a>
                      ) : (
                        <span className={styles.empty}>—</span>
                      )}
                    </td>
                    <td>{submission.message}</td>
                  </tr>
                  )
                })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
