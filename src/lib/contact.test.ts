import { describe, expect, it } from 'vitest'

import {
  buildContactEmail,
  escapeHtml,
  getContactServiceLabel,
  validateContactPayload,
} from './contact'

describe('contact validation', () => {
  it('accepts and normalizes a valid contact payload', () => {
    const result = validateContactPayload({
      name: '  Oury  ',
      email: 'OURY@example.com',
      service: 'xr-project',
      message: 'A clear message about an XR project.',
      locale: 'en',
      company: '',
    })

    expect(result).toEqual({
      ok: true,
      payload: {
        name: 'Oury',
        email: 'oury@example.com',
        service: 'xr-project',
        message: 'A clear message about an XR project.',
        locale: 'en',
        company: '',
      },
    })
  })

  it('rejects invalid email, service and short messages', () => {
    const result = validateContactPayload({
      name: 'O',
      email: 'not-an-email',
      service: 'unknown',
      message: 'short',
    })

    expect(result).toEqual({
      ok: false,
      errors: [
        'name_required',
        'email_invalid',
        'service_invalid',
        'message_required',
      ],
    })
  })

  it('flags honeypot submissions without exposing a hard failure to bots', () => {
    const result = validateContactPayload({
      name: 'Oury',
      email: 'oury@example.com',
      service: 'xr-project',
      message: 'A clear message about an XR project.',
      company: 'bot value',
    })

    expect(result).toEqual({
      ok: false,
      errors: ['spam_detected'],
      spam: true,
    })
  })
})

describe('contact email', () => {
  it('builds subject and reply-to from the sanitized payload', () => {
    const result = validateContactPayload({
      name: 'Oury',
      email: 'oury@example.com',
      service: 'panel-mentoring',
      message: 'I would like to invite you to a panel.',
      locale: 'fr',
    })

    expect(result.ok).toBe(true)
    if (!result.ok) return

    const email = buildContactEmail(
      result.payload,
      'contact@example.com',
      'Portfolio <contact@example.com>',
    )

    expect(email.from).toBe('Portfolio <contact@example.com>')
    expect(email.to).toEqual(['contact@example.com'])
    expect(email.reply_to).toBe('oury@example.com')
    expect(email.subject).toBe('[Portfolio] Intervention / mentorat - Oury')
    expect(email.text).toContain('Service: Intervention / mentorat')
  })

  it('escapes html in message content', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
  })

  it('returns localized labels', () => {
    expect(getContactServiceLabel('unity-training', 'fr')).toBe(
      'Formation Unity',
    )
    expect(getContactServiceLabel('unity-training', 'en')).toBe(
      'Unity training',
    )
  })
})
