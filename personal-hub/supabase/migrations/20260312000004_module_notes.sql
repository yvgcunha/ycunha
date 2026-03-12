-- =============================================
-- MODULE: Notes & Knowledge Base
-- =============================================

create table public.notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null default '',
  tags text[] not null default '{}',
  pinned boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.saved_links (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  url text not null,
  title text not null,
  description text,
  favicon text,
  tags text[] not null default '{}',
  read boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Full-text search on notes
create index notes_search_idx on public.notes
  using gin(to_tsvector('portuguese', coalesce(title, '') || ' ' || coalesce(content, '')));

-- Indexes
create index notes_user_id_pinned_idx on public.notes (user_id, pinned desc, updated_at desc);
create index notes_user_id_tags_idx on public.notes using gin(tags);
create index saved_links_user_id_idx on public.saved_links (user_id, created_at desc);

-- updated_at triggers
create trigger set_notes_updated_at before update on public.notes
  for each row execute procedure public.set_updated_at();
create trigger set_saved_links_updated_at before update on public.saved_links
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.notes enable row level security;
alter table public.saved_links enable row level security;

create policy "Users manage own notes"
  on public.notes for all using (auth.uid() = user_id);
create policy "Users manage own saved links"
  on public.saved_links for all using (auth.uid() = user_id);
