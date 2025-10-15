"use client"

// Force dynamic rendering - this page needs runtime Supabase env vars
export const dynamic = 'force-dynamic'

import type React from "react"

import { useEffect, useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { RSVPForm } from "@/components/rsvp-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  Clock,
  Camera,
  HelpCircle,
  Gift,
  Home,
  Edit3,
  UserCheck,
  Upload,
  X,
  BookOpen,
  ImageIcon,
  Shirt,
  Globe2,
  MessageSquare,
  ArrowLeft,
} from "lucide-react"

export const colorPalettes = {
  romantic: [
    {
      name: "Gyllene Solnedgång",
      primary: "amber-600",
      secondary: "orange-500",
      accent: "yellow-400",
      background: "amber-50",
      text: "amber-900",
    },
    {
      name: "Rosenträdgård",
      primary: "rose-600",
      secondary: "pink-500",
      accent: "red-400",
      background: "rose-50",
      text: "rose-900",
    },
    {
      name: "Lavendel Drömmar",
      primary: "purple-600",
      secondary: "violet-500",
      accent: "pink-400",
      background: "purple-50",
      text: "purple-900",
    },
  ],
  modern: [
    {
      name: "Havets Blå",
      primary: "cyan-600",
      secondary: "blue-500",
      accent: "teal-400",
      background: "gray-50",
      text: "gray-900",
    },
    {
      name: "Midnatt",
      primary: "slate-700",
      secondary: "gray-600",
      accent: "blue-400",
      background: "slate-50",
      text: "slate-900",
    },
    {
      name: "Elektrisk",
      primary: "indigo-600",
      secondary: "purple-500",
      accent: "cyan-400",
      background: "indigo-50",
      text: "indigo-900",
    },
  ],
  vintage: [
    {
      name: "Antikt Guld",
      primary: "yellow-700",
      secondary: "amber-600",
      accent: "orange-400",
      background: "yellow-50",
      text: "yellow-900",
    },
    {
      name: "Sepia Brun",
      primary: "amber-800",
      secondary: "yellow-700",
      accent: "orange-500",
      background: "amber-50",
      text: "amber-900",
    },
    {
      name: "Dammig Rosa",
      primary: "rose-700",
      secondary: "pink-600",
      accent: "red-400",
      background: "rose-50",
      text: "rose-900",
    },
  ],
  elegant: [
    {
      name: "Klassisk Svart",
      primary: "gray-800",
      secondary: "gray-600",
      accent: "gray-400",
      background: "gray-50",
      text: "gray-900",
    },
    {
      name: "Platina",
      primary: "slate-700",
      secondary: "gray-500",
      accent: "slate-400",
      background: "slate-50",
      text: "slate-900",
    },
    {
      name: "Kol",
      primary: "zinc-800",
      secondary: "gray-600",
      accent: "zinc-400",
      background: "zinc-50",
      text: "zinc-900",
    },
  ],
  bohemian: [
    {
      name: "Skogens Grön",
      primary: "green-700",
      secondary: "emerald-600",
      accent: "teal-400",
      background: "green-50",
      text: "green-900",
    },
    {
      name: "Jordtoner",
      primary: "amber-700",
      secondary: "orange-600",
      accent: "yellow-500",
      background: "amber-50",
      text: "amber-900",
    },
    {
      name: "Salvia & Mint",
      primary: "emerald-600",
      secondary: "green-500",
      accent: "teal-300",
      background: "emerald-50",
      text: "emerald-900",
    },
  ],
  minimalist: [
    {
      name: "Ren Vit",
      primary: "gray-900",
      secondary: "gray-700",
      accent: "gray-500",
      background: "white",
      text: "gray-900",
    },
    {
      name: "Skandinavisk Grå",
      primary: "slate-800",
      secondary: "slate-600",
      accent: "slate-400",
      background: "slate-50",
      text: "slate-900",
    },
    {
      name: "Monokrom",
      primary: "neutral-900",
      secondary: "neutral-700",
      accent: "neutral-500",
      background: "neutral-50",
      text: "neutral-900",
    },
  ],
  garden: [
    {
      name: "Botanisk Grön",
      primary: "green-600",
      secondary: "lime-500",
      accent: "emerald-400",
      background: "green-50",
      text: "green-900",
    },
    {
      name: "Lavendelfält",
      primary: "violet-600",
      secondary: "purple-500",
      accent: "fuchsia-400",
      background: "violet-50",
      text: "violet-900",
    },
    {
      name: "Peach Blossom",
      primary: "orange-500",
      secondary: "pink-400",
      accent: "rose-300",
      background: "orange-50",
      text: "orange-900",
    },
  ],
  artdeco: [
    {
      name: "Gatsby Guld",
      primary: "yellow-600",
      secondary: "amber-700",
      accent: "yellow-500",
      background: "neutral-900",
      text: "yellow-600",
    },
    {
      name: "Smaragd & Guld",
      primary: "emerald-600",
      secondary: "yellow-600",
      accent: "teal-500",
      background: "neutral-900",
      text: "emerald-400",
    },
    {
      name: "Midnatt & Silver",
      primary: "slate-400",
      secondary: "gray-500",
      accent: "blue-400",
      background: "slate-900",
      text: "slate-200",
    },
  ],
  beach: [
    {
      name: "Havets Turkos",
      primary: "cyan-500",
      secondary: "teal-400",
      accent: "blue-300",
      background: "cyan-50",
      text: "cyan-900",
    },
    {
      name: "Korall & Sand",
      primary: "orange-400",
      secondary: "pink-300",
      accent: "amber-200",
      background: "orange-50",
      text: "orange-900",
    },
    {
      name: "Solnedgång vid Havet",
      primary: "purple-400",
      secondary: "pink-400",
      accent: "orange-300",
      background: "purple-50",
      text: "purple-900",
    },
  ],
  rustic: [
    {
      name: "Trä & Linne",
      primary: "amber-700",
      secondary: "amber-600",
      accent: "orange-500",
      background: "amber-50",
      text: "amber-900",
    },
    {
      name: "Skogsgrön",
      primary: "green-700",
      secondary: "emerald-600",
      accent: "lime-500",
      background: "green-50",
      text: "green-900",
    },
    {
      name: "Vintage Jeans",
      primary: "blue-700",
      secondary: "slate-600",
      accent: "blue-400",
      background: "blue-50",
      text: "blue-900",
    },
  ],
  whimsical: [
    {
      name: "Konfetti",
      primary: "pink-500",
      secondary: "purple-500",
      accent: "yellow-400",
      background: "pink-50",
      text: "pink-900",
    },
    {
      name: "Regnbåge",
      primary: "blue-500",
      secondary: "green-500",
      accent: "orange-400",
      background: "blue-50",
      text: "blue-900",
    },
    {
      name: "Drömsk Pastell",
      primary: "purple-300",
      secondary: "pink-300",
      accent: "blue-200",
      background: "purple-50",
      text: "purple-900",
    },
  ],
  cinematic: [
    {
      name: "Film Noir",
      primary: "gray-400",
      secondary: "gray-500",
      accent: "gray-300",
      background: "gray-900",
      text: "gray-50",
    },
    {
      name: "Golden Hour",
      primary: "amber-500",
      secondary: "orange-400",
      accent: "yellow-300",
      background: "neutral-900",
      text: "amber-50",
    },
    {
      name: "Blåtimmen",
      primary: "blue-300",
      secondary: "indigo-400",
      accent: "cyan-200",
      background: "slate-900",
      text: "blue-50",
    },
  ],
}

export const templates = [
  { id: "romantic", name: "Romantisk" },
  { id: "modern", name: "Modern" },
  { id: "vintage", name: "Vintage" },
  { id: "elegant", name: "Elegant" },
  { id: "bohemian", name: "Bohemisk" },
  { id: "minimalist", name: "Minimalistisk" },
  { id: "garden", name: "Trädgård" },
  { id: "artdeco", name: "Art Deco" },
  { id: "beach", name: "Strand" },
  { id: "rustic", name: "Lantlig" },
  { id: "whimsical", name: "Lekfull" },
  { id: "cinematic", name: "Filmisk" },
]

