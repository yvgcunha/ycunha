// Common types shared across all modules

export type ID = string

export interface BaseEntity {
  id: ID
  createdAt: string
  updatedAt: string
}

export interface User {
  id: ID
  email: string
  name: string | null
  avatarUrl: string | null
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Module metadata - used to register modules in the hub
export interface ModuleMeta {
  id: string
  name: string
  description: string
  icon: string
  href: string
  color: string
  enabled: boolean
}
