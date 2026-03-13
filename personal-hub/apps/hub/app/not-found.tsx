export default function NotFound() {
  return (
    <main className="flex min-h-full items-center justify-center px-6 py-16 text-zinc-950">
      <div className="w-full max-w-3xl rounded-[2rem] border border-black/5 bg-white p-10 text-center shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#49a296]">404 / Routing Layer</p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight">Pagina nao encontrada</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500">
          O caminho solicitado nao esta disponivel no Personal HUB. Retorne para o dashboard e siga por
          um dos modulos ativos.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex rounded-full border border-[#49a296]/20 bg-[#49a296]/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#49a296]"
        >
          Voltar ao dashboard
        </a>
      </div>
    </main>
  )
}
