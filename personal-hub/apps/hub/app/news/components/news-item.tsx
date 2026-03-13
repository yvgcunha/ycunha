'use client'

import { useState } from 'react'
import { Badge } from '@hub/ui/badge'
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import type { NewsArticle } from '@hub/news'

interface NewsItemProps {
  article: NewsArticle
  onMarkAsRead: (articleId: string) => void
  onToggleSaved: (articleId: string) => void
}

function getBriefSummary(article: NewsArticle) {
  const summary = article.executiveSummary || article.description || 'Resumo indisponivel no momento.'
  return summary.length > 180 ? `${summary.slice(0, 177).trim()}...` : summary
}

export function NewsItem({ article, onMarkAsRead, onToggleSaved }: NewsItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const relevanceColors = {
    Alta: 'border-[#49a296] bg-[#49a296]/10 text-[#49a296]',
    Média: 'border-amber-500 bg-amber-500/10 text-amber-600',
    Baixa: 'border-slate-300 bg-slate-50 text-slate-500',
  }

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        isExpanded ? 'border-slate-300 bg-white shadow-md' : 'border-slate-100 bg-white/90 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onMarkAsRead(article.id)}
              className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-[#49a296]"
            >
              {article.sourceName}
            </a>
            <span className="text-[10px] font-mono text-slate-300">
              {new Date(article.publishedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            {article.relevance ? (
              <Badge className={`border px-1.5 py-0 text-[9px] ${relevanceColors[article.relevance] || relevanceColors.Baixa}`}>
                {article.relevance.toUpperCase()}
              </Badge>
            ) : null}
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onMarkAsRead(article.id)}
            className={`block text-sm leading-tight transition-colors group-hover:text-[#49a296] ${
              article.read ? 'text-slate-500' : 'font-bold text-slate-900'
            }`}
          >
            {article.title}
          </a>

          {!isExpanded && article.executiveSummary ? (
            <p className="line-clamp-1 text-xs font-sans text-slate-500">{article.executiveSummary}</p>
          ) : null}

          {!isExpanded && article.tags ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[9px] font-mono text-[#49a296] opacity-60">
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 self-center">
          <button
            type="button"
            onClick={() => onToggleSaved(article.id)}
            className={`rounded-full border p-2 transition ${
              article.saved
                ? 'border-amber-200 bg-amber-50 text-amber-600'
                : 'border-slate-200 text-slate-400 hover:border-amber-200 hover:text-amber-600'
            }`}
            aria-label={article.saved ? 'Remover dos salvos' : 'Salvar para ler depois'}
          >
            {article.saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="text-slate-300 hover:text-slate-600"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {isExpanded ? (
        <div className="animate-in slide-in-from-top-1 space-y-4 px-4 pb-5 duration-200">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#49a296] opacity-80">
              Resumo Rapido
            </span>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{getBriefSummary(article)}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap gap-2">
              {article.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {!article.read ? (
                <button
                  type="button"
                  onClick={() => onMarkAsRead(article.id)}
                  className="rounded-full border border-slate-200 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 transition hover:border-[#49a296] hover:text-[#49a296]"
                >
                  Marcar como lida
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => onToggleSaved(article.id)}
                className={`rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                  article.saved
                    ? 'border-amber-200 bg-amber-50 text-amber-700'
                    : 'border-slate-200 text-slate-500 hover:border-amber-200 hover:text-amber-700'
                }`}
              >
                {article.saved ? 'Salva' : 'Salvar para depois'}
              </button>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onMarkAsRead(article.id)}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#49a296] hover:underline"
              >
                Ler na fonte <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
