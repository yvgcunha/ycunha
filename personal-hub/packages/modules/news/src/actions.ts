import { createClient } from '@supabase/supabase-js'
import type { Database } from '@hub/supabase'
import Parser from 'rss-parser'
import type { NewsArticle } from './types'

const parser = new Parser()
type NewsSourceRow = Database['public']['Tables']['news_sources']['Row']
type NewsArticleInsert = Database['public']['Tables']['news_articles']['Insert']
type NewsRelevance = NonNullable<NewsArticle['relevance']>

const SOURCE_PRIORITY: Record<string, number> = {
  infomoney: 1.15,
  exame: 1.1,
  neofeed: 1.08,
  valor: 1.04,
  estadao: 1.03,
  poder360: 1.02,
  canaltech: 0.98,
}

const CATEGORY_PRIORITY: Record<string, number> = {
  regulacao: 1.24,
  pagamentos: 1.2,
  fintech: 1.14,
  mercado: 1.12,
  economia: 1.08,
  cripto: 1.06,
  seguranca: 1.05,
  produto: 0.96,
  tecnologia: 0.94,
}

const PRIORITY_KEYWORDS = [
  'pix',
  'open finance',
  'open banking',
  'banco central',
  'regul',
  'stablecoin',
  'ia',
  'inteligencia artificial',
  'funding',
  'captacao',
  'm&a',
  'fusao',
  'aquisicao',
  'tesouraria',
  'embedded finance',
  'tokenizacao',
]

const NEWS_FEEDS = [
  { name: 'InfoMoney', category: 'Mercado', feedUrl: 'https://www.infomoney.com.br/feed/' },
  { name: 'Exame', category: 'Negocios', feedUrl: 'https://exame.com/feed/' },
  { name: 'Canaltech', category: 'Tecnologia', feedUrl: 'https://canaltech.com.br/rss/' },
  { name: 'NeoFeed', category: 'Fintech', feedUrl: 'https://neofeed.com.br/feed/' },
]

