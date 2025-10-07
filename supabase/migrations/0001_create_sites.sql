create extension if not exists "uuid-ossp";
create extension if not exists citext;

create table if not exists public.sites (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug citext not null,
  draft jsonb,
  published jsonb,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists sites_owner_slug_key on public.sites(owner_id, slug);
create unique index if not exists sites_published_slug_key on public.sites(slug) where published is not null;

alter table public.sites enable row level security;

drop policy if exists "Sites are viewable by owner" on public.sites;
drop policy if exists "Sites are editable by owner" on public.sites;
drop policy if exists "Published sites are viewable by anyone" on public.sites;

create policy "Sites are viewable by owner" on public.sites
  for select using (auth.uid() = owner_id);

create policy "Sites are editable by owner" on public.sites
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "Published sites are viewable by anyone" on public.sites
  for select using (published is not null);

create or replace function public.set_sites_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_sites_updated_at on public.sites;
create trigger set_sites_updated_at
before update on public.sites
for each row execute procedure public.set_sites_updated_at();
