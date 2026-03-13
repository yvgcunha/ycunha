import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui/card'
import { Badge } from '@hub/ui/badge'
import { NewsItem } from './news-item'
import type { NewsSummary } from '../types'

interface NewsWidgetProps {
  summary?: NewsSummary
}

export function NewsWidget({ summary }: NewsWidgetProps) {
  return (
    <Card className="rounded-3xl border-slate-200/60 shadow-sm overflow-hidden">
      <CardHeader className="bg-[#121212] py-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[#49a296] font-sans font-bold">
            Notícias
          </span>
          {summary?.unreadCount ? (
            <Badge className="bg-[#49a296] hover:bg-[#49a296]/90 text-white border-0 rounded-full text-[10px] px-2 py-0">
              {summary.unreadCount} NOVAS
            </Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pt-4">
        {summary?.recentArticles && summary.recentArticles.length > 0 ? (
          <div className="space-y-3">
            {summary.recentArticles.slice(0, 5).map((article) => (
              <NewsItem key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-xs font-mono text-slate-400">Nenhuma notícia disponível no momento.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
