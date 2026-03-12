'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@hub/ui'

const modules = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/finances', label: 'Finanças', icon: '💰' },
  { href: '/tasks', label: 'Tarefas', icon: '✅' },
  { href: '/notes', label: 'Notas', icon: '📝' },
  { href: '/news', label: 'Notícias', icon: '📰' },
  { href: '/reading', label: 'Leituras', icon: '📚' },
  { href: '/professional', label: 'Profissional', icon: '💼' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col bg-brand-black text-white shadow-xl">
      <div className="p-6 flex flex-col items-center border-b border-white/5 gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 bg-slate-800 shadow-inner">
          <img 
            src="/logo.svg" 
            className="w-full h-full object-cover" 
            style={{ imageRendering: 'pixelated' }} 
            alt="Logo"
            onError={(e) => {
              // Fallback to a placeholder if logo doesn't exist
              e.currentTarget.src = "https://api.dicebear.com/9.x/pixel-art/svg?seed=Yuri"
            }}
          />
        </div>
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight uppercase font-sans">Personal HUB</h1>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Control Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="px-3 mb-2 text-[10px] uppercase font-bold text-white/30 tracking-widest">Navigation</p>
        {modules.map((module) => {
          const isActive = pathname === module.href
          return (
            <Link
              key={module.href}
              href={module.href}
              className={cn(
                'flex items-center gap-3 rounded-full px-4 py-2 text-sm transition-all duration-200 group',
                isActive
                  ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20 font-bold'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              )}
            >
              <span className={cn(
                "text-lg transition-transform group-hover:scale-110",
                isActive ? "text-white" : "text-brand-teal/70"
              )}>{module.icon}</span>
              {module.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs font-bold text-white/80">Yuri Cunha</p>
            <p className="text-[10px] text-white/40 font-mono">v0.0.1-INDUSTRIAL</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
        </div>
      </div>
    </aside>
  )
}
