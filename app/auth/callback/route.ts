import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/"

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Failed to exchange code for session:', error)
      // Redirect to login on error
      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin))
    }
  }

  // Validate redirect URL to prevent open redirect vulnerability
  // Only allow relative paths within our application
  let redirectPath = "/"
  try {
    // Check if 'next' is a relative path (starts with /)
    if (next && next.startsWith("/") && !next.startsWith("//")) {
      // Ensure it doesn't contain protocol or domain
      redirectPath = next
    }
  } catch {
    // If any parsing error, default to home
    redirectPath = "/"
  }

  return NextResponse.redirect(new URL(redirectPath, requestUrl.origin))
}
