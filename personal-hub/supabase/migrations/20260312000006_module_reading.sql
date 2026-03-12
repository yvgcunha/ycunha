-- =============================================
-- MODULE: Reading List
-- =============================================

create table public.reading_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  author text,
  url text,
  type text not null default 'book'
    check (type in ('book', 'article', 'paper', 'newsletter', 'other')),
  status text not null default 'want_to_read'
    check (status in ('want_to_read', 'reading', 'completed', 'abandoned')),
  progress smallint not null default 0 check (progress between 0 and 100),
  notes text,
  tags text[] not null default '{}',
  rating smallint check (rating between 1 and 5),
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Auto-set started_at / finished_at based on status change
create or replace function public.handle_reading_status()
returns trigger as $$
begin
  if new.status = 'reading' and old.status = 'want_to_read' then
    new.started_at = coalesce(old.started_at, now());
  elsif new.status = 'completed' and old.status != 'completed' then
    new.finished_at = now();
    new.progress = 100;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger on_reading_status_change
  before update of status on public.reading_items
  for each row execute procedure public.handle_reading_status();

-- Indexes
create index reading_items_user_id_status_idx on public.reading_items (user_id, status);
create index reading_items_user_id_type_idx on public.reading_items (user_id, type);

-- updated_at trigger
create trigger set_reading_items_updated_at before update on public.reading_items
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.reading_items enable row level security;

create policy "Users manage own reading list"
  on public.reading_items for all using (auth.uid() = user_id);
