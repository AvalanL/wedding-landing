import { cookies } from "next/headers"
import { createServerComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

const resolveSupabaseCredentials = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseAnon = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
  }

  if (!supabaseAnon && !supabaseServiceRole) {
    throw new Error(
      "Missing Supabase credentials. Set SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) or SUPABASE_SERVICE_ROLE_KEY."
    )
  }

  return {
    supabaseUrl,
    supabaseKey: supabaseServiceRole ?? supabaseAnon!,
  }
}

export const createServerSupabaseClient = (): SupabaseClient<Database> => {
  return createServerComponentClient<Database>({
    cookies,
  })
}

export const createRouteSupabaseClient = (): SupabaseClient<Database> => {
  return createRouteHandlerClient<Database>({
    cookies,
  })
}
