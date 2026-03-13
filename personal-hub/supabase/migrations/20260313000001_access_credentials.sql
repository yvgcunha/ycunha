-- Access credentials table for simple password authentication
create table public.access_credentials (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  password_hash text not null,
  is_active boolean default true not null,
  last_accessed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id)
);

-- Enable RLS
alter table public.access_credentials enable row level security;

-- Policies: Only accessible server-side via service role
create policy "Service role only" on public.access_credentials
  using (auth.role() = 'service_role');

-- Auto-update updated_at trigger
create trigger update_access_credentials_updated_at
  before update on public.access_credentials
  for each row
  execute procedure public.set_updated_at();

-- Index for user_id lookups
create index idx_access_credentials_user_id on public.access_credentials(user_id);
