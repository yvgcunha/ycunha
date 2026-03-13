'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import type { NewsArticle } from '@hub/news'
import { Card, CardContent } from '@hub/ui/card'
import { Lightbulb } from 'lucide-react'
import { NewsHeader } from './news-header'
import { NewsItem } from './news-item'

interface NewsCuriosity {
  theme: string
  text: string
  sourceLabel: string
  sourceUrl: string
}

interface NewsFeedProps {
  formattedDate: string
  initialArticles: NewsArticle[]
  curiosity: NewsCuriosity
}

export function NewsFeed({ formattedDate, initialArticles, curiosity }: NewsFeedProps) {
  const [articles, setArticles] = useState(initialArticles)
  const [activeCategory, setActiveCategory] = useState('Geral')
  const [visibleCount, setVisibleCount] = useState(20)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const storedReadIds = window.localStorage.getItem('hub-news-read-ids')
    const storedSavedIds = window.localStorage.getItem('hub-news-saved-ids')
    const readIds = new Set<string>(JSON.parse(storedReadIds ?? '[]') as string[])
    const savedIds = new Set<string>(JSON.parse(storedSavedIds ?? '[]') as string[])

    setArticles((currentArticles) =>
      currentArticles.map((article) => ({
        ...article,
        read: article.read || readIds.has(article.id),
        saved: article.saved || savedIds.has(article.id),
      }))
    )
  }, [])

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(
        articles
          .filter((article) => !article.read)
          .map((article) => article.category)
          .filter((category): category is string => Boolean(category))
      )
    )
    return ['Geral', ...dynamicCategories, 'Salvos', 'Lido']
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'Salvos') return articles.filter((article) => article.saved)
    if (activeCategory === 'Lido') return articles.filter((article) => article.read)
    if (activeCategory === 'Geral') return articles.filter((article) => !article.read)
    return articles.filter((article) => article.category === activeCategory && !article.read)
  }, [activeCategory, articles])

  const visibleArticles = filteredArticles.slice(0, visibleCount)

  const persistArticleState = (nextArticles: NewsArticle[]) => {
    const readIds = nextArticles.filter((article) => article.read).map((article) => article.id)
    const savedIds = nextArticles.filter((article) => article.saved).map((article) => article.id)
    window.localStorage.setItem('hub-news-read-ids', JSON.stringify(readIds))
    window.localStorage.setItem('hub-news-saved-ids', JSON.stringify(savedIds))
  }

  const markAsRead = (articleId: string) => {
    setArticles((currentArticles) => {
      const nextArticles = currentArticles.map((article) =>
        article.id === articleId ? { ...article, read: true } : article
      )
      persistArticleState(nextArticles)
      return nextArticles
    })
  }

  const toggleSaved = (articleId: string) => {
    setArticles((currentArticles) => {
      const nextArticles = currentArticles.map((article) =>
        article.id === articleId ? { ...article, saved: !article.saved } : article
      )
      persistArticleState(nextArticles)
      return nextArticles
    })
  }

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/news?limit=20', { cache: 'no-store' })
        if (!response.ok) throw new Error('Failed to refresh')

        const data = (await response.json()) as { articles: NewsArticle[] }
        const storedReadIds = new Set<string>(JSON.parse(window.localStorage.getItem('hub-news-read-ids') ?? '[]') as string[])
        const storedSavedIds = new Set<string>(JSON.parse(window.localStorage.getItem('hub-news-saved-ids') ?? '[]') as string[])
        setArticles(
          data.articles.map((article) => ({
            ...article,
            read: article.read || storedReadIds.has(article.id),
            saved: article.saved || storedSavedIds.has(article.id),
          }))
        )
        setVisibleCount(20)
        setStatus('success')
      } catch (error) {
        console.error('Refresh failed:', error)
        setStatus('error')
      } finally {
        window.setTimeout(() => setStatus('idle'), 3000)
      }
    })
  }

  return (
    <div className="-m-5 sm:-m-8 lg:-m-10">
      <NewsHeader
        formattedDate={formattedDate}
        totalArticles={filteredArticles.length}
        isPending={isPending}
        status={status}
        onRefresh={handleRefresh}
      />

      <div className="w-full space-y-8 px-4 pb-10 pt-8 sm:px-6 lg:px-8 xl:pl-6 xl:pr-10">
        <header className="flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Tenha um otimo dia, Yuri!
            </h2>
          </div>

          <Card className="overflow-hidden rounded-3xl border-l-4 border-r-0 border-t-0 border-b-0 border-yellow-400 bg-yellow-400/10">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="rounded-xl bg-yellow-400/20 p-2 text-yellow-600">
                <Lightbulb size={20} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-yellow-700">
                  Curiosidade do dia: {curiosity.theme}
                </span>
                <p className="text-sm font-medium leading-relaxed text-slate-700">{curiosity.text}</p>
                <a
                  href={curiosity.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono uppercase tracking-[0.18em] text-yellow-800 underline-offset-4 hover:underline"
                >
                  Fonte: {curiosity.sourceLabel}
                </a>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[240px_minmax(0,1fr)] 2xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-8">
            <div className="rounded-3xl border-2 border-slate-100 p-5 sm:p-6">
              <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Filtrar Categoria
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category)
                        setVisibleCount(20)
                      }}
                      className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-[11px] font-bold uppercase transition-all ${
                        isActive
                          ? 'border-[#49a296]/30 bg-[#49a296]/10 text-[#49a296]'
                          : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-[#49a296] hover:text-[#49a296]'
                      }`}
                    >
                      {category}
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? 'bg-[#49a296]' : 'bg-slate-200 group-hover:bg-[#49a296]'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          <main className="space-y-12">
            <section className="space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Briefing Prioritario</h3>
                <span className="text-[10px] font-mono text-slate-400">
                  EXIBINDO {visibleArticles.length} DE {filteredArticles.length}
                </span>
              </div>

              {visibleArticles.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {visibleArticles.map((article) => (
                    <NewsItem
                      key={article.id}
                      article={article}
                      onMarkAsRead={markAsRead}
                      onToggleSaved={toggleSaved}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 p-8 text-center text-sm text-slate-500">
                  Nenhuma noticia encontrada nesta categoria no momento.
                </div>
              )}

              {filteredArticles.length > visibleCount ? (
                <button
                  type="button"
                  onClick={() => setVisibleCount((current) => current + 10)}
                  className="rounded-full border border-[#49a296]/20 bg-[#49a296]/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#49a296]"
                >
                  Exibir mais noticias
                </button>
              ) : null}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
