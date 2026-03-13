import { Badge } from '@hub/ui'
import { Card, CardContent } from '@hub/ui'
import { CvAnalysisBlock } from './cv-analysis-block'
import { CvGenerationBlock } from './cv-generation-block'

export function ProfessionalWorkbench() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]">
        <Card className="overflow-hidden border-white/10 bg-[#121212] text-white shadow-[0_26px_60px_-32px_rgba(15,23,42,0.7)]">
          <CardContent className="relative p-7 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(73,162,150,0.18),_transparent_34%),linear-gradient(135deg,_rgba(255,255,255,0.03),_transparent_45%)]" />
            <div className="relative space-y-7">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#49a296]">
                  CV Workflow
                </p>
                <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                  Analisar e gerar CV
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/66 sm:text-[15px]">
                  Dois blocos operacionais para leitura do currículo atual e criação da próxima
                  versão alinhada com a vaga, sempre respeitando apenas habilidades e entregas reais.
                </p>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                {[
                  ['Bloco 01', 'Análise CV', 'Recebe PDF ou Word e prepara o score de aderência.'],
                  ['Bloco 02', 'Gerar CV', 'Usa o contexto da vaga para orientar a próxima versão.'],
                  ['Fonte base', 'Skills próprias', 'Vai concentrar habilidades, experiências e entregas.'],
                ].map(([label, value, detail]) => (
                  <div key={label}>
                    <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/38">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-black uppercase tracking-[0.08em] text-white/90">
                      {value}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/90">
          <CardContent className="space-y-5 p-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#49a296]">
                Base Profissional
              </p>
              <p className="mt-3 text-2xl font-black tracking-tight text-zinc-900">
                Skills, experiências e entregas
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Este será o núcleo para análise e geração do CV. A intenção é comparar a vaga com a
                sua bagagem real, sem acrescentar competências que você não possui.
              </p>
            </div>

            <div className="space-y-3 border-t border-black/5 pt-5">
              {[
                'Cadastrar skills dominadas e em evolução',
                'Registrar experiências, escopo e resultados entregues',
                'Usar essa base para score e geração orientada por vaga',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-zinc-700"
                >
                  <Badge className="mt-0.5 border border-[#49a296]/15 bg-[#49a296]/10 text-[#49a296]">
                    ready
                  </Badge>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <CvAnalysisBlock />
        <CvGenerationBlock />
      </section>
    </div>
  )
}
