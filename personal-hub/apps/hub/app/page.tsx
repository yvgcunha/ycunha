'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@hub/ui'
import { authenticateWithPassword } from '../lib/auth-actions'

export default function LoginPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password) {
      setError('Digite a senha de acesso')
      return
    }

    startTransition(async () => {
      const result = await authenticateWithPassword(password)

      if (result.success) {
        // Clear input and redirect
        setPassword('')
        router.push('/dashboard')
      } else {
        setError(result.error || 'Erro ao autenticar')
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)
      }
    })
  }

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a1929] to-slate-900 px-4">
      <Card className="w-full max-w-md overflow-hidden border-white/10 bg-[#121212] shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <img src="/logo.png" alt="Personal HUB" className="h-20 w-20 rounded-xl" />
            </div>
            <p className="text-sm leading-6 text-white/66">
              Acesso ao seu espaço pessoal de produtividade e controle financeiro.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.28em] text-white/50 mb-3">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                autoFocus
                disabled={isPending}
                className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-lg font-mono tracking-[0.2em] text-white placeholder-white/30 backdrop-blur-sm transition focus:border-[#49a296] focus:outline-none focus:ring-2 focus:ring-[#49a296]/30 disabled:opacity-50 ${
                  isShaking ? 'animate-shake' : ''
                }`}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-xs font-semibold text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-[#49a296] px-4 py-3 text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#49a296]/90 disabled:opacity-50"
            >
              {isPending ? 'Verificando...' : 'Acessar'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
            <p className="text-center text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">
              Sistema de Gestão Pessoal
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-1 rounded-full bg-green-500" />
              <p className="text-[10px] font-mono text-green-500">Sistema Online</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tailwind shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  )
}
