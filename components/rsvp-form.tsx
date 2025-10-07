'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface RSVPFormProps {
  siteId: string
  deadline?: string
  palette?: {
    primary: string
    secondary: string
    accent: string
  }
  className?: string
}

export function RSVPForm({ siteId, deadline, palette, className = '' }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    attending: true,
    number_of_guests: 1,
    dietary_restrictions: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_id: siteId,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Kunde inte skicka OSA-svar')
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('RSVP submission error:', err)
      setError(err instanceof Error ? err.message : 'Ett fel uppstod. Försök igen.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const primaryColor = palette?.primary || '#B26D4A'
  const accentColor = palette?.accent || '#F3D4C2'

  if (isSubmitted) {
    return (
      <div className={`rounded-3xl p-8 text-center ${className}`} style={{ backgroundColor: accentColor }}>
        <CheckCircle2 className="mx-auto h-16 w-16 mb-4" style={{ color: primaryColor }} />
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#1F1C14' }}>
          Tack för ditt svar!
        </h3>
        <p className="text-lg" style={{ color: '#1F1C14', opacity: 0.8 }}>
          {formData.attending
            ? 'Vi ser fram emot att fira med dig! 🎉'
            : 'Tack för att du meddelade oss. Vi kommer sakna dig! 💕'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Attending Toggle */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, attending: true })}
          className={`p-4 rounded-2xl border-2 transition-all font-semibold ${
            formData.attending
              ? 'border-current shadow-md'
              : 'border-gray-200 bg-gray-50 text-gray-500'
          }`}
          style={
            formData.attending
              ? { borderColor: primaryColor, backgroundColor: accentColor, color: primaryColor }
              : {}
          }
        >
          ✓ Jag kommer
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, attending: false, number_of_guests: 1 })}
          className={`p-4 rounded-2xl border-2 transition-all font-semibold ${
            !formData.attending
              ? 'border-current shadow-md'
              : 'border-gray-200 bg-gray-50 text-gray-500'
          }`}
          style={
            !formData.attending
              ? { borderColor: primaryColor, backgroundColor: accentColor, color: primaryColor }
              : {}
          }
        >
          ✗ Kan inte
        </button>
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="guest_name" className="text-sm font-semibold" style={{ color: '#1F1C14' }}>
          Namn *
        </Label>
        <Input
          id="guest_name"
          type="text"
          required
          value={formData.guest_name}
          onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
          placeholder="Ditt fullständiga namn"
          className="mt-1 rounded-2xl"
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-sm font-semibold" style={{ color: '#1F1C14' }}>
          E-post
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="din@email.se"
          className="mt-1 rounded-2xl"
        />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="text-sm font-semibold" style={{ color: '#1F1C14' }}>
          Telefon
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="070-123 45 67"
          className="mt-1 rounded-2xl"
        />
      </div>

      {/* Number of guests (only if attending) */}
      {formData.attending && (
        <div>
          <Label htmlFor="number_of_guests" className="text-sm font-semibold" style={{ color: '#1F1C14' }}>
            Antal gäster *
          </Label>
          <Input
            id="number_of_guests"
            type="number"
            min="1"
            max="10"
            required
            value={formData.number_of_guests}
            onChange={(e) => setFormData({ ...formData, number_of_guests: parseInt(e.target.value) || 1 })}
            className="mt-1 rounded-2xl"
          />
          <p className="text-xs mt-1" style={{ color: '#1F1C14', opacity: 0.6 }}>
            Inkluderar dig själv
          </p>
        </div>
      )}

      {/* Dietary restrictions (only if attending) */}
      {formData.attending && (
        <div>
          <Label htmlFor="dietary_restrictions" className="text-sm font-semibold" style={{ color: '#1F1C14' }}>
            Matpreferenser / Allergier
          </Label>
          <Textarea
            id="dietary_restrictions"
            value={formData.dietary_restrictions}
            onChange={(e) => setFormData({ ...formData, dietary_restrictions: e.target.value })}
            placeholder="T.ex. vegetarian, glutenfri, nötallergi..."
            className="mt-1 rounded-2xl"
            rows={3}
          />
        </div>
      )}

      {/* Message */}
      <div>
        <Label htmlFor="message" className="text-sm font-semibold" style={{ color: '#1F1C14' }}>
          Meddelande till brudparet
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Skriv ett meddelande till oss..."
          className="mt-1 rounded-2xl"
          rows={4}
        />
      </div>

      {/* Error message */}
      {error && (
        <div
          className="p-4 rounded-2xl text-sm"
          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' }}
        >
          {error}
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-2xl text-white font-semibold shadow-md hover:shadow-lg transition-all"
        style={{ backgroundColor: primaryColor }}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Skickar...</span>
          </div>
        ) : (
          'Skicka OSA'
        )}
      </Button>

      {/* Deadline */}
      {deadline && (
        <p className="text-center text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
          Sista datum för OSA: {deadline}
        </p>
      )}
    </form>
  )
}

