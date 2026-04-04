-- ============================================================
-- ShopBot – Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists public.products (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  description text not null default '',
  price       numeric(10, 2) not null check (price >= 0),
  stock       integer not null default 0 check (stock >= 0),
  image_url   text not null default '',
  category    text not null default 'Geral',
  created_at  timestamptz not null default now()
);

alter table public.products enable row level security;

-- Anyone can read products
create policy "Public can read products"
  on public.products for select
  using (true);

-- Only service role can insert/update/delete
create policy "Service role can manage products"
  on public.products for all
  using (auth.role() = 'service_role');

-- ============================================================
-- ORDERS
-- ============================================================
create table if not exists public.orders (
  id                uuid primary key default uuid_generate_v4(),
  customer_email    text not null,
  customer_name     text not null default '',
  items             jsonb not null default '[]',
  total             numeric(10, 2) not null check (total >= 0),
  status            text not null default 'pending'
                      check (status in ('pending','paid','shipped','delivered','cancelled')),
  stripe_session_id text,
  created_at        timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Users can read their own orders by email
create policy "Users can read own orders"
  on public.orders for select
  using (customer_email = current_user or auth.role() = 'service_role');

-- Service role can insert and update
create policy "Service role can manage orders"
  on public.orders for all
  using (auth.role() = 'service_role');

-- ============================================================
-- CHAT SESSIONS
-- ============================================================
create table if not exists public.chat_sessions (
  session_id  uuid primary key default uuid_generate_v4(),
  messages    jsonb not null default '[]',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.chat_sessions enable row level security;

create policy "Service role can manage chat sessions"
  on public.chat_sessions for all
  using (auth.role() = 'service_role');

-- ============================================================
-- SEED: Sample Products
-- ============================================================
insert into public.products (name, description, price, stock, image_url, category) values
  ('Tênis Running Pro',        'Tênis de corrida com amortecimento avançado. Ideal para treinos longos.',                299.99, 15, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'Calçados'),
  ('Camiseta Dry-Fit Performance', 'Tecido que absorve suor e mantém você seco durante o exercício.',                    89.99, 30, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'Roupas'),
  ('Mochila Esportiva 30L',    'Resistente à água com compartimento para laptop e múltiplos bolsos.',                  199.99, 20, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 'Acessórios'),
  ('Smartwatch Fitness Tracker','Monitoramento de frequência cardíaca, GPS e 7 dias de autonomia.',                     599.99, 10, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', 'Eletrônicos'),
  ('Garrafa Térmica 750ml',    'Aço inoxidável. Mantém quente 12h e frio 24h.',                                         79.99, 50, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500', 'Acessórios'),
  ('Shorts Compressão Training','Tecido de alta performance para treinos de alta intensidade.',                          119.99, 25, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 'Roupas')
on conflict do nothing;