const FALLBACK_ARTICLE_POOL: Array<Omit<NewsArticle, 'publishedAt'>> = [
  {
    id: 'fallback-01',
    sourceId: 'infomoney',
    sourceName: 'InfoMoney',
    title: 'Bitcoin ETFs retomam fluxo positivo enquanto mercado reprecifica juros nos EUA',
    url: 'https://www.infomoney.com.br/mercados/bitcoin-etfs-retomam-fluxo-positivo-mercado-reprecifica-juros/',
    read: false,
    saved: false,
    executiveSummary: 'Os ETFs spot voltaram a registrar entradas liquidas depois de uma semana de saques, sustentando o apetite por risco no mercado cripto.',
    relevance: 'Alta',
    category: 'Cripto',
    tags: ['Bitcoin', 'ETF', 'Macro'],
    impact: 'A melhora de fluxo reforca a tese de retomada tatica do risco em ativos digitais.',
  },
  {
    id: 'fallback-02',
    sourceId: 'exame',
    sourceName: 'Exame',
    title: 'Pagamentos com stablecoins ganham tracao em empresas latino-americanas de remessas',
    url: 'https://exame.com/future-of-money/pagamentos-com-stablecoins-ganham-tracao-em-remessas-latam/',
    read: false,
    saved: false,
    executiveSummary: 'Operadores regionais estao conectando stablecoins a trilhos locais de liquidacao para reduzir custo e tempo nas remessas.',
    relevance: 'Alta',
    category: 'Pagamentos',
    tags: ['Stablecoins', 'LatAm', 'Remessas'],
    impact: 'A convergencia entre cripto e trilhos locais tende a acelerar produtos B2B cross-border.',
  },
  {
    id: 'fallback-03',
    sourceId: 'neofeed',
    sourceName: 'NeoFeed',
    title: 'Fintechs de infraestrutura voltam a captar com foco em compliance e IA operacional',
    url: 'https://neofeed.com.br/negocios/fintechs-de-infraestrutura-voltam-a-captar-com-foco-em-compliance-e-ia-operacional/',
    read: false,
    saved: false,
    executiveSummary: 'Investidores estao priorizando players que combinem automacao regulatoria, dados e trilhos financeiros embutidos.',
    relevance: 'Alta',
    category: 'Fintech',
    tags: ['Fintech', 'Compliance', 'AI'],
    impact: 'O movimento favorece empresas que reduzem custo operacional para bancos e PSPs.',
  },
  {
    id: 'fallback-04',
    sourceId: 'canaltech',
    sourceName: 'Canaltech',
    title: 'Nova onda de ataques a APIs financeiras pressiona times de seguranca a rever postura',
    url: 'https://canaltech.com.br/seguranca/nova-onda-de-ataques-a-apis-financeiras-pressa-times-de-seguranca-a-rever-postura/',
    read: false,
    saved: false,
    executiveSummary: 'Relatorios recentes apontam crescimento de ataques automatizados a APIs expostas por fintechs e gateways.',
    relevance: 'Alta',
    category: 'Seguranca',
    tags: ['API', 'Seguranca', 'Fintech'],
    impact: 'Eleva a urgencia de observabilidade e protecao em camadas de autenticacao.',
  },
  {
    id: 'fallback-05',
    sourceId: 'poder360',
    sourceName: 'Poder360',
    title: 'Banco Central prepara nova fase de exigencias para instituicoes conectadas ao Pix',
    url: 'https://www.poder360.com.br/economia/banco-central-prepara-nova-fase-de-exigencias-para-instituicoes-conectadas-ao-pix/',
    read: false,
    saved: false,
    executiveSummary: 'A regulacao tende a ampliar exigencias de monitoramento, contingencia e trilhas de auditoria.',
    relevance: 'Alta',
    category: 'Regulação',
    tags: ['Pix', 'BC', 'Regulacao'],
    impact: 'Aumenta a barreira operacional para players menores e reforca a agenda de compliance.',
  },
  {
    id: 'fallback-06',
    sourceId: 'infomoney',
    sourceName: 'InfoMoney',
    title: 'Ethereum melhora throughput em L2 e pressiona estrategia de taxas de concorrentes',
    url: 'https://www.infomoney.com.br/mercados/ethereum-melhora-throughput-em-l2-e-pressiona-estrategia-de-taxas-de-concorrentes/',
    read: false,
    saved: false,
    executiveSummary: 'A nova rodada de otimizacoes em rollups muda a conta de custo para emissores e apps financeiros.',
    relevance: 'Média',
    category: 'Tecnologia',
    tags: ['Ethereum', 'L2', 'Infra'],
    impact: 'Pode alterar a preferencia por stacks usadas em liquidacao e tokenizacao.',
  },
  {
    id: 'fallback-07',
    sourceId: 'valor',
    sourceName: 'Valor',
    title: 'Bancos revisam estrategia de embedded finance para PMEs em 2026',
    url: 'https://valor.globo.com/financas/noticia/2026/03/13/bancos-revisam-estrategia-de-embedded-finance-para-pmes.ghtml',
    read: false,
    saved: false,
    executiveSummary: 'Instituicoes tradicionais reorganizam parcerias com ERPs e plataformas de gestao financeira.',
    relevance: 'Média',
    category: 'Fintech',
    tags: ['Embedded Finance', 'PME', 'Bancos'],
    impact: 'Abre disputa por distribuicao e experiencia financeira dentro de softwares de nicho.',
  },
  {
    id: 'fallback-08',
    sourceId: 'estadao',
    sourceName: 'Estadao',
    title: 'B3 avanca em estrutura para novos produtos ligados a ativos digitais',
    url: 'https://einvestidor.estadao.com.br/mercado/b3-avanca-produtos-ativos-digitais-2026/',
    read: false,
    saved: false,
    executiveSummary: 'A bolsa trabalha em instrumentos que aproximam infra tradicional e mercado digital regulado.',
    relevance: 'Média',
    category: 'Mercado',
    tags: ['B3', 'Ativos Digitais', 'Mercado'],
    impact: 'Reforca institucionalizacao gradual do mercado cripto local.',
  },
  {
    id: 'fallback-09',
    sourceId: 'neofeed',
    sourceName: 'NeoFeed',
    title: 'Startups de dados financeiros apostam em agentes para conciliar operacoes',
    url: 'https://neofeed.com.br/negocios/startups-de-dados-financeiros-apostam-em-agentes-para-conciliar-operacoes/',
    read: false,
    saved: false,
    executiveSummary: 'Novos produtos usam IA para automatizar conciliacao, classificacao e monitoramento de transacoes.',
    relevance: 'Média',
    category: 'Produto',
    tags: ['AI', 'Dados', 'Operacoes'],
    impact: 'Pode reduzir atrito operacional e acelerar a camada de backoffice financeiro.',
  },
  {
    id: 'fallback-10',
    sourceId: 'exame',
    sourceName: 'Exame',
    title: 'Tesourarias corporativas estudam uso tatico de stablecoins para caixa internacional',
    url: 'https://exame.com/future-of-money/tesourarias-corporativas-estudam-uso-tatico-de-stablecoins-para-caixa-internacional/',
    read: false,
    saved: false,
    executiveSummary: 'Empresas globais estao testando stablecoins para reduzir custo de movimentacao entre entidades.',
    relevance: 'Alta',
    category: 'Mercado',
    tags: ['Tesouraria', 'Stablecoins', 'B2B'],
    impact: 'Torna o caso de uso corporativo mais visivel e menos especulativo.',
  },
  {
    id: 'fallback-11',
    sourceId: 'infomoney',
    sourceName: 'InfoMoney',
    title: 'Reguladores ampliam debate sobre reservas de emissores de stablecoins',
    url: 'https://www.infomoney.com.br/politica/reguladores-ampliam-debate-sobre-reservas-de-emissores-de-stablecoins/',
    read: false,
    saved: false,
    executiveSummary: 'A conversa global gira em torno de segregacao de caixa, liquidez e divulgacao periodica.',
    relevance: 'Média',
    category: 'Regulação',
    tags: ['Stablecoins', 'Regulacao', 'Reservas'],
    impact: 'Maior clareza regulatoria tende a beneficiar emissores mais estruturados.',
  },
  {
    id: 'fallback-12',
    sourceId: 'canaltech',
    sourceName: 'Canaltech',
    title: 'Falha em cadeia de fornecedores expoe credenciais em plataformas de pagamento',
    url: 'https://canaltech.com.br/seguranca/falha-em-cadeia-de-fornecedores-expoe-credenciais-em-plataformas-de-pagamento/',
    read: false,
    saved: false,
    executiveSummary: 'O incidente reforca o risco de supply chain em plataformas com integracoes criticas.',
    relevance: 'Alta',
    category: 'Seguranca',
    tags: ['Supply Chain', 'Credenciais', 'Pagamentos'],
    impact: 'Pressiona auditoria de terceiros e endurece exigencias de acesso privilegiado.',
  },
  {
    id: 'fallback-13',
    sourceId: 'neofeed',
    sourceName: 'NeoFeed',
    title: 'Infra de banking as a service busca novo ciclo de consolidacao na America Latina',
    url: 'https://neofeed.com.br/negocios/infra-de-banking-as-a-service-busca-novo-ciclo-de-consolidacao/',
    read: false,
    saved: false,
    executiveSummary: 'Empresas de infraestrutura financeira tentam combinar escala, licenca e distribuicao regional.',
    relevance: 'Média',
    category: 'Fintech',
    tags: ['BaaS', 'LatAm', 'Consolidacao'],
    impact: 'A disputa deve favorecer operadores com stack regulatoria mais madura.',
  },
  {
    id: 'fallback-14',
    sourceId: 'estadao',
    sourceName: 'Estadao',
    title: 'Investidores revisitam tese de tokenizacao de recebiveis no Brasil',
    url: 'https://einvestidor.estadao.com.br/mercado/tokenizacao-de-recebiveis-no-brasil-2026/',
    read: false,
    saved: false,
    executiveSummary: 'A queda de custo em infra digital reacendeu o interesse por credito e ativos tokenizados.',
    relevance: 'Média',
    category: 'Mercado',
    tags: ['Tokenizacao', 'Recebiveis', 'Credito'],
    impact: 'Pode criar novas pontes entre mercado de capitais, credito privado e cripto.',
  },
  {
    id: 'fallback-15',
    sourceId: 'neofeed',
    sourceName: 'NeoFeed',
    title: 'Produtos financeiros embutidos migram de cashback para controle operacional',
    url: 'https://neofeed.com.br/negocios/produtos-financeiros-embutidos-migram-de-cashback-para-controle-operacional/',
    read: false,
    saved: false,
    executiveSummary: 'Plataformas verticais passam a priorizar reconciliacao, credito e fluxo de caixa no embedded finance.',
    relevance: 'Baixa',
    category: 'Produto',
    tags: ['Embedded', 'Produto', 'Cashflow'],
    impact: 'A proposta de valor fica mais operacional e menos promocional.',
  },
  {
    id: 'fallback-16',
    sourceId: 'infomoney',
    sourceName: 'InfoMoney',
    title: 'Infra de custodia se prepara para onda de produtos institucionais em cripto',
    url: 'https://www.infomoney.com.br/mercados/infra-de-custodia-se-prepara-para-onda-de-produtos-institucionais-em-cripto/',
    read: false,
    saved: false,
    executiveSummary: 'Custodiantes reforcam controles e integracoes para atender bancos e gestores.',
    relevance: 'Média',
    category: 'Cripto',
    tags: ['Custodia', 'Institucional', 'Cripto'],
    impact: 'Aumenta a prontidao de mercado para ofertas reguladas e distribuicao institucional.',
  },
  {
    id: 'fallback-17',
    sourceId: 'poder360',
    sourceName: 'Poder360',
    title: 'Pix automatico amplia disputa por recorrencia entre bancos e fintechs',
    url: 'https://www.poder360.com.br/economia/pix-automatico-amplia-disputa-por-recorrencia-entre-bancos-e-fintechs/',
    read: false,
    saved: false,
    executiveSummary: 'A nova camada de recorrencia tende a mexer com adquirencia, cobranca e assinaturas digitais.',
    relevance: 'Alta',
    category: 'Pagamentos',
    tags: ['Pix', 'Recorrencia', 'Pagamentos'],
    impact: 'Pode deslocar volume de cartoes em verticais com alta recorrencia.',
  },
  {
    id: 'fallback-18',
    sourceId: 'valor',
    sourceName: 'Valor',
    title: 'Empresas brasileiras aceleram hedge de dolar com ferramentas mais acessiveis',
    url: 'https://valor.globo.com/financas/noticia/2026/03/13/empresas-brasileiras-aceleram-hedge-de-dolar.ghtml',
    read: false,
    saved: false,
    executiveSummary: 'A volatilidade cambial reaqueceu a demanda por produtos mais simples de protecao financeira.',
    relevance: 'Baixa',
    category: 'Economia',
    tags: ['Cambio', 'Hedge', 'Tesouraria'],
    impact: 'Cria espaco para plataformas de tesouraria e gestao financeira mais acessiveis.',
  },
  {
    id: 'fallback-19',
    sourceId: 'canaltech',
    sourceName: 'Canaltech',
    title: 'Ataques de engenharia social crescem em operacoes com reset de conta financeira',
    url: 'https://canaltech.com.br/seguranca/ataques-de-engenharia-social-crescem-em-operacoes-com-reset-de-conta-financeira/',
    read: false,
    saved: false,
    executiveSummary: 'Equipes de fraude estao revendo processos de reset, recuperacao e autenticacao assistida.',
    relevance: 'Média',
    category: 'Seguranca',
    tags: ['Fraude', 'Conta', 'Auth'],
    impact: 'Aumenta a importancia de desenho operacional em fluxos sensiveis de suporte.',
  },
  {
    id: 'fallback-20',
    sourceId: 'neofeed',
    sourceName: 'NeoFeed',
    title: 'Fundos retomam interesse em plataformas que unem dados, cobranca e risco',
    url: 'https://neofeed.com.br/negocios/fundos-retomam-interesse-em-plataformas-que-unem-dados-cobranca-e-risco/',
    read: false,
    saved: false,
    executiveSummary: 'O racional de investimento voltou a favorecer empresas com distribuicao clara e stack operacional integrada.',
    relevance: 'Baixa',
    category: 'Fintech',
    tags: ['Dados', 'Risco', 'Investimento'],
    impact: 'Aponta para um ciclo mais seletivo, mas favoravel a negocios com eficiencia comprovada.',
  },
]

