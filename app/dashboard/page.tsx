'use client'

// Force dynamic rendering - this page needs runtime Supabase env vars
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { SignOutButton } from '@/components/auth/sign-out-button'
import { 
  Heart, 
  Plus, 
  Clock, 
  Globe2, 
  FileText, 
  CheckCircle2,
  Calendar,
  Users,
  Settings,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  HelpCircle,
  MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type MenuItem = {
  id: string
  label: string
  icon: any
  href: string
}

interface Site {
  id: string
  slug: string
  draft: any
  published: any
  published_at: string | null
  updated_at: string
  created_at: string
}

export default function DashboardPage() {
  const session = useSession()
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState('overview')

  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Översikt', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'sites', label: 'Mina sidor', icon: Heart, href: '/dashboard' },
    { id: 'settings', label: 'Inställningar', icon: Settings, href: '/dashboard' },
    { id: 'help', label: 'Hjälp & Support', icon: HelpCircle, href: '/dashboard' },
  ]

  useEffect(() => {
    document.title = 'Min översikt – Bröllopssidan.se'
  }, [])

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    fetchSites()
  }, [session, router])

  const fetchSites = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Error fetching sites:', error)
      } else {
        setSites(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const getWeddingDate = (site: Site) => {
    try {
      const data = site.published || site.draft
      if (data?.details?.date) {
        return formatDate(data.details.date)
      }
    } catch (e) {
      // ignore
    }
    return null
  }

  const getCoupleNames = (site: Site) => {
    try {
      const data = site.published || site.draft
      if (data?.couple?.partner1 && data?.couple?.partner2) {
        return `${data.couple.partner1} & ${data.couple.partner2}`
      }
    } catch (e) {
      // ignore
    }
    return 'Nytt bröllop'
  }

  if (!session || loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#FFFDF8' }}
      >
        <div className="text-center">
          <div 
            className="h-12 w-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: '#B26D4A', borderTopColor: 'transparent' }}
          />
          <p style={{ color: '#1F1C14', opacity: 0.7 }}>Laddar...</p>
        </div>
      </div>
    )
  }

  const hasPublishedSites = sites.some(site => site.published)
  const hasDrafts = sites.some(site => !site.published && site.draft)

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#FFFDF8' }}>
      {/* Stripe-like Left Sidebar */}
      <aside 
        className="w-64 border-r flex flex-col"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#F3D4C2'
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: '#F3D4C2' }}>
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#B26D4A' }}
            >
              <Heart className="h-5 w-5" style={{ color: '#FFFDF8' }} />
            </div>
            <div>
              <h1 
                className="text-base font-bold leading-tight"
                style={{ 
                  color: '#1F1C14',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                Bröllopssidan.se
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = item.id === activeView
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? 'rgba(179, 109, 74, 0.1)' : 'transparent',
                      color: isActive ? '#B26D4A' : '#1F1C14',
                      opacity: isActive ? 1 : 0.7
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t" style={{ borderColor: '#F3D4C2' }}>
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ 
                backgroundColor: '#F3D4C2',
                color: '#B26D4A'
              }}
            >
              {session.user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p 
                className="text-sm font-medium truncate"
                style={{ color: '#1F1C14' }}
              >
                {session.user.email?.split('@')[0]}
              </p>
              <p 
                className="text-xs truncate"
                style={{ color: '#1F1C14', opacity: 0.6 }}
              >
                {session.user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              supabase.auth.signOut()
              router.push('/login')
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              color: '#1F1C14',
              opacity: 0.7
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Logga ut</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          {/* Welcome section */}
          <div className="mb-8 sm:mb-12">
            <h2 
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ 
                color: '#1F1C14',
                fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: '1.2'
              }}
            >
              Välkommen tillbaka! 👋
            </h2>
            <p 
              className="text-lg"
              style={{ 
                color: '#1F1C14',
                opacity: 0.7,
                lineHeight: '1.6'
              }}
            >
              Här kan du hantera alla era bröllopssidor. Skapa nya, redigera befintliga eller publicera när ni är redo.
            </p>
          </div>

          {/* CTA to create new site */}
          <div className="mb-8">
            <Button
              onClick={() => router.push('/')}
              className="h-14 px-8 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{
                backgroundColor: '#B26D4A',
                color: '#FFFDF8'
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Skapa ny bröllopssida
            </Button>
          </div>

          {/* Sites list */}
          {sites.length === 0 ? (
            /* Empty state */
            <div 
              className="rounded-2xl border p-12 text-center"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderColor: '#F3D4C2'
              }}
            >
            <div 
              className="inline-flex h-20 w-20 items-center justify-center rounded-full mb-6"
              style={{ backgroundColor: '#F3D4C2' }}
            >
              <Heart 
                className="h-10 w-10"
                style={{ color: '#B26D4A' }}
              />
            </div>
            <h3 
              className="text-2xl font-bold mb-3"
              style={{ color: '#1F1C14' }}
            >
              Välkommen till Bröllopssidan.se!
            </h3>
            <p 
              className="text-base mb-6 max-w-md mx-auto"
              style={{ 
                color: '#1F1C14',
                opacity: 0.7,
                lineHeight: '1.6'
              }}
            >
              Ni har inga bröllopssidor än. Kom igång genom att skapa er första sida – det tar bara några minuter!
            </p>
            <Button
              onClick={() => router.push('/')}
              className="h-12 px-6 font-semibold rounded-lg"
              style={{
                backgroundColor: '#B26D4A',
                color: '#FFFDF8'
              }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Skapa min första sida
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Published sites */}
            {hasPublishedSites && (
              <div>
                <h3 
                  className="text-sm font-semibold uppercase tracking-wide mb-4"
                  style={{ color: '#A25D3B' }}
                >
                  Publicerade sidor
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sites.filter(site => site.published).map(site => (
                    <div
                      key={site.id}
                      className="rounded-xl border p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        borderColor: '#F3D4C2'
                      }}
                      onClick={() => router.push('/')}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="h-12 w-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: '#B26D4A' }}
                        >
                          <Heart className="h-6 w-6" style={{ color: '#FFFDF8' }} />
                        </div>
                        <div 
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: '#16a34a'
                          }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Publicerad
                        </div>
                      </div>

                      <h4 
                        className="text-lg font-bold mb-2"
                        style={{ color: '#1F1C14' }}
                      >
                        {getCoupleNames(site)}
                      </h4>

                      <div className="space-y-2 mb-4">
                        {getWeddingDate(site) && (
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#1F1C14', opacity: 0.7 }}>
                            <Calendar className="h-4 w-4" />
                            <span>{getWeddingDate(site)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#1F1C14', opacity: 0.7 }}>
                          <Globe2 className="h-4 w-4" />
                          <span className="truncate">{site.slug}.bröllopssidan.se</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push('/')
                          }}
                          variant="outline"
                          className="flex-1 text-sm"
                          style={{ borderColor: '#F3D4C2' }}
                        >
                          Redigera
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/rsvp?site_id=${site.id}`)
                          }}
                          variant="outline"
                          className="text-sm"
                          style={{ borderColor: '#F3D4C2' }}
                          title="Visa OSA-svar"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`https://${site.slug}.bröllopssidan.se`, '_blank')
                          }}
                          variant="outline"
                          className="text-sm"
                          style={{ borderColor: '#F3D4C2' }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Draft sites */}
            {hasDrafts && (
              <div>
                <h3 
                  className="text-sm font-semibold uppercase tracking-wide mb-4"
                  style={{ color: '#A25D3B' }}
                >
                  Utkast
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sites.filter(site => !site.published && site.draft).map(site => (
                    <div
                      key={site.id}
                      className="rounded-xl border p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        borderColor: '#F3D4C2'
                      }}
                      onClick={() => router.push('/')}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="h-12 w-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: '#F3D4C2' }}
                        >
                          <FileText className="h-6 w-6" style={{ color: '#B26D4A' }} />
                        </div>
                        <div 
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: 'rgba(179, 109, 74, 0.1)',
                            color: '#A25D3B'
                          }}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          Utkast
                        </div>
                      </div>

                      <h4 
                        className="text-lg font-bold mb-2"
                        style={{ color: '#1F1C14' }}
                      >
                        {getCoupleNames(site)}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#1F1C14', opacity: 0.7 }}>
                          <Clock className="h-4 w-4" />
                          <span>Uppdaterad {formatDate(site.updated_at)}</span>
                        </div>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push('/')
                        }}
                        variant="outline"
                        className="w-full text-sm"
                        style={{ borderColor: '#F3D4C2' }}
                      >
                        Fortsätt redigera
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </main>
    </div>
  )
}

