'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import styles from './project-form.module.css'

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type Category = {
  id: string
  slug: string
  name: string
}

type Skill = {
  id: string
  name: string
}

type Project = {
  id: string
  slug: string
  title: string
  client: string
  year: string
  projectType: string
  agency: string
  logo: string
  screenshotNoir: string
  screenshot: string
  url: string
  media: string
  mediaType: string
  notes: string
  categories: Category[]
  skills: Skill[]
}

type ProjectFormProps = {
  projectId?: string
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter()
  const isEditing = !!projectId && projectId !== 'new'

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    client: '',
    year: '',
    projectType: 'WEBSITE',
    agency: '',
    logo: '',
    screenshotNoir: '',
    screenshot: '',
    url: '',
    media: '',
    mediaType: 'NONE',
    notes: '',
    categoryIds: [] as string[],
    skillIds: [] as string[],
  })

  const [mediaInputType, setMediaInputType] = useState<'file' | 'url'>('url')
  const [uploading, setUploading] = useState<string | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    fetchCategoriesAndSkills()
    if (isEditing) {
      fetchProject()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, projectId])

  useEffect(() => {
    // Fetch video URL for preview when media path changes
    if (formData.media && !formData.media.startsWith('http') && mediaInputType === 'file') {
      fetch(`/api/video-url?path=${encodeURIComponent(formData.media)}`)
        .then(res => res.json())
        .then(data => {
          if (data.url) {
            setVideoPreviewUrl(data.url)
          } else {
            setVideoPreviewUrl(null)
          }
        })
        .catch(() => setVideoPreviewUrl(null))
    } else {
      setVideoPreviewUrl(null)
    }
  }, [formData.media, mediaInputType])

  const fetchCategoriesAndSkills = async () => {
    try {
      const [categoriesRes, skillsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/skills'),
      ])
      const categoriesData = await categoriesRes.json()
      const skillsData = await skillsRes.json()
      setCategories(categoriesData)
      setSkills(skillsData)
    } catch (error) {
      console.error('Error fetching categories and skills:', error)
    }
  }

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      const project: Project = await response.json()
      
      setFormData({
        slug: project.slug,
        title: project.title,
        client: project.client,
        year: project.year,
        projectType: project.projectType,
        agency: project.agency,
        logo: project.logo,
        screenshotNoir: project.screenshotNoir,
        screenshot: project.screenshot,
        url: project.url,
        media: project.media,
        mediaType: project.mediaType,
        notes: project.notes,
        categoryIds: project.categories.map((c) => c.id),
        skillIds: project.skills.map((s) => s.id),
      })

      // Determine media input type based on existing media
      if (project.media) {
        if (project.media.startsWith('http') && !project.media.includes('/videos/')) {
          setMediaInputType('url')
        } else {
          setMediaInputType('file')
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      alert('Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File, field: string) => {
    setUploading(field)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await response.json()
      
      if (response.ok) {
        setFormData((prev) => ({ ...prev, [field]: data.url }))
      } else {
        alert('Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('An error occurred while uploading')
    } finally {
      setUploading(null)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = isEditing ? `/api/projects/${projectId}` : '/api/projects'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/projects')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save project')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }))
  }

  const toggleSkill = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter((id) => id !== skillId)
        : [...prev.skillIds, skillId],
    }))
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading project...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/admin/projects" className={styles.backLink}>
          ← Back to Projects
        </Link>
        <h1 className={styles.heading}>
          {isEditing ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="slug" className={styles.label}>
              Slug (URL-friendly ID) *
            </label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className={styles.input}
              required
              pattern="[a-z0-9-]+"
              title="Lowercase letters, numbers, and hyphens only"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="client" className={styles.label}>
              Client *
            </label>
            <input
              type="text"
              id="client"
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="year" className={styles.label}>
              Year *
            </label>
            <input
              type="text"
              id="year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              className={styles.input}
              required
              placeholder="e.g., 2023 or 2018-2023"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="projectType" className={styles.label}>
              Project Type *
            </label>
            <select
              id="projectType"
              value={formData.projectType}
              onChange={(e) =>
                setFormData({ ...formData, projectType: e.target.value })
              }
              className={styles.select}
              required
            >
              <option value="WEBSITE">Website</option>
              <option value="SONG">Song</option>
              <option value="MUSIC_VIDEO">Music Video</option>
              <option value="VIDEO">Video</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="agency" className={styles.label}>
              Agency
            </label>
            <input
              type="text"
              id="agency"
              value={formData.agency}
              onChange={(e) =>
                setFormData({ ...formData, agency: e.target.value })
              }
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="url" className={styles.label}>
              External URL
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className={styles.input}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Images</h3>
          
          <div className={styles.imageField}>
            <label className={styles.label}>Logo *</label>
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Logo"
                className={styles.thumbnail}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, 'logo')
              }}
              className={styles.fileInput}
              disabled={uploading === 'logo'}
            />
            {uploading === 'logo' && <span className={styles.uploading}>Uploading...</span>}
          </div>

          <div className={styles.imageField}>
            <label className={styles.label}>Screenshot (Noir/Comic Style) *</label>
            {formData.screenshotNoir && (
              <img
                src={formData.screenshotNoir}
                alt="Screenshot Noir"
                className={styles.thumbnail}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, 'screenshotNoir')
              }}
              className={styles.fileInput}
              disabled={uploading === 'screenshotNoir'}
            />
            {uploading === 'screenshotNoir' && <span className={styles.uploading}>Uploading...</span>}
          </div>

          <div className={styles.imageField}>
            <label className={styles.label}>Screenshot (Regular) *</label>
            {formData.screenshot && (
              <img
                src={formData.screenshot}
                alt="Screenshot"
                className={styles.thumbnail}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, 'screenshot')
              }}
              className={styles.fileInput}
              disabled={uploading === 'screenshot'}
            />
            {uploading === 'screenshot' && <span className={styles.uploading}>Uploading...</span>}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Media</h3>
          
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="mediaInputType"
                value="url"
                checked={mediaInputType === 'url'}
                onChange={(e) => setMediaInputType(e.target.value as 'file' | 'url')}
              />
              External URL (YouTube, SoundCloud)
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="mediaInputType"
                value="file"
                checked={mediaInputType === 'file'}
                onChange={(e) => setMediaInputType(e.target.value as 'file' | 'url')}
              />
              Local Video Path (for next-video)
            </label>
          </div>

          {mediaInputType === 'url' ? (
            <div className={styles.field}>
              <label htmlFor="media" className={styles.label}>
                Media URL
              </label>
              <input
                type="url"
                id="media"
                value={formData.media}
                onChange={(e) =>
                  setFormData({ ...formData, media: e.target.value })
                }
                className={styles.input}
                placeholder="https://youtube.com/watch?v=... or https://soundcloud.com/..."
              />
            </div>
          ) : (
            <>
              <div className={styles.field}>
                <label htmlFor="media" className={styles.label}>
                  Video Path (relative to project root)
                </label>
                <input
                  type="text"
                  id="media"
                  value={formData.media}
                  onChange={(e) =>
                    setFormData({ ...formData, media: e.target.value })
                  }
                  className={styles.input}
                  placeholder="videos/my-video.mp4"
                />
                <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                  <strong>For next-video managed videos:</strong>
                  <ol style={{ margin: '0.5rem 0 0 1.25rem', paddingLeft: 0 }}>
                    <li>Upload your .mp4 file to the <code>/videos/</code> folder in the project</li>
                    <li>Run <code>npx next-video sync</code> to process and upload to Vercel Blob</li>
                    <li>Enter the path here (e.g., <code>videos/my-video.mp4</code>)</li>
                  </ol>
                </div>
              </div>
              {videoPreviewUrl && (
                <video controls className={styles.videoPreview} style={{ marginTop: '1rem' }}>
                  <source src={videoPreviewUrl} type="video/mp4" />
                </video>
              )}
            </>
          )}

          <div className={styles.field}>
            <label htmlFor="mediaType" className={styles.label}>
              Media Type
            </label>
            <select
              id="mediaType"
              value={formData.mediaType}
              onChange={(e) =>
                setFormData({ ...formData, mediaType: e.target.value })
              }
              className={styles.select}
            >
              <option value="NONE">None</option>
              <option value="WALKTHROUGH">Walkthrough Video</option>
              <option value="AUDIO">Audio (SoundCloud)</option>
              <option value="VIDEO">Video (YouTube)</option>
            </select>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Categories *</h3>
          <div className={styles.checkboxGrid}>
            {categories.map((category) => (
              <label key={category.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.categoryIds.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Skills *</h3>
          <div className={styles.checkboxGrid}>
            {skills.map((skill) => (
              <label key={skill.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.skillIds.includes(skill.id)}
                  onChange={() => toggleSkill(skill.id)}
                />
                {skill.name}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Project Notes (Markdown) *</h3>
          <SimpleMDE
            value={formData.notes}
            onChange={(value) => setFormData({ ...formData, notes: value })}
          />
        </div>

        <div className={styles.actions}>
          <Link href="/admin/projects" className={styles.cancelButton}>
            Cancel
          </Link>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}
