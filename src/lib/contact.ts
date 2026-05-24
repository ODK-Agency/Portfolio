export type ContactLocale = 'en' | 'fr'

export type ContactPayload = {
  name: string
  email: string
  service: string
  message: string
  locale?: ContactLocale
  company?: string
}

export type ContactValidationResult =
  | { ok: true; payload: ContactPayload }
  | { ok: false; errors: string[]; spam?: boolean }

export const contactServiceLabels = {
  'xr-project': { en: 'XR project', fr: 'Projet XR' },
  'unity-training': { en: 'Unity training', fr: 'Formation Unity' },
  'museum-heritage': { en: 'Museum / heritage', fr: 'Musée / patrimoine' },
  'panel-mentoring': {
    en: 'Panel / mentoring',
    fr: 'Intervention / mentorat',
  },
  '360-field-media': { en: '360 field media', fr: 'Archives 360' },
  other: { en: 'Other', fr: 'Autre' },
} as const

export type ContactService = keyof typeof contactServiceLabels

const maxLengths = {
  name: 120,
  email: 160,
  service: 80,
  message: 2400,
  company: 160,
} as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalize = (value: unknown, maxLength: number) =>
  String(typeof value === 'string' ? value : '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)

const normalizeMessage = (value: unknown) =>
  String(typeof value === 'string' ? value : '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, maxLengths.message)

export const isContactService = (value: string): value is ContactService =>
  Object.hasOwn(contactServiceLabels, value)

export const getContactServiceLabel = (
  service: string,
  locale: ContactLocale,
) =>
  isContactService(service)
    ? contactServiceLabels[service][locale]
    : contactServiceLabels.other[locale]

export const validateContactPayload = (
  input: unknown,
): ContactValidationResult => {
  if (!input || typeof input !== 'object') {
    return { ok: false, errors: ['invalid_payload'] }
  }

  const source = input as Record<string, unknown>
  const payload: ContactPayload = {
    name: normalize(source.name, maxLengths.name),
    email: normalize(source.email, maxLengths.email).toLowerCase(),
    service: normalize(source.service, maxLengths.service),
    message: normalizeMessage(source.message),
    locale: source.locale === 'en' ? 'en' : 'fr',
    company: normalize(source.company, maxLengths.company),
  }

  if (payload.company) {
    return { ok: false, errors: ['spam_detected'], spam: true }
  }

  const errors: string[] = []

  if (payload.name.length < 2) errors.push('name_required')
  if (!emailPattern.test(payload.email)) errors.push('email_invalid')
  if (!isContactService(payload.service)) errors.push('service_invalid')
  if (payload.message.length < 12) errors.push('message_required')

  return errors.length > 0 ? { ok: false, errors } : { ok: true, payload }
}

export const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

export const buildContactEmail = (
  payload: ContactPayload,
  toEmail: string,
  fromEmail: string,
) => {
  const locale = payload.locale ?? 'fr'
  const serviceLabel = getContactServiceLabel(payload.service, locale)
  const subject = `[Portfolio] ${serviceLabel} - ${payload.name}`
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Service: ${serviceLabel}`,
    '',
    payload.message,
  ].join('\n')
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #102118;">
      <h1 style="font-size: 20px;">Portfolio contact</h1>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
      <hr style="border: 0; border-top: 1px solid #ddd;" />
      <p style="white-space: pre-line;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim()

  return {
    from: fromEmail,
    to: [toEmail],
    reply_to: payload.email,
    subject,
    text,
    html,
  }
}
