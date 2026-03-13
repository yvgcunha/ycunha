'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-full items-center justify-center px-6 py-16 text-zinc-950">
      <div className="w-full max-w-3xl rounded-[2rem] border border-black/5 bg-white p-10 text-center shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#49a296]">500 / System Layer</p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight">Algo saiu do trilho</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500">
          O Personal HUB encontrou um erro inesperado ao montar esta tela. Tente novamente em instantes
          ou retorne para a home.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex rounded-full border border-[#49a296]/20 bg-[#49a296]/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#49a296]"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-700"
          >
            Ir para a home
          </a>
        </div>
      </div>
    </main>
  )
}
