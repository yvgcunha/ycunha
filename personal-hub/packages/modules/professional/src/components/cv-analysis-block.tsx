'use client'

import { useId, useState } from 'react'
import { Badge } from '@hub/ui'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@hub/ui'
import type { CvAnalysisResult, CvSourceFile } from '../types'

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function normalizeFile(file: File): CvSourceFile {
  return {
    name: file.name,
    size: file.size,
    type: file.type || 'application/octet-stream',
    uploadedAt: new Date().toISOString(),
  }
}

export function CvAnalysisBlock() {
  const inputId = useId()
  const [selectedFile, setSelectedFile] = useState<CvSourceFile | null>(null)
  const [error, setError] = useState<string>('')
  const [analysis, setAnalysis] = useState<CvAnalysisResult>({
    status: 'idle',
    message: 'Envie um PDF ou Word para preparar a leitura do CV.',
  })

  const handleFileSelection = (file: File | null) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setSelectedFile(null)
      setAnalysis({
        status: 'idle',
        message: 'Arquivo inválido. Use PDF, DOC ou DOCX.',
      })
      setError('Formato não suportado.')
      return
    }

    setError('')
    setSelectedFile(normalizeFile(file))
    setAnalysis({
      status: 'blocked',
      message:
        'Arquivo recebido. A leitura automática e o score 0-100 serão liberados assim que criarmos a base de skills para comparação.',
    })
  }

  const handleAnalysisRequest = () => {
    if (!selectedFile) {
      setError('Escolha um currículo antes de iniciar a análise.')
      return
    }

    setError('')
    setAnalysis({
      status: 'blocked',
      message:
        'Fluxo preparado. O próximo passo é conectar a skill de análise de CV com sua base real de habilidades e experiências.',
    })
  }

  return (
    <Card className="border-white/10 bg-[#121212] text-white shadow-[0_26px_60px_-32px_rgba(15,23,42,0.7)]">
      <CardHeader className="border-white/10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <CardTitle className="text-[#49a296]">Análise CV</CardTitle>
            <p className="max-w-xl text-sm leading-6 text-white/66">
              Recebe o currículo em PDF ou Word, prepara a leitura do conteúdo e compara o material
              com a base de skills que vamos cadastrar.
            </p>
          </div>
          <Badge className="border border-[#49a296]/20 bg-[#49a296]/10 text-[#49a296]">
            PDF / DOC / DOCX
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] px-6 py-10 text-center transition hover:border-[#49a296]/50 hover:bg-[#49a296]/[0.06]"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#49a296]">
            Upload de currículo
          </span>
          <span className="mt-3 text-lg font-black tracking-tight text-white">
            Selecione um arquivo
          </span>
          <span className="mt-2 max-w-md text-sm leading-6 text-white/58">
            O fluxo já aceita PDF e Word. A análise textual e o score serão conectados à skill de
            análise nos próximos passos.
          </span>
          <input
            id={inputId}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(event) => handleFileSelection(event.target.files?.[0] ?? null)}
          />
        </label>

        {selectedFile ? (
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">
                  Arquivo selecionado
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{selectedFile.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="border border-white/10 bg-white/5 text-white/75">
                  {formatFileSize(selectedFile.size)}
                </Badge>
                <Badge className="border border-white/10 bg-white/5 text-white/75">
                  {selectedFile.type.includes('pdf') ? 'PDF' : 'WORD'}
                </Badge>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Upload', selectedFile ? 'Pronto' : 'Aguardando'],
            ['Skill analisar CV', 'Pendente'],
            ['Score 0-100', 'Pendente'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/38">{label}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em] text-white/88">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">
            Status da análise
          </p>
          <p className="mt-3 text-sm leading-6 text-white/70">{analysis.message}</p>
          {analysis.score !== undefined ? (
            <p className="mt-4 text-3xl font-black tracking-tight text-white">{analysis.score}%</p>
          ) : null}
        </div>

        {error ? <p className="text-sm font-semibold text-red-400">{error}</p> : null}

        <Button
          type="button"
          onClick={handleAnalysisRequest}
          className="w-full rounded-full bg-[#49a296] text-white hover:bg-[#49a296]/90"
        >
          Analisar currículo
        </Button>
      </CardContent>
    </Card>
  )
}
