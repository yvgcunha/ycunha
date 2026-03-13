'use client'

import { Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'

const modules = [
  { href: '/', label: 'Dashboard', code: 'DB' },
  { href: '/finances', label: 'Finanças', code: 'FN' },
  { href: '/tasks', label: 'Tarefas', code: 'TK' },
  { href: '/notes', label: 'Notas', code: 'NT' },
  { href: '/news', label: 'Notícias', code: 'NW' },
  { href: '/reading', label: 'Leituras', code: 'RD' },
  { href: '/professional', label: 'Profissional', code: 'PR' },
]

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onToggleMobile: () => void
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onToggleMobile,
}: SidebarProps) {
  return (
    <>
      <button
        type="button"
        onClick={onToggleMobile}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-800 shadow-md md:hidden"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        onClick={onToggleMobile}
        className={`fixed inset-0 z-30 bg-black/35 transition-opacity md:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-[100dvh] flex-col bg-[#121212] text-white shadow-[16px_0_40px_-30px_rgba(15,23,42,0.8)] transition-all duration-300 md:sticky md:top-0 md:z-auto md:h-full md:translate-x-0 ${
          collapsed ? 'md:w-24' : 'md:w-72'
        } ${mobileOpen ? 'translate-x-0 w-[84vw] max-w-[320px]' : '-translate-x-full w-[84vw] max-w-[320px]'}`}
      >
        <div className={`border-b border-white/10 pb-6 pt-7 ${collapsed ? 'px-4' : 'px-6'}`}>
          <div className={`mb-5 flex items-center ${collapsed ? 'justify-center' : 'gap-4'}`}>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800 shadow-inner">
              <img
                src="/logo.png"
                className="h-full w-full object-cover"
                style={{ imageRendering: 'pixelated' }}
                alt="Logo"
              />
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#49a296]">BEM-VINDO</p>
                <h1 className="mt-2 text-xl font-black tracking-tight">Yuri</h1>
              </div>
            ) : null}
          </div>
        </div>

        <nav className={`min-h-0 flex-1 space-y-2 overflow-y-auto py-5 ${collapsed ? 'px-3' : 'px-4'}`}>
          <div className={`mb-3 flex items-center ${collapsed ? 'justify-center' : 'justify-between px-3'}`}>
            {!collapsed ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">Navigation</p>
            ) : null}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:text-white md:flex"
            >
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          {modules.map((module) => (
            <a
              key={module.href}
              href={module.href}
              onClick={() => {
                if (mobileOpen) onToggleMobile()
              }}
              className={`group flex items-center rounded-full border border-transparent py-3 text-sm text-white/60 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.04] hover:text-white ${
                collapsed ? 'justify-center px-2' : 'gap-3 px-4'
              }`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/45 transition-all group-hover:text-white/80">
                {module.code}
              </span>
              {!collapsed ? <span>{module.label}</span> : null}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}
