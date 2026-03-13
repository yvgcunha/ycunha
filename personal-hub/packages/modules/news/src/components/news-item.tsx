'use client'

import { useState } from 'react'
import { Badge } from '@hub/ui/badge'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import type { NewsArticle } from '../types'

interface NewsItemProps {
  article: NewsArticle
}

export function NewsItem({ article }: NewsItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const relevanceColors = {
    'Alta': 'border-[#49a296] bg-[#49a296]/10 text-[#49a296]',
    'Média': 'border-amber-500 bg-amber-500/10 text-amber-600',
    'Baixa': 'border-slate-300 bg-slate-50 text-slate-500'
  }

  return (
    <div 
      className={`group rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-slate-300 bg-white shadow-md' : 'border-slate-100 bg-transparent hover:bg-slate-50'}`}
    >
      {/* Compressed View */}
      <div 
        className="p-4 cursor-pointer flex items-start gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">
              {article.sourceName}
            </span>
            <span className="text-[10px] font-mono text-slate-300">
              {new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {article.relevance && (
              <Badge className={`text-[9px] rounded-full px-1.5 py-0 border ${relevanceColors[article.relevance] || relevanceColors['Baixa']}`}>
                {article.relevance.toUpperCase()}
              </Badge>
            )}
          </div>
          
          <h4 className={`text-sm leading-tight transition-colors group-hover:text-[#49a296] ${article.read ? 'text-slate-500' : 'font-bold text-slate-900'}`}>
            {article.title}
          </h4>

          {!isExpanded && article.executiveSummary && (
            <p className="text-xs text-slate-500 line-clamp-1 font-sans">
              {article.executiveSummary}
            </p>
          )}

          {!isExpanded && article.tags && (
            <div className="flex flex-wrap gap-1 mt-1">
              {article.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] text-[#49a296] font-mono opacity-60">
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>

        <button className="text-slate-300 hover:text-slate-600 self-center">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="px-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {article.imageUrl && (
            <div className="rounded-xl overflow-hidden aspect-video bg-slate-100">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#49a296] font-bold opacity-80">Resumo Executivo</span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {article.executiveSummary || article.description}
              </p>
            </div>

            {article.impact && (
              <div className="p-3 rounded-xl bg-slate-50 border-l-4 border-[#49a296]/40 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Impacto Potencial</span>
                <p className="text-xs text-slate-600 leading-normal">
                  {article.impact}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-2">
                {article.tags?.map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
              
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#49a296] hover:underline uppercase tracking-wider"
              >
                Ler na fonte <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
