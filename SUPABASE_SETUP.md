# Supabase setup for Private Journal

## 1) Create auth user
- In Supabase dashboard, create your user in **Authentication > Users** (email/password).

## 2) Create table and policies
Run this SQL in **SQL Editor**:

```sql
create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  mood text,
  created_at timestamptz not null default now()
);

alter table public.journal_entries enable row level security;

create policy "journal_select_own"
on public.journal_entries
for select
using (auth.uid() = user_id);

create policy "journal_insert_own"
on public.journal_entries
for insert
with check (auth.uid() = user_id);

create policy "journal_update_own"
on public.journal_entries
for update
using (auth.uid() = user_id);
```

## 3) Configure environment
- Copy `.env.example` to `.env.local`.
- Fill in:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
  - `REACT_APP_JOURNAL_OWNER_EMAIL` (your exact login email)

## 4) Run app
```bash
npm start
```
