'use client'

import { AlertCircle, Check, RefreshCw } from 'lucide-react'

interface NewsHeaderProps {
  formattedDate: string
  totalArticles: number
  isPending: boolean
  status: 'idle' | 'success' | 'error'
  onRefresh: () => void
}

export function NewsHeader({
  formattedDate,
  totalArticles,
  isPending,
  status,
  onRefresh,
}: NewsHeaderProps) {
  return (
    <header className="sticky top-0 z-[100] -mx-5 -mt-5 border-b border-slate-200/60 bg-white/95 px-5 shadow-sm backdrop-blur-md transition-all duration-300 sm:-mx-8 sm:-mt-8 sm:px-8 lg:-mx-10 lg:-mt-10 lg:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-4">
        <div className="space-y-0.5">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#49a296]">{formattedDate}</p>
          <h2 className="text-xl font-black tracking-tight text-slate-900">Morning Briefing</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
            Top {totalArticles} noticias no radar
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isPending}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
            isPending
              ? 'cursor-not-allowed bg-slate-100 text-slate-400'
              : status === 'success'
                ? 'bg-green-100 text-green-600'
                : status === 'error'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-[#49a296] text-white shadow-md shadow-[#49a296]/20 hover:bg-[#49a296]/90'
          }`}
        >
          {isPending ? (
            <>
              <RefreshCw size={12} className="animate-spin" />
              Sincronizando...
            </>
          ) : status === 'success' ? (
            <>
              <Check size={12} />
              Atualizado
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle size={12} />
              Erro
            </>
          ) : (
            <>
              <RefreshCw size={12} />
              Refresh
            </>
          )}
        </button>
      </div>
    </header>
  )
}
