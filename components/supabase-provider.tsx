"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import type { Session } from "@supabase/supabase-js"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

type SupabaseProviderProps = {
  children: ReactNode
  session: Session | null
}

export function SupabaseProvider({ children, session }: SupabaseProviderProps) {
  const [supabaseClient] = useState(createSupabaseBrowserClient)

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}
