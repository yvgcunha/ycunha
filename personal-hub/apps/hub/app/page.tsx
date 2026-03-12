import { FinancesWidget } from '@hub/finances'
import { TasksWidget } from '@hub/tasks'
import { NotesWidget } from '@hub/notes'
import { NewsWidget } from '@hub/news'
import { ReadingWidget } from '@hub/reading'
import { ProfessionalWidget } from '@hub/professional'

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Olá, Yuri 👋</h1>
        <p className="mt-1 text-muted-foreground">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FinancesWidget />
        <TasksWidget />
        <NotesWidget />
        <NewsWidget />
        <ReadingWidget />
        <ProfessionalWidget />
      </div>
    </div>
  )
}
