import { TasksWidget } from '@hub/tasks'
import { Card, CardContent } from '@hub/ui'
import { ModuleShell } from '../../components/module-shell'

export default function TasksPage() {
  return (
    <ModuleShell
      eyebrow="Execution Layer"
      title="Tarefas"
      description="Painel de execução para manter foco nas entregas do dia, equilibrando urgência, progresso e capacidade operacional."
      metrics={[
        { label: 'In Progress', value: '07', detail: 'Itens já puxados para o ciclo atual.' },
        { label: 'Concluídas Hoje', value: '04', detail: 'Entrega diária com ritmo consistente.' },
        { label: 'Atrasadas', value: '02', detail: 'Itens que exigem renegociação ou ação imediata.' },
      ]}
      sidebarTitle="Sprint Board"
      sidebarDescription="O lado direito resume carga de trabalho e ajuda a decidir onde focar sem abrir o sistema inteiro de tarefas."
      sidebarContent={
        <div className="space-y-3">
          {[
            ['Prioridade máxima', 'Revisar roadmap'],
            ['Próxima entrega', 'Sync com parceiro'],
            ['Janela de foco', '14:00 - 16:00'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-black/5 px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">{label}</p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">{value}</p>
            </div>
          ))}
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <TasksWidget summary={{ totalTasks: 18, completedToday: 4, overdue: 2, inProgress: 7 }} />
        <Card>
          <CardContent className="space-y-4 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#49a296]">Queue Status</p>
            {[
              ['Produto', '3 em andamento'],
              ['Operação', '2 pendências'],
              ['Aprendizado', '1 bloco reservado'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-black/5 pb-3 text-sm last:border-0 last:pb-0">
                <span className="font-semibold text-zinc-900">{label}</span>
                <span className="font-mono text-zinc-400">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </ModuleShell>
  )
}
