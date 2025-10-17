-- Create function to get user email from auth.users
-- This is needed because auth.users is not directly accessible via normal queries
-- for security reasons, but we need it for sending email notifications

create or replace function public.get_user_email(user_id uuid)
returns text
language plpgsql
security definer -- Runs with elevated privileges
set search_path = public
as $$
declare
  user_email text;
begin
  -- Get email from auth.users table
  select email into user_email
  from auth.users
  where id = user_id;
  
  return user_email;
end;
$$;

-- Grant execute permission to authenticated users and anon (for RSVP notification emails)
grant execute on function public.get_user_email(uuid) to authenticated, anon;

-- Add comment for documentation
comment on function public.get_user_email is 'Returns the email address for a given user ID. Used for sending RSVP notification emails to site owners.';
