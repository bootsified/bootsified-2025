import WorkNav from '@components/Work/WorkNav'
import styles from '@components/Work/Work.module.css'
import Schema from '@/components/Schema'
import { projects } from './data'
import { SITE_PUBLIC_URL } from '@/utils/constants'

const WorkLayout = ({ children }: { children: React.ReactNode }) => {
  // Filter featured projects and map to schema.org CreativeWork or WebSite
  const featuredProjects = projects
    .filter(p => p.featured)
    .map((project, index) => {
      const hasExternalLink = project.url && project.url !== ''
      const schemaType = hasExternalLink ? 'WebSite' : 'CreativeWork'
      
      const item: Record<string, unknown> = {
        '@type': schemaType,
        '@id': `https://boots.dev/work/${project.id}`,
        name: project.title,
        dateCreated: project.year,
        about: project.skills.join(', '),
        image: `${SITE_PUBLIC_URL}${project.screenshot}`
      }
      
      if (hasExternalLink) {
        item.url = project.url
      }
      
      return {
        '@type': 'ListItem',
        position: index + 1,
        item
      }
    })

  return (
    <>
      <Schema
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://boots.dev/work#webpage',
            url: 'https://boots.dev/work',
            name: 'Selected Work | Front-End Development & Creative Projects',
            description: 'A curated collection of front-end development, music, and creative projects showcasing craft, curiosity, and attention to detail.',
            about: { '@id': 'https://boots.dev/#person' },
            isPartOf: { '@id': 'https://boots.dev/#website' },
            inLanguage: 'en-US',
            mainEntity: {
              '@type': 'ItemList',
              name: 'Featured Projects',
              numberOfItems: featuredProjects.length,
              itemListElement: featuredProjects
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://boots.dev/' },
              { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://boots.dev/work' }
            ]
          }
        ]}
      />
      <div className={styles.container}>
        <h1 className={styles.heading}>What I&rsquo;ve been up&nbsp;to</h1>
        <div className={styles.nav}>
          <WorkNav />
        </div>
        {children}
      </div>
    </>
  )
}

export default WorkLayout
