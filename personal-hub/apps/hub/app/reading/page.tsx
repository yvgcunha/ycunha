import { ReadingWidget } from '@hub/reading'
import { Card, CardContent } from '@hub/ui'
import { ModuleShell } from '../../components/module-shell'

export default function ReadingPage() {
  return (
    <ModuleShell
      eyebrow="Reading Pipeline"
      title="Leituras"
      description="Organização do que está em leitura, do que veio do módulo de notícias e do que deve entrar na fila de aprofundamento."
      metrics={[
        { label: 'Lendo Agora', value: '03', detail: 'Itens ativos em consumo e anotação.' },
        { label: 'Concluídos', value: '12', detail: 'Materiais encerrados no ano corrente.' },
        { label: 'Na Fila', value: '27', detail: 'Backlog curado para leitura futura.' },
      ]}
      sidebarTitle="Reading Queue"
      sidebarDescription="A curadoria aqui ajuda a transformar notícia em leitura estruturada, sem perder o contexto de onde cada item surgiu."
      sidebarContent={
        <div className="space-y-3">
          {[
            ['Origem dominante', 'News module'],
            ['Formato principal', 'Artigos longos'],
            ['Meta semanal', '2 concluídos'],
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
        <ReadingWidget
          summary={{
            currentlyReading: 3,
            completedThisYear: 12,
            wantToRead: 27,
            currentBook: {
              id: 'book-1',
              userId: 'demo',
              title: 'Designing Data-Intensive Applications',
              type: 'book',
              status: 'reading',
              progress: 62,
              tags: ['systems'],
              createdAt: '',
              updatedAt: '',
            },
          }}
        />
        <Card>
          <CardContent className="space-y-4 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#49a296]">Focus List</p>
            {[
              ['Infrastructure essays', 'Alta prioridade'],
              ['Fintech reports', 'Bridge com news'],
              ['Product strategy', 'Leitura de fim de semana'],
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
