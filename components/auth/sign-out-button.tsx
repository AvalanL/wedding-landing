"use client"

import { Button } from "@/components/ui/button"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useCallback, useState } from "react"

export function SignOutButton({ label = "Sign out" }: { label?: string }) {
  const supabase = useSupabaseClient()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = useCallback(async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Sign out failed", error)
        alert("Unable to sign out. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  return (
    <Button onClick={handleSignOut} disabled={isLoading} variant="ghost">
      {isLoading ? "Signing out…" : label}
    </Button>
  )
}
