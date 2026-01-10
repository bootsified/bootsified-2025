import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import styles from './admin.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getStats() {
  try {
    const [projectCount, submissionCount] = await Promise.all([
      prisma.project.count(),
      prisma.contactSubmission.count(),
    ])
    return { projectCount, submissionCount }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return { projectCount: 0, submissionCount: 0 }
  }
}

export default async function AdminPage() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }

  const { projectCount, submissionCount } = await getStats()

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Admin Dashboard</h1>
      
      <div className={styles.cardGrid}>
        <Link href="/admin/projects" className={styles.card}>
          <div className={styles.cardIcon}>📁</div>
          <h2 className={styles.cardTitle}>Projects</h2>
          <p className={styles.cardCount}>{projectCount}</p>
          <p className={styles.cardDescription}>Manage your portfolio projects</p>
        </Link>
        
        <Link href="/admin/contact" className={styles.card}>
          <div className={styles.cardIcon}>✉️</div>
          <h2 className={styles.cardTitle}>Contact Submissions</h2>
          <p className={styles.cardCount}>{submissionCount}</p>
          <p className={styles.cardDescription}>View contact form submissions</p>
        </Link>
      </div>
      
      <form action="/api/admin/login" method="POST" className={styles.logoutForm}>
        <input type="hidden" name="action" value="logout" />
        <button type="submit" className={styles.logoutButton}>
          Logout
        </button>
      </form>
    </div>
  )
}
