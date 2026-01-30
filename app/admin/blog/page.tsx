'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './blog.module.css'
import Button from '@/components/Button'
import { useUIContext } from '@/context/UIContext'

type BlogPost = {
  id: string
  slug: string
  title: string
  author: string
  publishedAt: string
  status: string
  categories: { slug: string; name: string }[]
}

function SortableRow({ post }: { post: BlogPost }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${post.slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        window.location.reload()
      } else {
        alert('Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
      alert('An error occurred while deleting the blog post')
    }
  }

  return (
    <tr ref={setNodeRef} style={style} className={styles.row}>
      <td className={styles.dragHandle} {...attributes} {...listeners}>
        ⋮⋮
      </td>
      <td className={styles.postTitle}>
        <Link href={`/admin/blog/${post.id}`}>{post.title}</Link>
      </td>
      <td>{post.author}</td>
      <td>{formattedDate}</td>
      <td>
        <span className={styles[`status${post.status}`]}>{post.status}</span>
      </td>
      <td>{post.categories.map((c) => c.name).join(', ') || '—'}</td>
      <td className={styles.actions}>
        <Button href={`/admin/blog/${post.id}`} className={styles.editButton} variant='outline'>
          Edit
        </Button>
        <Button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </Button>
      </td>
    </tr>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { setPageHandle } = useUIContext()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setPageHandle('other')
    fetchPosts()
  }, [setPageHandle])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = posts.findIndex((p) => p.id === active.id)
      const newIndex = posts.findIndex((p) => p.id === over.id)

      const newPosts = arrayMove(posts, oldIndex, newIndex)
      setPosts(newPosts)

      // Save the new order to the backend
      setSaving(true)
      try {
        await fetch('/api/blog/reorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postIds: newPosts.map((p) => p.id),
          }),
        })
      } catch (error) {
        console.error('Error saving order:', error)
        alert('Failed to save blog post order')
      } finally {
        setSaving(false)
      }
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading blog posts...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Blog Posts</h1>
        <Link href="/admin" className={styles.backLink}>
          ← Dashboard
        </Link>
        <div className={styles.comingSoon}>
          <p>✨ Full CRUD form coming soon!</p>
          <p className={styles.note}>
            For now, you can manage blog posts via the API or database directly.
          </p>
        </div>
      </div>

      {saving && <div className={styles.savingIndicator}>Saving order...</div>}

      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No blog posts yet.</p>
          <p className={styles.note}>
            Create posts via the API at <code>/api/blog</code>
          </p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.dragHeader}></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Published</th>
                  <th>Status</th>
                  <th>Categories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <SortableContext
                items={posts.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {posts.map((post) => (
                    <SortableRow key={post.id} post={post} />
                  ))}
                </tbody>
              </SortableContext>
            </table>
          </DndContext>
        </div>
      )}
    </div>
  )
}