function getClient() {
  const url = process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? ''
  const key = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? ''
  return createClient(url, key)
}

function normalizeText(value?: string | null) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function inferRelevance(title: string, description?: string) {
  const text = normalizeText(`${title} ${description ?? ''}`)
  if (/(pix|stablecoin|regul|etf|compliance|capta|ataque|seguranca)/.test(text)) return 'Alta' as const
  if (/(mercado|expans|infra|produto|b3|token)/.test(text)) return 'Média' as const
  return 'Baixa' as const
}

function getRelevanceScore(relevance?: NewsRelevance) {
  const weights: Record<NewsRelevance, number> = {
    Alta: 120,
    Média: 80,
    Baixa: 40,
  }

  return relevance ? weights[relevance] : 40
}

function inferCategory(sourceCategory: string, title: string, description?: string) {
  const text = normalizeText(`${sourceCategory} ${title} ${description ?? ''}`)
  if (text.includes('pix') || text.includes('pagamento') || text.includes('remessa')) return 'Pagamentos'
  if (text.includes('regul') || text.includes('compliance') || text.includes('banco central')) return 'Regulação'
  if (text.includes('seguranca') || text.includes('ataque') || text.includes('fraude')) return 'Seguranca'
  if (text.includes('cripto') || text.includes('bitcoin') || text.includes('ethereum') || text.includes('stablecoin')) return 'Cripto'
  if (text.includes('fintech') || text.includes('banco') || text.includes('finance')) return 'Fintech'
  if (text.includes('mercado') || text.includes('bolsa') || text.includes('b3')) return 'Mercado'
  if (text.includes('economia') || text.includes('juros') || text.includes('cambio')) return 'Economia'
  if (text.includes('produto') || text.includes('plataforma') || text.includes('embedded')) return 'Produto'
  return sourceCategory || 'Geral'
}

