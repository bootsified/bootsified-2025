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
import styles from './projects.module.css'
import Button from '@/components/Button'
import { useUIContext } from '@/context/UIContext'

type Project = {
  id: string
  slug: string
  title: string
  client: string
  year: string
  projectType: string
  categories: { slug: string; name: string }[]
}

function SortableRow({ project }: { project: Project }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        window.location.reload()
      } else {
        alert('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('An error occurred while deleting the project')
    }
  }

  return (
    <tr ref={setNodeRef} style={style} className={styles.row}>
      <td className={styles.dragHandle} {...attributes} {...listeners}>
        ⋮⋮
      </td>
      <td className={styles.projectTitle}><Link href={`/admin/projects/${project.id}`}>{project.title}</Link></td>
      <td>{project.client}</td>
      <td>{project.year}</td>
      <td>{project.projectType.replace('_', ' ')}</td>
      <td>{project.categories.map((c) => c.name).join(', ')}</td>
      <td className={styles.actions}>
        <Button href={`/admin/projects/${project.id}`} className={styles.editButton} variant='outline'>
          Edit
        </Button>
        <Button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </Button>
      </td>
    </tr>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
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
    fetchProjects()
  }, [setPageHandle])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id)
      const newIndex = projects.findIndex((p) => p.id === over.id)

      const newProjects = arrayMove(projects, oldIndex, newIndex)
      setProjects(newProjects)

      // Save the new order to the backend
      setSaving(true)
      try {
        await fetch('/api/projects/reorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectIds: newProjects.map((p) => p.id),
          }),
        })
      } catch (error) {
        console.error('Error saving order:', error)
        alert('Failed to save project order')
      } finally {
        setSaving(false)
      }
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading projects...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Projects</h1>
        <Link href="/admin" className={styles.backLink}>
          ← Dashboard
        </Link>
        <Button href="/admin/projects/new" className={styles.createButton}>
          + New Project
        </Button>
      </div>

      {saving && <div className={styles.savingIndicator}>Saving order...</div>}

      {projects.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No projects yet.</p>
          <Link href="/admin/projects/new" className={styles.createButton}>
            Create your first project
          </Link>
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
                  <th>Client</th>
                  <th>Year</th>
                  <th>Type</th>
                  <th>Categories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <SortableContext
                items={projects.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {projects.map((project) => (
                    <SortableRow key={project.id} project={project} />
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
