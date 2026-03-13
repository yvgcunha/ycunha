import {
  FinancesWidget,
  TransactionList,
  BudgetProgress,
  GoalsList,
  AddTransactionForm,
  getFinancesSummary,
  getTransactionsByMonth,
  getBudgetsWithSpending,
  getFinancialGoals,
} from '@hub/finances'
import { Card, CardContent } from '@hub/ui'
import { ModuleShell } from '../../components/module-shell'
import { FinancesPageClient } from './page-client'

export default async function FinancesPage() {
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

  // Fetch all data in parallel
  const [summary, transactions, budgets, goals] = await Promise.all([
    getFinancesSummary(currentMonth),
    getTransactionsByMonth(currentMonth),
    getBudgetsWithSpending(currentMonth),
    getFinancialGoals(),
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <ModuleShell
      eyebrow="Financial Core"
      title="Finanças"
      description="Acompanhamento direto do fluxo mensal, metas financeiras e categorias que precisam de atenção para manter previsibilidade."
      metrics={[
        {
          label: 'Saldo do Mês',
          value: formatCurrency(summary.balance),
          detail: 'Base consolidada de entradas e saídas recorrentes.',
        },
        {
          label: 'Receitas',
          value: formatCurrency(summary.totalIncome),
          detail: 'Total de entradas registradas.',
        },
        {
          label: 'Despesas',
          value: formatCurrency(summary.totalExpenses),
          detail: 'Total de saídas registradas.',
        },
      ]}
      sidebarTitle="Separação por Mês"
      sidebarDescription="Acesso rápido a meses anteriores e análise de histórico financeiro."
      sidebarContent={
        <FinancesPageClient initialMonth={currentMonth} />
      }
    >
      {/* Main Grid */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <FinancesWidget summary={summary} />

        {/* Budget Radar Card */}
        {budgets.length > 0 && (
          <Card>
            <CardContent className="space-y-4 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#49a296]">Budget Radar</p>
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
        <AddTransactionForm month={currentMonth} />
        {transactions.length > 0 ? (
          <TransactionList transactions={transactions} />
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-sm text-muted-foreground">Nenhuma transação registrada neste mês.</p>
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
    </ModuleShell>
  )
}