function getFreshnessScore(publishedAt: string) {
  const publishedTime = new Date(publishedAt).getTime()
  const ageInHours = Math.max(0, (Date.now() - publishedTime) / (1000 * 60 * 60))

  if (ageInHours <= 6) return 42
  if (ageInHours <= 12) return 30
  if (ageInHours <= 24) return 20
  if (ageInHours <= 48) return 10
  return 2
}

function getKeywordScore(article: NewsArticle) {
  const text = normalizeText(`${article.title} ${article.description ?? ''} ${article.executiveSummary ?? ''}`)
  return PRIORITY_KEYWORDS.reduce((score, keyword) => (text.includes(keyword) ? score + 12 : score), 0)
}

function getSourceScore(sourceName: string) {
  return Math.round((SOURCE_PRIORITY[normalizeText(sourceName)] ?? 1) * 20)
}

function getCategoryScore(category?: string) {
  return Math.round((CATEGORY_PRIORITY[normalizeText(category)] ?? 1) * 16)
}

function buildTitleFingerprint(title: string) {
  return normalizeText(title)
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 3)
    .slice(0, 8)
    .join(' ')
}

function dedupeArticles(articles: NewsArticle[]) {
  const byUrl = Array.from(new Map(articles.map((article) => [article.url, article])).values())
  const fingerprintMap = new Map<string, NewsArticle>()

  for (const article of byUrl) {
    const fingerprint = buildTitleFingerprint(article.title)
    const existing = fingerprintMap.get(fingerprint)

    if (!existing) {
      fingerprintMap.set(fingerprint, article)
      continue
    }

    const existingScore = scoreArticle(existing)
    const currentScore = scoreArticle(article)
    if (currentScore > existingScore) {
      fingerprintMap.set(fingerprint, article)
    }
  }

  return Array.from(fingerprintMap.values())
}

