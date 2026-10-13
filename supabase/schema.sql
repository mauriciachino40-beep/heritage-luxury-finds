create extension if not exists pgcrypto;

create table if not exists public.order_daily_sequences (
  order_date date primary key,
  last_number smallint not null check (last_number between 1 and 99)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_date date not null,
  daily_number smallint not null check (daily_number between 1 and 99),
  order_number text not null,
  access_token uuid not null unique default gen_random_uuid(),
  status text not null default 'awaiting_lisa' check (status in ('awaiting_lisa','awaiting_payment','paid','processing','shipped','completed','cancelled')),
  customer jsonb not null,
  items jsonb not null,
  estimated_total numeric(10,2) not null check (estimated_total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_date, daily_number)
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.order_daily_sequences enable row level security;
alter table public.orders enable row level security;
alter table public.admin_users enable row level security;

revoke all on public.order_daily_sequences from anon, authenticated;
revoke all on public.orders from anon, authenticated;
revoke all on public.admin_users from anon, authenticated;

create or replace function public.is_lisa_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_lisa_admin() from public, anon;
grant execute on function public.is_lisa_admin() to authenticated;

create policy "Lisa can read all orders"
on public.orders for select
to authenticated
using (public.is_lisa_admin());

create policy "Lisa can update order status"
on public.orders for update
to authenticated
using (public.is_lisa_admin())
with check (public.is_lisa_admin());

grant select, update on public.orders to authenticated;

create or replace function public.create_lisa_order(
  p_customer jsonb,
  p_items jsonb,
  p_estimated_total numeric
)
returns table(order_number text, access_token uuid, created_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_date date := (timezone('Asia/Shanghai', now()))::date;
  v_number smallint;
  v_order_number text;
  v_access_token uuid := gen_random_uuid();
  v_created_at timestamptz := now();
begin
  if jsonb_typeof(p_customer) <> 'object' or octet_length(p_customer::text) > 20000 then
    raise exception 'Invalid customer details';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 50 or octet_length(p_items::text) > 200000 then
    raise exception 'Invalid order items';
  end if;
  if p_estimated_total < 0 or p_estimated_total > 100000 then
    raise exception 'Invalid order total';
  end if;

  insert into public.order_daily_sequences(order_date, last_number)
  values (v_date, 1)
  on conflict (order_date) do update
    set last_number = public.order_daily_sequences.last_number + 1
    where public.order_daily_sequences.last_number < 99
  returning last_number into v_number;

  if v_number is null then
    raise exception 'Daily order limit reached';
  end if;

  v_order_number := to_char(v_date, 'MMDD') || '-' || lpad(v_number::text, 2, '0');

  insert into public.orders(order_date, daily_number, order_number, access_token, customer, items, estimated_total, created_at, updated_at)
  values (v_date, v_number, v_order_number, v_access_token, p_customer, p_items, p_estimated_total, v_created_at, v_created_at);

  return query select v_order_number, v_access_token, v_created_at;
end;
$$;

revoke all on function public.create_lisa_order(jsonb, jsonb, numeric) from public;
grant execute on function public.create_lisa_order(jsonb, jsonb, numeric) to anon, authenticated;

create or replace function public.get_lisa_order(p_access_token uuid)
returns table(order_number text, status text, items jsonb, estimated_total numeric, created_at timestamptz, updated_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select o.order_number, o.status, o.items, o.estimated_total, o.created_at, o.updated_at
  from public.orders o
  where o.access_token = p_access_token
  limit 1;
$$;

revoke all on function public.get_lisa_order(uuid) from public;
grant execute on function public.get_lisa_order(uuid) to anon, authenticated;

create or replace function public.touch_order_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
before update on public.orders
for each row execute function public.touch_order_updated_at();

-- After Lisa creates an Auth account, run this once in the SQL editor:
-- insert into public.admin_users(user_id)
-- select id from auth.users where email = 'LISA_EMAIL_HERE';
