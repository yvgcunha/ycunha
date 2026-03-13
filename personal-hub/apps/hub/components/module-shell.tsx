import type { ReactNode } from 'react'
import { Card, CardContent } from '@hub/ui'

interface ModuleMetric {
  label: string
  value: string
  detail: string
}

interface ModuleShellProps {
  eyebrow: string
  title: string
  description: string
  metrics: ModuleMetric[]
  sidebarTitle: string
  sidebarDescription: string
  sidebarContent: ReactNode
  children: ReactNode
}

export function ModuleShell({
  eyebrow,
  title,
  description,
  metrics,
  sidebarTitle,
  sidebarDescription,
  sidebarContent,
  children,
}: ModuleShellProps) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
        <Card className="overflow-hidden border-white/10 bg-[#121212] text-white shadow-[0_26px_60px_-32px_rgba(15,23,42,0.7)]">
          <CardContent className="relative p-7 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(73,162,150,0.18),_transparent_34%),linear-gradient(135deg,_rgba(255,255,255,0.03),_transparent_45%)]" />
            <div className="relative space-y-8">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#49a296]">
                  {eyebrow}
                </p>
                <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/66 sm:text-[15px]">
                  {description}
                </p>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/38">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-black uppercase tracking-[0.08em] text-white/90">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{metric.detail}</p>
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
                Technical Origin
              </p>
              <p className="mt-3 text-2xl font-black uppercase tracking-tight text-zinc-900">
                {sidebarTitle}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{sidebarDescription}</p>
            </div>

            <div className="border-t border-black/5 pt-5">{sidebarContent}</div>
          </CardContent>
        </Card>
      </section>

      {children}
    </div>
  )
}