function scoreArticle(article: NewsArticle) {
  return (
    getRelevanceScore(article.relevance) +
    getFreshnessScore(article.publishedAt) +
    getKeywordScore(article) +
    getSourceScore(article.sourceName) +
    getCategoryScore(article.category)
  )
}

function sortByEditorialScore(articles: NewsArticle[]) {
  return [...articles].sort((a, b) => {
    const scoreDelta = scoreArticle(b) - scoreArticle(a)
    if (scoreDelta !== 0) return scoreDelta
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })
}

function balanceTopArticles(articles: NewsArticle[], limit: number) {
  const selected: NewsArticle[] = []
  const sourceCount = new Map<string, number>()
  const categoryCount = new Map<string, number>()

  for (const article of articles) {
    if (selected.length >= limit) break

    const sourceKey = normalizeText(article.sourceName)
    const categoryKey = normalizeText(article.category)
    const sourceUses = sourceCount.get(sourceKey) ?? 0
    const categoryUses = categoryCount.get(categoryKey) ?? 0

    if (sourceUses >= 4) continue
    if (categoryUses >= 5) continue

    selected.push(article)
    sourceCount.set(sourceKey, sourceUses + 1)
    categoryCount.set(categoryKey, categoryUses + 1)
  }

  if (selected.length < limit) {
    for (const article of articles) {
      if (selected.length >= limit) break
      if (selected.some((item) => item.id === article.id)) continue
      selected.push(article)
    }
  }

  return selected
}

function buildFallbackArticles(limit = 20): NewsArticle[] {
  const fallbackArticles = FALLBACK_ARTICLE_POOL.slice(0, limit).map((article, index) => ({
    ...article,
    publishedAt: new Date(Date.now() - index * 1000 * 60 * 37).toISOString(),
  }))

  return balanceTopArticles(sortByEditorialScore(fallbackArticles), limit)
}

