import { FinancesWidget } from '@hub/finances'
import { TasksWidget } from '@hub/tasks'
import { NotesWidget } from '@hub/notes'
import { NewsWidget } from '@hub/news'
import { ReadingWidget } from '@hub/reading'
import { ProfessionalWidget } from '@hub/professional'

import { Card, CardContent } from '@hub/ui'

export default function DashboardPage() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <section>
        <Card className="overflow-hidden border-white/10 bg-[#121212] text-white shadow-[0_26px_60px_-32px_rgba(15,23,42,0.7)]">
          <CardContent className="relative p-7 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(73,162,150,0.2),_transparent_34%),linear-gradient(135deg,_rgba(255,255,255,0.03),_transparent_45%)]" />
            <div className="relative flex min-h-[220px] items-center">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#49a296]">
                  BEM-VINDO
                </p>
                <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                  Yuri
                </h1>
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
