import { createFileRoute } from '@tanstack/react-router'

import { buildContactEmail, validateContactPayload } from '#/lib/contact'

const defaultContactEmail = 'oury.diallo@janngo.agency'
const resendEndpoint = 'https://api.resend.com/emails'
const rateLimitWindowMs = 60_000
const maxPayloadBytes = 10_000

const recentSubmissions = new Map<string, number>()

const json = (body: unknown, init?: ResponseInit) =>
  Response.json(body, {
    ...init,
    headers: {
      'Cache-Control': 'no-store',
      ...(init?.headers ?? {}),
    },
  })

const getClientKey = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  request.headers.get('x-real-ip') ||
  'local'

const isRateLimited = (request: Request) => {
  const key = getClientKey(request)
  const now = Date.now()
  const previous = recentSubmissions.get(key)

  if (previous && now - previous < rateLimitWindowMs) return true

  recentSubmissions.set(key, now)
  return false
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentType = request.headers.get('content-type') ?? ''
        const contentLength = Number(request.headers.get('content-length') ?? 0)

        if (!contentType.includes('application/json')) {
          return json(
            { ok: false, code: 'unsupported_content_type' },
            { status: 415 },
          )
        }

        if (contentLength > maxPayloadBytes) {
          return json({ ok: false, code: 'payload_too_large' }, { status: 413 })
        }

        let body: unknown

        try {
          body = await request.json()
        } catch {
          return json({ ok: false, code: 'invalid_json' }, { status: 400 })
        }

        const validation = validateContactPayload(body)

        if (!validation.ok) {
          return json(
            {
              ok: false,
              code: validation.spam ? 'spam_detected' : 'validation_failed',
              errors: validation.errors,
            },
            { status: validation.spam ? 200 : 400 },
          )
        }

        const apiKey = process.env.RESEND_API_KEY?.trim()
        const toEmail =
          process.env.CONTACT_TO_EMAIL?.trim() ||
          process.env.VITE_CONTACT_EMAIL?.trim() ||
          defaultContactEmail
        const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim()

        if (!apiKey || !fromEmail) {
          return json(
            { ok: false, code: 'email_not_configured' },
            { status: 503 },
          )
        }

        if (isRateLimited(request)) {
          return json({ ok: false, code: 'rate_limited' }, { status: 429 })
        }

        const email = buildContactEmail(validation.payload, toEmail, fromEmail)
        const response = await fetch(resendEndpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(email),
        })

        if (!response.ok) {
          return json(
            { ok: false, code: 'email_provider_error' },
            { status: 502 },
          )
        }

        return json({ ok: true })
      },
    },
  },
})
