import type { BaseEntity } from '@hub/lib/types'

export interface Note extends BaseEntity {
  userId: string
  title: string
  content: string
  tags: string[]
  pinned: boolean
  archived: boolean
}

export interface SavedLink extends BaseEntity {
  userId: string
  url: string
  title: string
  description?: string
  tags: string[]
  favicon?: string
  read: boolean
}

export interface NotesSummary {
  totalNotes: number
  pinnedNotes: number
  recentNotes: Note[]
}
