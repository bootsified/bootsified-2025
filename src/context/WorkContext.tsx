'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getVideoAsset } from '@/utils/videoAssets'

export type ProjectData = {
  id: string
  rotate: number
  title: string
  client: string
  year: string
  projectType: string
  categories: string[]
  agency: string
  logo: string
  screenshotNoir: string
  screenshot: string
  url: string
  media: string
  mediaType: string
  skills: string[]
  notes: string
}

type WorkContextType = {
  projects: ProjectData[]
  isLoading: boolean
}

const WorkContext = createContext<WorkContextType>({
  projects: [],
  isLoading: true,
})

export const useWork = () => useContext(WorkContext)

// Helper function to generate a random rotation value (-0.125 to 0.125)
function generateRotate() {
  return (Math.random() - 0.5) * 0.25
}

type ApiCategory = {
  slug: string
  name: string
}

type ApiSkill = {
  name: string
}

type ApiProject = {
  slug: string
  title: string
  client: string
  year: string
  projectType: string
  categories: ApiCategory[]
  agency: string
  logo: string
  screenshotNoir: string
  screenshot: string
  url: string
  media: string
  mediaType: string
  skills: ApiSkill[]
  notes: string
}

export function WorkProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch all projects once on mount
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: ApiProject[]) => {
        // Transform the data to match expected format
        const transformed = data.map((project) => ({
          id: project.slug,
          rotate: generateRotate(),
          title: project.title,
          client: project.client,
          year: project.year,
          projectType: project.projectType.replace('_', ' '),
          categories: project.categories.map((c) => c.slug),
          agency: project.agency,
          logo: project.logo,
          screenshotNoir: project.screenshotNoir,
          screenshot: project.screenshot,
          url: project.url,
          media: getVideoAsset(project.media || ''),
          mediaType: project.mediaType.toLowerCase(),
          skills: project.skills.map((s) => s.name),
          notes: project.notes,
        }))
        setProjects(transformed)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching projects:', error)
        setIsLoading(false)
      })
  }, [])

  return (
    <WorkContext.Provider value={{ projects, isLoading }}>
      {children}
    </WorkContext.Provider>
  )
}
