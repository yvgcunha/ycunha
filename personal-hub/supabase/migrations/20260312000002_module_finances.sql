-- =============================================
-- MODULE: Finances
-- =============================================

create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  amount numeric(12, 2) not null check (amount > 0),
  type text not null check (type in ('income', 'expense')),
  category text not null,
  date date not null default current_date,
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.budgets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  limit_amount numeric(12, 2) not null check (limit_amount > 0),
  month char(7) not null, -- YYYY-MM
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (user_id, category, month)
);

create table public.financial_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  target_amount numeric(12, 2) not null check (target_amount > 0),
  current_amount numeric(12, 2) not null default 0 check (current_amount >= 0),
  deadline date,
  completed boolean not null default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes
create index transactions_user_id_date_idx on public.transactions (user_id, date desc);
create index transactions_user_id_type_idx on public.transactions (user_id, type);
create index budgets_user_id_month_idx on public.budgets (user_id, month);

-- updated_at triggers
create trigger set_transactions_updated_at before update on public.transactions
  for each row execute procedure public.set_updated_at();
create trigger set_budgets_updated_at before update on public.budgets
  for each row execute procedure public.set_updated_at();
create trigger set_financial_goals_updated_at before update on public.financial_goals
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
alter table public.financial_goals enable row level security;

create policy "Users manage own transactions"
  on public.transactions for all using (auth.uid() = user_id);
create policy "Users manage own budgets"
  on public.budgets for all using (auth.uid() = user_id);
create policy "Users manage own financial goals"
  on public.financial_goals for all using (auth.uid() = user_id);

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
