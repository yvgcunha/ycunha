'use server'

import { supabase } from '@hub/supabase'
import type { Database } from '@hub/supabase'
import type { Transaction, Budget, FinancialGoal, FinancesSummary } from './types'

const DEFAULT_USER_ID = process.env['NEXT_PUBLIC_DEFAULT_USER_ID'] ?? 'default-user'

type TransactionRow = Database['public']['Tables']['transactions']['Row']
type BudgetRow = Database['public']['Tables']['budgets']['Row']
type GoalRow = Database['public']['Tables']['financial_goals']['Row']

// ============================================================================
// READ ACTIONS
// ============================================================================

/**
 * Get monthly summary (total income, expenses, balance)
 */
export async function getFinancesSummary(
  month?: string,
  userId = DEFAULT_USER_ID
): Promise<FinancesSummary> {
  const currentMonth = month ?? new Date().toISOString().slice(0, 7) // YYYY-MM

  const { data, error } = await supabase
    .from('finances_monthly_summary')
    .select('*')
    .eq('user_id', userId)
    .eq('month', currentMonth)
    .single()

  if (error || !data) {
    // Return zero-sum if no data
    return {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      month: currentMonth,
    }
  }

  return {
    totalIncome: data.total_income ?? 0,
    totalExpenses: data.total_expenses ?? 0,
    balance: data.balance ?? 0,
    month: currentMonth,
  }
}

/**
 * Get all transactions for a given month
 */
export async function getTransactionsByMonth(
  month?: string,
  userId = DEFAULT_USER_ID
): Promise<Transaction[]> {
  const currentMonth = month ?? new Date().toISOString().slice(0, 7)
  const startDate = `${currentMonth}-01`
  // Get last day of month
  const endDate = new Date(parseInt(currentMonth), parseInt(currentMonth.split('-')[1]), 0)
    .toISOString()
    .split('T')[0]

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching transactions:', error)
    return []
  }

  return (data as TransactionRow[]).map((row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    amount: row.amount,
    type: row.type,
    category: row.category,
    date: row.date,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }))
}

/**
 * Get budgets with current spending calculated from transactions
 */
export async function getBudgetsWithSpending(
  month?: string,
  userId = DEFAULT_USER_ID
): Promise<Budget[]> {
  const currentMonth = month ?? new Date().toISOString().slice(0, 7)

  const { data: budgets, error: budgetsError } = await supabase
    .from('budgets')
    .select('*')
    .eq('user_id', userId)
    .eq('month', currentMonth)

  if (budgetsError || !budgets) {
    console.error('Error fetching budgets:', budgetsError)
    return []
  }

  // Get transactions for this month to calculate spending by category
  const transactions = await getTransactionsByMonth(currentMonth, userId)

  // Calculate current amount spent per category (expenses only)
  const spendingByCategory = new Map<string, number>()
  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      const current = spendingByCategory.get(tx.category) ?? 0
      spendingByCategory.set(tx.category, current + tx.amount)
    }
  })

  return (budgets as BudgetRow[]).map((row) => ({
    id: row.id,
    userId: row.user_id,
    category: row.category,
    limitAmount: row.limit_amount,
    currentAmount: spendingByCategory.get(row.category) ?? 0,
    month: row.month,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }))
}

/**
 * Get all financial goals for a user
 */
export async function getFinancialGoals(userId = DEFAULT_USER_ID): Promise<FinancialGoal[]> {
  const { data, error } = await supabase
    .from('financial_goals')
    .select('*')
    .eq('user_id', userId)
    .order('deadline', { ascending: true, nullsFirst: true })

  if (error) {
    console.error('Error fetching goals:', error)
    return []
  }

  return (data as GoalRow[]).map((row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    targetAmount: row.target_amount,
    currentAmount: row.current_amount,
    deadline: row.deadline ?? undefined,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }))
}

// ============================================================================
// WRITE ACTIONS
// ============================================================================

/**
 * Create a new transaction
 */
export async function createTransaction(
  data: {
    title: string
    amount: number
    type: 'income' | 'expense'
    category: string
    date: string
    notes?: string
  },
  userId = DEFAULT_USER_ID
): Promise<Transaction | null> {
  const { data: result, error } = await supabase
    .from('transactions')
    .insert([
      {
        user_id: userId,
        title: data.title,
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: data.date,
        notes: data.notes ?? null,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating transaction:', error)
    return null
  }

  const row = result as TransactionRow
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    amount: row.amount,
    type: row.type,
    category: row.category,
    date: row.date,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Update a transaction
 */
export async function updateTransaction(
  id: string,
  data: Partial<{
    title: string
    amount: number
    type: 'income' | 'expense'
    category: string
    date: string
    notes: string | null
  }>,
  userId = DEFAULT_USER_ID
): Promise<Transaction | null> {
  const { data: result, error } = await supabase
    .from('transactions')
    .update(data)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating transaction:', error)
    return null
  }

  const row = result as TransactionRow
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    amount: row.amount,
    type: row.type,
    category: row.category,
    date: row.date,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(id: string, userId = DEFAULT_USER_ID): Promise<boolean> {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    console.error('Error deleting transaction:', error)
    return false
  }

  return true
}

/**
 * Create a budget
 */
export async function createBudget(
  data: {
    category: string
    limitAmount: number
    month: string
  },
  userId = DEFAULT_USER_ID
): Promise<Budget | null> {
  const { data: result, error } = await supabase
    .from('budgets')
    .insert([
      {
        user_id: userId,
        category: data.category,
        limit_amount: data.limitAmount,
        month: data.month,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating budget:', error)
    return null
  }

  const row = result as BudgetRow
  return {
    id: row.id,
    userId: row.user_id,
    category: row.category,
    limitAmount: row.limit_amount,
    currentAmount: 0, // New budget has no spending yet
    month: row.month,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Update a budget
 */
export async function updateBudget(
  id: string,
  data: Partial<{
    limitAmount: number
  }>,
  userId = DEFAULT_USER_ID
): Promise<Budget | null> {
  const updateData: any = {}
  if (data.limitAmount !== undefined) {
    updateData.limit_amount = data.limitAmount
  }

  const { data: result, error } = await supabase
    .from('budgets')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating budget:', error)
    return null
  }

  const row = result as BudgetRow
  return {
    id: row.id,
    userId: row.user_id,
    category: row.category,
    limitAmount: row.limit_amount,
    currentAmount: 0, // Would need to refetch transactions
    month: row.month,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Create a financial goal
 */
export async function createGoal(
  data: {
    title: string
    targetAmount: number
    deadline?: string
  },
  userId = DEFAULT_USER_ID
): Promise<FinancialGoal | null> {
  const { data: result, error } = await supabase
    .from('financial_goals')
    .insert([
      {
        user_id: userId,
        title: data.title,
        target_amount: data.targetAmount,
        deadline: data.deadline ?? null,
        current_amount: 0,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating goal:', error)
    return null
  }

  const row = result as GoalRow
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    targetAmount: row.target_amount,
    currentAmount: row.current_amount,
    deadline: row.deadline ?? undefined,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Update goal progress
 */
export async function updateGoalProgress(
  id: string,
  currentAmount: number,
  userId = DEFAULT_USER_ID
): Promise<FinancialGoal | null> {
  const { data: result, error } = await supabase
    .from('financial_goals')
    .update({
      current_amount: currentAmount,
      completed: false, // Reset completion flag, will update when reaching target
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating goal:', error)
    return null
  }

  const row = result as GoalRow
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    targetAmount: row.target_amount,
    currentAmount: row.current_amount,
    deadline: row.deadline ?? undefined,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
