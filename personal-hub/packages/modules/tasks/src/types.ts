import type { BaseEntity } from '@hub/lib/types'

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Task extends BaseEntity {
  userId: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  projectId?: string
  dueDate?: string
  tags: string[]
  completedAt?: string
}

export interface Project extends BaseEntity {
  userId: string
  name: string
  description?: string
  color: string
  archived: boolean
  taskCount: number
  completedTaskCount: number
}

export interface TasksSummary {
  totalTasks: number
  completedToday: number
  overdue: number
  inProgress: number
}
