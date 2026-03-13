import type { NextPageContext } from 'next'

interface ErrorPageProps {
  statusCode?: number
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  const isNotFound = statusCode === 404

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-6 py-16 text-zinc-950">
      <div className="w-full max-w-3xl rounded-[2rem] border border-black/5 bg-white p-10 text-center shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#49a296]">
          {isNotFound ? '404 / Routing Layer' : '500 / System Layer'}
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight">
          {isNotFound ? 'Pagina nao encontrada' : 'Algo saiu do trilho'}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500">
          {isNotFound
            ? 'O caminho solicitado nao esta disponivel no Personal HUB. Retorne para o dashboard e siga por um dos modulos ativos.'
            : 'O Personal HUB encontrou um erro inesperado ao montar esta tela. Tente novamente em instantes ou retorne para a home.'}
        </p>
        <a
          href="/"
          className="mt-8 inline-flex rounded-full border border-[#49a296]/20 bg-[#49a296]/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#49a296]"
        >
          {isNotFound ? 'Voltar ao dashboard' : 'Ir para a home'}
        </a>
      </div>
    </main>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500
  return { statusCode }
}

export default ErrorPage
