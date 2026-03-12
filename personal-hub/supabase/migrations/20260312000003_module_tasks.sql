-- =============================================
-- MODULE: Tasks & Projects
-- =============================================

create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  color text not null default '#6366f1',
  archived boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  description text,
  status text not null default 'todo'
    check (status in ('todo', 'in_progress', 'done', 'cancelled')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  due_date date,
  tags text[] not null default '{}',
  completed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Auto-set completed_at when status becomes 'done'
create or replace function public.handle_task_completion()
returns trigger as $$
begin
  if new.status = 'done' and old.status != 'done' then
    new.completed_at = now();
  elsif new.status != 'done' then
    new.completed_at = null;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger on_task_status_change
  before update of status on public.tasks
  for each row execute procedure public.handle_task_completion();

-- Indexes
create index tasks_user_id_status_idx on public.tasks (user_id, status);
create index tasks_user_id_due_date_idx on public.tasks (user_id, due_date);
create index tasks_project_id_idx on public.tasks (project_id);

-- updated_at triggers
create trigger set_projects_updated_at before update on public.projects
  for each row execute procedure public.set_updated_at();
create trigger set_tasks_updated_at before update on public.tasks
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.projects enable row level security;
alter table public.tasks enable row level security;

create policy "Users manage own projects"
  on public.projects for all using (auth.uid() = user_id);
create policy "Users manage own tasks"
  on public.tasks for all using (auth.uid() = user_id);
