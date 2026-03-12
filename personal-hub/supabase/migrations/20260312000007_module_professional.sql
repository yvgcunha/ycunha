-- =============================================
-- MODULE: Professional
-- =============================================

create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  category text not null,
  level smallint not null default 1 check (level between 1 and 5),
  years_of_experience numeric(4,1),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (user_id, name)
);

create table public.career_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  target_date date,
  completed boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.milestones (
  id uuid default uuid_generate_v4() primary key,
  goal_id uuid references public.career_goals(id) on delete cascade not null,
  title text not null,
  completed boolean not null default false,
  due_date date,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  role text,
  company text,
  email text,
  linkedin_url text,
  notes text,
  tags text[] not null default '{}',
  last_contacted_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes
create index skills_user_id_idx on public.skills (user_id, level desc);
create index career_goals_user_id_idx on public.career_goals (user_id, completed, target_date);
create index milestones_goal_id_idx on public.milestones (goal_id);
create index contacts_user_id_idx on public.contacts (user_id, last_contacted_at desc);
create index contacts_user_id_tags_idx on public.contacts using gin(tags);

-- updated_at triggers
create trigger set_skills_updated_at before update on public.skills
  for each row execute procedure public.set_updated_at();
create trigger set_career_goals_updated_at before update on public.career_goals
  for each row execute procedure public.set_updated_at();
create trigger set_milestones_updated_at before update on public.milestones
  for each row execute procedure public.set_updated_at();
create trigger set_contacts_updated_at before update on public.contacts
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.skills enable row level security;
alter table public.career_goals enable row level security;
alter table public.milestones enable row level security;
alter table public.contacts enable row level security;

create policy "Users manage own skills"
  on public.skills for all using (auth.uid() = user_id);
create policy "Users manage own career goals"
  on public.career_goals for all using (auth.uid() = user_id);
create policy "Users manage own milestones"
  on public.milestones for all
  using (
    exists (
      select 1 from public.career_goals
      where id = milestones.goal_id and user_id = auth.uid()
    )
  );
create policy "Users manage own contacts"
  on public.contacts for all using (auth.uid() = user_id);
