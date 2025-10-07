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
  // Lazy initialization - only create client in browser, not during SSR/build
  const [supabaseClient] = useState(() => {
    // During build/SSR, window is undefined
    if (typeof window === 'undefined') {
      // Return a mock client that won't be used
      return null as any
    }
    return createSupabaseBrowserClient()
  })

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}
