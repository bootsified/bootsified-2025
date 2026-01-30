'use client'

import { useState, useEffect, FormEvent, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import styles from './blogForm.module.css'
import Button from '@/components/Button/Button'
import Image from 'next/image'
import type EasyMDE from 'easymde'
import { PageHandleSetter } from '@/components/PageHandleSetter'

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type BlogCategory = {
  id: string
  slug: string
  name: string
}

type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  publishedAt: string
  status: string
  categories: BlogCategory[]
}

type BlogFormProps = {
  postId?: string
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export default function BlogForm({ postId }: BlogFormProps) {
  const router = useRouter()
  const isEditing = !!postId && postId !== 'new'

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Boots',
    publishedAt: '',
    status: 'DRAFT',
    categoryIds: [] as string[],
  })

  const [uploading, setUploading] = useState<string | null>(null)
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true)

  useEffect(() => {
    fetchCategories()
    if (isEditing) {
      fetchPost()
    } else {
      // Set default published date to now for new posts
      const now = new Date()
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
      setFormData(prev => ({ ...prev, publishedAt: localDateTime }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, postId])

  // Auto-generate slug from title
  useEffect(() => {
    if (autoGenerateSlug && formData.title && !isEditing) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }))
    }
  }, [formData.title, autoGenerateSlug, isEditing])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchPost = async () => {
    try {
      // Fetch by ID using query param
      const response = await fetch(`/api/blog/${postId}?byId=true`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const post: BlogPost = await response.json()
      
      // Convert publishedAt to local datetime-local format
      const publishedDate = new Date(post.publishedAt)
      const localDateTime = new Date(publishedDate.getTime() - publishedDate.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
      
      setFormData({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        author: post.author,
        publishedAt: localDateTime,
        status: post.status,
        categoryIds: post.categories.map((c) => c.id),
      })
      
      setAutoGenerateSlug(false) // Don't auto-generate slug when editing
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Failed to load blog post')
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

  // Custom image upload handler for markdown editor
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await response.json()
      
      if (response.ok) {
        return data.url
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }, [])

  // SimpleMDE options with custom image upload
  const editorOptions = useMemo<EasyMDE.Options>(() => ({
    spellChecker: false,
    placeholder: 'Write your blog post content here...',
    uploadImage: true,
    imageUploadFunction: async (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
      try {
        const url = await uploadImage(file)
        onSuccess(url)
      } catch {
        onError('Failed to upload image')
      }
    },
  }), [uploadImage])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Convert local datetime to ISO string for API
      const publishedAtISO = formData.publishedAt 
        ? new Date(formData.publishedAt).toISOString()
        : new Date().toISOString()

      const payload = {
        ...formData,
        publishedAt: publishedAtISO,
      }

      const url = isEditing ? `/api/blog/${postId}?byId=true` : '/api/blog'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save blog post')
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading blog post...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
			<PageHandleSetter handle="other" />
      <div className={styles.header}>
        <h1 className={styles.heading}>
          {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
        </h1>
        <Link href="/admin/blog" className={styles.backLink}>
          ← Blog Posts
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
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
            <label htmlFor="slug" className={styles.label}>
              Slug *
              {!isEditing && (
                <label className={styles.autoSlugLabel}>
                  <input
                    type="checkbox"
                    checked={autoGenerateSlug}
                    onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                  />
                  Auto-generate from title
                </label>
              )}
            </label>
            <input
              type="text"
              id="slug"
              value={formData.slug}
              onChange={(e) => {
                setFormData({ ...formData, slug: e.target.value })
                setAutoGenerateSlug(false)
              }}
              className={styles.input}
              required
              pattern="[a-z0-9-]+"
              title="Lowercase letters, numbers, and hyphens only"
              disabled={autoGenerateSlug && !isEditing}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="author" className={styles.label}>
              Author
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="publishedAt" className={styles.label}>
              Published Date *
            </label>
            <input
              type="datetime-local"
              id="publishedAt"
              value={formData.publishedAt}
              onChange={(e) =>
                setFormData({ ...formData, publishedAt: e.target.value })
              }
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="status" className={styles.label}>
              Status *
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className={styles.input}
              required
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Featured Image *</h3>
          <p className={styles.fieldNote}>Recommended size: 1280x720 (16:9 aspect ratio)</p>
          <div className={styles.imageField}>
            {formData.featuredImage && (
              <Image
                src={formData.featuredImage}
                alt="Featured Image"
                className={styles.thumbnail}
                width={400}
                height={225}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, 'featuredImage')
              }}
              className={styles.fileInput}
              disabled={uploading === 'featuredImage'}
            />
            {uploading === 'featuredImage' && <span className={styles.uploading}>Uploading...</span>}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Excerpt *</h3>
          <p className={styles.fieldNote}>A short preview of the post (shown on cards)</p>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className={styles.textarea}
            rows={3}
            required
          />
        </div>

        {categories.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Categories</h3>
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
        )}

        <div className={styles.section}>
          <h3 className={styles.sectionTitle} style={{marginBottom: '0.25em'}}>
            Post Content *
          </h3>
          <p className={styles.fieldNote}>
            Markdown supported. You can paste or drag images directly into the editor.
          </p>
          <SimpleMDE
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            options={editorOptions}
          />
        </div>

        <div className={styles.actions}>
          <Link href="/admin/blog" className={styles.cancelButton}>
            Cancel
          </Link>
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}
