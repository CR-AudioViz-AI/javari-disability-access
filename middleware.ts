// middleware.ts — visitor tracking
//
// 2026-08-16: this app had no middleware, so nothing it served was ever logged.
// Any platform-wide traffic figure was only the apps that happened to have one.
//
// Its only job is to log the request and get out of the way. Fire and forget —
// a visitor must not wait on analytics, and an analytics outage must not take a
// page down. Bots are counted rather than blocked, because a traffic number that
// silently includes AhrefsBot is a lie told to yourself.
//
// CR AudioViz AI, LLC · EIN 39-3646201
import { NextRequest, NextResponse, type NextFetchEvent } from 'next/server'
import { track } from '@/lib/analytics/track'

export function middleware(request: NextRequest, event: NextFetchEvent): NextResponse {
  const response = NextResponse.next()
  try {
    // 2026-08-16: this was `void track(...)`. In Edge middleware the invocation
    // ends as soon as the response is returned, and Vercel can kill the function
    // before a detached fetch completes — 44 apps deployed clean and logged
    // nothing. waitUntil keeps the invocation alive for the write WITHOUT
    // delaying the response, which is exactly what it exists for.
    event.waitUntil(track({
      path: request.nextUrl.pathname,
      method: request.method,
      userAgent: request.headers.get('user-agent') ?? '',
      referrer: request.headers.get('referer'),
      ip: (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || null,
      country: request.headers.get('x-vercel-ip-country'),
      appId: request.nextUrl.hostname,
      sessionId: request.cookies.get('zsid')?.value ?? null,
      userId: null,
    }))
  } catch {
    // Never let tracking break a request.
  }
  return response
}

export const config = {
  // Static assets are excluded: logging a favicon fetch as a visit inflates
  // every number that matters.
  // 2026-08-16: this was written with double backslashes — '\\.' in the source,
  // which is an escaped backslash rather than a literal dot, so the regex never
  // matched and the middleware never ran. Forty-four apps deployed clean and
  // logged nothing because of two characters.
  matcher: ['/((?!_next/static|_next/image|favicon\.ico|.*\.png|.*\.jpg|.*\.svg|.*\.webp|.*\.ico).*)'],
}
