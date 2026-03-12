import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui/card'
import { Badge } from '@hub/ui/badge'
import type { FinancesSummary } from '../types'

interface FinancesWidgetProps {
  summary?: FinancesSummary
}

export function FinancesWidget({ summary }: FinancesWidgetProps) {
  const balance = summary?.balance ?? 0
  const isPositive = balance >= 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Finanças</span>
          <Badge variant={isPositive ? 'default' : 'destructive'}>
            {isPositive ? 'Positivo' : 'Negativo'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Receitas</p>
            <p className="text-lg font-bold text-green-600">
              R$ {(summary?.totalIncome ?? 0).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Despesas</p>
            <p className="text-lg font-bold text-red-600">
              R$ {(summary?.totalExpenses ?? 0).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Saldo</p>
            <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              R$ {balance.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
