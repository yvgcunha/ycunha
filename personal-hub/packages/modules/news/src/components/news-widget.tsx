import { Card, CardContent, CardHeader, CardTitle } from '@hub/ui/card'
import { Badge } from '@hub/ui/badge'
import type { NewsSummary } from '../types'

interface NewsWidgetProps {
  summary?: NewsSummary
}

export function NewsWidget({ summary }: NewsWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Notícias</span>
          {summary?.unreadCount ? (
            <Badge>{summary.unreadCount} novas</Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {summary?.recentArticles && summary.recentArticles.length > 0 ? (
          <div className="space-y-2">
            {summary.recentArticles.slice(0, 4).map((article) => (
              <div key={article.id} className="space-y-0.5">
                <p className={`truncate text-sm ${article.read ? 'text-muted-foreground' : 'font-medium'}`}>
                  {article.title}
                </p>
                <p className="text-xs text-muted-foreground">{article.sourceName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhuma notícia disponível</p>
        )}
      </CardContent>
    </Card>
  )
}
