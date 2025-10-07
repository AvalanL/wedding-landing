'use client'

import { useEffect } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button'
import { Heart, CheckCircle2, Calendar, Globe, Palette, Users, Shield, Clock } from 'lucide-react'

export default function LoginPage() {
  useEffect(() => {
    document.title = 'Logga in – Bröllopssidan.se'
  }, [])
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (session) {
    return null
  }

  const features = [
    {
      icon: Palette,
      title: 'Vackra mallar',
      description: 'Välj bland eleganta designer anpassade för er stora dag',
    },
    {
      icon: Calendar,
      title: 'Alla detaljer samlat',
      description: 'Dela viktig information med era gäster på ett enkelt sätt',
    },
    {
      icon: Users,
      title: 'OSA-hantering',
      description: 'Håll koll på era gäster och deras matpreferenser',
    },
    {
      icon: Globe,
      title: 'Er egen webbadress',
      description: 'Publicera er sida med en personlig subdomän',
    },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#FFFDF8' }}>
      {/* Subtle decorative background elements with brand colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: '#F3D4C2' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: '#B26D4A' }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[960px]">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left side - Hero content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border" 
                  style={{ 
                    backgroundColor: 'rgba(179, 109, 74, 0.1)',
                    borderColor: '#B26D4A',
                    color: '#A25D3B'
                  }}>
                  <Heart className="h-4 w-4" />
                  <span>Bröllopssidan.se</span>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight" 
                  style={{ 
                    color: '#1F1C14',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    lineHeight: '1.2'
                  }}>
                  Skapa er drömwebbplats för bröllopet
                </h1>
                
                <p className="text-lg max-w-2xl mx-auto lg:mx-0" 
                  style={{ 
                    color: '#1F1C14',
                    lineHeight: '1.6',
                    opacity: 0.8
                  }}>
                  Ett enkelt och tryggt sätt att dela alla viktiga detaljer med era gäster. 
                  Från OSA till vägbeskrivningar – allt på ett ställe.
                </p>
              </div>

              {/* Features grid */}
              <div className="grid gap-4 sm:grid-cols-2 text-left">
                {features.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={feature.title}
                      className="flex gap-3 rounded-lg p-4 border transition-all hover:shadow-md"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        borderColor: '#F3D4C2'
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div 
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ 
                            backgroundColor: '#B26D4A',
                            color: '#FFFDF8'
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-sm font-semibold" style={{ color: '#1F1C14' }}>
                          {feature.title}
                        </h3>
                        <p className="text-xs" style={{ color: '#1F1C14', opacity: 0.7, lineHeight: '1.6' }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Social proof with Swedish context */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 shadow-sm"
                      style={{ 
                        backgroundColor: '#B26D4A',
                        borderColor: '#FFFDF8'
                      }}
                    />
                  ))}
                </div>
                <span className="font-medium" style={{ color: '#1F1C14', opacity: 0.8 }}>
                  Används av hundratals svenska par
                </span>
              </div>
            </div>

            {/* Right side - Login card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div 
                  className="rounded-2xl border shadow-2xl"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderColor: '#F3D4C2'
                  }}
                >
                  <div className="p-8 sm:p-10 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-3">
                      <div 
                        className="inline-flex h-16 w-16 items-center justify-center rounded-full shadow-lg mb-2"
                        style={{ 
                          backgroundColor: '#B26D4A',
                          color: '#FFFDF8'
                        }}
                      >
                        <Heart className="h-8 w-8 fill-current" />
                      </div>
                      <h2 
                        className="text-2xl font-bold tracking-tight"
                        style={{ 
                          color: '#1F1C14',
                          fontFamily: 'Inter, system-ui, sans-serif'
                        }}
                      >
                        Välkommen
                      </h2>
                      <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.7, lineHeight: '1.6' }}>
                        Logga in för att skapa och hantera er bröllopssida
                      </p>
                    </div>

                    {/* Sign in button */}
                    <div className="space-y-4">
                      <GoogleSignInButton label="Fortsätt med Google" />
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t" style={{ borderColor: '#F3D4C2' }} />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span 
                            className="px-3 py-1 rounded-full flex items-center gap-1.5" 
                            style={{ 
                              backgroundColor: '#FFFDF8',
                              color: '#1F1C14',
                              opacity: 0.7
                            }}
                          >
                            <Shield className="h-3 w-3" />
                            Säker inloggning via Google
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-4 pt-4 border-t" style={{ borderColor: '#F3D4C2' }}>
                      <p 
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: '#A25D3B' }}
                      >
                        Vad ingår:
                      </p>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 
                            className="h-5 w-5 flex-shrink-0 mt-0.5" 
                            style={{ color: '#B26D4A' }}
                          />
                          <span style={{ color: '#1F1C14', opacity: 0.8, lineHeight: '1.6' }}>
                            Mobilanpassade mallar med svensk design
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 
                            className="h-5 w-5 flex-shrink-0 mt-0.5" 
                            style={{ color: '#B26D4A' }}
                          />
                          <span style={{ color: '#1F1C14', opacity: 0.8, lineHeight: '1.6' }}>
                            Spara utkast och publicera när ni är redo
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 
                            className="h-5 w-5 flex-shrink-0 mt-0.5" 
                            style={{ color: '#B26D4A' }}
                          />
                          <span style={{ color: '#1F1C14', opacity: 0.8, lineHeight: '1.6' }}>
                            Er egen personliga webbadress
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock 
                            className="h-5 w-5 flex-shrink-0 mt-0.5" 
                            style={{ color: '#B26D4A' }}
                          />
                          <span style={{ color: '#1F1C14', opacity: 0.8, lineHeight: '1.6' }}>
                            Klart på några minuter – inget krångel
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div 
                    className="rounded-b-2xl px-8 py-4 border-t"
                    style={{ 
                      backgroundColor: '#F3D4C2',
                      borderColor: '#F3D4C2'
                    }}
                  >
                    <p className="text-xs text-center" style={{ color: '#1F1C14', opacity: 0.7 }}>
                      Genom att logga in godkänner du våra användarvillkor och integritetspolicy
                    </p>
                  </div>
                </div>

                {/* Additional info below card */}
                <div className="mt-6 text-center">
                  <p className="text-sm" style={{ color: '#1F1C14', opacity: 0.7 }}>
                    Inget kreditkort krävs • Gratis att komma igång
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

