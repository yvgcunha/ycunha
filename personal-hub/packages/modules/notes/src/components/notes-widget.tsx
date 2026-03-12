import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui/card'
import type { NotesSummary } from '../types'

interface NotesWidgetProps {
  summary?: NotesSummary
}

export function NotesWidget({ summary }: NotesWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex gap-4">
          <div>
            <p className="text-2xl font-bold">{summary?.totalNotes ?? 0}</p>
            <p className="text-xs text-muted-foreground">Total de notas</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{summary?.pinnedNotes ?? 0}</p>
            <p className="text-xs text-muted-foreground">Fixadas</p>
          </div>
        </div>
        {summary?.recentNotes && summary.recentNotes.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Recentes</p>
            {summary.recentNotes.slice(0, 3).map((note) => (
              <p key={note.id} className="truncate text-sm">
                {note.title}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
