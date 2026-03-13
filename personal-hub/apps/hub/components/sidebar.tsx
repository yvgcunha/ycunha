'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@hub/ui'

const modules = [
  { href: '/', label: 'Dashboard', code: 'DB' },
  { href: '/finances', label: 'Finanças', code: 'FN' },
  { href: '/tasks', label: 'Tarefas', code: 'TK' },
  { href: '/notes', label: 'Notas', code: 'NT' },
  { href: '/news', label: 'Notícias', code: 'NW' },
  { href: '/reading', label: 'Leituras', code: 'RD' },
  { href: '/professional', label: 'Profissional', code: 'PR' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-72 flex-col bg-[#121212] text-white shadow-[16px_0_40px_-30px_rgba(15,23,42,0.8)]">
      <div className="border-b border-white/10 px-6 pb-6 pt-7">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800 shadow-inner">
            <img
              src="/logo.png"
              className="h-full w-full object-cover"
              style={{ imageRendering: 'pixelated' }}
              alt="Logo"
              onError={(e) => {
                // Fallback to a placeholder if logo doesn't exist
                e.currentTarget.src = 'https://api.dicebear.com/9.x/pixel-art/svg?seed=Yuri'
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#49a296]">
              Bem-vindo
            </p>
            <h1 className="mt-2 text-xl font-black uppercase tracking-tight">Personal HUB</h1>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.28em] text-white/45">
              Industrial Control Center
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/35">
            Technical Origin
          </p>
          <p className="mt-3 text-sm font-semibold text-white/88">Yuri Cunha</p>
          <p className="mt-1 text-xs leading-relaxed text-white/55">
            Workspace modular para finanças, tarefas, notas e foco profissional.
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-5">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
          Navigation
        </p>
        {modules.map((module) => {
          const isActive = pathname === module.href
          return (
            <Link
              key={module.href}
              href={module.href}
              className={cn(
                'group flex items-center gap-3 rounded-full border px-4 py-3 text-sm transition-all duration-200',
                isActive
                  ? 'border-[#49a296]/20 bg-[#49a296]/10 font-bold text-[#49a296]'
                  : 'border-transparent text-white/60 hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-2xl border text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all',
                  isActive
                    ? 'border-[#49a296]/30 bg-[#49a296]/14 text-[#49a296]'
                    : 'border-white/10 bg-white/[0.03] text-white/45 group-hover:text-white/80'
                )}
              >
                {module.code}
              </span>
              {module.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 bg-black/20 p-6">
        <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#49a296] shadow-[0_0_18px_rgba(73,162,150,0.7)]" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">System Online</p>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
              v0.0.1-industrial
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
