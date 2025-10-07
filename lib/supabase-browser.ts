"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/supabase-js"
import { useMemo } from "react"
import type { Database } from "@/types/database"

export const createSupabaseBrowserClient = (): SupabaseClient<Database> => {
  // Use createClientComponentClient without explicit params
  // It will read NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from env
  // This is more build-friendly as it doesn't throw during static generation
  return createClientComponentClient<Database>()
}

export const useSupabaseBrowser = (): SupabaseClient<Database> => {
  return useMemo(createSupabaseBrowserClient, [])
}
