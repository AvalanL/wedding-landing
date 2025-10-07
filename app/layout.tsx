import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { SupabaseProvider } from "@/components/supabase-provider"
import { createServerSupabaseClient } from "@/lib/supabase-server"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Emma & James - Our Wedding",
  description: "Join us as we celebrate our love story",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let session = null
  
  try {
    const supabase = createServerSupabaseClient()
    const result = await supabase.auth.getSession()
    session = result.data.session
  } catch (error) {
    console.error('Supabase initialization error:', error)
  }

  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">
        <SupabaseProvider session={session}>
          <Suspense fallback={null}>{children}</Suspense>
        </SupabaseProvider>
        <Analytics />
      </body>
    </html>
  )
}