export type ColorPalette = {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export type WeddingData = {
  bride: string
  groom: string
  date: string
  time: string
  venue: string
  address: string
  dresscode: string
  story: string
  timeline: { time: string; event: string }[]
  gallery: { url: string; alt: string }[]
  faq: { question: string; answer: string }[]
  giftRegistry: string
  accommodation: string
  rsvpDeadline: string
  rsvpEmail: string
  rsvpMessage: string
}

export type SectionVisibility = {
  hero: boolean
  story: boolean
  details: boolean
  timeline: boolean
  gallery: boolean
  faq: boolean
  registry: boolean
  accommodation: boolean
  rsvp: boolean // Added RSVP section visibility
}

export const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

export type TemplateId = (typeof templates)[number]["id"]

export type EditorSnapshot = {
  weddingData: WeddingData
  sectionVisibility: SectionVisibility
  selectedTemplate: TemplateId
  selectedPalette: number
  uploadedImages: { [key: string]: string }
}

export type SiteSummary = {
  id: string
  slug: string
  draft: EditorSnapshot | null
  published: EditorSnapshot | null
  updated_at: string
  published_at: string | null
}

export type TemplateComponentProps = {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}

export function MinimalistTemplate({
  data,
  palette,
  sections,
  uploadedImages,
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-${palette.background} min-h-screen`}>
      {sections.hero && (
        <section className="relative min-h-screen flex items-center justify-center px-8 py-20">
          <div className="max-w-5xl w-full">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-4xl font-extralight tracking-tight">
                    {data.bride}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className={`h-px flex-1 bg-${palette.text}`}></div>
                    <span className="text-2xl font-light">&</span>
                    <div className={`h-px flex-1 bg-${palette.text}`}></div>
                  </div>
                  <h1 className="text-4xl md:text-4xl font-extralight tracking-tight text-right">
                    {data.groom}
                  </h1>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-sm tracking-widest uppercase text-gray-500">{data.date}</p>
                  <p className="text-sm tracking-widest uppercase text-gray-500">{data.venue}</p>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    size="lg"
                    className={`bg-${palette.primary} hover:bg-${palette.primary}/90 text-white px-12 py-6 text-sm tracking-widest uppercase`}
                  >
                    OSA
                  </Button>
                </div>
              </div>
              <div className="relative h-[600px] overflow-hidden">
                <img
                  src={uploadedImages["hero"] || data.gallery[0]?.url || "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg"}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.story && (
        <section className="py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <div className={`w-20 h-px bg-${palette.text} mb-6`}></div>
            <h2 className="text-4xl font-extralight mb-6 tracking-tight">Vår Historia</h2>
            <p className="text-lg leading-loose font-light text-gray-600">{data.story}</p>
          </div>
        </section>
      )}

      {sections.details && (
        <section className="py-16 px-8 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className={`w-12 h-px bg-${palette.text}`}></div>
                <h3 className="text-xs tracking-widest uppercase text-gray-500">När</h3>
                <p className="text-2xl font-light">{data.date}</p>
                <p className="text-lg font-light text-gray-600">{data.time}</p>
              </div>
              <div className="space-y-4">
                <div className={`w-12 h-px bg-${palette.text}`}></div>
                <h3 className="text-xs tracking-widest uppercase text-gray-500">Var</h3>
                <p className="text-2xl font-light">{data.venue}</p>
                <p className="text-lg font-light text-gray-600">{data.address}</p>
              </div>
              <div className="space-y-4">
                <div className={`w-12 h-px bg-${palette.text}`}></div>
                <h3 className="text-xs tracking-widest uppercase text-gray-500">Klädkod</h3>
                <p className="text-2xl font-light">{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className="py-16 px-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className={`w-20 h-px bg-${palette.text} mb-6`}></div>
            <h2 className="text-4xl font-extralight mb-8 tracking-tight">Tidslinje</h2>
            <div className="space-y-1">
              {data.timeline.map((item, index) => (
                <div key={index} className="grid grid-cols-[120px,1fr] gap-8 py-6 border-b border-gray-100 last:border-0">
                  <div className="text-sm tracking-widest uppercase text-gray-500">{item.time}</div>
                  <div className="text-xl font-light">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className="py-16 px-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className={`w-20 h-px bg-${palette.text} mb-6`}></div>
            <h2 className="text-4xl font-extralight mb-8 tracking-tight">Galleri</h2>
            <div className="grid md:grid-cols-3 gap-1">
              {data.gallery.map((photo, index) => (
                <div key={index} className="aspect-square overflow-hidden">
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.faq && (
        <section className="py-16 px-8 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className={`w-20 h-px bg-${palette.text} mb-6`}></div>
            <h2 className="text-4xl font-extralight mb-8 tracking-tight">Vanliga Frågor</h2>
            <div className="space-y-8">
              {data.faq.map((item, index) => (
                <div key={index} className="pb-8 border-b border-gray-100 last:border-0">
                  <h3 className="text-xl font-light mb-4">{item.question}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.registry && (
        <section className="py-16 px-8 border-t border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`w-20 h-px bg-${palette.text} mx-auto mb-6`}></div>
            <h2 className="text-4xl font-extralight mb-6 tracking-tight">Önskelista</h2>
            <p className="text-lg font-light text-gray-600 leading-relaxed">{data.giftRegistry}</p>
          </div>
        </section>
      )}

      {sections.accommodation && (
        <section className="py-16 px-8 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className={`w-20 h-px bg-${palette.text} mb-6`}></div>
            <h2 className="text-4xl font-extralight mb-6 tracking-tight">Boende</h2>
            <p className="text-lg font-light text-gray-600 leading-relaxed">{data.accommodation}</p>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className="py-16 px-8 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className={`w-20 h-px bg-${palette.text} mb-6`}></div>
            <h2 className="text-4xl font-extralight mb-6 tracking-tight">OSA</h2>
            <p className="text-center mb-6 font-light text-gray-600">{data.rsvpMessage}</p>
            {siteId ? (
              <RSVPForm
                siteId={siteId}
                deadline={data.rsvpDeadline}
                palette={{
                  primary: '#B26D4A',
                  secondary: '#A25D3B',
                  accent: '#F3D4C2',
                }}
              />
            ) : (
              <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#F3D4C2' }}>
                <p style={{ color: '#1F1C14' }}>OSA-formuläret visas här när sidan är publicerad</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export function GardenTemplate({
  data,
  palette,
  sections,
  uploadedImages,
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-serif text-${palette.text} bg-gradient-to-b from-${palette.background} via-white to-${palette.background} min-h-screen`}>
      {sections.hero && (
        <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-4xl">🌸</div>
            <div className="absolute bottom-20 right-20 text-4xl">🌿</div>
            <div className="absolute top-1/3 right-10 text-4xl">🌺</div>
            <div className="absolute bottom-1/4 left-20 text-4xl">🍃</div>
          </div>
          <div className="relative z-10 max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="text-4xl">🌷</div>
            </div>
            <h1 className="text-4xl md:text-4xl font-bold mb-6 text-balance" style={{ fontFamily: 'Georgia, serif' }}>
              {data.bride} & {data.groom}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`w-16 h-px bg-${palette.primary}`}></div>
              <p className="text-xl italic">Vårt bröllop</p>
              <div className={`w-16 h-px bg-${palette.primary}`}></div>
            </div>
            <p className="text-2xl mb-6 font-light">{data.date}</p>
            <Button
              size="lg"
              className={`bg-${palette.primary} hover:bg-${palette.primary}/90 text-white px-10 py-6 rounded-full text-lg shadow-lg`}
            >
              OSA Nu
            </Button>
          </div>
        </section>
      )}

      {sections.story && (
        <section className="py-24 px-8 relative">
          <div className="absolute top-0 left-0 text-4xl opacity-5">🌿</div>
          <div className="absolute bottom-0 right-0 text-4xl opacity-5">🌸</div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-6 text-4xl">💐</div>
            <h2 className={`text-4xl font-bold mb-8 text-${palette.primary}`}>Vår Kärlekshistoria</h2>
            <div className={`bg-white/80 p-8 rounded-3xl shadow-lg border-2 border-${palette.secondary}/20`}>
              <p className="text-xl leading-relaxed italic">{data.story}</p>
            </div>
          </div>
        </section>
      )}

      {sections.details && (
        <section className={`py-24 px-8 bg-gradient-to-r from-${palette.background}/30 to-${palette.background}/50`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.primary}`}>Bröllopsinformation</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`text-center bg-white p-10 rounded-3xl shadow-lg border-4 border-${palette.secondary}/20`}>
                <div className="text-4xl mb-4">🗓️</div>
                <h3 className="text-2xl font-bold mb-4">När</h3>
                <p className="text-lg font-medium">{data.date}</p>
                <p className="text-lg">{data.time}</p>
              </div>
              <div className={`text-center bg-white p-10 rounded-3xl shadow-lg border-4 border-${palette.secondary}/20`}>
                <div className="text-4xl mb-4">🏡</div>
                <h3 className="text-2xl font-bold mb-4">Var</h3>
                <p className="text-lg font-medium">{data.venue}</p>
                <p className="text-lg">{data.address}</p>
              </div>
              <div className={`text-center bg-white p-10 rounded-3xl shadow-lg border-4 border-${palette.secondary}/20`}>
                <div className="text-4xl mb-4">👔</div>
                <h3 className="text-2xl font-bold mb-4">Klädkod</h3>
                <p className="text-lg">{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">⏰</div>
              <h2 className={`text-4xl font-bold text-${palette.primary}`}>Dagens Program</h2>
            </div>
            <div className="space-y-6">
              {data.timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-6 bg-gradient-to-r from-white to-${palette.background}/20 p-8 rounded-3xl shadow-md border-l-4 border-${palette.primary}`}>
                  <div className="text-4xl">🌸</div>
                  <div className={`text-3xl font-bold text-${palette.primary} min-w-[120px]`}>{item.time}</div>
                  <div className="text-xl font-medium">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className={`py-24 px-8 bg-gradient-to-r from-${palette.background}/30 to-${palette.background}/50`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">📸</div>
              <h2 className={`text-4xl font-bold text-${palette.primary}`}>Vårt Galleri</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.map((photo, index) => (
                <div key={index} className={`rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:scale-105 transition-transform`}>
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-72 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.faq && (
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">❓</div>
              <h2 className={`text-4xl font-bold text-${palette.primary}`}>Vanliga Frågor</h2>
            </div>
            <div className="space-y-6">
              {data.faq.map((item, index) => (
                <div key={index} className={`bg-white p-8 rounded-3xl shadow-lg border-l-4 border-${palette.primary}`}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span>🌺</span>
                    {item.question}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.registry && (
        <section className={`py-24 px-8 bg-gradient-to-r from-${palette.background}/30 to-${palette.background}/50`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-4xl mb-6">🎁</div>
            <h2 className={`text-4xl font-bold mb-8 text-${palette.primary}`}>Önskelista</h2>
            <div className={`bg-white p-8 rounded-3xl shadow-lg border-4 border-${palette.secondary}/20`}>
              <p className="text-xl leading-relaxed">{data.giftRegistry}</p>
            </div>
          </div>
        </section>
      )}

      {sections.accommodation && (
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🏨</div>
              <h2 className={`text-4xl font-bold text-${palette.primary}`}>Boende</h2>
            </div>
            <div className={`bg-white p-8 rounded-3xl shadow-lg border-4 border-${palette.secondary}/20`}>
              <p className="text-xl leading-relaxed">{data.accommodation}</p>
            </div>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className={`py-24 px-8 bg-gradient-to-r from-${palette.background}/30 to-${palette.background}/50`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">💌</div>
              <h2 className={`text-4xl font-bold text-${palette.primary}`}>OSA</h2>
            </div>
            <div className={`bg-white p-8 rounded-3xl shadow-lg border-4 border-${palette.secondary}/20`}>
              <p className="text-center mb-8 text-lg">{data.rsvpMessage}</p>
              {siteId ? (
                <RSVPForm
                  siteId={siteId}
                  deadline={data.rsvpDeadline}
                  palette={{
                    primary: '#B26D4A',
                    secondary: '#A25D3B',
                    accent: '#F3D4C2',
                  }}
                />
              ) : (
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#F3D4C2' }}>
                  <p style={{ color: '#1F1C14' }}>OSA-formuläret visas här när sidan är publicerad</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function ArtDecoTemplate({
  data,
  palette,
  sections,
  uploadedImages,
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-serif text-${palette.text} bg-${palette.background} min-h-screen`}>
      {sections.hero && (
        <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent"></div>
            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-5xl text-center">
            <div className="mb-8">
              <div className={`inline-block border-t-4 border-b-4 border-${palette.primary} py-6 px-12`}>
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div className={`w-20 h-px bg-${palette.primary}`}></div>
                  <div className={`w-3 h-3 bg-${palette.primary} rotate-45`}></div>
                  <div className={`w-20 h-px bg-${palette.primary}`}></div>
                </div>
                <h1 className="text-4xl md:text-4xl font-bold tracking-wider mb-4" style={{ fontFamily: 'Didot, Georgia, serif' }}>
                  {data.bride}
                </h1>
                <div className="flex items-center justify-center gap-8 my-6">
                  <div className={`w-24 h-px bg-${palette.secondary}`}></div>
                  <span className="text-4xl font-light">&</span>
                  <div className={`w-24 h-px bg-${palette.secondary}`}></div>
                </div>
                <h1 className="text-4xl md:text-4xl font-bold tracking-wider mb-6" style={{ fontFamily: 'Didot, Georgia, serif' }}>
                  {data.groom}
                </h1>
                <div className="flex items-center justify-center gap-8">
                  <div className={`w-20 h-px bg-${palette.primary}`}></div>
                  <div className={`w-3 h-3 bg-${palette.primary} rotate-45`}></div>
                  <div className={`w-20 h-px bg-${palette.primary}`}></div>
                </div>
              </div>
            </div>
            <p className={`text-2xl tracking-widest uppercase mb-6 text-${palette.accent}`}>{data.date}</p>
            <Button
              size="lg"
              className={`bg-${palette.primary} hover:bg-${palette.primary}/90 text-${palette.background} px-16 py-8 text-lg tracking-widest uppercase font-bold border-2 border-${palette.secondary}`}
            >
              OSA
            </Button>
          </div>
        </section>
      )}

      {sections.story && (
        <section className={`py-16 px-8 border-t-4 border-b-4 border-${palette.primary}/30`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>VÅR HISTORIA</h2>
            <div className={`border-4 border-${palette.primary}/30 p-8 relative`}>
              <p className="text-xl leading-relaxed font-light tracking-wide">{data.story}</p>
            </div>
          </div>
        </section>
      )}

      {sections.details && (
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-10 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>INFORMATION</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`text-center border-4 border-${palette.primary}/30 p-8 relative`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-${palette.background} flex items-center justify-center`}>
                  <div className={`w-12 h-12 border-4 border-${palette.primary} rotate-45`}></div>
                </div>
                <h3 className="text-sm tracking-widest uppercase mb-6 mt-4 text-gray-400">När</h3>
                <p className="text-2xl font-bold mb-2">{data.date}</p>
                <p className="text-xl font-light">{data.time}</p>
              </div>
              <div className={`text-center border-4 border-${palette.primary}/30 p-8 relative`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-${palette.background} flex items-center justify-center`}>
                  <div className={`w-12 h-12 border-4 border-${palette.primary} rotate-45`}></div>
                </div>
                <h3 className="text-sm tracking-widest uppercase mb-6 mt-4 text-gray-400">Var</h3>
                <p className="text-2xl font-bold mb-2">{data.venue}</p>
                <p className="text-xl font-light">{data.address}</p>
              </div>
              <div className={`text-center border-4 border-${palette.primary}/30 p-8 relative`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-${palette.background} flex items-center justify-center`}>
                  <div className={`w-12 h-12 border-4 border-${palette.primary} rotate-45`}></div>
                </div>
                <h3 className="text-sm tracking-widest uppercase mb-6 mt-4 text-gray-400">Klädkod</h3>
                <p className="text-2xl font-bold">{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className={`py-16 px-8 border-t-4 border-b-4 border-${palette.primary}/30`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-10 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>TIDSLINJE</h2>
            <div className="space-y-8">
              {data.timeline.map((item, index) => (
                <div key={index} className={`border-l-4 border-${palette.primary} pl-12 py-6 relative`}>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-${palette.primary} rotate-45`}></div>
                  <div className="flex items-center gap-8">
                    <div className="text-3xl font-bold tracking-wider min-w-[140px]">{item.time}</div>
                    <div className="text-2xl font-light tracking-wide">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-10 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>GALLERI</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.gallery.map((photo, index) => (
                <div key={index} className={`border-4 border-${palette.primary}/30 p-2 relative group`}>
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500 -mt-px -ml-px"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500 -mt-px -mr-px"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500 -mb-px -ml-px"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500 -mb-px -mr-px"></div>
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.faq && (
        <section className={`py-16 px-8 border-t-4 border-b-4 border-${palette.primary}/30`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-10 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>FRÅGOR</h2>
            <div className="space-y-10">
              {data.faq.map((item, index) => (
                <div key={index} className={`border-4 border-${palette.primary}/30 p-10`}>
                  <h3 className="text-2xl font-bold mb-6 tracking-wide uppercase">{item.question}</h3>
                  <p className="text-lg font-light leading-relaxed tracking-wide">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.registry && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>ÖNSKELISTA</h2>
            <div className={`border-4 border-${palette.primary}/30 p-10`}>
              <p className="text-xl font-light leading-relaxed tracking-wide">{data.giftRegistry}</p>
            </div>
          </div>
        </section>
      )}

      {sections.accommodation && (
        <section className={`py-16 px-8 border-t-4 border-b-4 border-${palette.primary}/30`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-6 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>BOENDE</h2>
            <div className={`border-4 border-${palette.primary}/30 p-10`}>
              <p className="text-xl font-light leading-relaxed tracking-wide">{data.accommodation}</p>
            </div>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className="py-16 px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
              <div className={`w-4 h-4 bg-${palette.primary} rotate-45`}></div>
              <div className={`w-32 h-px bg-${palette.primary}`}></div>
            </div>
            <h2 className="text-4xl font-bold text-center mb-6 tracking-wide" style={{ fontFamily: 'Didot, Georgia, serif' }}>OSA</h2>
            <div className={`border-4 border-${palette.primary}/30 p-8`}>
              <p className="text-center mb-6 text-lg font-light tracking-wide">{data.rsvpMessage}</p>
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Label className="text-xs tracking-widest uppercase font-bold">Förnamn</Label>
                    <Input className="mt-2 border-2 border-gray-600 rounded-none bg-transparent" />
                  </div>
                  <div>
                    <Label className="text-xs tracking-widest uppercase font-bold">Efternamn</Label>
                    <Input className="mt-2 border-2 border-gray-600 rounded-none bg-transparent" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs tracking-widest uppercase font-bold">E-post</Label>
                  <Input type="email" className="mt-2 border-2 border-gray-600 rounded-none bg-transparent" />
                </div>
                <div>
                  <Label className="text-xs tracking-widest uppercase font-bold">Kommer du?</Label>
                  <Select>
                    <SelectTrigger className="mt-2 border-2 border-gray-600 rounded-none bg-transparent">
                      <SelectValue placeholder="Välj svar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Ja, jag kommer</SelectItem>
                      <SelectItem value="no">Nej, jag kan tyvärr inte komma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs tracking-widest uppercase font-bold">Antal gäster</Label>
                  <Select>
                    <SelectTrigger className="mt-2 border-2 border-gray-600 rounded-none bg-transparent">
                      <SelectValue placeholder="Välj antal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 personer</SelectItem>
                      <SelectItem value="3">3 personer</SelectItem>
                      <SelectItem value="4">4 personer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs tracking-widest uppercase font-bold">Specialkost/Allergier</Label>
                  <Textarea
                    className="mt-2 border-2 border-gray-600 rounded-none bg-transparent resize-none"
                    placeholder="Berätta om eventuella allergier eller specialkost..."
                  />
                </div>
                <div>
                  <Label className="text-xs tracking-widest uppercase font-bold">Meddelande</Label>
                  <Textarea
                    className="mt-2 border-2 border-gray-600 rounded-none bg-transparent resize-none"
                    placeholder="Skriv ett meddelande till oss..."
                  />
                </div>
                <div className="pt-8">
                  <Button className={`w-full bg-${palette.primary} hover:bg-${palette.primary}/90 text-${palette.background} py-8 text-sm tracking-widest uppercase font-bold border-2 border-${palette.secondary}`}>
                    SKICKA OSA
                  </Button>
                </div>
              </form>
              <p className="text-center text-xs tracking-widest uppercase text-gray-400 mt-8">
                Sista datum: {data.rsvpDeadline}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function BeachTemplate({
  data,
  palette,
  sections,
  uploadedImages,
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-gradient-to-b from-${palette.background} via-white to-${palette.background} min-h-screen`}>
      {sections.hero && (
        <section className="relative h-screen flex items-center justify-center text-center px-8 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${uploadedImages["hero"] || data.gallery[0]?.url || "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg"})`,
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-b from-${palette.primary}/20 via-${palette.secondary}/30 to-${palette.accent}/40`}></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          <div className="relative z-10 max-w-5xl text-white animate-in fade-in duration-1000">
            <div className="mb-8">
              <svg className="w-20 h-20 mx-auto mb-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h1 className="text-4xl md:text-4xl font-light mb-6 tracking-wide" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                {data.bride}
              </h1>
              <div className="flex items-center justify-center gap-8 my-8">
                <div className="w-24 h-px bg-white/60"></div>
                <svg className={`w-8 h-8 text-${palette.accent}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <div className="w-24 h-px bg-white/60"></div>
              </div>
              <h1 className="text-4xl md:text-4xl font-light mb-6 tracking-wide" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                {data.groom}
              </h1>
            </div>
            <div className="backdrop-blur-md bg-white/20 inline-block px-12 py-6 rounded-full border border-white/40 mb-8">
              <p className="text-2xl font-light tracking-wider">{data.date}</p>
            </div>
            <p className="text-xl mb-6 font-light tracking-wide">{data.venue}</p>
            <Button size="lg" className={`bg-white hover:bg-white/90 text-${palette.primary} px-16 py-7 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300`}>
              OSA Nu
            </Button>
          </div>
        </section>
      )}

      {sections.story && (
        <section className={`py-16 px-8 bg-gradient-to-b from-white to-${palette.background}`}>
          <div className="max-w-5xl mx-auto text-center">
            <svg className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <h2 className={`text-4xl md:text-4xl font-light text-${palette.text} mb-8`}>Vår Kärleksresa</h2>
            <div className={`bg-${palette.background} p-8 md:p-10 rounded-3xl shadow-xl border-2 border-${palette.primary}/20 max-w-4xl mx-auto`}>
              <p className={`text-xl md:text-2xl leading-relaxed text-${palette.text}/90 font-light`}>{data.story}</p>
            </div>
          </div>
        </section>
      )}

      {sections.details && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-4xl font-light text-center mb-10 text-${palette.text}`}>Information</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className={`group text-center bg-gradient-to-br from-${palette.background} to-${palette.primary}/10 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                <Calendar className={`w-16 h-16 mx-auto mb-6 text-${palette.primary} group-hover:scale-110 transition-transform`} />
                <h3 className={`text-2xl font-semibold mb-4 text-${palette.text}`}>När</h3>
                <p className={`text-lg font-medium text-${palette.primary} mb-2`}>{data.date}</p>
                <p className={`text-${palette.text}/60`}>{data.time}</p>
              </div>
              <div className={`group text-center bg-gradient-to-br from-${palette.background} to-${palette.secondary}/10 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                <MapPin className={`w-16 h-16 mx-auto mb-6 text-${palette.primary} group-hover:scale-110 transition-transform`} />
                <h3 className={`text-2xl font-semibold mb-4 text-${palette.text}`}>Var</h3>
                <p className={`text-lg font-medium text-${palette.primary} mb-2`}>{data.venue}</p>
                <p className={`text-${palette.text}/60`}>{data.address}</p>
              </div>
              <div className={`group text-center bg-gradient-to-br from-${palette.background} to-${palette.accent}/10 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                <Users className={`w-16 h-16 mx-auto mb-6 text-${palette.primary} group-hover:scale-110 transition-transform`} />
                <h3 className={`text-2xl font-semibold mb-4 text-${palette.text}`}>Klädkod</h3>
                <p className={`text-lg text-${palette.primary} font-medium`}>{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className={`py-16 px-8 bg-gradient-to-b from-${palette.background} to-white`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Clock className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <h2 className={`text-4xl font-light text-${palette.text}`}>Dagens Program</h2>
            </div>
            <div className="space-y-8">
              {data.timeline.map((item, index) => (
                <div key={index} className={`flex items-start gap-8 bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all border-l-4 border-${palette.primary}`}>
                  <div className={`w-32 text-3xl font-semibold text-${palette.primary} text-right`}>{item.time}</div>
                  <div className={`w-6 h-6 rounded-full bg-${palette.primary} mt-1`}></div>
                  <div className={`flex-1 text-xl text-${palette.text}`}>{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <Camera className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <h2 className={`text-4xl font-light text-${palette.text}`}>Galleri</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {data.gallery.map((photo, index) => (
                <div key={index} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${palette.primary}/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function RusticTemplate({
  data,
  palette,
  sections,
  uploadedImages,
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-${palette.background} min-h-screen`}>
      {/* Hero Section */}
      {sections.hero && (
        <section className="relative h-screen flex items-center justify-center text-center px-8 overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${uploadedImages["hero"] || "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg"})`,
            }}
          >
            {/* Warm sepia overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-orange-800/50 to-amber-950/60"></div>
          </div>

          {/* Wood texture overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(101, 67, 33, 0.1) 2px, rgba(101, 67, 33, 0.1) 4px)`,
                backgroundSize: "4px 100%",
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl text-white animate-in fade-in duration-1000">
            {/* Decorative rope divider top */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="w-32 h-1 bg-amber-300/60 rounded-full"></div>
              <div className="text-4xl text-amber-200">❋</div>
              <div className="w-32 h-1 bg-amber-300/60 rounded-full"></div>
            </div>

            <h1
              className="text-4xl md:text-4xl font-light mb-6 tracking-wider"
              style={{
                fontFamily: "Georgia, serif",
                textShadow: "2px 2px 8px rgba(0,0,0,0.6), 0 0 20px rgba(101, 67, 33, 0.4)",
              }}
            >
              {data.bride}
            </h1>

            <div className="text-4xl font-light my-8 text-amber-100">&</div>

            <h1
              className="text-4xl md:text-4xl font-light mb-6 tracking-wider"
              style={{
                fontFamily: "Georgia, serif",
                textShadow: "2px 2px 8px rgba(0,0,0,0.6), 0 0 20px rgba(101, 67, 33, 0.4)",
              }}
            >
              {data.groom}
            </h1>

            {/* Wood plank style date */}
            <div className="inline-block px-12 py-6 bg-amber-800/70 backdrop-blur-sm border-2 border-amber-400/40 shadow-2xl mb-4 relative">
              <div className="absolute inset-0 opacity-20">
                <div
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.1) 3px, rgba(0, 0, 0, 0.1) 6px)`,
                  }}
                  className="w-full h-full"
                ></div>
              </div>
              <p className="text-2xl font-light tracking-widest relative z-10">{data.date}</p>
            </div>

            {data.venue && (
              <p className="text-xl md:text-2xl mb-6 italic font-light text-amber-100">{data.venue}</p>
            )}

            {/* Decorative rope divider bottom */}
            <div className="flex items-center justify-center gap-8 mb-10">
              <div className="w-32 h-1 bg-amber-300/60 rounded-full"></div>
              <div className="text-4xl text-amber-200">❋</div>
              <div className="w-32 h-1 bg-amber-300/60 rounded-full"></div>
            </div>

            <Button
              className={`bg-amber-700 hover:bg-amber-600 text-white px-16 py-7 rounded-sm text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-amber-400/40`}
            >
              OSA Nu
            </Button>
          </div>
        </section>
      )}

      {/* Story Section */}
      {sections.story && (
        <section className="py-16 px-8 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
                <div className={`text-4xl text-${palette.primary}`}>❋</div>
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
              </div>
              <h2 className={`text-4xl md:text-4xl font-light text-${palette.text} mb-4`} style={{ fontFamily: "Georgia, serif" }}>
                Vår Historia
              </h2>
              <p className={`text-sm uppercase tracking-widest text-${palette.text}/60`}>Där allt började...</p>
            </div>

            {/* Burlap texture card */}
            <div className={`bg-orange-50/80 backdrop-blur-sm p-8 md:p-10 shadow-xl border border-${palette.primary}/20 relative`}>
              <div className="absolute inset-0 opacity-5">
                <div
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(101, 67, 33, 0.1) 2px, rgba(101, 67, 33, 0.1) 4px)`,
                    backgroundSize: "10px 10px",
                  }}
                  className="w-full h-full"
                ></div>
              </div>
              <p className={`text-xl md:text-2xl leading-relaxed text-${palette.text}/90 font-light relative z-10`} style={{ lineHeight: 1.9 }}>
                {data.story}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Details Section */}
      {sections.details && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`text-4xl md:text-4xl font-light text-${palette.text} mb-4`} style={{ fontFamily: "Georgia, serif" }}>
                Information
              </h2>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
                <div className={`text-4xl text-${palette.primary}`}>❋</div>
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Date Card */}
              <div
                className={`group text-center bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-${palette.primary}/20 relative`}
              >
                <div className="absolute inset-0 opacity-5">
                  <div
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(101, 67, 33, 0.1) 3px, rgba(101, 67, 33, 0.1) 6px)`,
                    }}
                    className="w-full h-full"
                  ></div>
                </div>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${palette.primary}/10 flex items-center justify-center relative z-10`}>
                  <Calendar className={`w-10 h-10 text-${palette.primary} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className={`text-2xl font-semibold mb-4 text-${palette.text} relative z-10`} style={{ fontFamily: "Georgia, serif" }}>
                  Datum
                </h3>
                <p className={`text-xl text-${palette.primary} font-light mb-2 relative z-10`}>{data.date}</p>
                <p className={`text-lg text-${palette.text}/70 relative z-10`}>{data.time}</p>
              </div>

              {/* Location Card */}
              <div
                className={`group text-center bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-${palette.primary}/20 relative`}
              >
                <div className="absolute inset-0 opacity-5">
                  <div
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(101, 67, 33, 0.1) 3px, rgba(101, 67, 33, 0.1) 6px)`,
                    }}
                    className="w-full h-full"
                  ></div>
                </div>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${palette.primary}/10 flex items-center justify-center relative z-10`}>
                  <MapPin className={`w-10 h-10 text-${palette.primary} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className={`text-2xl font-semibold mb-4 text-${palette.text} relative z-10`} style={{ fontFamily: "Georgia, serif" }}>
                  Plats
                </h3>
                <p className={`text-xl text-${palette.primary} font-light mb-2 relative z-10`}>{data.venue}</p>
                <p className={`text-lg text-${palette.text}/70 relative z-10`}>{data.address}</p>
              </div>

              {/* Dresscode Card */}
              <div
                className={`group text-center bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-${palette.primary}/20 relative`}
              >
                <div className="absolute inset-0 opacity-5">
                  <div
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(101, 67, 33, 0.1) 3px, rgba(101, 67, 33, 0.1) 6px)`,
                    }}
                    className="w-full h-full"
                  ></div>
                </div>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${palette.primary}/10 flex items-center justify-center relative z-10`}>
                  <Shirt className={`w-10 h-10 text-${palette.primary} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className={`text-2xl font-semibold mb-4 text-${palette.text} relative z-10`} style={{ fontFamily: "Georgia, serif" }}>
                  Klädkod
                </h3>
                <p className={`text-xl text-${palette.primary} font-light relative z-10`}>{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {sections.timeline && (
        <section className="py-16 px-8 bg-gradient-to-b from-amber-50 to-orange-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`text-4xl md:text-4xl font-light text-${palette.text} mb-4`} style={{ fontFamily: "Georgia, serif" }}>
                Tidslinje
              </h2>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
                <div className={`text-4xl text-${palette.primary}`}>❋</div>
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
              </div>
            </div>

            <div className="relative">
              {/* Rope-style connecting line */}
              <div
                className={`absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-${palette.primary}/20 via-${palette.primary} to-${palette.primary}/20 rounded-full`}
              ></div>

              <div className="space-y-12">
                {data.timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-8 group">
                    {/* Time badge */}
                    <div
                      className={`text-3xl font-bold text-${palette.primary} w-24 text-right`}
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {item.time}
                    </div>

                    {/* Marker with barn star */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-6 h-6 rounded-full bg-${palette.primary} border-4 border-amber-50 shadow-lg z-10 relative group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <div
                        className={`absolute inset-0 rounded-full bg-${palette.primary} animate-ping opacity-30 group-hover:opacity-50`}
                      ></div>
                    </div>

                    {/* Event card with wood texture */}
                    <div
                      className={`flex-1 bg-white/90 backdrop-blur-sm p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-${palette.primary}/20 relative group-hover:border-${palette.primary}/40`}
                    >
                      <div className="absolute inset-0 opacity-5">
                        <div
                          style={{
                            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(101, 67, 33, 0.05) 2px, rgba(101, 67, 33, 0.05) 4px)`,
                          }}
                          className="w-full h-full"
                        ></div>
                      </div>
                      <p className={`text-xl text-${palette.text} font-light relative z-10`}>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {sections.gallery && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`text-4xl md:text-4xl font-light text-${palette.text} mb-4`} style={{ fontFamily: "Georgia, serif" }}>
                Galleri
              </h2>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
                <div className={`text-4xl text-${palette.primary}`}>❋</div>
                <div className={`w-24 h-px bg-${palette.primary}`}></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {data.gallery.map((photo, index) => (
                <div
                  key={index}
                  className={`group relative aspect-square overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-amber-100`}
                >
                  <img
                    src={uploadedImages[`gallery-${index}`] || photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 sepia-[0.15]"
                  />

                  {/* Decorative corner overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-${palette.primary}`}></div>
                    <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-${palette.primary}`}></div>
                    <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-${palette.primary}`}></div>
                    <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-${palette.primary}`}></div>
                  </div>

                  {/* Star icon on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-${palette.primary}/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center`}
                  >
                    <div className="text-4xl text-white">❋</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function WhimsicalTemplate({
  data,
  palette,
  sections,
  uploadedImages,
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-gradient-to-br from-${palette.background} via-purple-50 to-yellow-50 min-h-screen`}>
      {/* Hero Section */}
      {sections.hero && (
        <section className="relative h-screen flex items-center justify-center text-center px-8 overflow-hidden">
          {/* Playful floating shapes background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300/30 rounded-full animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-purple-300/30 rounded-full animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "4s" }}></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-300/30 rounded-full animate-bounce" style={{ animationDelay: "1s", animationDuration: "3.5s" }}></div>
            <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-300/30 rounded-full animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}></div>
            <div className="absolute top-1/3 right-10 w-36 h-36 bg-green-300/30 rounded-full animate-bounce" style={{ animationDelay: "2s", animationDuration: "3.8s" }}></div>
          </div>

          {/* Background image with colorful overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${uploadedImages["hero"] || "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg"})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-400/60 via-purple-400/50 to-yellow-400/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl text-white animate-in fade-in zoom-in duration-1000">
            {/* Confetti hearts */}
            <div className="flex justify-center gap-4 mb-8 animate-pulse">
              <span className="text-4xl">💕</span>
              <span className="text-4xl">✨</span>
              <span className="text-4xl">💖</span>
              <span className="text-4xl">✨</span>
              <span className="text-4xl">💕</span>
            </div>

            <h1
              className="text-4xl md:text-4xl font-bold mb-6 tracking-tight"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                textShadow: "4px 4px 0px rgba(255, 105, 180, 0.6), 8px 8px 0px rgba(138, 43, 226, 0.4)",
              }}
            >
              {data.bride}
            </h1>

            <div className="text-4xl font-bold my-8 animate-pulse">💗</div>

            <h1
              className="text-4xl md:text-4xl font-bold mb-6 tracking-tight"
              style={{
                fontFamily: "Comic Sans MS, cursive, sans-serif",
                textShadow: "4px 4px 0px rgba(255, 105, 180, 0.6), 8px 8px 0px rgba(138, 43, 226, 0.4)",
              }}
            >
              {data.groom}
            </h1>

            {/* Playful date badge */}
            <div className="inline-block px-12 py-6 bg-white/90 backdrop-blur-md rounded-full border-4 border-dashed border-pink-400 shadow-2xl mb-4 transform hover:rotate-3 transition-transform">
              <p className={`text-2xl font-bold tracking-wide text-${palette.primary}`} style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {data.date}
              </p>
            </div>

            {data.venue && (
              <p className="text-xl md:text-2xl mb-6 font-bold text-yellow-200" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                📍 {data.venue}
              </p>
            )}

            {/* Rainbow sparkles */}
            <div className="flex justify-center gap-3 mb-10">
              <span className="text-3xl animate-spin" style={{ animationDuration: "3s" }}>🌟</span>
              <span className="text-3xl animate-spin" style={{ animationDuration: "4s" }}>⭐</span>
              <span className="text-3xl animate-spin" style={{ animationDuration: "3.5s" }}>✨</span>
              <span className="text-3xl animate-spin" style={{ animationDuration: "4.5s" }}>💫</span>
            </div>

            <Button
              className={`bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 hover:from-pink-600 hover:via-purple-600 hover:to-yellow-600 text-white px-16 py-7 rounded-full text-xl font-bold shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white`}
            >
              OSA Nu! 🎉
            </Button>
          </div>
        </section>
      )}

      {/* Story Section */}
      {sections.story && (
        <section className="py-16 px-8 bg-gradient-to-b from-pink-50 via-purple-50 to-yellow-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="flex justify-center gap-4 mb-6">
                <span className="text-4xl">💕</span>
                <span className="text-4xl">🌈</span>
                <span className="text-4xl">💕</span>
              </div>
              <h2
                className={`text-4xl md:text-4xl font-bold text-${palette.primary} mb-4`}
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Vår Historia
              </h2>
              <p className={`text-lg font-bold tracking-wider text-${palette.secondary}`} style={{ fontFamily: "Comic Sans MS, cursive" }}>
                ✨ En magisk kärleksresa ✨
              </p>
            </div>

            {/* Playful story card */}
            <div className={`bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border-4 border-dashed border-${palette.primary} relative transform hover:rotate-1 transition-transform`}>
              {/* Corner decorations */}
              <div className="absolute -top-6 -left-6 text-4xl">🎈</div>
              <div className="absolute -top-6 -right-6 text-4xl">🎊</div>
              <div className="absolute -bottom-6 -left-6 text-4xl">🎁</div>
              <div className="absolute -bottom-6 -right-6 text-4xl">🎀</div>

              <p
                className={`text-xl md:text-2xl leading-relaxed text-${palette.text} font-medium relative z-10`}
                style={{ lineHeight: 2, fontFamily: "Comic Sans MS, cursive" }}
              >
                {data.story}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Details Section */}
      {sections.details && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className={`text-4xl md:text-4xl font-bold text-${palette.text} mb-4`}
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Information
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <span className="text-4xl">🎪</span>
                <span className="text-4xl">🎨</span>
                <span className="text-4xl">🎭</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Date Card */}
              <div
                className={`group text-center bg-gradient-to-br from-pink-100 to-pink-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 hover:rotate-3 border-4 border-${palette.primary}`}
              >
                <div className="text-4xl mb-6 group-hover:scale-125 group-hover:animate-bounce transition-transform">📅</div>
                <h3
                  className={`text-2xl font-bold mb-4 text-${palette.text}`}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Datum
                </h3>
                <p className={`text-xl text-${palette.primary} font-bold mb-2`}>{data.date}</p>
                <p className={`text-lg text-${palette.text}/70 font-semibold`}>{data.time}</p>
              </div>

              {/* Location Card */}
              <div
                className={`group text-center bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 hover:-rotate-3 border-4 border-${palette.secondary}`}
              >
                <div className="text-4xl mb-6 group-hover:scale-125 group-hover:animate-bounce transition-transform">📍</div>
                <h3
                  className={`text-2xl font-bold mb-4 text-${palette.text}`}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Plats
                </h3>
                <p className={`text-xl text-${palette.secondary} font-bold mb-2`}>{data.venue}</p>
                <p className={`text-lg text-${palette.text}/70 font-semibold`}>{data.address}</p>
              </div>

              {/* Dresscode Card */}
              <div
                className={`group text-center bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 hover:rotate-3 border-4 border-${palette.accent}`}
              >
                <div className="text-4xl mb-6 group-hover:scale-125 group-hover:animate-bounce transition-transform">👗</div>
                <h3
                  className={`text-2xl font-bold mb-4 text-${palette.text}`}
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Klädkod
                </h3>
                <p className={`text-xl text-${palette.accent} font-bold`}>{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {sections.timeline && (
        <section className="py-16 px-8 bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className={`text-4xl md:text-4xl font-bold text-${palette.text} mb-4`}
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Tidslinje
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <span className="text-4xl animate-pulse">⏰</span>
                <span className="text-4xl animate-pulse" style={{ animationDelay: "0.5s" }}>🎉</span>
                <span className="text-4xl animate-pulse" style={{ animationDelay: "1s" }}>⏰</span>
              </div>
            </div>

            <div className="space-y-8">
              {data.timeline.map((item, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-6 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-4 border-dashed border-${[
                    "pink-400",
                    "purple-400",
                    "yellow-400",
                    "blue-400",
                    "green-400",
                  ][index % 5]}`}
                  style={{ transform: index % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)" }}
                >
                  {/* Colorful emoji badges */}
                  <div className="text-4xl group-hover:scale-125 group-hover:animate-bounce transition-transform">
                    {["🎊", "💒", "📸", "🍽️", "💃"][index % 5]}
                  </div>

                  {/* Time badge */}
                  <div
                    className={`px-6 py-3 bg-gradient-to-r from-${palette.primary} to-${palette.secondary} text-white rounded-full font-bold text-xl shadow-lg`}
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    {item.time}
                  </div>

                  {/* Event text */}
                  <p
                    className={`flex-1 text-xl text-${palette.text} font-semibold`}
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    {item.event}
                  </p>

                  {/* Sparkle */}
                  <div className="text-3xl animate-spin group-hover:scale-125" style={{ animationDuration: "3s" }}>
                    ✨
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {sections.gallery && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className={`text-4xl md:text-4xl font-bold text-${palette.text} mb-4`}
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                Galleri
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <span className="text-4xl">📷</span>
                <span className="text-4xl">🎨</span>
                <span className="text-4xl">🖼️</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {data.gallery.map((photo, index) => (
                <div
                  key={index}
                  className={`group relative aspect-square overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-8 border-${
                    ["pink-300", "purple-300", "yellow-300"][index % 3]
                  } hover:-translate-y-4 hover:rotate-3`}
                  style={{ transform: index % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)" }}
                >
                  <img
                    src={uploadedImages[`gallery-${index}`] || photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Playful overlay with hearts and stars */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/90 via-purple-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="flex gap-4">
                      <span className="text-4xl animate-bounce">💕</span>
                      <span className="text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>✨</span>
                      <span className="text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>💖</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function CinematicTemplate({
  data,
  palette,
  sections,
  uploadedImages,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-${palette.background} min-h-screen`}>
      {/* Hero Section - Full Bleed Cinematic */}
      {sections.hero && (
        <section className="relative h-screen flex items-end px-12 pb-20 overflow-hidden">
          {/* Full-bleed background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${uploadedImages["hero"] || "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg"})`,
            }}
          >
            {/* Dramatic dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          </div>

          {/* Film grain texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Cinematic content - minimal, editorial */}
          <div className="relative z-10 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="mb-8">
              <div className={`w-12 h-px bg-${palette.primary} mb-6`}></div>
            </div>

            <h1
              className={`text-4xl md:text-4xl font-thin mb-4 tracking-wider text-${palette.text}`}
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {data.bride}
            </h1>

            <div className={`text-2xl font-thin tracking-[0.4em] mb-4 text-${palette.text}/70`}>×</div>

            <h1
              className={`text-4xl md:text-4xl font-thin mb-6 tracking-wider text-${palette.text}`}
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {data.groom}
            </h1>

            <div className={`flex items-center gap-8 text-${palette.text}/90`}>
              <div>
                <p className="text-sm uppercase tracking-widest mb-2 opacity-60">Datum</p>
                <p className="text-xl font-light">{data.date}</p>
              </div>
              <div className={`w-px h-12 bg-${palette.text}/30`}></div>
              <div>
                <p className="text-sm uppercase tracking-widest mb-2 opacity-60">Plats</p>
                <p className="text-xl font-light">{data.venue}</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60">
            <div className="text-xs uppercase tracking-widest mb-2">Scroll</div>
            <div className="w-px h-16 bg-white/40 mx-auto animate-pulse"></div>
          </div>
        </section>
      )}

      {/* Story Section - Magazine Layout */}
      {sections.story && (
        <section className={`py-16 px-8 bg-${palette.background}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Large pull quote */}
              <div>
                <div className={`w-16 h-px bg-${palette.primary} mb-6`}></div>
                <h2
                  className={`text-4xl md:text-4xl font-thin leading-tight mb-6 text-${palette.text}`}
                  style={{
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                    letterSpacing: "0.05em",
                    lineHeight: 1.4,
                  }}
                >
                  {data.story}
                </h2>
                <div className={`w-24 h-px bg-${palette.primary}/40`}></div>
              </div>

              {/* Editorial image */}
              <div className="relative aspect-[3/4]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${uploadedImages["story"] || "/romantic-couple-engagement-photo-natural-outdoor-s.jpg"})` }}>
                  <div className={`absolute inset-0 bg-gradient-to-t from-${palette.background} to-transparent opacity-40`}></div>
                </div>
                {/* Image credit overlay */}
                <div className="absolute bottom-4 right-4 text-xs uppercase tracking-widest text-white/60">Our Story</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Details Section - Minimal Grid */}
      {sections.details && (
        <section className={`py-16 px-8 bg-${palette.background}`}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2
                className={`text-4xl md:text-4xl font-thin uppercase tracking-[0.2em] text-${palette.text} mb-4`}
                style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                Details
              </h2>
              <div className={`w-16 h-px bg-${palette.primary}`}></div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Date */}
              <div className="group">
                <div className={`w-16 h-16 mb-6 border border-${palette.text}/20 flex items-center justify-center group-hover:border-${palette.primary} transition-colors`}>
                  <Calendar className={`w-8 h-8 text-${palette.text}/60 group-hover:text-${palette.primary} transition-colors`} />
                </div>
                <h3 className={`text-xs uppercase tracking-widest mb-4 text-${palette.text}/50`}>Datum</h3>
                <p className={`text-2xl font-light mb-2 text-${palette.text}`}>{data.date}</p>
                <p className={`text-lg font-light text-${palette.text}/60`}>{data.time}</p>
              </div>

              {/* Location */}
              <div className="group">
                <div className={`w-16 h-16 mb-6 border border-${palette.text}/20 flex items-center justify-center group-hover:border-${palette.primary} transition-colors`}>
                  <MapPin className={`w-8 h-8 text-${palette.text}/60 group-hover:text-${palette.primary} transition-colors`} />
                </div>
                <h3 className={`text-xs uppercase tracking-widest mb-4 text-${palette.text}/50`}>Plats</h3>
                <p className={`text-2xl font-light mb-2 text-${palette.text}`}>{data.venue}</p>
                <p className={`text-lg font-light text-${palette.text}/60`}>{data.address}</p>
              </div>

              {/* Dresscode */}
              <div className="group">
                <div className={`w-16 h-16 mb-6 border border-${palette.text}/20 flex items-center justify-center group-hover:border-${palette.primary} transition-colors`}>
                  <Shirt className={`w-8 h-8 text-${palette.text}/60 group-hover:text-${palette.primary} transition-colors`} />
                </div>
                <h3 className={`text-xs uppercase tracking-widest mb-4 text-${palette.text}/50`}>Klädkod</h3>
                <p className={`text-2xl font-light text-${palette.text}`}>{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section - Minimalist */}
      {sections.timeline && (
        <section className={`py-16 px-8 bg-${palette.background}`}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h2
                className={`text-4xl md:text-4xl font-thin uppercase tracking-[0.2em] text-${palette.text} mb-4`}
                style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                Schedule
              </h2>
              <div className={`w-16 h-px bg-${palette.primary}`}></div>
            </div>

            <div className="space-y-1">
              {data.timeline.map((item, index) => (
                <div
                  key={index}
                  className={`group flex items-center gap-8 py-8 border-b border-${palette.text}/10 hover:border-${palette.primary}/40 transition-colors`}
                >
                  {/* Time */}
                  <div
                    className={`text-3xl font-thin text-${palette.text}/40 group-hover:text-${palette.primary} transition-colors min-w-[120px]`}
                    style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", letterSpacing: "0.05em" }}
                  >
                    {item.time}
                  </div>

                  {/* Dot indicator */}
                  <div className={`w-2 h-2 rounded-full bg-${palette.text}/20 group-hover:bg-${palette.primary} group-hover:scale-150 transition-all`}></div>

                  {/* Event */}
                  <p className={`flex-1 text-xl font-light text-${palette.text}/90 group-hover:text-${palette.text} transition-colors`}>{item.event}</p>

                  {/* Index */}
                  <div className={`text-sm font-light text-${palette.text}/20 group-hover:text-${palette.text}/40 transition-colors`}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section - Full Bleed Grid */}
      {sections.gallery && (
        <section className={`py-16 px-0 bg-${palette.background}`}>
          <div className="mb-10 px-8 max-w-6xl mx-auto">
            <h2
              className={`text-4xl md:text-4xl font-thin uppercase tracking-[0.2em] text-${palette.text} mb-4`}
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Gallery
            </h2>
            <div className={`w-16 h-px bg-${palette.primary}`}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-1">
            {data.gallery.map((photo, index) => (
              <div key={index} className="group relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={uploadedImages[`gallery-${index}`] || photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />

                {/* Minimal overlay with number */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-white text-4xl font-thin opacity-40">{String(index + 1).padStart(2, "0")}</div>
                </div>

                {/* Image info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white/60 text-xs uppercase tracking-widest">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RSVP CTA - Dramatic */}
      <section className={`py-48 px-8 bg-${palette.background} text-center`}>
        <div className="max-w-3xl mx-auto">
          <div className={`w-24 h-px bg-${palette.primary} mx-auto mb-6`}></div>
          <h2
            className={`text-4xl md:text-4xl font-thin uppercase tracking-[0.2em] mb-6 text-${palette.text}`}
            style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Join Us
          </h2>
          <Button
            className={`bg-transparent hover:bg-${palette.primary} text-${palette.text} hover:text-white px-20 py-8 text-sm uppercase tracking-[0.3em] font-light border border-${palette.text}/30 hover:border-${palette.primary} transition-all duration-500`}
          >
            RSVP
          </Button>
        </div>
      </section>
    </div>
  )
}

export const templateRegistry: Record<TemplateId, (props: TemplateComponentProps) => JSX.Element> = {
  romantic: RomanticTemplate,
  modern: ModernTemplate,
  vintage: VintageTemplate,
  elegant: ElegantTemplate,
  bohemian: BohemianTemplate,
  minimalist: MinimalistTemplate,
  garden: GardenTemplate,
  artdeco: ArtDecoTemplate,
  beach: BeachTemplate,
  rustic: RusticTemplate,
  whimsical: WhimsicalTemplate,
  cinematic: CinematicTemplate,
}

export const renderSnapshot = (snapshot: EditorSnapshot, siteId?: string | null) => {
  const templateId = snapshot.selectedTemplate in templateRegistry ? snapshot.selectedTemplate : "romantic"
  const palettes = colorPalettes[templateId] ?? colorPalettes.romantic
  const palette = palettes[snapshot.selectedPalette] ?? palettes[0]
  const Renderer = templateRegistry[templateId] ?? templateRegistry.romantic

  return (
    <Renderer
      data={snapshot.weddingData}
      palette={palette}
      sections={snapshot.sectionVisibility}
      uploadedImages={snapshot.uploadedImages}
      siteId={siteId}
    />
  )
}

export default function WeddingEditor({
  mode = "editor",
  initialSnapshot,
}: {
  mode?: "editor" | "public"
  initialSnapshot?: Partial<EditorSnapshot> | null
}) {
  const session = useSession()
  const router = useRouter()
  const user = session?.user
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? "app.website.com"

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("romantic")
  const [selectedPalette, setSelectedPalette] = useState(0)
  const [activeSection, setActiveSection] = useState("couple")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    template: true,
    sections: true,
    editor: true,
  })

  const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({})

  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    hero: true,
    story: true,
    details: true,
    timeline: true,
    gallery: true,
    faq: true,
    registry: true,
    accommodation: true,
    rsvp: true, // Added RSVP section visibility
  })

  const [weddingData, setWeddingData] = useState<WeddingData>({
    bride: "Emma",
    groom: "James",
    date: "15 juni 2024",
    time: "16:00",
    venue: "Solnedgångsträdgården",
    address: "Trädgårdsgatan 123, Landsbygden",
    dresscode: "Cocktail",
    story:
      "Vi träffades en regnig tisdag på ett kafé i centrum. Det som började som en slumpmässig träff över spillt kaffe blev den största kärlekshistorien i våra liv.",
    timeline: [
      { time: "15:30", event: "Gästernas ankomst & cocktails" },
      { time: "16:00", event: "Vigselceremoni" },
      { time: "17:00", event: "Fotografering & mingel" },
      { time: "18:00", event: "Middag & tal" },
      { time: "21:00", event: "Dans & fest" },
    ],
    gallery: [
      { url: "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg", alt: "Romantiskt bröllopsfoto" },
      { url: "/romantic-couple-engagement-photo-natural-outdoor-s.jpg", alt: "Förlovningsfoto utomhus" },
    ],
    faq: [
      {
        question: "Vad är klädkoden?",
        answer: "Vi önskar cocktailklädsel. Tänk elegant men bekvämt för en utomhusfest.",
      },
      {
        question: "Finns det parkeringsplatser?",
        answer: "Ja, det finns gott om gratis parkering på plats.",
      },
      {
        question: "Är barn välkomna?",
        answer: "Vi älskar barn, men denna kväll är endast för vuxna gäster.",
      },
    ],
    giftRegistry:
      "Vi är så tacksamma för er närvaro på vår stora dag. Om ni önskar ge en gåva, har vi en önskelista på NK och Åhléns.",
    accommodation:
      "Vi har reserverat rum på Hotell Solsken för våra gäster från andra städer. Ring och nämn 'Emma & James bröllop' för specialpris.",
    rsvpDeadline: "1 maj 2024",
    rsvpEmail: "rsvp@emmajames.se",
    rsvpMessage:
      "Vi ser fram emot att fira med er! Vänligen svara senast 1 maj så vi kan planera för rätt antal gäster.",
  })

  const [siteSlug, setSiteSlug] = useState("")
  const [sites, setSites] = useState<SiteSummary[]>([])
  const [isLoadingSite, setIsLoadingSite] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [statusTone, setStatusTone] = useState<"idle" | "success" | "error">("idle")
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const publicUrl = siteSlug ? `https://${siteSlug}.${baseDomain}` : null

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, imageKey: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImages((prev) => ({ ...prev, [imageKey]: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getImageUrl = (imageKey: string, defaultUrl: string) => {
    return uploadedImages[imageKey] || defaultUrl
  }

  const removeUploadedImage = (imageKey: string) => {
    setUploadedImages((prev) => {
      const newImages = { ...prev }
      delete newImages[imageKey]
      return newImages
    })
  }

  const updateWeddingData = (key: keyof WeddingData, value: any) => {
    setWeddingData((prev) => ({ ...prev, [key]: value }))
  }

  const addTimelineItem = () => {
    setWeddingData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { time: "", event: "" }],
    }))
  }

  const addGalleryItem = () => {
    setWeddingData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { url: "", alt: "" }],
    }))
  }

  const removeGalleryItem = (index: number) => {
    setWeddingData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }))
  }

  const addFaqItem = () => {
    setWeddingData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "" }],
    }))
  }

  const removeFaqItem = (index: number) => {
    setWeddingData((prev) => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index),
    }))
  }

  useEffect(() => {
    if (mode === "editor" && !session) {
      router.push('/login')
    }
  }, [mode, session, router])

  if (mode === "editor" && !session) {
    return null
  }

  const paletteChoices = colorPalettes[selectedTemplate] ?? colorPalettes.romantic
  const currentPalette = paletteChoices[selectedPalette] ?? paletteChoices[0]

  const sections = [
    { id: "couple", label: "Par", icon: Heart },
    { id: "details", label: "Detaljer", icon: Calendar },
    { id: "story", label: "Historia", icon: Edit3 },
    { id: "timeline", label: "Tidslinje", icon: Clock },
    { id: "gallery", label: "Galleri", icon: Camera },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "registry", label: "Önskelista", icon: Gift },
    { id: "accommodation", label: "Boende", icon: Home },
    { id: "rsvp", label: "OSA", icon: UserCheck }, // Added RSVP section
  ]

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleSectionVisibility = (section: keyof SectionVisibility) => {
    setSectionVisibility((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const buildSnapshot = (): EditorSnapshot => ({
    weddingData,
    sectionVisibility,
    selectedTemplate,
    selectedPalette,
    uploadedImages,
  })

  const applySnapshot = (snapshot: Partial<EditorSnapshot> | null) => {
    if (!snapshot) return

    if (snapshot.weddingData) {
      setWeddingData((prev) => ({
        ...prev,
        ...snapshot.weddingData,
        timeline: snapshot.weddingData.timeline ?? prev.timeline,
        gallery: snapshot.weddingData.gallery ?? prev.gallery,
        faq: snapshot.weddingData.faq ?? prev.faq,
      }))
    }

    if (snapshot.sectionVisibility) {
      setSectionVisibility((prev) => ({
        ...prev,
        ...snapshot.sectionVisibility,
      }))
    }

    if (typeof snapshot.selectedTemplate === "string") {
      setSelectedTemplate(snapshot.selectedTemplate as TemplateId)
    }

    if (typeof snapshot.selectedPalette === "number" && !Number.isNaN(snapshot.selectedPalette)) {
      setSelectedPalette(snapshot.selectedPalette)
    }

    if (snapshot.uploadedImages) {
      setUploadedImages(snapshot.uploadedImages)
    }
  }

  useEffect(() => {
    if (mode !== "editor" || !session) {
      return
    }

    let isMounted = true

    const loadSites = async () => {
      setIsLoadingSite(true)
      try {
        const response = await fetch("/api/sites")
        if (!response.ok) {
          console.error("Failed to load sites", await response.text())
          return
        }

        const payload = (await response.json()) as { sites?: SiteSummary[] }
        const remoteSites = payload.sites ?? []

        if (!isMounted) return

        setSites(remoteSites)
        if (remoteSites.length > 0) {
          const latest = remoteSites[0]
          setSiteSlug(latest.slug)
          applySnapshot(latest.draft)
          if (latest.updated_at) {
            setLastSavedAt(new Date(latest.updated_at).toLocaleString())
          }
        }
      } catch (error) {
        console.error("Unable to fetch sites", error)
      } finally {
        if (isMounted) {
          setIsLoadingSite(false)
        }
      }
    }

    loadSites()

    return () => {
      isMounted = false
    }
  }, [mode, session])

  const fetchSiteBySlug = async (slug: string) => {
    if (mode !== "editor") {
      return
    }

    const normalized = normalizeSlug(slug)

    if (!normalized) {
      setStatusTone("error")
      setStatusMessage("Ange en giltig subdomän innan du laddar")
      return
    }

    setIsLoadingSite(true)
    setStatusMessage(null)
    try {
      const response = await fetch(`/api/sites?slug=${normalized}`)
      const payload = await response.json()

      if (!response.ok) {
        const errorMessage = payload?.error ?? "Kunde inte hämta sidan"
        setStatusTone("error")
        setStatusMessage(errorMessage)
        return
      }

      setSiteSlug(normalized)
      const site = payload.site as SiteSummary | undefined
      if (site) {
        applySnapshot(site.draft)
        if (site.updated_at) {
          setLastSavedAt(new Date(site.updated_at).toLocaleString())
        }
      }
      setStatusTone("success")
      setStatusMessage("Utkast laddat")
    } catch (error) {
      console.error("Failed to load site", error)
      setStatusTone("error")
      setStatusMessage("Kunde inte hämta sidan")
    } finally {
      setIsLoadingSite(false)
    }
  }

  useEffect(() => {
    if (!initialSnapshot) {
      return
    }

    applySnapshot(initialSnapshot)
  }, [initialSnapshot])

  const persistSite = async (publish: boolean) => {
    if (mode !== "editor") {
      return
    }

    const normalized = normalizeSlug(siteSlug)

    if (!normalized) {
      setStatusTone("error")
      setStatusMessage("Ange en giltig subdomän innan du sparar")
      return
    }

    setSiteSlug(normalized)
    setStatusTone("idle")
    setStatusMessage(null)

    const body = {
      slug: normalized,
      payload: buildSnapshot(),
      publish,
    }

    if (publish) {
      setIsPublishing(true)
    } else {
      setIsSaving(true)
    }

    try {
      const response = await fetch("/api/sites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const payload = await response.json()

      if (!response.ok) {
        const errorMessage = payload?.error ?? "Kunde inte spara sidan"
        setStatusTone("error")
        setStatusMessage(errorMessage)
        return
      }

      if (payload.slug) {
        setSiteSlug(payload.slug)
      }

      if (payload.site) {
        setSites((prev) => {
          const existingIndex = prev.findIndex((s) => s.slug === payload.site.slug)
          if (existingIndex >= 0) {
            const next = [...prev]
            next[existingIndex] = {
              ...next[existingIndex],
              ...payload.site,
            }
            return next
          }
          return [{ ...payload.site }, ...prev]
        })

        if (payload.site.updated_at) {
          setLastSavedAt(new Date(payload.site.updated_at).toLocaleString())
        } else {
          setLastSavedAt(new Date().toLocaleString())
        }
      }

      setStatusTone("success")
      setStatusMessage(publish ? "Webbplatsen är publicerad" : "Utkast sparat")
    } catch (error) {
      console.error("Failed to persist site", error)
      setStatusTone("error")
      setStatusMessage("Kunde inte spara sidan")
    } finally {
      setIsSaving(false)
      setIsPublishing(false)
    }
  }

  const renderTemplate = (override?: Partial<EditorSnapshot>) => {
    const snapshot: EditorSnapshot = {
      weddingData: override?.weddingData ?? weddingData,
      sectionVisibility: override?.sectionVisibility ?? sectionVisibility,
      selectedTemplate: override?.selectedTemplate ?? selectedTemplate,
      selectedPalette: override?.selectedPalette ?? selectedPalette,
      uploadedImages: override?.uploadedImages ?? uploadedImages,
    }

    return renderSnapshot(snapshot)
  }

  if (mode === "public") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-screen-xl bg-white">
          {renderTemplate(initialSnapshot ?? undefined)}
        </div>
      </div>
    )
  }

  if (isFullscreen) {
    return (
      <div className="min-h-screen bg-white overflow-y-auto">
        <Button
          onClick={() => setIsFullscreen(false)}
          className="fixed top-4 right-4 z-50 bg-black/80 hover:bg-black text-white"
          size="sm"
        >
          Avsluta helskärm
        </Button>
        <div className="w-full">{renderTemplate()}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFDF8' }}>
      <header 
        className="border-b px-6 py-3 flex items-center justify-between"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#F3D4C2'
        }}
      >
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="ghost"
            className="flex items-center gap-2 hover:bg-opacity-10"
            style={{ color: '#B26D4A' }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Tillbaka till översikt</span>
          </Button>
          <div className="text-sm" style={{ color: '#1F1C14', opacity: 0.6 }}>
            {templates.find((t) => t.id === selectedTemplate)?.name} • {currentPalette.name}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile/Desktop View Toggle */}
          <div 
            className="flex items-center gap-2 rounded-lg p-1"
            style={{ backgroundColor: '#F3D4C2' }}
          >
            <button
              onClick={() => setIsMobileView(false)}
              className="px-3 py-1 text-xs font-medium rounded-md transition-colors"
              style={{
                backgroundColor: !isMobileView ? '#FFFFFF' : 'transparent',
                color: '#1F1C14',
                boxShadow: !isMobileView ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              Desktop
            </button>
            <button
              onClick={() => setIsMobileView(true)}
              className="px-3 py-1 text-xs font-medium rounded-md transition-colors"
              style={{
                backgroundColor: isMobileView ? '#FFFFFF' : 'transparent',
                color: '#1F1C14',
                boxShadow: isMobileView ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              Mobile
            </button>
          </div>
          <Button
            onClick={() => setIsFullscreen(true)}
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
          >
            Helskärm
          </Button>
          {sites.find((s) => s.slug === siteSlug && s.published) && (
            <Button
              onClick={() => {
                const currentSite = sites.find((s) => s.slug === siteSlug)
                if (currentSite) {
                  router.push(`/rsvp?site_id=${currentSite.id}`)
                }
              }}
              variant="outline"
              size="sm"
              className="hidden md:inline-flex gap-2"
              title="Visa OSA-svar"
            >
              <MessageSquare className="h-4 w-4" />
              <span>OSA-svar</span>
            </Button>
          )}
          <Button
            onClick={() => setShowPublishModal(true)}
            size="sm"
            className="font-semibold"
            style={{
              backgroundColor: '#B26D4A',
              color: '#FFFDF8'
            }}
          >
            Publicera
          </Button>
          <div className="hidden sm:flex items-center gap-2 border-l pl-4" style={{ borderColor: '#F3D4C2' }}>
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {user?.email || user?.user_metadata?.name || "Signed in"}
            </span>
            <SignOutButton label="Logga ut" />
          </div>
          <div className="sm:hidden">
            <SignOutButton label="Logga ut" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside 
          className="w-80 border-r sticky top-0 h-[calc(100vh-64px)] overflow-hidden flex flex-col"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#F3D4C2'
          }}
        >
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Template & Style Section */}
            <div 
              className="p-4 border-b"
              style={{ borderColor: '#F3D4C2' }}
            >
              <div className="space-y-4">
                <div>
                  <Label 
                    className="text-xs font-medium"
                    style={{ color: '#A25D3B' }}
                  >
                    Mall
                  </Label>
                  <Select value={selectedTemplate} onValueChange={(value) => setSelectedTemplate(value as TemplateId)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label 
                    className="text-xs font-medium"
                    style={{ color: '#A25D3B' }}
                  >
                    Färgpalett
                  </Label>
                  <Select
                    value={selectedPalette.toString()}
                    onValueChange={(value) => setSelectedPalette(Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paletteChoices.map((palette, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {palette.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div 
              className="p-4 border-b"
              style={{ borderColor: '#F3D4C2' }}
            >
              <Label 
                className="text-xs font-medium mb-3 block"
                style={{ color: '#A25D3B' }}
              >
                Sidsektioner
              </Label>
              <div className="space-y-3">
                {[
                  { key: "hero", label: "Huvudbild" },
                  { key: "story", label: "Vår Historia" },
                  { key: "details", label: "Bröllopsinformation" },
                  { key: "timeline", label: "Tidslinje" },
                  { key: "gallery", label: "Fotogalleri" },
                  { key: "faq", label: "Vanliga Frågor" },
                  { key: "registry", label: "Önskelista" },
                  { key: "accommodation", label: "Boende" },
                  { key: "rsvp", label: "OSA Formulär" },
                ].map((section) => (
                  <div key={section.key} className="flex items-center justify-between">
                    <Label className="text-sm text-gray-700">{section.label}</Label>
                    <Switch
                      checked={sectionVisibility[section.key as keyof SectionVisibility]}
                      onCheckedChange={() => toggleSectionVisibility(section.key as keyof SectionVisibility)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="grid grid-cols-3 gap-1">
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`p-3 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center gap-1 ${
                          activeSection === section.id
                            ? "bg-black text-white shadow-sm"
                            : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="leading-tight">{section.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="space-y-0">
                  {activeSection === "couple" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Pardetaljer</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs text-gray-600 font-medium mb-1 block">Brud</Label>
                              <Input
                                value={weddingData.bride}
                                onChange={(e) => updateWeddingData("bride", e.target.value)}
                                className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600 font-medium mb-1 block">Brudgum</Label>
                              <Input
                                value={weddingData.groom}
                                onChange={(e) => updateWeddingData("groom", e.target.value)}
                                className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-2 block">Huvudbild</Label>
                            <div className="space-y-2">
                              {uploadedImages["hero"] && (
                                <div className="relative">
                                  <img
                                    src={uploadedImages["hero"] || "/placeholder.svg"}
                                    alt="Uppladdad huvudbild"
                                    className="w-full h-32 object-cover rounded-lg"
                                  />
                                  <button
                                    onClick={() => removeUploadedImage("hero")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, "hero")}
                                  className="hidden"
                                  id="hero-upload"
                                />
                                <label
                                  htmlFor="hero-upload"
                                  className="flex items-center gap-2 px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                  <Upload className="w-3 h-3" />
                                  {uploadedImages["hero"] ? "Byt bild" : "Ladda upp bild"}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "details" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Bröllopsinformation</h3>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">Datum</Label>
                            <Input
                              value={weddingData.date}
                              onChange={(e) => updateWeddingData("date", e.target.value)}
                              className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">Tid</Label>
                            <Input
                              value={weddingData.time}
                              onChange={(e) => updateWeddingData("time", e.target.value)}
                              className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">Plats</Label>
                            <Input
                              value={weddingData.venue}
                              onChange={(e) => updateWeddingData("venue", e.target.value)}
                              className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">Adress</Label>
                            <Input
                              value={weddingData.address}
                              onChange={(e) => updateWeddingData("address", e.target.value)}
                              className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">Klädkod</Label>
                            <Input
                              value={weddingData.dresscode}
                              onChange={(e) => updateWeddingData("dresscode", e.target.value)}
                              className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "story" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <BookOpen className="w-4 h-4 text-purple-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Vår Historia</h3>
                        </div>
                        <Label className="text-xs text-gray-600 font-medium mb-1 block">Er Historia</Label>
                        <Textarea
                          value={weddingData.story}
                          onChange={(e) => updateWeddingData("story", e.target.value)}
                          className="mt-1 text-sm border-gray-300 focus:border-black focus:ring-black resize-none"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {activeSection === "timeline" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="w-4 h-4 text-green-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Tidslinje</h3>
                        </div>
                        <div className="space-y-3">
                          {weddingData.timeline.map((item, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                placeholder="Tid"
                                value={item.time}
                                onChange={(e) => {
                                  const newTimeline = [...weddingData.timeline]
                                  newTimeline[index].time = e.target.value
                                  updateWeddingData("timeline", newTimeline)
                                }}
                                className="w-24 h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                              />
                              <Input
                                placeholder="Händelse"
                                value={item.event}
                                onChange={(e) => {
                                  const newTimeline = [...weddingData.timeline]
                                  newTimeline[index].event = e.target.value
                                  updateWeddingData("timeline", newTimeline)
                                }}
                                className="flex-1 h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                              />
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addTimelineItem}
                            className="w-full h-9 text-sm border-dashed border-gray-300 hover:border-gray-400 bg-transparent"
                          >
                            + Lägg till händelse
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "gallery" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <ImageIcon className="w-4 h-4 text-orange-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Fotogalleri</h3>
                        </div>
                        <div className="space-y-4">
                          {weddingData.gallery.map((item, index) => (
                            <div key={index} className="space-y-2 p-3 border border-gray-100 rounded-lg">
                              <div>
                                <Label className="text-xs text-gray-600 font-medium mb-2 block">Bild {index + 1}</Label>
                                {uploadedImages[`gallery-${index}`] && (
                                  <div className="relative mb-2">
                                    <img
                                      src={
                                        uploadedImages[`gallery-${index || "/placeholder.svg"}`] || "/placeholder.svg"
                                      }
                                      alt={`Galleri bild ${index + 1}`}
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                      onClick={() => removeUploadedImage(`gallery-${index}`)}
                                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, `gallery-${index}`)}
                                    className="hidden"
                                    id={`gallery-upload-${index}`}
                                  />
                                  <label
                                    htmlFor={`gallery-upload-${index}`}
                                    className="flex items-center gap-2 px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                                  >
                                    <Upload className="w-3 h-3" />
                                    {uploadedImages[`gallery-${index}`] ? "Byt bild" : "Ladda upp bild"}
                                  </label>
                                </div>
                              </div>

                              <Input
                                placeholder="Bild-URL (alternativ)"
                                value={item.url}
                                onChange={(e) => {
                                  const newGallery = [...weddingData.gallery]
                                  newGallery[index].url = e.target.value
                                  updateWeddingData("gallery", newGallery)
                                }}
                                className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                              />
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Alt-text"
                                  value={item.alt}
                                  onChange={(e) => {
                                    const newGallery = [...weddingData.gallery]
                                    newGallery[index].alt = e.target.value
                                    updateWeddingData("gallery", newGallery)
                                  }}
                                  className="flex-1 h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeGalleryItem(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Ta bort
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addGalleryItem}
                            className="w-full h-9 text-sm border-dashed border-gray-300 hover:border-gray-400 bg-transparent"
                          >
                            + Lägg till foto
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "faq" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <HelpCircle className="w-4 h-4 text-indigo-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Vanliga Frågor</h3>
                        </div>
                        <div className="space-y-4">
                          {weddingData.faq.map((item, index) => (
                            <div key={index} className="space-y-2 p-3 border border-gray-100 rounded-lg">
                              <Input
                                placeholder="Fråga"
                                value={item.question}
                                onChange={(e) => {
                                  const newFaq = [...weddingData.faq]
                                  newFaq[index].question = e.target.value
                                  updateWeddingData("faq", newFaq)
                                }}
                                className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                              />
                              <Textarea
                                placeholder="Svar"
                                value={item.answer}
                                onChange={(e) => {
                                  const newFaq = [...weddingData.faq]
                                  newFaq[index].answer = e.target.value
                                  updateWeddingData("faq", newFaq)
                                }}
                                className="text-sm border-gray-300 focus:border-black focus:ring-black resize-none"
                                rows={2}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFaqItem(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Ta bort
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addFaqItem}
                            className="w-full h-9 text-sm border-dashed border-gray-300 hover:border-gray-400 bg-transparent"
                          >
                            + Lägg till fråga
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "registry" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Gift className="w-4 h-4 text-pink-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Önskelista</h3>
                        </div>
                        <Label className="text-xs text-gray-600 font-medium mb-1 block">Önskelisteinformation</Label>
                        <Textarea
                          value={weddingData.giftRegistry}
                          onChange={(e) => updateWeddingData("giftRegistry", e.target.value)}
                          className="mt-1 text-sm border-gray-300 focus:border-black focus:ring-black resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {activeSection === "accommodation" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Home className="w-4 h-4 text-indigo-500" />
                          <h3 className="text-sm font-semibold text-gray-900">Boende</h3>
                        </div>
                        <Label className="text-xs text-gray-600 font-medium mb-1 block">Hotellinformation</Label>
                        <Textarea
                          value={weddingData.accommodation}
                          onChange={(e) => updateWeddingData("accommodation", e.target.value)}
                          className="mt-1 text-sm border-gray-300 focus:border-black focus:ring-black resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {activeSection === "rsvp" && (
                    <div className="border-b border-gray-100">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <UserCheck className="w-4 h-4 text-blue-500" />
                          <h3 className="text-sm font-semibold text-gray-900">OSA Formulär</h3>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">Sista datum för OSA</Label>
                            <Input
                              value={weddingData.rsvpDeadline}
                              onChange={(e) => updateWeddingData("rsvpDeadline", e.target.value)}
                              className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">OSA E-post</Label>
                            <Input
                              value={weddingData.rsvpEmail}
                              onChange={(e) => updateWeddingData("rsvpEmail", e.target.value)}
                              className="h-9 text-sm border-gray-300 focus:border-black focus:ring-black"
                              type="email"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 font-medium mb-1 block">OSA Meddelande</Label>
                            <Textarea
                              value={weddingData.rsvpMessage}
                              onChange={(e) => updateWeddingData("rsvpMessage", e.target.value)}
                              className="mt-1 text-sm border-gray-300 focus:border-black focus:ring-black resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto bg-gray-100">
            <div className={`min-h-full ${isMobileView ? "max-w-sm mx-auto bg-white shadow-lg" : ""}`}>
              {renderTemplate()}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Publish Modal */}
      <Dialog open={showPublishModal} onOpenChange={setShowPublishModal}>
        <DialogContent 
          className="sm:max-w-[500px]"
          style={{ backgroundColor: '#FFFDF8' }}
        >
          <DialogHeader>
            <DialogTitle 
              className="text-2xl font-bold"
              style={{ color: '#1F1C14' }}
            >
              Publicera er bröllopssida
            </DialogTitle>
            <DialogDescription style={{ color: '#1F1C14', opacity: 0.7 }}>
              Välj en unik adress för er bröllopssida. Den blir tillgänglig för alla era gäster.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Subdomain input */}
            <div className="space-y-2">
              <Label 
                htmlFor="subdomain"
                className="text-sm font-semibold"
                style={{ color: '#1F1C14' }}
              >
                Välj er webbadress
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="subdomain"
                  value={siteSlug}
                  onChange={(e) => setSiteSlug(e.target.value)}
                  placeholder="emma-james"
                  className="flex-1"
                />
                <span 
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: '#1F1C14', opacity: 0.6 }}
                >
                  .{baseDomain}
                </span>
              </div>
              <p className="text-xs" style={{ color: '#1F1C14', opacity: 0.6 }}>
                Använd endast bokstäver, siffror och bindestreck
              </p>
            </div>

            {/* URL Preview */}
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: '#F3D4C2',
                borderColor: '#B26D4A'
              }}
            >
              <div className="flex items-start gap-3">
                <Globe2 className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#B26D4A' }} />
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-1" style={{ color: '#A25D3B' }}>
                    Er bröllopssida kommer finnas på:
                  </p>
                  <p className="text-sm font-mono font-bold break-all" style={{ color: '#1F1C14' }}>
                    https://{siteSlug || 'er-adress'}.{baseDomain}
                  </p>
                </div>
              </div>
            </div>

            {/* Status messages */}
            {statusMessage && (
              <div 
                className="p-3 rounded-lg text-sm"
                style={{ 
                  backgroundColor: statusTone === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                  color: statusTone === 'error' ? '#dc2626' : '#16a34a'
                }}
              >
                {statusMessage}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPublishModal(false)}
              disabled={isPublishing}
            >
              Avbryt
            </Button>
            <Button
              onClick={() => {
                persistSite(true)
                // Modal stängs automatiskt vid framgång via statusMessage
              }}
              disabled={isPublishing || !siteSlug}
              className="font-semibold"
              style={{
                backgroundColor: '#B26D4A',
                color: '#FFFDF8'
              }}
            >
              {isPublishing ? 'Publicerar...' : 'Publicera nu'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function RomanticTemplate({
  data,
  palette,
  sections,
  uploadedImages,
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div
      className={`font-serif text-${palette.text} bg-gradient-to-b from-${palette.background} via-white to-${palette.background} min-h-screen`}
    >
      {sections.hero && (
        <section className="relative h-screen flex items-center justify-center text-center px-8">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${uploadedImages["hero"] || data.gallery[0]?.url || "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg"})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
          </div>
          <div className="relative z-10 text-white max-w-5xl animate-in fade-in duration-1000">
            <div className="mb-6">
              <Heart className="w-12 h-12 mx-auto mb-4 text-rose-300 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-4xl font-bold mb-6 text-balance tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {data.bride}
              <span className="block text-4xl md:text-4xl font-light my-4 text-rose-200">&</span>
              {data.groom}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-rose-300"></div>
              <p className="text-xl md:text-2xl font-light tracking-wider">{data.date}</p>
              <div className="w-16 h-px bg-rose-300"></div>
            </div>
            <p className="text-lg mb-6 opacity-90 font-light italic">{data.venue}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className={`bg-${palette.primary} hover:bg-${palette.primary}/80 text-white px-12 py-6 rounded-full text-lg font-semibold shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105`}
              >
                OSA Nu ♥
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 bg-white/10 backdrop-blur-sm rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Visa Detaljer
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </section>
      )}

      {sections.story && (
        <section className="py-16 px-8 bg-gradient-to-b from-white to-rose-50/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
                <Heart className={`w-6 h-6 text-${palette.primary}`} />
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
              </div>
              <h2 className={`text-4xl md:text-4xl font-bold text-${palette.text} mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>Vår Kärlekshistoria</h2>
              <p className="text-lg text-gray-500 italic">Där allt började...</p>
            </div>
            <div className="relative">
              <div className={`absolute -left-4 top-0 text-4xl text-${palette.primary}/20 font-serif leading-none`}>"</div>
              <div className={`bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-xl border border-${palette.primary}/10`}>
                <p className={`text-xl md:text-2xl leading-relaxed text-${palette.text}/90 text-center font-light`} style={{ lineHeight: '1.8' }}>
                  {data.story}
                </p>
              </div>
              <div className={`absolute -right-4 bottom-0 text-4xl text-${palette.primary}/20 font-serif leading-none`}>"</div>
            </div>
          </div>
        </section>
      )}

      {sections.details && (
        <section className={`py-16 px-8 bg-gradient-to-b from-${palette.background}/30 to-white`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
                <Calendar className={`w-6 h-6 text-${palette.primary}`} />
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
              </div>
              <h2 className={`text-4xl md:text-4xl font-bold text-${palette.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>Bröllopsinformation</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <div className={`group text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-${palette.primary}/10 hover:border-${palette.primary}/30 hover:-translate-y-2`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${palette.background} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Calendar className={`w-10 h-10 text-${palette.primary}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">När</h3>
                <p className={`text-lg font-medium text-${palette.primary} mb-2`}>{data.date}</p>
                <p className="text-gray-600 text-lg">{data.time}</p>
              </div>
              <div className={`group text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-${palette.primary}/10 hover:border-${palette.primary}/30 hover:-translate-y-2`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${palette.background} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <MapPin className={`w-10 h-10 text-${palette.primary}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Var</h3>
                <p className={`text-lg font-medium text-${palette.primary} mb-2`}>{data.venue}</p>
                <p className="text-gray-600 text-lg">{data.address}</p>
              </div>
              <div className={`group text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-${palette.primary}/10 hover:border-${palette.primary}/30 hover:-translate-y-2`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${palette.background} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Users className={`w-10 h-10 text-${palette.primary}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Klädkod</h3>
                <p className={`text-lg text-${palette.primary} font-medium`}>{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
                <Clock className={`w-6 h-6 text-${palette.primary}`} />
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
              </div>
              <h2 className={`text-4xl md:text-4xl font-bold text-${palette.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>Dagens Program</h2>
            </div>
            <div className="relative">
              <div className={`absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-${palette.primary}/20 via-${palette.primary} to-${palette.primary}/20`}></div>
              <div className="space-y-12">
                {data.timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-8 group">
                    <div className={`relative z-10 flex-shrink-0 w-24 text-right`}>
                      <div className={`text-3xl font-bold text-${palette.primary}`}>{item.time}</div>
                    </div>
                    <div className={`relative z-10 w-6 h-6 rounded-full bg-${palette.primary} border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300 flex-shrink-0 mt-1`}>
                      <div className={`absolute inset-0 rounded-full bg-${palette.primary} animate-ping opacity-75`}></div>
                    </div>
                    <div className={`flex-1 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-${palette.primary}/10 group-hover:border-${palette.primary}/30`}>
                      <div className="text-xl font-medium text-gray-800">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className={`py-16 px-8 bg-gradient-to-b from-${palette.background}/20 to-white`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
                <Camera className={`w-6 h-6 text-${palette.primary}`} />
                <div className={`w-12 h-px bg-${palette.primary}`}></div>
              </div>
              <h2 className={`text-4xl md:text-4xl font-bold text-${palette.text}`} style={{ fontFamily: 'Playfair Display, serif' }}>Våra Minnen</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.gallery.map((photo, index) => (
                <div key={index} className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-white hover:border-${palette.primary}/30`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.faq && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.text}`}>Vanliga Frågor</h2>
            <div className="space-y-6">
              {data.faq.map((item, index) => (
                <div key={index} className="bg-white/70 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.registry && (
        <section className={`py-20 px-8 bg-${palette.background}/50`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-8 text-${palette.text}`}>Önskelista</h2>
            <div className="bg-white/70 p-8 rounded-2xl shadow-sm">
              <Gift className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <p className="text-lg">{data.giftRegistry}</p>
            </div>
          </div>
        </section>
      )}

      {sections.accommodation && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-8 text-${palette.text}`}>Boende</h2>
            <div className="bg-white/70 p-8 rounded-2xl shadow-sm">
              <Users className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <p className="text-lg">{data.accommodation}</p>
            </div>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.text}`}>OSA</h2>
            <div className="bg-white/80 p-8 rounded-2xl shadow-sm max-w-2xl mx-auto">
              <p className="text-center mb-6 text-gray-700">{data.rsvpMessage}</p>
              {siteId ? (
                <RSVPForm
                  siteId={siteId}
                  deadline={data.rsvpDeadline}
                  palette={{
                    primary: '#B26D4A',
                    secondary: '#A25D3B',
                    accent: '#F3D4C2',
                  }}
                />
              ) : (
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#F3D4C2' }}>
                  <p style={{ color: '#1F1C14' }}>OSA-formuläret visas här när sidan är publicerad</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function ModernTemplate({
  data,
  palette,
  sections,
  uploadedImages, // Receive uploadedImages
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-white min-h-screen`}>
      {sections.hero && (
        <section className="h-screen flex flex-col md:flex-row relative overflow-hidden">
          <div className={`w-full md:w-1/2 bg-gradient-to-br from-${palette.text} to-${palette.text}/90 flex items-center justify-center px-8 md:px-16 py-20 relative`}>
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 right-10 w-64 h-64 border border-white rotate-45"></div>
              <div className="absolute bottom-20 left-10 w-48 h-48 border border-white rotate-12"></div>
              <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white -rotate-6"></div>
            </div>
            <div className="text-center relative z-10 animate-in fade-in duration-1000">
              <div className="mb-6">
                <div className={`w-16 h-px bg-${palette.primary} mx-auto mb-8`}></div>
                <h1 className="text-4xl md:text-4xl font-extralight text-white mb-4 tracking-tight">
                  {data.bride}
                </h1>
                <div className="flex items-center justify-center gap-6 my-8">
                  <div className="w-12 h-px bg-white/40"></div>
                  <span className="text-3xl font-thin text-white/70">&</span>
                  <div className="w-12 h-px bg-white/40"></div>
                </div>
                <h1 className="text-4xl md:text-4xl font-extralight text-white mb-8 tracking-tight">
                  {data.groom}
                </h1>
                <div className={`w-16 h-px bg-${palette.primary} mx-auto mt-8 mb-6`}></div>
              </div>
              <p className="text-xl md:text-2xl mb-6 text-gray-200 font-light tracking-widest uppercase">{data.date}</p>
              <Button size="lg" className={`bg-${palette.primary} hover:bg-${palette.primary}/80 text-white px-12 py-6 text-lg font-light tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-2xl`}>
                OSA
              </Button>
            </div>
          </div>
          <div
            className="w-full md:w-1/2 h-64 md:h-screen bg-cover bg-center relative group"
            style={{
              backgroundImage: `url(${uploadedImages["hero"] || data.gallery[0]?.url || "/romantic-wedding-couple-silhouette-golden-hour-tre.jpg"})`,
            }}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>
          </div>
        </section>
      )}
      {sections.story && (
        <section className="py-16 px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <div className={`w-24 h-1 bg-${palette.primary} mb-8`}></div>
                <h2 className={`text-4xl md:text-4xl font-extralight mb-8 text-${palette.text} tracking-tight`}>Vår Historia</h2>
                <p className={`text-xl leading-relaxed text-${palette.text}/80 font-light`} style={{ lineHeight: '1.9' }}>{data.story}</p>
                <div className={`w-16 h-px bg-${palette.primary} mt-8`}></div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className={`absolute -inset-4 bg-${palette.primary}/5 rounded-2xl`}></div>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={uploadedImages["story"] || data.gallery[1]?.url || data.gallery[0]?.url || "/placeholder.svg"}
                      alt="Story"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {sections.details && (
        <section className={`py-16 px-8 bg-${palette.text}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className={`w-16 h-1 bg-${palette.primary} mx-auto mb-8`}></div>
              <h2 className={`text-4xl md:text-4xl font-extralight text-white tracking-tight`}>Information</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center p-10 bg-white/5 backdrop-blur-sm rounded-none border-l-2 border-${palette.primary} hover:bg-white/10 transition-all duration-300">
                <Calendar className={`w-16 h-16 mx-auto mb-6 text-${palette.primary} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-2xl font-light mb-4 text-white uppercase tracking-widest text-sm">När</h3>
                <p className="text-xl text-white/90 font-light mb-2">{data.date}</p>
                <p className="text-lg text-white/70 font-light">{data.time}</p>
              </div>
              <div className="group text-center p-10 bg-white/5 backdrop-blur-sm rounded-none border-l-2 border-${palette.primary} hover:bg-white/10 transition-all duration-300">
                <MapPin className={`w-16 h-16 mx-auto mb-6 text-${palette.primary} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-2xl font-light mb-4 text-white uppercase tracking-widest text-sm">Var</h3>
                <p className="text-xl text-white/90 font-light mb-2">{data.venue}</p>
                <p className="text-lg text-white/70 font-light">{data.address}</p>
              </div>
              <div className="group text-center p-10 bg-white/5 backdrop-blur-sm rounded-none border-l-2 border-${palette.primary} hover:bg-white/10 transition-all duration-300">
                <Users className={`w-16 h-16 mx-auto mb-6 text-${palette.primary} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-2xl font-light mb-4 text-white uppercase tracking-widest text-sm">Klädkod</h3>
                <p className="text-xl text-white/90 font-light">{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}
      {sections.timeline && (
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>Tidslinje</h2>
            <div className="space-y-6">
              {data.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className={`text-2xl font-light text-${palette.primary} min-w-[100px]`}>{item.time}</div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="text-lg font-light">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {sections.gallery && (
        <section className={`py-20 px-8 bg-${palette.background}/50`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>Galleri</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.map((photo, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {sections.faq && (
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>Vanliga Frågor</h2>
            <div className="space-y-6">
              {data.faq.map((item, index) => (
                <div key={index} className="bg-white/80 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-medium mb-3">{item.question}</h3>
                  <p className="font-light text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {sections.registry && (
        <section className={`py-20 px-8 bg-${palette.background}/50`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-light mb-8 text-${palette.text}`}>Önskelista</h2>
            <div className="bg-white/80 p-8 rounded-2xl shadow-sm">
              <Gift className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <p className="text-lg">{data.giftRegistry}</p>
            </div>
          </div>
        </section>
      )}
      {sections.accommodation && (
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-light mb-8 text-${palette.text}`}>Boende</h2>
            <div className="bg-white/80 p-8 rounded-2xl shadow-sm">
              <Users className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <p className="text-lg">{data.accommodation}</p>
            </div>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>OSA</h2>
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
              <p className="text-center mb-6 font-light">{data.rsvpMessage}</p>
              {siteId ? (
                <RSVPForm
                  siteId={siteId}
                  deadline={data.rsvpDeadline}
                  palette={{
                    primary: '#B26D4A',
                    secondary: '#A25D3B',
                    accent: '#F3D4C2',
                  }}
                />
              ) : (
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#F3D4C2' }}>
                  <p style={{ color: '#1F1C14' }}>OSA-formuläret visas här när sidan är publicerad</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function VintageTemplate({
  data,
  palette,
  sections,
  uploadedImages, // Receive uploadedImages
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-serif text-${palette.text} bg-${palette.background} min-h-screen`}>
      {sections.hero && (
        <section className="relative h-screen flex items-center justify-center text-center px-8 bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(120, 80, 40, 0.03) 2px, rgba(120, 80, 40, 0.03) 4px)`,
              backgroundSize: '100% 4px'
            }}></div>
          </div>
          <div className="absolute inset-0 border-[12px] border-double border-amber-700/40 m-8 pointer-events-none">
            <div className="absolute -top-3 -left-3 w-20 h-20">
              <div className="w-full h-full border-l-4 border-t-4 border-amber-700"></div>
            </div>
            <div className="absolute -top-3 -right-3 w-20 h-20">
              <div className="w-full h-full border-r-4 border-t-4 border-amber-700"></div>
            </div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20">
              <div className="w-full h-full border-l-4 border-b-4 border-amber-700"></div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-20 h-20">
              <div className="w-full h-full border-r-4 border-b-4 border-amber-700"></div>
            </div>
          </div>
          <div className="relative z-10 max-w-5xl">
            <div className="mb-6">
              <div className="text-4xl font-bold mb-6 text-amber-800" style={{ fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>❖</div>
              <div className="inline-block px-12 py-8 bg-white/60 backdrop-blur-sm border-4 border-double border-amber-700 shadow-2xl">
                <h1 className="text-4xl md:text-4xl font-bold mb-6 text-balance text-amber-900" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>
                  {data.bride}
                </h1>
                <div className="flex items-center justify-center gap-8 my-6">
                  <div className="w-24 h-0.5 bg-amber-700"></div>
                  <span className="text-4xl text-amber-800">&</span>
                  <div className="w-24 h-0.5 bg-amber-700"></div>
                </div>
                <h1 className="text-4xl md:text-4xl font-bold text-balance text-amber-900" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>
                  {data.groom}
                </h1>
              </div>
              <div className="text-4xl font-bold mt-6 text-amber-800" style={{ fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>❖</div>
            </div>
            <p className="text-2xl mb-4 italic text-amber-900 font-medium" style={{ fontFamily: 'Georgia, serif' }}>Est. {data.date}</p>
            <p className="text-lg mb-8 text-amber-800">{data.venue}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button size="lg" className={`bg-amber-800 hover:bg-amber-900 text-white px-12 py-6 text-lg font-semibold border-2 border-amber-900 shadow-xl`}>
                RSVP
              </Button>
              <Button size="lg" variant="outline" className="px-12 py-6 bg-white/80 backdrop-blur-sm border-2 border-amber-800 text-amber-900 hover:bg-amber-50 text-lg font-semibold shadow-xl">
                Läs mer
              </Button>
            </div>
          </div>
        </section>
      )}

      {sections.story && (
        <section className="py-20 px-8 bg-white/90">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-8 text-${palette.text}`}>Vår Historia</h2>
            <div className="border-4 border-double border-amber-600 p-8">
              <p className={`text-lg leading-relaxed text-${palette.text}/80 italic`}>{data.story}</p>
            </div>
          </div>
        </section>
      )}

      {sections.details && (
        <section className={`py-20 px-8 bg-${palette.background}/50`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.text}`}>Bröllopsinformation</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white/90 p-8 border-4 border-double border-amber-600">
                <Calendar className={`w-12 h-12 mx-auto mb-4 text-${palette.primary}`} />
                <h3 className="text-xl font-semibold mb-2">När</h3>
                <p>{data.date}</p>
                <p>{data.time}</p>
              </div>
              <div className="text-center bg-white/90 p-8 border-4 border-double border-amber-600">
                <MapPin className={`w-12 h-12 mx-auto mb-4 text-${palette.primary}`} />
                <h3 className="text-xl font-semibold mb-2">Var</h3>
                <p>{data.venue}</p>
                <p>{data.address}</p>
              </div>
              <div className="text-center bg-white/90 p-8 border-4 border-double border-amber-600">
                <Users className={`w-12 h-12 mx-auto mb-4 text-${palette.primary}`} />
                <h3 className="text-xl font-semibold mb-2">Klädkod</h3>
                <p>{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className="py-20 px-8 bg-white/90">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.text}`}>Tidslinje</h2>
            <div className="space-y-6">
              {data.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-6 border-4 border-double border-amber-600 p-6">
                  <div className={`text-2xl font-bold text-${palette.primary} min-w-[100px]`}>{item.time}</div>
                  <div className="text-lg">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className={`py-20 px-8 bg-${palette.background}/50`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.text}`}>Galleri</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.map((photo, index) => (
                <div key={index} className="border-4 border-double border-amber-600 p-2 bg-white">
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-64 object-cover sepia"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.faq && (
        <section className="py-20 px-8 bg-white/90">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.text}`}>Vanliga Frågor</h2>
            <div className="space-y-6">
              {data.faq.map((item, index) => (
                <div key={index} className="border-4 border-double border-amber-600 p-6">
                  <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.registry && (
        <section className={`py-20 px-8 bg-${palette.background}/50`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-8 text-${palette.text}`}>Önskelista</h2>
            <div className="border-4 border-double border-amber-600 p-8 bg-white/90">
              <Gift className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <p className="text-lg">{data.giftRegistry}</p>
            </div>
          </div>
        </section>
      )}

      {sections.accommodation && (
        <section className="py-20 px-8 bg-white/90">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-8 text-${palette.text}`}>Boende</h2>
            <div className="border-4 border-double border-amber-600 p-8">
              <Users className={`w-16 h-16 mx-auto mb-6 text-${palette.primary}`} />
              <p className="text-lg">{data.accommodation}</p>
            </div>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className="py-20 px-8 bg-white/90">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold text-center mb-8 text-${palette.text}`}>OSA</h2>
            <div className="border-4 border-double border-amber-600 p-8 bg-white/90 max-w-2xl mx-auto">
              <p className="text-center mb-6">{data.rsvpMessage}</p>
              {siteId ? (
                <RSVPForm
                  siteId={siteId}
                  deadline={data.rsvpDeadline}
                  palette={{
                    primary: '#B26D4A',
                    secondary: '#A25D3B',
                    accent: '#F3D4C2',
                  }}
                />
              ) : (
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#F3D4C2' }}>
                  <p style={{ color: '#1F1C14' }}>OSA-formuläret visas här när sidan är publicerad</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function ElegantTemplate({
  data,
  palette,
  sections,
  uploadedImages, // Receive uploadedImages
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-white min-h-screen`}>
      {sections.hero && (
        <section className="h-screen flex items-center justify-center text-center px-8 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="elegantPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#elegantPattern)" />
            </svg>
          </div>
          <div className="max-w-5xl relative z-10">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
                <div className={`w-2 h-2 bg-${palette.primary} rotate-45`}></div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-4xl font-thin mb-6 tracking-[0.2em] uppercase text-gray-900" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
              {data.bride}
            </h1>
            <div className="flex items-center justify-center gap-8 my-12">
              <div className="w-32 h-px bg-gray-900"></div>
              <span className="text-3xl font-thin text-gray-400">×</span>
              <div className="w-32 h-px bg-gray-900"></div>
            </div>
            <h1 className="text-4xl md:text-4xl font-thin mb-6 tracking-[0.2em] uppercase text-gray-900" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
              {data.groom}
            </h1>
            <div className="mb-6">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
                <div className={`w-2 h-2 bg-${palette.primary} rotate-45`}></div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
              </div>
            </div>
            <p className="text-2xl mb-4 font-thin tracking-[0.3em] uppercase text-gray-600">{data.date}</p>
            <p className="text-lg mb-6 font-light tracking-widest text-gray-500">{data.venue}</p>
            <Button size="lg" className={`bg-${palette.text} hover:bg-${palette.text}/80 text-white px-16 py-7 text-sm font-light tracking-[0.3em] uppercase transition-all duration-500 hover:tracking-[0.4em]`}>
              RSVP
            </Button>
          </div>
        </section>
      )}

      {sections.story && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-thin mb-6 tracking-wide uppercase">Vår Historia</h2>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-8"></div>
            <p className="text-lg font-light leading-relaxed max-w-2xl mx-auto">{data.story}</p>
          </div>
        </section>
      )}

      {sections.details && (
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-thin text-center mb-10 tracking-wide uppercase">Information</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="w-px h-16 bg-gray-800 mx-auto mb-8"></div>
                <h3 className="text-lg font-light mb-4 tracking-wide uppercase">När</h3>
                <p className="font-light">{data.date}</p>
                <p className="font-light">{data.time}</p>
              </div>
              <div className="text-center">
                <div className="w-px h-16 bg-gray-800 mx-auto mb-8"></div>
                <h3 className="text-lg font-light mb-4 tracking-wide uppercase">Var</h3>
                <p className="font-light">{data.venue}</p>
                <p className="font-light">{data.address}</p>
              </div>
              <div className="text-center">
                <div className="w-px h-16 bg-gray-800 mx-auto mb-8"></div>
                <h3 className="text-lg font-light mb-4 tracking-wide uppercase">Klädkod</h3>
                <p className="font-light">{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-thin text-center mb-10 tracking-wide uppercase">Tidslinje</h2>
            <div className="space-y-8">
              {data.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-8 border-b border-gray-200 pb-6">
                  <div className="text-xl font-light min-w-[120px]">{item.time}</div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-lg font-light">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-thin text-center mb-10 tracking-wide uppercase">Galleri</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.map((photo, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-64 object-cover grayscale"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.faq && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-thin text-center mb-10 tracking-wide uppercase">Vanliga Frågor</h2>
            <div className="space-y-12">
              {data.faq.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-light mb-4">{item.question}</h3>
                  <p className="font-light text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.registry && (
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-thin mb-6 tracking-wide uppercase">Önskelista</h2>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-8"></div>
            <p className="text-lg font-light leading-relaxed">{data.giftRegistry}</p>
          </div>
        </section>
      )}

      {sections.accommodation && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-thin mb-6 tracking-wide uppercase">Boende</h2>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-8"></div>
            <p className="text-lg font-light leading-relaxed">{data.accommodation}</p>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-thin text-center mb-6 tracking-wide uppercase">OSA</h2>
            <div className="w-16 h-px bg-gray-800 mx-auto mb-8"></div>
            <div className="bg-gray-50 p-8 max-w-2xl mx-auto">
              <p className="text-center mb-8 font-light">{data.rsvpMessage}</p>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-light tracking-wide">FÖRNAMN</Label>
                    <Input className="mt-1 border-0 border-b border-gray-300 rounded-none bg-transparent" />
                  </div>
                  <div>
                    <Label className="text-sm font-light tracking-wide">EFTERNAMN</Label>
                    <Input className="mt-1 border-0 border-b border-gray-300 rounded-none bg-transparent" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-light tracking-wide">E-POST</Label>
                  <Input type="email" className="mt-1 border-0 border-b border-gray-300 rounded-none bg-transparent" />
                </div>
                <div>
                  <Label className="text-sm font-light tracking-wide">KOMMER DU?</Label>
                  <Select>
                    <SelectTrigger className="mt-1 border-0 border-b border-gray-300 rounded-none bg-transparent">
                      <SelectValue placeholder="Välj svar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Ja, jag kommer</SelectItem>
                      <SelectItem value="no">Nej, jag kan tyvärr inte komma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-light tracking-wide">ANTAL GÄSTER</Label>
                  <Select>
                    <SelectTrigger className="mt-1 border-0 border-b border-gray-300 rounded-none bg-transparent">
                      <SelectValue placeholder="Välj antal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 personer</SelectItem>
                      <SelectItem value="3">3 personer</SelectItem>
                      <SelectItem value="4">4 personer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-light tracking-wide">SPECIALKOST/ALLERGIER</Label>
                  <Textarea
                    className="mt-1 border-0 border-b border-gray-300 rounded-none bg-transparent resize-none"
                    placeholder="Berätta om eventuella allergier eller specialkost..."
                  />
                </div>
                <div>
                  <Label className="text-sm font-light tracking-wide">MEDDELANDE</Label>
                  <Textarea
                    className="mt-1 border-0 border-b border-gray-300 rounded-none bg-transparent resize-none"
                    placeholder="Skriv ett meddelande till oss..."
                  />
                </div>
                <Button className={`w-full bg-${palette.text} hover:bg-${palette.text}/90 text-white mt-8`}>
                  SKICKA OSA
                </Button>
              </form>
              <p className="text-center text-xs text-gray-500 mt-6 font-light tracking-wide">
                SISTA DATUM: {data.rsvpDeadline}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export function BohemianTemplate({
  data,
  palette,
  sections,
  uploadedImages, // Receive uploadedImages
  siteId,
}: {
  data: WeddingData
  palette: ColorPalette
  sections: SectionVisibility
  uploadedImages: { [key: string]: string }
  siteId?: string | null
}) {
  return (
    <div className={`font-sans text-${palette.text} bg-gradient-to-b from-green-50 to-emerald-50 min-h-screen`}>
      {sections.hero && (
        <section className="relative h-screen flex items-center justify-center text-center px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-green-100/50 to-emerald-100/50"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="text-4xl mb-8">🌿</div>
            <h1 className="text-4xl md:text-4xl font-light mb-8 text-balance">
              {data.bride} & {data.groom}
            </h1>
            <p className="text-xl mb-2 italic">Växer tillsammans</p>
            <p className="text-lg mb-8">{data.date}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className={`bg-${palette.primary} hover:bg-${palette.primary}/90 text-white px-8 py-3 rounded-full`}
              >
                OSA Nu
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 rounded-full bg-transparent">
                Visa Detaljer
              </Button>
            </div>
          </div>
        </section>
      )}

      {sections.story && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-light mb-8 text-${palette.text}`}>Vår Historia</h2>
            <div className="bg-white/80 p-8 rounded-3xl shadow-sm">
              <p className={`text-lg leading-relaxed text-${palette.text}/80`}>{data.story}</p>
            </div>
          </div>
        </section>
      )}

      {sections.details && (
        <section className={`py-20 px-8 bg-gradient-to-r from-green-50 to-emerald-50`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>Bröllopsinformation</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white/80 p-8 rounded-3xl shadow-sm">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-medium mb-2">När</h3>
                <p>{data.date}</p>
                <p>{data.time}</p>
              </div>
              <div className="text-center bg-white/80 p-8 rounded-3xl shadow-sm">
                <div className="text-4xl mb-4">🏡</div>
                <h3 className="text-xl font-medium mb-2">Var</h3>
                <p>{data.venue}</p>
                <p>{data.address}</p>
              </div>
              <div className="text-center bg-white/80 p-8 rounded-3xl shadow-sm">
                <div className="text-4xl mb-4">👗</div>
                <h3 className="text-xl font-medium mb-2">Klädkod</h3>
                <p>{data.dresscode}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {sections.timeline && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>Tidslinje</h2>
            <div className="space-y-6">
              {data.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-6 bg-white/80 p-6 rounded-2xl shadow-sm">
                  <div className={`text-2xl font-medium text-${palette.primary} min-w-[100px]`}>{item.time}</div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="text-lg">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.gallery && (
        <section className={`py-20 px-8 bg-gradient-to-r from-emerald-50 to-green-50`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>Galleri</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.map((photo, index) => (
                <div key={index} className="rounded-3xl overflow-hidden shadow-sm">
                  <img
                    src={uploadedImages[`gallery-${index || "/placeholder.svg"}`] || photo.url || "/placeholder.svg"}
                    alt={photo.alt}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.faq && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>Vanliga Frågor</h2>
            <div className="space-y-6">
              {data.faq.map((item, index) => (
                <div key={index} className="bg-white/80 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-medium mb-3">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.registry && (
        <section className={`py-20 px-8 bg-gradient-to-r from-green-50 to-emerald-50`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-light mb-8 text-${palette.text}`}>Önskelista</h2>
            <div className="bg-white/80 p-8 rounded-3xl shadow-sm">
              <div className="text-4xl mb-6">🎁</div>
              <p className="text-lg">{data.giftRegistry}</p>
            </div>
          </div>
        </section>
      )}

      {sections.accommodation && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-light mb-8 text-${palette.text}`}>Boende</h2>
            <div className="bg-white/80 p-8 rounded-3xl shadow-sm">
              <div className="text-4xl mb-6">🏨</div>
              <p className="text-lg">{data.accommodation}</p>
            </div>
          </div>
        </section>
      )}

      {sections.rsvp && (
        <section className="py-20 px-8 bg-white/70">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-light text-center mb-8 text-${palette.text}`}>OSA</h2>
            <div className="bg-white/80 p-8 rounded-3xl shadow-sm max-w-2xl mx-auto">
              <div className="text-center text-4xl mb-4">💌</div>
              <p className="text-center mb-6">{data.rsvpMessage}</p>
              {siteId ? (
                <RSVPForm
                  siteId={siteId}
                  deadline={data.rsvpDeadline}
                  palette={{
                    primary: '#B26D4A',
                    secondary: '#A25D3B',
                    accent: '#F3D4C2',
                  }}
                />
              ) : (
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#F3D4C2' }}>
                  <p style={{ color: '#1F1C14' }}>OSA-formuläret visas här när sidan är publicerad</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
