import { cookies } from "next/headers"
import { createServerComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

export const createServerSupabaseClient = (): SupabaseClient<Database> => {
  // Use without explicit params - reads from NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
  // More build-friendly as it doesn't throw during static generation
  return createServerComponentClient<Database>({
    cookies,
  })
}

export const createRouteSupabaseClient = (): SupabaseClient<Database> => {
  // Use without explicit params - reads from NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
  // More build-friendly as it doesn't throw during static generation
  return createRouteHandlerClient<Database>({
    cookies,
  })
}
