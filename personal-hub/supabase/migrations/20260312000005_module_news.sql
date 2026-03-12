-- =============================================
-- MODULE: News
-- =============================================

create table public.news_sources (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  url text not null,
  feed_url text not null,
  category text not null default 'geral',
  enabled boolean not null default true,
  favicon text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.news_articles (
  id uuid default uuid_generate_v4() primary key,
  source_id uuid references public.news_sources(id) on delete cascade not null,
  external_id text, -- ID from RSS feed
  title text not null,
  url text not null,
  description text,
  image_url text,
  published_at timestamptz not null,
  created_at timestamptz default now() not null,
  unique (source_id, url)
);

create table public.news_user_state (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  article_id uuid references public.news_articles(id) on delete cascade not null,
  read boolean not null default false,
  saved boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (user_id, article_id)
);

-- Indexes
create index news_sources_user_id_idx on public.news_sources (user_id, enabled);
create index news_articles_source_id_idx on public.news_articles (source_id, published_at desc);
create index news_user_state_user_id_idx on public.news_user_state (user_id, saved, read);

-- updated_at triggers
create trigger set_news_sources_updated_at before update on public.news_sources
  for each row execute procedure public.set_updated_at();
create trigger set_news_user_state_updated_at before update on public.news_user_state
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.news_sources enable row level security;
alter table public.news_articles enable row level security;
alter table public.news_user_state enable row level security;

create policy "Users manage own news sources"
  on public.news_sources for all using (auth.uid() = user_id);

-- Articles are readable if you have the source
create policy "Users read articles from own sources"
  on public.news_articles for select
  using (
    exists (
      select 1 from public.news_sources
      where id = news_articles.source_id and user_id = auth.uid()
    )
  );

create policy "Users manage own article state"
  on public.news_user_state for all using (auth.uid() = user_id);
