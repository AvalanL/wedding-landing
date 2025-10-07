import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database, Json } from "@/types/database"

const normalizeSlug = (input: string) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const publishedOnly = searchParams.get("published") === "true"

  if (!slug) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("sites")
      .select("id, slug, draft, published, created_at, updated_at, published_at")
      .eq("owner_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ sites: data ?? [] })
  }

  if (publishedOnly) {
    const { data, error } = await supabase
      .from("sites")
      .select("id, slug, published, published_at, owner_id")
      .eq("slug", slug)
      .not("published", "is", null)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 })
    }

    return NextResponse.json({ site: data })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("sites")
    .select("id, slug, draft, published, created_at, updated_at, published_at")
    .eq("owner_id", user.id)
    .eq("slug", slug)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 })
  }

  return NextResponse.json({ site: data })
}

type SiteRequestBody = {
  slug: string
  payload: Json
  publish?: boolean
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const body = (await request.json()) as SiteRequestBody

  if (!body?.slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  const normalizedSlug = normalizeSlug(body.slug)
  if (!normalizedSlug) {
    return NextResponse.json({ error: "Slug must contain alphanumeric characters" }, { status: 400 })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const payload = body.payload ?? null
  const publish = body.publish ?? false
  const now = new Date().toISOString()

  const upsertPayload: Database["public"]["Tables"]["sites"]["Insert"] = {
    owner_id: user.id,
    slug: normalizedSlug,
    draft: payload,
  }

  if (publish) {
    upsertPayload.published = payload
    upsertPayload.published_at = now
  }

  const { data, error } = await supabase
    .from("sites")
    .upsert(upsertPayload, { onConflict: "owner_id,slug" })
    .select("id, slug, draft, published, created_at, updated_at, published_at")
    .maybeSingle()

  if (error) {
    const status = error.code === "23505" ? 409 : 500
    return NextResponse.json({ error: error.message }, { status })
  }

  return NextResponse.json({ site: data, slug: normalizedSlug, published: publish })
}
