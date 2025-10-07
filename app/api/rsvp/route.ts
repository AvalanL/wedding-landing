import { NextResponse } from 'next/server'
import { createRouteSupabaseClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { resend } from '@/lib/resend'
import { RSVPNotificationEmail } from '@/lib/emails/rsvp-notification'
import { render } from '@react-email/render'

// POST - Submit RSVP (public, for guests)
export async function POST(request: Request) {
  try {
    // Use direct client for public RSVP submissions
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const body = await request.json()

    const {
      site_id,
      guest_name,
      email,
      phone,
      attending,
      number_of_guests,
      dietary_restrictions,
      message,
    } = body

    // Validate required fields
    if (!site_id || !guest_name || attending === undefined) {
      return NextResponse.json(
        { error: 'Saknade obligatoriska fält' },
        { status: 400 }
      )
    }

    // Verify the site exists and is published, and get owner info + slug
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id, slug, published, owner_id')
      .eq('id', site_id)
      .single()

    if (siteError || !site || !site.published) {
      return NextResponse.json(
        { error: 'Bröllopssidan hittades inte eller är inte publicerad' },
        { status: 404 }
      )
    }

    // Get IP and user agent for analytics
    const ip_address = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       null
    const user_agent = request.headers.get('user-agent') || null

    // Insert RSVP
    const { data: rsvp, error: insertError } = await supabase
      .from('rsvp_responses')
      .insert({
        site_id,
        guest_name,
        email: email || null,
        phone: phone || null,
        attending,
        number_of_guests: number_of_guests || 1,
        dietary_restrictions: dietary_restrictions || null,
        message: message || null,
        ip_address,
        user_agent,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Failed to insert RSVP:', insertError)
      return NextResponse.json(
        { error: 'Kunde inte spara OSA-svar' },
        { status: 500 }
      )
    }

    // Send email notification (async, don't block response)
    // Create a new client with proper auth for RPC call
    const emailSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    sendEmailNotification({
      supabase: emailSupabase,
      ownerId: site.owner_id,
      siteSlug: site.slug,
      siteId: site.id,
      guestName: guest_name,
      attending,
      numberOfGuests: number_of_guests || 1,
      email,
      phone,
      dietaryRestrictions: dietary_restrictions,
      message,
    }).catch((emailError) => {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails
    })

    return NextResponse.json({ success: true, rsvp }, { status: 201 })
  } catch (error) {
    console.error('RSVP submission error:', error)
    return NextResponse.json(
      { error: 'Ett fel uppstod vid sparande av OSA-svar' },
      { status: 500 }
    )
  }
}

async function sendEmailNotification({
  supabase,
  ownerId,
  siteSlug,
  siteId,
  guestName,
  attending,
  numberOfGuests,
  email,
  phone,
  dietaryRestrictions,
  message,
}: {
  supabase: any
  ownerId: string
  siteSlug: string
  siteId: string
  guestName: string
  attending: boolean
  numberOfGuests: number
  email?: string
  phone?: string
  dietaryRestrictions?: string
  message?: string
}) {
  // Skip if no RESEND_API_KEY
  if (!process.env.RESEND_API_KEY) {
    console.log('Skipping email: RESEND_API_KEY not configured')
    return
  }

  // Get owner's email using our custom SQL function
  const { data: ownerEmail, error: emailError } = await supabase
    .rpc('get_user_email', { user_id: ownerId })

  if (emailError || !ownerEmail) {
    console.error('Could not fetch owner email:', emailError)
    console.log('Skipping email: Could not determine owner email')
    return
  }

  // Build dashboard URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const dashboardUrl = `${baseUrl}/rsvp?site_id=${siteId}`

  // Render email HTML
  const emailHtml = render(
    RSVPNotificationEmail({
      guestName,
      attending,
      numberOfGuests,
      email,
      phone,
      dietaryRestrictions,
      message,
      siteSlug,
      dashboardUrl,
    })
  )

  // Send email
  await resend.emails.send({
    from: 'Bröllopssidan <notifications@bröllopssidan.se>',
    to: ownerEmail,
    subject: `Nytt OSA-svar från ${guestName}`,
    html: emailHtml,
  })

  console.log(`✅ Email notification sent to ${ownerEmail}`)
}

// GET - Fetch RSVPs for a site (protected, owner only)
export async function GET(request: Request) {
  try {
    const supabase = createRouteSupabaseClient()

    // Verify user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    // Get site_id from query params
    const { searchParams } = new URL(request.url)
    const site_id = searchParams.get('site_id')

    if (!site_id) {
      return NextResponse.json(
        { error: 'site_id krävs' },
        { status: 400 }
      )
    }

    // Verify user owns this site
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('id, owner_id, slug')
      .eq('id', site_id)
      .single()

    if (siteError || !site) {
      return NextResponse.json(
        { error: 'Sidan hittades inte' },
        { status: 404 }
      )
    }

    if (site.owner_id !== session.user.id) {
      return NextResponse.json(
        { error: 'Du har inte behörighet att se dessa OSA-svar' },
        { status: 403 }
      )
    }

    // Fetch all RSVPs for this site
    const { data: rsvps, error: rsvpError } = await supabase
      .from('rsvp_responses')
      .select('*')
      .eq('site_id', site_id)
      .order('created_at', { ascending: false })

    if (rsvpError) {
      console.error('Failed to fetch RSVPs:', rsvpError)
      return NextResponse.json(
        { error: 'Kunde inte hämta OSA-svar' },
        { status: 500 }
      )
    }

    // Calculate stats
    const attending = rsvps.filter((r) => r.attending)
    const notAttending = rsvps.filter((r) => !r.attending)
    const totalGuests = attending.reduce((sum, r) => sum + (r.number_of_guests || 1), 0)

    return NextResponse.json({
      rsvps,
      stats: {
        total: rsvps.length,
        attending: attending.length,
        notAttending: notAttending.length,
        totalGuests,
      },
      site: {
        id: site.id,
        slug: site.slug,
      },
    })
  } catch (error) {
    console.error('RSVP fetch error:', error)
    return NextResponse.json(
      { error: 'Ett fel uppstod vid hämtning av OSA-svar' },
      { status: 500 }
    )
  }
}

