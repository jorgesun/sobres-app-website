-- Sobres backend schema (§9). All owned tables carry owner_id = auth.uid() and
-- cascade-delete with auth.users. exchange_rates is global / public read.
-- Columns are snake_case so client DTO keys match without conversion.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- budgets
create table if not exists public.budgets (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  currency_code text not null default 'MXN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- accounts
create table if not exists public.accounts (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  budget_id uuid not null,
  name text not null,
  type text not null,
  institution text,
  initial_balance numeric not null default 0,
  is_on_budget boolean not null default true,
  is_closed boolean not null default false,
  sort_order int not null default 0,
  color_hex text,
  icon_name text,
  credit_limit numeric,
  currency_code text not null default 'MXN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------ category_groups
create table if not exists public.category_groups (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  budget_id uuid not null,
  name text not null,
  sort_order int not null default 0,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- categories
create table if not exists public.categories (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  budget_id uuid not null,
  group_id uuid not null,
  name text not null,
  emoji text,
  color_hex text,
  sort_order int not null default 0,
  is_hidden boolean not null default false,
  is_system boolean not null default false,
  credit_card_account_id uuid,
  goal_type text,
  goal_amount numeric,
  goal_target_month timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------- transactions
create table if not exists public.transactions (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  budget_id uuid not null,
  account_id uuid not null,
  category_id uuid,
  date timestamptz not null,
  amount numeric not null,
  memo text,
  payee text,
  is_cleared boolean not null default false,
  is_reconciled boolean not null default false,
  transfer_account_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- splits
create table if not exists public.splits (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  transaction_id uuid not null,
  category_id uuid,
  amount numeric not null,
  memo text,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------- budget_entries
create table if not exists public.budget_entries (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  budget_id uuid not null,
  category_id uuid not null,
  month timestamptz not null,
  assigned numeric not null default 0,
  overspending numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------ rollover_states
create table if not exists public.rollover_states (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  budget_id uuid not null,
  month timestamptz not null,
  updated_at timestamptz not null default now()
);

-- --------------------------------------------------------- scheduled_payments
create table if not exists public.scheduled_payments (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  budget_id uuid not null,
  account_id uuid not null,
  category_id uuid,
  name text not null,
  amount numeric not null,
  payee text,
  memo text,
  frequency text not null,
  next_due_date timestamptz not null,
  is_active boolean not null default true,
  transaction_type text,
  destination_account_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- tombstones
create table if not exists public.tombstones (
  id uuid primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  table_name text not null,
  deleted_at timestamptz not null default now()
);

-- ------------------------------------------------------------- exchange_rates
-- Global, public-read FIX rate populated by an Edge Function cron (§8).
create table if not exists public.exchange_rates (
  pair text primary key,
  rate numeric not null,
  fetched_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================== RLS ==============================
alter table public.budgets            enable row level security;
alter table public.accounts           enable row level security;
alter table public.category_groups    enable row level security;
alter table public.categories         enable row level security;
alter table public.transactions       enable row level security;
alter table public.splits             enable row level security;
alter table public.budget_entries     enable row level security;
alter table public.rollover_states    enable row level security;
alter table public.scheduled_payments enable row level security;
alter table public.tombstones         enable row level security;
alter table public.exchange_rates     enable row level security;

-- Owner-scoped policies for all owned tables.
do $$
declare t text;
begin
  foreach t in array array[
    'budgets','accounts','category_groups','categories','transactions',
    'splits','budget_entries','rollover_states','scheduled_payments','tombstones'
  ]
  loop
    execute format('drop policy if exists owner_all on public.%I;', t);
    execute format(
      'create policy owner_all on public.%I
         for all using (owner_id = auth.uid())
         with check (owner_id = auth.uid());', t);
  end loop;
end $$;

-- exchange_rates: public read, no client writes.
drop policy if exists exchange_read on public.exchange_rates;
create policy exchange_read on public.exchange_rates for select using (true);

-- Useful indexes for the sync cursor.
create index if not exists idx_accounts_owner_updated on public.accounts (owner_id, updated_at);
create index if not exists idx_transactions_owner_updated on public.transactions (owner_id, updated_at);
create index if not exists idx_budget_entries_owner_updated on public.budget_entries (owner_id, updated_at);

-- delete_account RPC (§9): lets a signed-in user erase their auth row (cascades).
create or replace function public.delete_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;
