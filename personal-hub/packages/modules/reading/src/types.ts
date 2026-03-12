import type { BaseEntity } from '@hub/lib/types'

export type ReadingStatus = 'want_to_read' | 'reading' | 'completed' | 'abandoned'
export type ContentType = 'book' | 'article' | 'paper' | 'newsletter' | 'other'

export interface ReadingItem extends BaseEntity {
  userId: string
  title: string
  author?: string
  url?: string
  type: ContentType
  status: ReadingStatus
  progress: number // 0-100
  notes?: string
  tags: string[]
  startedAt?: string
  finishedAt?: string
  rating?: number // 1-5
  newsArticleId?: string // populated when saved from the news module (Morning Brief)
}

export interface ReadingSummary {
  currentlyReading: number
  completedThisYear: number
  wantToRead: number
  currentBook?: ReadingItem
}
