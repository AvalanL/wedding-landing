-- Fix RLS policy for RSVP responses to work with anon client

-- Drop the old policy
DROP POLICY IF EXISTS "Anyone can submit RSVP for published sites" ON public.rsvp_responses;
DROP POLICY IF EXISTS "Anyone can insert RSVP responses to published sites" ON public.rsvp_responses;

-- Grant SELECT permission on sites table to check if published
GRANT SELECT ON public.sites TO anon;

-- Create a better policy that works with anon client
CREATE POLICY "Anyone can insert RSVP to published sites" ON public.rsvp_responses
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sites 
      WHERE sites.id = rsvp_responses.site_id 
      AND sites.published IS NOT NULL
    )
  );

