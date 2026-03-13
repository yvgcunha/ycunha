'use client'

import { useState } from 'react'

interface FinancesPageClientProps {
  initialMonth: string
}

export function FinancesPageClient({ initialMonth }: FinancesPageClientProps) {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success')

  // Handle month navigation
  const handlePreviousMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number)
    let newMonth = month - 1
    let newYear = year

    if (newMonth === 0) {
      newMonth = 12
      newYear -= 1
    }

    const newDate = `${newYear}-${newMonth.toString().padStart(2, '0')}`
    setSelectedMonth(newDate)
  }

  const handleNextMonth = () => {
    const [year, month] = selectedMonth.split('-').map(Number)
    let newMonth = month + 1
    let newYear = year

    if (newMonth === 13) {
      newMonth = 1
      newYear += 1
    }

    const newDate = `${newYear}-${newMonth.toString().padStart(2, '0')}`
    const now = new Date().toISOString().slice(0, 7)

    if (newDate > now) {
      return // Prevent future months
    }

    setSelectedMonth(newDate)
  }

  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const currentMonth = new Date().toISOString().slice(0, 7)
  const isCurrentMonth = selectedMonth === currentMonth
  const canGoNext = selectedMonth < currentMonth

  // Global notification system for saved transactions
  // @ts-ignore - window global for notifications
  if (typeof window !== 'undefined' && !window.__financeNotificationListener) {
    // @ts-ignore
    window.__financeNotificationListener = true
    // Listen for custom events from AddTransactionForm
    window.addEventListener('financeTransactionSaved', (event: any) => {
      setNotificationMessage(
        event.detail?.type === 'income'
          ? `Receita salva com sucesso: ${event.detail?.title}`
          : `Despesa registrada com sucesso: ${event.detail?.title}`
      )
      setNotificationType('success')
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
    })

    window.addEventListener('financeTransactionError', (event: any) => {
      setNotificationMessage(`Erro ao salvar transação: ${event.detail?.error}`)
      setNotificationType('error')
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
    })
  }

  return (
    <div className="space-y-4">
      {/* Month Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handlePreviousMonth}
            className="flex-1 rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-xs font-semibold uppercase text-white transition hover:bg-slate-700/50 disabled:opacity-50"
            title="Mês anterior"
          >
            ←
          </button>

          <div className="flex-1 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {isCurrentMonth ? 'Mês Atual' : 'Mês Selecionado'}
            </p>
            <p className="mt-1 text-sm font-semibold capitalize text-white">{formatMonth(selectedMonth)}</p>
          </div>

          <button
            onClick={handleNextMonth}
            disabled={!canGoNext}
            className="flex-1 rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-xs font-semibold uppercase text-white transition hover:bg-slate-700/50 disabled:opacity-50"
            title="Próximo mês"
          >
            →
          </button>
        </div>

        {/* Quick access to last 6 months */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Últimos 6 meses</p>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => {
              const date = new Date()
              date.setMonth(date.getMonth() - i)
              const monthStr = date.toISOString().slice(0, 7)
              const isSelected = monthStr === selectedMonth

              return (
                <button
                  key={monthStr}
                  onClick={() => setSelectedMonth(monthStr)}
                  className={`rounded-lg px-3 py-2 text-[11px] font-semibold uppercase transition ${
                    isSelected
                      ? 'border-[#49a296] bg-[#49a296]/20 text-[#49a296]'
                      : 'border border-white/10 bg-slate-800/30 text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  {new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date)}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${
            notificationType === 'success'
              ? 'border-green-500/30 bg-green-500/10 text-green-400'
              : 'border-red-500/30 bg-red-500/10 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{notificationType === 'success' ? '✓' : '✕'}</span>
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
