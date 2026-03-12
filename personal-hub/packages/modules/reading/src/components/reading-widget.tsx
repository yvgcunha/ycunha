import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui/card'
import type { ReadingSummary } from '../types'

interface ReadingWidgetProps {
  summary?: ReadingSummary
}

export function ReadingWidget({ summary }: ReadingWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leituras</CardTitle>
      </CardHeader>
      <CardContent>
        {summary?.currentBook && (
          <div className="mb-3 rounded-lg bg-amber-50 p-3 dark:bg-amber-950">
            <p className="text-xs font-medium text-muted-foreground">Lendo agora</p>
            <p className="truncate text-sm font-medium">{summary.currentBook.title}</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-amber-200 dark:bg-amber-800">
              <div
                className="h-1.5 rounded-full bg-amber-500"
                style={{ width: `${summary.currentBook.progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{summary.currentBook.progress}%</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xl font-bold">{summary?.currentlyReading ?? 0}</p>
            <p className="text-xs text-muted-foreground">Lendo</p>
          </div>
          <div>
            <p className="text-xl font-bold text-green-600">{summary?.completedThisYear ?? 0}</p>
            <p className="text-xs text-muted-foreground">Concluídos</p>
          </div>
          <div>
            <p className="text-xl font-bold text-blue-600">{summary?.wantToRead ?? 0}</p>
            <p className="text-xs text-muted-foreground">Na fila</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
