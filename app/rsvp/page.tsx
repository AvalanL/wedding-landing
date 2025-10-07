'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SignOutButton } from '@/components/auth/sign-out-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Download,
  Mail,
  Phone,
  User,
  Users,
  XCircle,
  MessageSquare,
  UtensilsCrossed,
} from 'lucide-react'

interface RSVPResponse {
  id: string
  guest_name: string
  email: string | null
  phone: string | null
  attending: boolean
  number_of_guests: number
  dietary_restrictions: string | null
  message: string | null
  created_at: string
}

interface RSVPStats {
  total: number
  attending: number
  notAttending: number
  totalGuests: number
}

interface Site {
  id: string
  slug: string
}

export default function RSVPPage() {
  const session = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const siteId = searchParams.get('site_id')

  const [rsvps, setRsvps] = useState<RSVPResponse[]>([])
  const [stats, setStats] = useState<RSVPStats | null>(null)
  const [site, setSite] = useState<Site | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }

    if (!siteId) {
      router.push('/dashboard')
      return
    }

    loadRSVPs()
  }, [session, siteId, router])

  async function loadRSVPs() {
    if (!siteId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/rsvp?site_id=${siteId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Kunde inte hämta OSA-svar')
      }

      setRsvps(data.rsvps || [])
      setStats(data.stats || null)
      setSite(data.site || null)
    } catch (err) {
      console.error('Failed to load RSVPs:', err)
      setError(err instanceof Error ? err.message : 'Ett fel uppstod')
    } finally {
      setIsLoading(false)
    }
  }

  function exportToCSV() {
    if (rsvps.length === 0) return

    const headers = [
      'Namn',
      'E-post',
      'Telefon',
      'Status',
      'Antal gäster',
      'Matpreferenser',
      'Meddelande',
      'Datum',
    ]

    const rows = rsvps.map((rsvp) => [
      rsvp.guest_name,
      rsvp.email || '',
      rsvp.phone || '',
      rsvp.attending ? 'Kommer' : 'Kommer inte',
      rsvp.attending ? rsvp.number_of_guests.toString() : '0',
      rsvp.dietary_restrictions || '',
      rsvp.message || '',
      new Date(rsvp.created_at).toLocaleDateString('sv-SE'),
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `rsvp-${site?.slug || 'export'}-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF8' }}>
      {/* Header */}
      <header
        className="border-b"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#F3D4C2',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/dashboard')}
              variant="ghost"
              className="flex items-center gap-2"
              style={{ color: '#B26D4A' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Tillbaka
            </Button>
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#1F1C14' }}>
                OSA-svar
              </h1>
              {site && (
                <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
                  {site.slug}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 mx-auto mb-4"
                style={{ borderTopColor: '#B26D4A' }}
              />
              <p style={{ color: '#1F1C14', opacity: 0.6 }}>Laddar OSA-svar...</p>
            </div>
          </div>
        ) : error ? (
          <div
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' }}
          >
            {error}
          </div>
        ) : (
          <>
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card
                  className="p-6 border-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#F3D4C2',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F3D4C2' }}
                    >
                      <MessageSquare className="h-6 w-6" style={{ color: '#B26D4A' }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: '#1F1C14' }}>
                        {stats.total}
                      </p>
                      <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
                        Totala svar
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-6 border-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#F3D4C2',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                    >
                      <CheckCircle2 className="h-6 w-6" style={{ color: '#16a34a' }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: '#1F1C14' }}>
                        {stats.attending}
                      </p>
                      <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
                        Kommer
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-6 border-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#F3D4C2',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    >
                      <XCircle className="h-6 w-6" style={{ color: '#dc2626' }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: '#1F1C14' }}>
                        {stats.notAttending}
                      </p>
                      <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
                        Kommer inte
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-6 border-2"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#F3D4C2',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F3D4C2' }}
                    >
                      <Users className="h-6 w-6" style={{ color: '#B26D4A' }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" style={{ color: '#1F1C14' }}>
                        {stats.totalGuests}
                      </p>
                      <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
                        Totala gäster
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold" style={{ color: '#1F1C14' }}>
                Alla svar ({rsvps.length})
              </h2>
              {rsvps.length > 0 && (
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="flex items-center gap-2"
                  style={{
                    borderColor: '#B26D4A',
                    color: '#B26D4A',
                  }}
                >
                  <Download className="h-4 w-4" />
                  Exportera CSV
                </Button>
              )}
            </div>

            {/* RSVPs List */}
            {rsvps.length === 0 ? (
              <Card
                className="p-12 text-center border-2"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#F3D4C2',
                }}
              >
                <div className="text-4xl mb-4">💌</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F1C14' }}>
                  Inga OSA-svar än
                </h3>
                <p style={{ color: '#1F1C14', opacity: 0.6 }}>
                  När gäster fyller i OSA-formuläret kommer deras svar att visas här.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {rsvps.map((rsvp) => (
                  <Card
                    key={rsvp.id}
                    className="p-6 border-2"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#F3D4C2',
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: rsvp.attending
                              ? 'rgba(34, 197, 94, 0.1)'
                              : 'rgba(239, 68, 68, 0.1)',
                          }}
                        >
                          {rsvp.attending ? (
                            <CheckCircle2 className="h-5 w-5" style={{ color: '#16a34a' }} />
                          ) : (
                            <XCircle className="h-5 w-5" style={{ color: '#dc2626' }} />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg" style={{ color: '#1F1C14' }}>
                            {rsvp.guest_name}
                          </h3>
                          <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
                            {rsvp.attending ? 'Kommer' : 'Kommer inte'}
                            {rsvp.attending && rsvp.number_of_guests > 1 && ` • ${rsvp.number_of_guests} gäster`}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.5 }}>
                        {new Date(rsvp.created_at).toLocaleDateString('sv-SE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rsvp.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" style={{ color: '#B26D4A' }} />
                          <span className="text-sm" style={{ color: '#1F1C14' }}>
                            {rsvp.email}
                          </span>
                        </div>
                      )}
                      {rsvp.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" style={{ color: '#B26D4A' }} />
                          <span className="text-sm" style={{ color: '#1F1C14' }}>
                            {rsvp.phone}
                          </span>
                        </div>
                      )}
                    </div>

                    {rsvp.dietary_restrictions && (
                      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#F3D4C2' }}>
                        <div className="flex items-start gap-2">
                          <UtensilsCrossed className="h-4 w-4 mt-0.5" style={{ color: '#B26D4A' }} />
                          <div>
                            <p className="text-xs font-semibold mb-1" style={{ color: '#A25D3B' }}>
                              Matpreferenser
                            </p>
                            <p className="text-sm" style={{ color: '#1F1C14' }}>
                              {rsvp.dietary_restrictions}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {rsvp.message && (
                      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#F3D4C2' }}>
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 mt-0.5" style={{ color: '#B26D4A' }} />
                          <div>
                            <p className="text-xs font-semibold mb-1" style={{ color: '#A25D3B' }}>
                              Meddelande
                            </p>
                            <p className="text-sm" style={{ color: '#1F1C14' }}>
                              {rsvp.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

