import type { BaseEntity } from '@hub/lib/types'

export interface Skill extends BaseEntity {
  userId: string
  name: string
  category: string
  level: number // 1-5
  yearsOfExperience?: number
}

export interface CareerGoal extends BaseEntity {
  userId: string
  title: string
  description?: string
  targetDate?: string
  completed: boolean
  milestones: Milestone[]
}

export interface Milestone {
  id: string
  title: string
  completed: boolean
  dueDate?: string
}

export interface Contact extends BaseEntity {
  userId: string
  name: string
  role?: string
  company?: string
  email?: string
  linkedinUrl?: string
  notes?: string
  tags: string[]
  lastContactedAt?: string
}

export interface ProfessionalSummary {
  topSkills: Skill[]
  activeGoals: number
  contactsCount: number
  upcomingMilestones: Milestone[]
}

export interface CvSourceFile {
  name: string
  size: number
  type: string
  uploadedAt: string
}

export interface CvAnalysisResult {
  score?: number
  status: 'idle' | 'ready' | 'blocked'
  message: string
}

export interface CvGenerationRequest {
  requirements: string
  scope: string
  expectations: string
  extraContext: string
}
