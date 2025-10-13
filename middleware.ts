import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const getBaseDomain = () => process.env.NEXT_PUBLIC_BASE_DOMAIN?.toLowerCase().trim()

export function middleware(request: NextRequest) {
  const baseDomain = getBaseDomain()
  if (!baseDomain) {
    return NextResponse.next()
  }

  const host = request.headers.get("host")?.toLowerCase() ?? ""
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/auth")) {
    return NextResponse.next()
  }

  if (host === baseDomain || host === `www.${baseDomain}`) {
    return NextResponse.next()
  }

  // Handle localhost subdomains for local testing
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1")
  
  if (isLocalhost) {
    // Check if there's a subdomain (e.g., bengt.localhost:3000)
    const parts = host.split(".")
    const hasSubdomain = parts.length > 1 && parts[0] !== "localhost" && parts[0] !== "127"
    
    if (hasSubdomain) {
      const subdomain = parts[0]
      const url = request.nextUrl.clone()
      url.pathname = `/sites/${subdomain}`
      return NextResponse.rewrite(url)
    }
    
    return NextResponse.next()
  }

  if (host.endsWith(`.${baseDomain}`)) {
    const subdomain = host.slice(0, -(`.${baseDomain}`).length)

    if (!subdomain || subdomain === "www") {
      return NextResponse.next()
    }

    const url = request.nextUrl.clone()
    url.pathname = `/sites/${subdomain}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
