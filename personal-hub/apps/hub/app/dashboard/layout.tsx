'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '../../lib/auth-actions'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
      router.push('/')
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#49a296]" />
            <h1 className="text-lg font-black uppercase tracking-[-0.02em] text-zinc-900">
              Personal HUB
            </h1>
          </div>
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="rounded-lg border border-black/10 bg-black/5 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-black/10 disabled:opacity-50"
          >
            {isPending ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
