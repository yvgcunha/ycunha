import { getTopNewsArticles } from '@hub/news'
import { NewsFeed } from './components/news-feed'

export default async function NewsPage() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const curiosity = {
    theme: 'Cripto & Pix',
    text: 'Mais de 90% dos downloads de apps cripto na Argentina em 2025 foram vinculados a carteiras que permitem pagamentos via Pix no Brasil, mostrando a forca da infraestrutura brasileira na regiao.',
    sourceLabel: 'Chainalysis Geography of Crypto Report',
    sourceUrl: 'https://www.chainalysis.com/blog/2025-global-crypto-adoption-index/',
  }

  const initialArticles = await getTopNewsArticles(20)

  return <NewsFeed formattedDate={formattedDate} initialArticles={initialArticles} curiosity={curiosity} />
}
