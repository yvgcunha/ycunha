import { NotesWidget } from '@hub/notes'
import { Card, CardContent } from '@hub/ui'
import { ModuleShell } from '../../components/module-shell'

export default function NotesPage() {
  return (
    <ModuleShell
      eyebrow="Knowledge Base"
      title="Notas"
      description="Espaço para capturar ideias, agrupar referências e manter um histórico pesquisável das decisões e aprendizados do hub."
      metrics={[
        { label: 'Total de Notas', value: '128', detail: 'Acervo principal de registro pessoal e operacional.' },
        { label: 'Fixadas', value: '09', detail: 'Notas que seguem servindo de referência ativa.' },
        { label: 'Links Salvos', value: '34', detail: 'Fontes externas prontas para revisão.' },
      ]}
      sidebarTitle="Context Stack"
      sidebarDescription="A lateral indica o tipo de material que merece ficar sempre à mão: referência, decisões e conteúdo para aprofundar."
      sidebarContent={
        <div className="space-y-3">
          {[
            ['Mapa de produto', 'Atualizado hoje'],
            ['Referências de design', '12 itens'],
            ['Anotações rápidas', 'Fila limpa'],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400">{label}</span>
              <span className="text-sm font-bold text-zinc-900">{value}</span>
            </div>
          ))}
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <NotesWidget
          summary={{
            totalNotes: 128,
            pinnedNotes: 9,
            recentNotes: [
              { id: '1', title: 'Ideias para o módulo financeiro', content: '', tags: [], pinned: false, archived: false, userId: 'demo', createdAt: '', updatedAt: '' },
              { id: '2', title: 'Referências visuais do hub', content: '', tags: [], pinned: true, archived: false, userId: 'demo', createdAt: '', updatedAt: '' },
              { id: '3', title: 'Checklist de onboarding', content: '', tags: [], pinned: false, archived: false, userId: 'demo', createdAt: '', updatedAt: '' },
            ],
          }}
        />
        <Card>
          <CardContent className="space-y-4 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#49a296]">Recent Tags</p>
            <div className="flex flex-wrap gap-2">
              {['produto', 'ux', 'financas', 'artigos', 'roadmap', 'research'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#49a296]/20 bg-[#49a296]/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em] text-[#49a296]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </ModuleShell>
  )
}
