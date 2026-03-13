import type { BaseEntity } from '@hub/lib/types'

export interface NewsSource extends BaseEntity {
  id: string
  userId: string
  name: string
  url: string
  feedUrl: string
  category: string
  enabled: boolean
  favicon?: string
}

export interface NewsArticle {
  id: string
  sourceId: string
  sourceName: string
  title: string
  url: string
  description?: string
  imageUrl?: string
  publishedAt: string
  read: boolean
  saved: boolean
  // Enriched Morning Brief fields
  executiveSummary?: string
  tags?: string[]
  relevance?: 'Alta' | 'Média' | 'Baixa'
  impact?: string
  hash?: string
  category?: string
}

export interface NewsSummary {
  unreadCount: number
  savedCount: number
  recentArticles: NewsArticle[]
}
