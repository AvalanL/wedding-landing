-- Create RSVP responses table
create table if not exists public.rsvp_responses (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid not null references public.sites(id) on delete cascade,
  
  -- Guest information
  guest_name text not null,
  email text,
  phone text,
  
  -- RSVP details
  attending boolean not null default true,
  number_of_guests integer default 1,
  dietary_restrictions text,
  message text,
  
  -- Analytics
  ip_address text,
  user_agent text,
  
  -- Timestamps
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Create indexes for performance
create index if not exists rsvp_responses_site_id_idx on public.rsvp_responses(site_id);
create index if not exists rsvp_responses_created_at_idx on public.rsvp_responses(created_at desc);

-- Enable RLS
alter table public.rsvp_responses enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Site owners can view their RSVPs" on public.rsvp_responses;
drop policy if exists "Site owners can manage their RSVPs" on public.rsvp_responses;

-- Policy: Site owners can view all RSVPs for their sites
create policy "Site owners can view their RSVPs" on public.rsvp_responses
  for select
  using (
    exists (
      select 1 from public.sites
      where sites.id = rsvp_responses.site_id
      and sites.owner_id = auth.uid()
    )
  );

-- Policy: Site owners can delete/update their RSVPs
create policy "Site owners can manage their RSVPs" on public.rsvp_responses
  for all
  using (
    exists (
      select 1 from public.sites
      where sites.id = rsvp_responses.site_id
      and sites.owner_id = auth.uid()
    )
  );

-- Trigger to update updated_at
create or replace function public.set_rsvp_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_rsvp_updated_at on public.rsvp_responses;
create trigger set_rsvp_updated_at
before update on public.rsvp_responses
for each row execute procedure public.set_rsvp_updated_at();
