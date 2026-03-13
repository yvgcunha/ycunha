import { ProfessionalWidget } from '@hub/professional'
import { Card, CardContent } from '@hub/ui'
import { ModuleShell } from '../../components/module-shell'

export default function ProfessionalPage() {
  return (
    <ModuleShell
      eyebrow="Career Layer"
      title="Profissional"
      description="Acompanhamento de metas, networking e posicionamento profissional, com visão clara do que precisa avançar no curto prazo."
      metrics={[
        { label: 'Skills Top', value: '05', detail: 'Competências que mais sustentam o posicionamento atual.' },
        { label: 'Metas Ativas', value: '03', detail: 'Frentes profissionais em curso no trimestre.' },
        { label: 'Contatos', value: '41', detail: 'Rede acompanhada com contexto e histórico.' },
      ]}
      sidebarTitle="Growth Track"
      sidebarDescription="Resumo operacional para planejar networking, evolução de skill e próximos passos profissionais sem perder cadência."
      sidebarContent={
        <div className="space-y-3">
          {[
            ['Próxima conversa', 'Mentoria técnica'],
            ['Skill em foco', 'Product strategy'],
            ['Objetivo do mês', 'Atualizar portfólio'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">{label}</p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">{value}</p>
            </div>
          ))}
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <ProfessionalWidget
          summary={{
            topSkills: [
              { id: '1', userId: 'demo', name: 'Product', category: 'strategy', level: 5, createdAt: '', updatedAt: '' },
              { id: '2', userId: 'demo', name: 'Design Systems', category: 'design', level: 4, createdAt: '', updatedAt: '' },
              { id: '3', userId: 'demo', name: 'Frontend', category: 'engineering', level: 4, createdAt: '', updatedAt: '' },
            ],
            activeGoals: 3,
            contactsCount: 41,
            upcomingMilestones: [],
          }}
        />
        <Card>
          <CardContent className="space-y-4 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#49a296]">Network Notes</p>
            {[
              ['Contatos quentes', '08'],
              ['Seguimentos pendentes', '03'],
              ['Eventos mapeados', '02'],
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
