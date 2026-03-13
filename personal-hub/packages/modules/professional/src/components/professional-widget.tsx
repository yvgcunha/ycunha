import { Badge, Card, CardContent, CardHeader, CardTitle } from '@hub/ui'
import type { ProfessionalSummary } from '../types'

interface ProfessionalWidgetProps {
  summary?: ProfessionalSummary
}

export function ProfessionalWidget({ summary }: ProfessionalWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profissional</CardTitle>
      </CardHeader>
      <CardContent>
        {summary?.topSkills && summary.topSkills.length > 0 && (
          <div className="mb-3">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Top Skills</p>
            <div className="flex flex-wrap gap-1">
              {summary.topSkills.slice(0, 5).map((skill) => (
                <Badge key={skill.id} variant="secondary" className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-bold">{summary?.activeGoals ?? 0}</p>
            <p className="text-xs text-muted-foreground">Metas ativas</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{summary?.contactsCount ?? 0}</p>
            <p className="text-xs text-muted-foreground">Contatos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
