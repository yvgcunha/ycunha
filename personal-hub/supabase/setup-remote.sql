-- =============================================
-- SETUP COMPLETO - Personal HUB
-- Execute este SQL no Supabase SQL Editor
-- Dashboard → SQL Editor → New query → Cole e execute
-- =============================================

-- 1. Extensão UUID
create extension if not exists "uuid-ossp";

-- 2. Função auxiliar updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =============================================
-- FIX: Remover FK constraints de auth.users nas tabelas existentes
-- (app usa auth simples, não Supabase Auth)
-- =============================================

alter table public.news_sources drop constraint if exists news_sources_user_id_fkey;

-- Alterar user_id para text (sem FK)
alter table public.news_sources alter column user_id type text using user_id::text;
alter table public.news_sources alter column user_id set default 'default-user';

-- =============================================
-- MODULE: Finances
-- =============================================

create table if not exists public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null default 'default-user',
  title text not null,
  amount numeric(12, 2) not null check (amount > 0),
  type text not null check (type in ('income', 'expense')),
  category text not null,
  date date not null default current_date,
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table if not exists public.budgets (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null default 'default-user',
  category text not null,
  limit_amount numeric(12, 2) not null check (limit_amount > 0),
  month char(7) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (user_id, category, month)
);

create table if not exists public.financial_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null default 'default-user',
  title text not null,
  target_amount numeric(12, 2) not null check (target_amount > 0),
  current_amount numeric(12, 2) not null default 0 check (current_amount >= 0),
  deadline date,
  completed boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Finance Indexes
create index if not exists transactions_user_id_date_idx on public.transactions (user_id, date desc);
create index if not exists transactions_user_id_type_idx on public.transactions (user_id, type);
create index if not exists budgets_user_id_month_idx on public.budgets (user_id, month);

-- Finance Triggers
drop trigger if exists set_transactions_updated_at on public.transactions;
create trigger set_transactions_updated_at before update on public.transactions
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_budgets_updated_at on public.budgets;
create trigger set_budgets_updated_at before update on public.budgets
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_financial_goals_updated_at on public.financial_goals;
create trigger set_financial_goals_updated_at before update on public.financial_goals
  for each row execute procedure public.set_updated_at();

-- View: monthly summary
create or replace view public.finances_monthly_summary as
select
  user_id,
  to_char(date, 'YYYY-MM') as month,
  sum(case when type = 'income' then amount else 0 end) as total_income,
  sum(case when type = 'expense' then amount else 0 end) as total_expenses,
  sum(case when type = 'income' then amount else -amount end) as balance
from public.transactions
group by user_id, to_char(date, 'YYYY-MM');

-- =============================================
-- NEWS: Criar tabela news_user_state (faltando)
-- =============================================

create table if not exists public.news_user_state (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null default 'default-user',
  article_id uuid references public.news_articles(id) on delete cascade not null,
  read boolean not null default false,
  saved boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (user_id, article_id)
);

create index if not exists news_user_state_user_id_idx on public.news_user_state (user_id, saved, read);

drop trigger if exists set_news_user_state_updated_at on public.news_user_state;
create trigger set_news_user_state_updated_at before update on public.news_user_state
  for each row execute procedure public.set_updated_at();

-- =============================================
-- RLS - Permissivo (app pessoal, sem Supabase Auth)
-- =============================================

-- Finance tables
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
alter table public.financial_goals enable row level security;

drop policy if exists "Allow all transactions" on public.transactions;
create policy "Allow all transactions" on public.transactions for all using (true) with check (true);

drop policy if exists "Allow all budgets" on public.budgets;
create policy "Allow all budgets" on public.budgets for all using (true) with check (true);

drop policy if exists "Allow all financial_goals" on public.financial_goals;
create policy "Allow all financial_goals" on public.financial_goals for all using (true) with check (true);

-- News tables
drop policy if exists "Users manage own news sources" on public.news_sources;
drop policy if exists "Allow all news_sources" on public.news_sources;
create policy "Allow all news_sources" on public.news_sources for all using (true) with check (true);

drop policy if exists "Users read articles from own sources" on public.news_articles;
drop policy if exists "Allow all news_articles" on public.news_articles;
create policy "Allow all news_articles" on public.news_articles for all using (true) with check (true);

alter table public.news_user_state enable row level security;
drop policy if exists "Users manage own article state" on public.news_user_state;
drop policy if exists "Allow all news_user_state" on public.news_user_state;
create policy "Allow all news_user_state" on public.news_user_state for all using (true) with check (true);

-- =============================================
-- Seed: Fontes de notícias padrão
-- =============================================

insert into public.news_sources (user_id, name, url, feed_url, category, enabled)
values
  ('default-user', 'TechCrunch', 'https://techcrunch.com', 'https://techcrunch.com/feed/', 'tech', true),
  ('default-user', 'The Verge', 'https://www.theverge.com', 'https://www.theverge.com/rss/index.xml', 'tech', true),
  ('default-user', 'Hacker News', 'https://news.ycombinator.com', 'https://hnrss.org/frontpage', 'tech', true),
  ('default-user', 'InfoMoney', 'https://www.infomoney.com.br', 'https://www.infomoney.com.br/feed/', 'financas', true),
  ('default-user', 'G1 Tecnologia', 'https://g1.globo.com/tecnologia', 'https://g1.globo.com/rss/g1/tecnologia/', 'tech', true)
on conflict do nothing;

-- =============================================
-- PRONTO! Execute e atualize a página.
-- =============================================
