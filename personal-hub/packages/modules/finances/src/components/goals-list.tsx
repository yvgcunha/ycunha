'use client'

import { Card, CardContent } from '@hub/ui/card'
import { Badge } from '@hub/ui/badge'
import type { FinancialGoal } from '../types'

interface GoalsListProps {
  goals: FinancialGoal[]
  emptyMessage?: string
}

export function GoalsList({ goals, emptyMessage = 'Nenhuma meta financeira definida.' }: GoalsListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Sem prazo'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const getDaysUntilDeadline = (deadline: string | undefined): number | null => {
    if (!deadline) return null
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diff = deadlineDate.getTime() - today.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const getDeadlineStatus = (deadline: string | undefined): { status: string; color: string } => {
    const days = getDaysUntilDeadline(deadline)
    if (days === null) return { status: 'Sem prazo', color: 'text-slate-500' }
    if (days < 0) return { status: `${Math.abs(days)} dias atrasada`, color: 'text-red-500' }
    if (days === 0) return { status: 'Vence hoje', color: 'text-amber-500' }
    return { status: `${days} dias restantes`, color: 'text-green-500' }
  }

  if (goals.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {goals.map((goal) => {
        const percentage = (goal.currentAmount / goal.targetAmount) * 100
        const deadlineInfo = getDeadlineStatus(goal.deadline)
        const isCompleted = goal.completed || goal.currentAmount >= goal.targetAmount

        return (
          <Card key={goal.id} className="overflow-hidden border-white/5 bg-gradient-to-br from-slate-950/60 to-slate-900/40">
            <CardContent className="p-5">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{goal.title}</p>
                    <p className={`text-[10px] font-mono uppercase tracking-wider ${deadlineInfo.color}`}>
                      {deadlineInfo.status}
                    </p>
                  </div>
                  {isCompleted && <Badge className="rounded-full bg-green-500">Concluída</Badge>}
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div
                      className={`h-2.5 rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-[#49a296]'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">{percentage.toFixed(0)}%</span>
                    <span className="font-mono text-slate-400">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                </div>

                {/* Deadline */}
                {goal.deadline && (
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Prazo: {formatDate(goal.deadline)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
