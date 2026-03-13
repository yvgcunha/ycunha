import { NextResponse } from 'next/server'
import { getTopNewsArticles } from '@hub/news'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') ?? '20')

  try {
    const articles = await getTopNewsArticles(Number.isNaN(limit) ? 20 : limit)
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Failed to load top news feed:', error)
    return NextResponse.json({ articles: [] }, { status: 500 })
  }
}
