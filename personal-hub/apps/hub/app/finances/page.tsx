'use client'

import { useState, useCallback } from 'react'
import {
  FinancesWidget,
  TransactionList,
  BudgetProgress,
  GoalsList,
  TransactionDrawer,
  getFinancesSummary,
  getTransactionsByMonth,
  getBudgetsWithSpending,
  getFinancialGoals,
} from '@hub/finances'
import { Card, CardContent } from '@hub/ui'
import { FinancesPageClient } from './page-client'

interface FinancesPageProps {
  summary: Awaited<ReturnType<typeof getFinancesSummary>>
  transactions: Awaited<ReturnType<typeof getTransactionsByMonth>>
  budgets: Awaited<ReturnType<typeof getBudgetsWithSpending>>
  goals: Awaited<ReturnType<typeof getFinancialGoals>>
  currentMonth: string
}

function FinancesPageContent({
  summary,
  transactions,
  budgets,
  goals,
  currentMonth,
}: FinancesPageProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [shouldRefresh, setShouldRefresh] = useState(false)

  const handleTransactionSaved = useCallback(() => {
    setShouldRefresh(true)
    setTimeout(() => setShouldRefresh(false), 100)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <section className="space-y-2">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#49a296]">
              Financial Core
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-white">Finanças</h1>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#49a296]/25 bg-[#49a296]/12 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#49a296] transition hover:bg-[#49a296]/18"
          >
            <span className="text-base">+</span>
            Registrar
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Saldo', value: formatCurrency(summary.balance) },
            { label: 'Receitas', value: formatCurrency(summary.totalIncome) },
            { label: 'Despesas', value: formatCurrency(summary.totalExpenses) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Month Selector */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <FinancesPageClient initialMonth={currentMonth} />
      </div>

      {/* Main Grid */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <FinancesWidget summary={summary} />

        {/* Budget Radar Card */}
        {budgets.length > 0 && (
          <Card>
            <CardContent className="space-y-4 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#49a296]">
                Budget Radar
              </p>
              <BudgetProgress budgets={budgets.slice(0, 3)} emptyMessage="Nenhum orçamento para este mês." />
            </CardContent>
          </Card>
        )}
      </section>

      {/* Transactions Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-white">Transações do Mês</h2>
          <span className="text-xs font-mono text-slate-400">{transactions.length} registros</span>
        </div>

        {transactions.length > 0 ? (
          <TransactionList transactions={transactions} />
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-sm text-muted-foreground">Nenhuma transação registrada neste mês.</p>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="mt-4 rounded-lg bg-[#49a296]/20 px-4 py-2 text-sm font-semibold text-[#49a296] transition hover:bg-[#49a296]/30"
              >
                Criar primeira transação
              </button>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Budget Details */}
      {budgets.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-white">Orçamentos Detalhados</h2>
          <Card>
            <CardContent className="p-6">
              <BudgetProgress budgets={budgets} />
            </CardContent>
          </Card>
        </section>
      )}

      {/* Goals Section */}
      {goals.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-white">Metas Financeiras</h2>
          <GoalsList goals={goals} />
        </section>
      )}

      {/* Transaction Drawer */}
      <TransactionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        month={currentMonth}
        onSuccess={handleTransactionSaved}
      />
    </div>
  )
}

export default async function FinancesPage() {
  const currentMonth = new Date().toISOString().slice(0, 7)

  const [summary, transactions, budgets, goals] = await Promise.all([
    getFinancesSummary(currentMonth),
    getTransactionsByMonth(currentMonth),
    getBudgetsWithSpending(currentMonth),
    getFinancialGoals(),
  ])

  return (
    <FinancesPageContent
      summary={summary}
      transactions={transactions}
      budgets={budgets}
      goals={goals}
      currentMonth={currentMonth}
    />
  )
}
