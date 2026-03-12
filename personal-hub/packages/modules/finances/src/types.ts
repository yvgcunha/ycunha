import type { BaseEntity } from '@hub/lib/types'

export type TransactionType = 'income' | 'expense'

export interface Transaction extends BaseEntity {
  userId: string
  title: string
  amount: number
  type: TransactionType
  category: string
  date: string
  notes?: string
}

export interface Budget extends BaseEntity {
  userId: string
  category: string
  limitAmount: number
  currentAmount: number
  month: string // YYYY-MM
}

export interface FinancialGoal extends BaseEntity {
  userId: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline?: string
  completed: boolean
}

export interface FinancesSummary {
  totalIncome: number
  totalExpenses: number
  balance: number
  month: string
}
