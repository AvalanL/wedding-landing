"use client"

import { useEffect, useMemo, useState } from "react"
import { normalizeSlug, renderSnapshot, type EditorSnapshot } from "@/app/page"

export default function PublishedSite({ params }: { params: { slug: string } }) {
  const [snapshot, setSnapshot] = useState<EditorSnapshot | null>(null)
  const [siteId, setSiteId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const normalizedSlug = useMemo(() => normalizeSlug(params.slug), [params.slug])

  useEffect(() => {
    const loadPublishedSite = async () => {
      setIsLoading(true)
      setError(null)

      if (!normalizedSlug) {
        setError("Ogiltig adress")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/sites?slug=${normalizedSlug}&published=true`)
        const payload = await response.json()

        if (!response.ok) {
          setError(payload?.error ?? "Kunde inte hämta den publicerade sidan")
          setSnapshot(null)
          return
        }

        const published = payload.site?.published as EditorSnapshot | null
        const id = payload.site?.id
        
        if (!published) {
          setError("Den här sidan har inte publicerats ännu.")
          setSnapshot(null)
          return
        }

        setSnapshot(published)
        setSiteId(id)
      } catch (loadError) {
        console.error("Failed to load published site", loadError)
        setError("Kunde inte hämta den publicerade sidan")
        setSnapshot(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadPublishedSite()
  }, [normalizedSlug])

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <p className="text-sm font-medium text-gray-500">Laddar sidan…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 px-6 text-center">
        <div className="max-w-lg rounded-xl border border-rose-100 bg-white/80 p-10 shadow-lg backdrop-blur">
          <h1 className="text-2xl font-semibold text-gray-900">Hoppsan!</h1>
          <p className="mt-4 text-sm text-gray-600">{error}</p>
        </div>
      </main>
    )
  }

  if (!snapshot) {
    return null
  }

  return (
    <main className="min-h-screen">
      {renderSnapshot(snapshot, siteId)}
    </main>
  )
}
