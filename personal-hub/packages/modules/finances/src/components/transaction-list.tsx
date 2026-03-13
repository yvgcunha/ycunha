'use client'

import { Card, CardContent } from '@hub/ui/card'
import { Badge } from '@hub/ui/badge'
import type { Transaction } from '../types'

interface TransactionListProps {
  transactions: Transaction[]
  emptyMessage?: string
}

const CATEGORY_COLORS: Record<string, string> = {
  Salário: 'bg-green-500',
  'Renda Extra': 'bg-emerald-500',
  Moradia: 'bg-red-500',
  Alimentação: 'bg-amber-500',
  Transporte: 'bg-blue-500',
  Ferramentas: 'bg-slate-500',
  Saúde: 'bg-pink-500',
  Educação: 'bg-purple-500',
  Entretenimento: 'bg-indigo-500',
  Outros: 'bg-gray-500',
}

export function TransactionList({
  transactions,
  emptyMessage = 'Nenhuma transação registrada.',
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => {
        const isIncome = transaction.type === 'income'
        const categoryColor = CATEGORY_COLORS[transaction.category] || 'bg-gray-500'

        return (
          <Card
            key={transaction.id}
            className="overflow-hidden border-white/5 bg-gradient-to-r from-slate-950/40 to-slate-900/20"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex flex-1 items-center gap-4">
                <div className={`h-3 w-3 rounded-full ${categoryColor}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{transaction.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {transaction.category}
                    </Badge>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p
                    className={`font-mono text-sm font-bold ${isIncome ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </p>
                  {transaction.notes && (
                    <p className="text-[10px] text-zinc-500">{transaction.notes}</p>
                  )}
                </div>
                <Badge
                  variant={isIncome ? 'default' : 'destructive'}
                  className="whitespace-nowrap text-[10px]"
                >
                  {isIncome ? 'Receita' : 'Despesa'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
