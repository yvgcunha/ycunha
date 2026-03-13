'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '../../lib/auth-actions'
import { SidebarShell } from '../../components/sidebar-shell'

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
      router.push('/')
    })
  }

  return (
    <div className="flex min-h-screen items-stretch bg-[#f8f9fa] text-foreground md:h-screen md:overflow-hidden">
      <SidebarShell />
      <main className="relative min-h-screen flex-1 overflow-y-auto md:min-h-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(73,162,150,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.06),_transparent_24%)]" />
        <div className="relative mx-auto max-w-[1600px] p-5 sm:p-8 lg:p-10">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#49a296]" />
              <h1 className="text-lg font-black uppercase tracking-[-0.02em] text-zinc-900">
                Personal HUB
              </h1>
            </div>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="rounded-lg bg-[#49a296]/10 px-4 py-2 text-sm font-bold uppercase text-[#49a296] transition-colors hover:bg-[#49a296]/20 disabled:opacity-50"
            >
              {isPending ? 'Saindo...' : 'Sair'}
            </button>
          </header>
          {children}
        </div>
      </main>
    </div>
  )
}
