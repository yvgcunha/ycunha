'use client'

import type { Budget } from '../types'

interface BudgetProgressProps {
  budgets: Budget[]
  emptyMessage?: string
}

const getProgressColor = (percentage: number): string => {
  if (percentage < 70) return 'bg-green-500'
  if (percentage < 90) return 'bg-amber-500'
  return 'bg-red-500'
}

export function BudgetProgress({
  budgets,
  emptyMessage = 'Nenhum orçamento configurado.',
}: BudgetProgressProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (budgets.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200/30 bg-slate-50/50 px-4 py-8 text-center">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const percentage = budget.limitAmount > 0 ? (budget.currentAmount / budget.limitAmount) * 100 : 0
        const isOverBudget = budget.currentAmount > budget.limitAmount
        const progressColor = getProgressColor(Math.min(percentage, 100))

        return (
          <div key={budget.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-900">{budget.category}</span>
              <div className="flex items-center gap-2 text-right">
                <span className="font-mono text-xs text-zinc-500">
                  {formatCurrency(budget.currentAmount)} / {formatCurrency(budget.limitAmount)}
                </span>
                {isOverBudget && (
                  <span className="inline-block rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                    EXCESSO
                  </span>
                )}
              </div>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full transition-all ${progressColor}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>{percentage.toFixed(0)}% utilizado</span>
              {isOverBudget && (
                <span className="font-bold text-red-600">
                  +{formatCurrency(budget.currentAmount - budget.limitAmount)} acima
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
