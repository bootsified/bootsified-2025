import React from 'react'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import WorkClient from './WorkClient'

// Mock the Project component since we're only testing filtering logic
jest.mock('@/components/Project', () => {
  return function MockProject({ project }: { project: { id: string; title: string } }) {
    return <div data-testid={`project-${project.id}`}>{project.title}</div>
  }
})

const mockProjects = [
  {
    id: 'project-1',
    rotate: 0,
    title: 'Featured Project 1',
    client: 'Client A',
    year: '2024',
    projectType: 'Web',
    categories: ['featured', 'web'],
    agency: 'Agency A',
    logo: '/logo1.png',
    screenshotNoir: '/screenshot1-noir.png',
    screenshot: '/screenshot1.png',
    url: 'https://example.com/1',
    media: '/video1.mp4',
    mediaType: 'video',
    skills: ['React', 'TypeScript'],
    notes: 'Test notes 1',
  },
  {
    id: 'project-2',
    rotate: 5,
    title: 'Mobile Project 1',
    client: 'Client B',
    year: '2024',
    projectType: 'Mobile',
    categories: ['mobile', 'app'],
    agency: 'Agency B',
    logo: '/logo2.png',
    screenshotNoir: '/screenshot2-noir.png',
    screenshot: '/screenshot2.png',
    url: 'https://example.com/2',
    media: '/video2.mp4',
    mediaType: 'video',
    skills: ['React Native'],
    notes: 'Test notes 2',
  },
  {
    id: 'project-3',
    rotate: -5,
    title: 'Featured Project 2',
    client: 'Client C',
    year: '2025',
    projectType: 'Web',
    categories: ['featured', 'web', 'ecommerce'],
    agency: 'Agency C',
    logo: '/logo3.png',
    screenshotNoir: '/screenshot3-noir.png',
    screenshot: '/screenshot3.png',
    url: 'https://example.com/3',
    media: '/video3.mp4',
    mediaType: 'video',
    skills: ['Next.js', 'TypeScript'],
    notes: 'Test notes 3',
  },
]

describe('WorkClient Component', () => {
  test('renders all projects when categorySlug is "all"', () => {
    render(<WorkClient projects={mockProjects} categorySlug="all" />)
    
    expect(screen.getByTestId('project-project-1')).toBeInTheDocument()
    expect(screen.getByTestId('project-project-2')).toBeInTheDocument()
    expect(screen.getByTestId('project-project-3')).toBeInTheDocument()
  })

  test('filters projects by featured category', () => {
    render(<WorkClient projects={mockProjects} categorySlug="featured" />)
    
    expect(screen.getByTestId('project-project-1')).toBeInTheDocument()
    expect(screen.queryByTestId('project-project-2')).not.toBeInTheDocument()
    expect(screen.getByTestId('project-project-3')).toBeInTheDocument()
  })

  test('filters projects by mobile category', () => {
    render(<WorkClient projects={mockProjects} categorySlug="mobile" />)
    
    expect(screen.queryByTestId('project-project-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('project-project-2')).toBeInTheDocument()
    expect(screen.queryByTestId('project-project-3')).not.toBeInTheDocument()
  })

  test('filters projects by web category', () => {
    render(<WorkClient projects={mockProjects} categorySlug="web" />)
    
    expect(screen.getByTestId('project-project-1')).toBeInTheDocument()
    expect(screen.queryByTestId('project-project-2')).not.toBeInTheDocument()
    expect(screen.getByTestId('project-project-3')).toBeInTheDocument()
  })

  test('shows no results message when no projects match category', () => {
    render(<WorkClient projects={mockProjects} categorySlug="nonexistent" />)
    
    expect(screen.getByText(/Oooops/i)).toBeInTheDocument()
    expect(screen.queryByTestId('project-project-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('project-project-2')).not.toBeInTheDocument()
    expect(screen.queryByTestId('project-project-3')).not.toBeInTheDocument()
  })

  test('defaults to featured category when no categorySlug provided', () => {
    render(<WorkClient projects={mockProjects} />)
    
    expect(screen.getByTestId('project-project-1')).toBeInTheDocument()
    expect(screen.queryByTestId('project-project-2')).not.toBeInTheDocument()
    expect(screen.getByTestId('project-project-3')).toBeInTheDocument()
  })

  test('renders intro text when provided', () => {
    const introText = 'Welcome to <strong>my work</strong>'
    render(<WorkClient projects={mockProjects} introText={introText} />)
    
    const introElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && element.innerHTML === introText
    })
    expect(introElement).toBeInTheDocument()
  })

  test('does not render intro text when not provided', () => {
    const { container } = render(<WorkClient projects={mockProjects} />)
    
    const introElements = container.querySelectorAll('p[class*="introText"]')
    expect(introElements.length).toBe(0)
  })

  test('handles empty projects array', () => {
    render(<WorkClient projects={[]} categorySlug="all" />)
    
    expect(screen.getByText(/Oooops/i)).toBeInTheDocument()
  })
})
