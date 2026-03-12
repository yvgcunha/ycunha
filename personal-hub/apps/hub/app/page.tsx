import { FinancesWidget } from '@hub/finances'
import { TasksWidget } from '@hub/tasks'
import { NotesWidget } from '@hub/notes'
import { NewsWidget } from '@hub/news'
import { ReadingWidget } from '@hub/reading'
import { ProfessionalWidget } from '@hub/professional'

import { Card, CardContent } from '@hub/ui'

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Technical Header */}
      <header className="flex justify-between items-end pb-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 font-bold mb-2">
            System Status: Online [18 MARCH 2025 - 3:36PM]
          </p>
          <h1 className="text-4xl font-black tracking-tighter uppercase font-sans">
            Dashboard <span className="text-zinc-300">Overview</span>
          </h1>
        </div>
        <button className="bg-white border-2 border-zinc-100 rounded-full px-6 py-2 text-xs font-bold uppercase tracking-tight shadow-sm hover:shadow-md transition-all flex items-center gap-2 group">
          <span className="text-brand-teal group-hover:scale-125 transition-transform">+</span>
          Add Module
        </button>
      </header>

      {/* Top Stats Row (Industrial Style) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Tasks', value: '12', sub: 'Priority items in queue' },
          { label: 'Finance Balance', value: 'R$ 4.520', sub: 'Cumulative monthly total' },
          { label: 'Unread News', value: '42', sub: 'Sources pending review' },
          { label: 'Reading List', value: '5', sub: 'Books in progress' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between min-h-[140px] shadow-sm">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 font-mono mb-4">{stat.label}</p>
              <p className="text-3xl font-black font-sans tracking-tight">{stat.value}</p>
            </div>
            <p className="text-[11px] text-gray-400 leading-tight">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Widgets Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-100" />
          <p className="text-[10px] uppercase tracking-[0.34em] font-bold text-gray-400 whitespace-nowrap">Core Performance Modules</p>
          <div className="h-px flex-1 bg-gray-100" />
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
