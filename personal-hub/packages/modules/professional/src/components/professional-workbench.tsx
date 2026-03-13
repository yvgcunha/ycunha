import { CvAnalysisBlock } from './cv-analysis-block'
import { CvGenerationBlock } from './cv-generation-block'

export function ProfessionalWorkbench() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="grid gap-6 xl:grid-cols-2">
        <CvAnalysisBlock />
        <CvGenerationBlock />
      </section>
    </div>
  )
}
