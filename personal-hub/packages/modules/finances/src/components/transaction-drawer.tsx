'use client'

import { useState, useTransition } from 'react'
import { createTransaction } from '../actions'

interface TransactionDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const CATEGORIES = [
  'Salário',
  'Renda Extra',
  'Moradia',
  'Alimentação',
  'Transporte',
  'Ferramentas',
  'Saúde',
  'Educação',
  'Entretenimento',
  'Outros',
]

export function TransactionDrawer({ isOpen, onClose, onSuccess }: TransactionDrawerProps) {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: CATEGORIES[3], // Alimentação as default
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim() || !formData.amount) {
      setError('Preencha os campos obrigatórios')
      return
    }

    startTransition(async () => {
      const result = await createTransaction({
        title: formData.title,
        amount: parseFloat(formData.amount),
        type: formData.type,
        category: formData.category,
        date: formData.date,
        notes: formData.notes || undefined,
      })

      if (result) {
        // Dispatch event for notification
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('financeTransactionSaved', {
              detail: {
                title: formData.title,
                type: formData.type,
                amount: parseFloat(formData.amount),
              },
            })
          )
        }

        setFormData({
          title: '',
          amount: '',
          type: 'expense',
          category: CATEGORIES[3],
          date: new Date().toISOString().split('T')[0],
          notes: '',
        })
        onSuccess?.()
        onClose()
      } else {
        setError('Erro ao salvar transação')
      }
    })
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md transform bg-gradient-to-b from-slate-900 to-slate-950 transition-transform duration-300 ease-out sm:shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#49a296]">
                Nova Transação
              </p>
              <h2 className="mt-1 text-lg font-black text-white">Registrar</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-white transition hover:bg-white/10"
              disabled={isPending}
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
            {/* Type Selector (Quick Toggle) */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Tipo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['expense', 'income'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={`rounded-lg px-4 py-2.5 text-sm font-bold uppercase transition ${
                      formData.type === t
                        ? t === 'income'
                          ? 'border border-green-500/50 bg-green-500/20 text-green-400'
                          : 'border border-red-500/50 bg-red-500/20 text-red-400'
                        : 'border border-white/10 bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {t === 'income' ? '+ Receita' : '- Despesa'}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Descrição *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Salário, Café..."
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#49a296] focus:outline-none focus:ring-1 focus:ring-[#49a296]/50"
                disabled={isPending}
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Valor (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#49a296] focus:outline-none focus:ring-1 focus:ring-[#49a296]/50"
                disabled={isPending}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Categoria
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-[#49a296] focus:outline-none focus:ring-1 focus:ring-[#49a296]/50"
                disabled={isPending}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Data
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-[#49a296] focus:outline-none focus:ring-1 focus:ring-[#49a296]/50"
                disabled={isPending}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Notas
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Detalhes adicionais..."
                rows={2}
                className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#49a296] focus:outline-none focus:ring-1 focus:ring-[#49a296]/50"
                disabled={isPending}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
                <p className="text-xs font-semibold text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="mt-auto flex gap-2 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 rounded-lg bg-[#49a296] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#49a296]/90 disabled:opacity-50"
              >
                {isPending ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="flex-1 rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
