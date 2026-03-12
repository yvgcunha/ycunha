import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui/card'
import type { TasksSummary } from '../types'

interface TasksWidgetProps {
  summary?: TasksSummary
}

export function TasksWidget({ summary }: TasksWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
            <p className="text-2xl font-bold text-blue-600">{summary?.inProgress ?? 0}</p>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </div>
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
            <p className="text-2xl font-bold text-green-600">{summary?.completedToday ?? 0}</p>
            <p className="text-xs text-muted-foreground">Concluídas hoje</p>
          </div>
          <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-950">
            <p className="text-2xl font-bold text-orange-600">{summary?.overdue ?? 0}</p>
            <p className="text-xs text-muted-foreground">Atrasadas</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-950">
            <p className="text-2xl font-bold">{summary?.totalTasks ?? 0}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
