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
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">Personal HUB</h1>
        <p className="text-xs text-muted-foreground">Seu hub pessoal</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
              pathname === module.href
                ? 'bg-accent font-medium text-accent-foreground'
                : 'text-muted-foreground'
            )}
          >
            <span className="text-lg">{module.icon}</span>
            {module.label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">v0.0.1</p>
      </div>
    </aside>
  )
}
