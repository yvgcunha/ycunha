'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent } from '@hub/ui/card'
import { createTransaction } from '../actions'

interface AddTransactionFormProps {
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

export function AddTransactionForm({ onSuccess }: AddTransactionFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.amount) {
      alert('Preencha os campos obrigatórios')
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
        setFormData({
          title: '',
          amount: '',
          type: 'expense',
          category: CATEGORIES[0],
          date: new Date().toISOString().split('T')[0],
          notes: '',
        })
        setIsOpen(false)
        onSuccess?.()

        // Dispatch custom event for notification
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
      } else {
        // Dispatch error event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('financeTransactionError', {
              detail: { error: 'Erro ao salvar transação' },
            })
          )
        }
      }
    })
  }

  return (
    <div className="space-y-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#49a296]/25 bg-[#49a296]/12 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#49a296] transition hover:bg-[#49a296]/18"
        >
          <span className="text-base leading-none">+</span>
          Nova Transação
        </button>
      )}

      {isOpen && (
        <Card className="border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Salário, Café, Conta de luz"
                  className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#49a296] focus:outline-none focus:ring-1 focus:ring-[#49a296]/50"
                  disabled={isPending}
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Valor (R$)
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

              {/* Type */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })
                  }
                  className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-white focus:border-[#49a296] focus:outline-none focus:ring-1 focus:ring-[#49a296]/50"
                  disabled={isPending}
                >
                  <option value="expense">Despesa</option>
                  <option value="income">Receita</option>
                </select>
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
                  Notas (Opcional)
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

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 rounded-lg bg-[#49a296] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#49a296]/90 disabled:opacity-50"
                >
                  {isPending ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="flex-1 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
