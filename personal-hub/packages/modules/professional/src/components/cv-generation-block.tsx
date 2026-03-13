'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@hub/ui'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@hub/ui'
import type { CvGenerationRequest } from '../types'

const emptyRequest: CvGenerationRequest = {
  requirements: '',
  scope: '',
  expectations: '',
  extraContext: '',
}

export function CvGenerationBlock() {
  const [request, setRequest] = useState<CvGenerationRequest>(emptyRequest)
  const [message, setMessage] = useState(
    'Cole os requisitos da vaga e o contexto desejado para preparar a geração do CV.'
  )

  const canGenerate = useMemo(
    () => request.requirements.trim().length > 0 || request.scope.trim().length > 0,
    [request]
  )

  const updateField = (field: keyof CvGenerationRequest, value: string) => {
    setRequest((current) => ({ ...current, [field]: value }))
  }

  const handleGeneration = () => {
    setMessage(
      'Fluxo pronto para geração. O próximo passo é conectar sua base real de habilidades, experiências e entregas para montar um CV aderente sem inventar competências.'
    )
  }

  return (
    <Card className="border-black/5 bg-white/95">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <CardTitle className="text-[#49a296]">Gerar CV</CardTitle>
            <p className="max-w-xl text-sm leading-6 text-zinc-600">
              Recebe os requisitos da vaga e organiza a próxima versão do currículo com base nas
              skills e experiências reais que vamos cadastrar.
            </p>
          </div>
          <Badge className="border border-[#49a296]/15 bg-[#49a296]/10 text-[#49a296]">
            Sem inflar skills
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        <div className="grid gap-5">
          <label className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
              Requisitos da vaga
            </span>
            <textarea
              value={request.requirements}
              onChange={(event) => updateField('requirements', event.target.value)}
              rows={6}
              placeholder="Cole aqui stack, requisitos obrigatórios, diferenciais e responsabilidades."
              className="w-full rounded-[24px] border border-black/8 bg-white px-4 py-4 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#49a296]/60 focus:ring-2 focus:ring-[#49a296]/15"
            />
          </label>

          <div className="grid gap-5 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
                Escopo
              </span>
              <textarea
                value={request.scope}
                onChange={(event) => updateField('scope', event.target.value)}
                rows={5}
                placeholder="Cole informações sobre o escopo do trabalho, senioridade e contexto."
                className="w-full rounded-[24px] border border-black/8 bg-white px-4 py-4 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#49a296]/60 focus:ring-2 focus:ring-[#49a296]/15"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
                O que a vaga espera
              </span>
              <textarea
                value={request.expectations}
                onChange={(event) => updateField('expectations', event.target.value)}
                rows={5}
                placeholder="Cole expectativas de resultado, ownership, impacto e colaboração."
                className="w-full rounded-[24px] border border-black/8 bg-white px-4 py-4 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#49a296]/60 focus:ring-2 focus:ring-[#49a296]/15"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
              Outras informações
            </span>
            <textarea
              value={request.extraContext}
              onChange={(event) => updateField('extraContext', event.target.value)}
              rows={4}
              placeholder="Cole benefícios, cultura, links, observações ou notas adicionais."
              className="w-full rounded-[24px] border border-black/8 bg-white px-4 py-4 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#49a296]/60 focus:ring-2 focus:ring-[#49a296]/15"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Brief da vaga', canGenerate ? 'Recebido' : 'Aguardando'],
            ['Skill gerar CV', 'Pendente'],
            ['Base profissional', 'Pendente'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-black/5 bg-slate-50 p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">{label}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em] text-zinc-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-black/5 bg-slate-50 p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
            Saída esperada
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{message}</p>
        </div>

        <Button
          type="button"
          disabled={!canGenerate}
          onClick={handleGeneration}
          className="w-full rounded-full bg-[#121212] text-white hover:bg-black/90"
        >
          Preparar geração do CV
        </Button>
      </CardContent>
    </Card>
  )
}