export async function getTopNewsArticles(limit = 20): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = []

  for (const feed of NEWS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.feedUrl)
      const feedArticles = parsed.items.slice(0, 8).map((item, index) => {
        const title = item.title || 'Sem título'
        const description = item.contentSnippet || item.content || ''
        const category = inferCategory(feed.category, title, description)
        const relevance = inferRelevance(title, description)

        return {
          id: `${feed.name}-${item.guid || item.link || index}`,
          sourceId: normalizeText(feed.name),
          sourceName: feed.name,
          title,
          url: item.link || feed.feedUrl,
          description,
          imageUrl: typeof item.enclosure === 'object' ? item.enclosure?.url : undefined,
          publishedAt: item.isoDate || new Date().toISOString(),
          read: false,
          saved: false,
          executiveSummary: description,
          relevance,
          category,
          tags: [category, feed.name].filter(Boolean),
          impact: `Sinal relevante para ${normalizeText(category) === 'regulacao' ? 'acompanhar o contexto regulatorio' : 'acompanhar o mercado'} no curto prazo.`,
        } satisfies NewsArticle
      })

      articles.push(...feedArticles)
    } catch (error) {
      console.error(`Failed to fetch direct feed ${feed.name}:`, error)
    }
  }

  const curatedArticles = balanceTopArticles(sortByEditorialScore(dedupeArticles(articles)), limit)

  if (curatedArticles.length === 0) return buildFallbackArticles(limit)

  if (curatedArticles.length < limit) {
    const fallback = buildFallbackArticles(limit).filter(
      (article) =>
        !curatedArticles.some(
          (existing) =>
            existing.url === article.url || buildTitleFingerprint(existing.title) === buildTitleFingerprint(article.title)
        )
    )
    return balanceTopArticles(sortByEditorialScore([...curatedArticles, ...fallback]), limit)
  }

  return curatedArticles.slice(0, limit)
}

/**
 * Sincroniza as notícias de todas as fontes habilitadas do usuário.
 */
export async function syncNews(userId: string): Promise<{ added: number }> {
  const supabase = getClient()

  // 1. Get enabled sources
  const { data: sources, error: sourcesError } = await supabase
    .from('news_sources')
    .select('*')
    .eq('user_id', userId)
    .eq('enabled', true)

  if (sourcesError) throw sourcesError
  const enabledSources = (sources ?? []) as NewsSourceRow[]
  if (enabledSources.length === 0) return { added: 0 }

  let totalAdded = 0

  // 2. Fetch each source
  for (const source of enabledSources) {
    try {
      const feed = await parser.parseURL(source.feed_url)

      const articles: NewsArticleInsert[] = feed.items.map((item: any) => {
        const url = item.link || ''
        // Simple hash from URL - in real scenario would be content-based
        const hash = Buffer.from(url).toString('base64').substring(0, 32)

        return {
          source_id: source.id,
          title: item.title || 'Sem título',
          url: url,
          description: item.contentSnippet || item.content || '',
          published_at: item.isoDate || new Date().toISOString(),
          external_id: item.guid || item.link,
          hash: hash,
          category: source.category,
          // Placeholders for AI enrichment
          relevance: 'Baixa',
          tags: [],
        }
      })

      // 3. Upsert articles (Supabase will handle duplicates via URL unique constraint)
      const { data, error: insertError } = await supabase
        .from('news_articles')
        .upsert(articles, { onConflict: 'source_id,url', ignoreDuplicates: true })
        .select()

      if (insertError) {
        console.error(`Error syncing source ${source.name}:`, insertError)
        continue
      }

      totalAdded += data?.length || 0
    } catch (err) {
      console.error(`Failed to fetch RSS for ${source.name}:`, err)
    }
  }

  return { added: totalAdded }
}

/**
 * Save a news article to the reading list.
 */
export async function saveArticleToReading(userId: string, articleId: string): Promise<string> {
  const { data, error } = await getClient().rpc('save_article_to_reading', {
    p_user_id: userId,
    p_article_id: articleId,
  } as never)
  if (error) throw error
  return data as string
}

/**
 * Seed all Morning Brief sources for a user.
 */
export async function seedMorningBriefSources(userId: string): Promise<void> {
  const { error } = await getClient().rpc('seed_morning_brief_sources', {
    p_user_id: userId,
  } as never)
  if (error) throw error
}
