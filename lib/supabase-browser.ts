"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/supabase-js"
import { useMemo } from "react"
import type { Database } from "@/types/database"

export const createSupabaseBrowserClient = (): SupabaseClient<Database> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Supabase environment variables are missing. Define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    )
  }

  return createClientComponentClient<Database>({
    supabaseUrl: url,
    supabaseKey: anonKey,
  })
}

export const useSupabaseBrowser = (): SupabaseClient<Database> => {
  return useMemo(createSupabaseBrowserClient, [])
}
