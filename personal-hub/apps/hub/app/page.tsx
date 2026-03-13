import { FinancesWidget } from '@hub/finances'
import { TasksWidget } from '@hub/tasks'
import { NotesWidget } from '@hub/notes'
import { NewsWidget } from '@hub/news'
import { ReadingWidget } from '@hub/reading'
import { ProfessionalWidget } from '@hub/professional'

import { Card, CardContent } from '@hub/ui'

export default function DashboardPage() {
  const now = new Date()
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(now)

  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <Card className="overflow-hidden border-white/10 bg-[#121212] text-white shadow-[0_26px_60px_-32px_rgba(15,23,42,0.7)]">
          <CardContent className="relative p-7 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(73,162,150,0.2),_transparent_34%),linear-gradient(135deg,_rgba(255,255,255,0.03),_transparent_45%)]" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#49a296]">
                    Bem-vindo
                  </p>
                  <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                    Dashboard Overview
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/66 sm:text-[15px]">
                    Uma visão central do seu fluxo pessoal com leitura rápida, módulos técnicos e
                    contraste forte entre superfícies claras e navegação operacional.
                  </p>
                </div>

                <button className="inline-flex items-center gap-3 self-start rounded-full border border-[#49a296]/25 bg-[#49a296]/12 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#49a296] transition hover:bg-[#49a296]/18">
                  <span className="text-base leading-none">+</span>
                  Add Module
                </button>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/38">
                    System Status
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/88">
                    Online / Stable
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/38">
                    Technical Date
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/88">
                    {formattedDate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/38">
                    Sync Time
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/88">
                    {formattedTime}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/90">
          <CardContent className="p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#49a296]">
              Technical Origin
            </p>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
                  Active Focus
                </p>
                <p className="mt-2 text-2xl font-black uppercase tracking-tight text-zinc-900">
                  Personal HUB
                </p>
              </div>
              <div className="space-y-3 border-t border-black/5 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                    Modules
                  </span>
                  <span className="text-sm font-bold text-zinc-900">06</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                    Visual Mode
                  </span>
                  <span className="text-sm font-bold text-zinc-900">Industrial</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                    Accent
                  </span>
                  <span className="rounded-full border border-[#49a296]/20 bg-[#49a296]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#49a296]">
                    #49A296
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Active Tasks', value: '12', sub: 'Priority items in queue' },
          { label: 'Finance Balance', value: 'R$ 4.520', sub: 'Cumulative monthly total' },
          { label: 'Unread News', value: '42', sub: 'Sources pending review' },
          { label: 'Reading List', value: '5', sub: 'Books in progress' },
        ].map((stat, i) => (
          <Card key={i} className="min-h-[156px]">
            <CardContent className="flex h-full flex-col justify-between p-6">
              <div>
                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-black tracking-tight text-zinc-950">{stat.value}</p>
              </div>
              <p className="border-t border-black/5 pt-4 text-[11px] leading-tight text-zinc-400">
                {stat.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-black/6" />
          <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.34em] text-zinc-400">
            Core Performance Modules
          </p>
          <div className="h-px flex-1 bg-black/6" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FinancesWidget />
          <TasksWidget />
          <NotesWidget />
          <NewsWidget />
          <ReadingWidget />
          <ProfessionalWidget />
        </div>
      </section>
    </div>
  )
}
