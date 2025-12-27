import { sections } from 'app/work/data'

import { SITE_URL } from '@/utils/constants'

import DefaultTags from '../../default-tags'

const Head = ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const activeSection = slug ? sections.find(item => item.id === slug[0]) : sections[0]

  const title = `My Projects - ${activeSection?.label} - John "Boots" Highland`
  const description = activeSection?.seo
  const url = `/work/${params.slug || ''}`

  return (
    <>
      <DefaultTags />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* open graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE_URL}${url}`} />

      {/* twitter */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:url" content={`${SITE_URL}${url}`} />
    </>
  )
}

export default Head
