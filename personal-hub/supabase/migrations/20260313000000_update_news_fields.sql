-- Add executive fields to news_articles
alter table public.news_articles 
  add column if not exists executive_summary text,
  add column if not exists tags text[],
  add column if not exists relevance text check (relevance in ('Alta', 'Média', 'Baixa')),
  add column if not exists impact text,
  add column if not exists hash text,
  add column if not exists category text;

-- Index for hashing/deduplication
create index if not exists news_articles_hash_idx on public.news_articles (hash);
