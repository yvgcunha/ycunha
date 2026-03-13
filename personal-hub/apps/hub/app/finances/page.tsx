import {
  getFinancesSummary,
  getTransactionsByMonth,
  getBudgetsWithSpending,
  getFinancialGoals,
} from '@hub/finances'
import { FinancesPageContent } from './finances-page-content'

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
