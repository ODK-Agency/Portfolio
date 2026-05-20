const envValue = (value: string | undefined, fallback?: string) => {
  if (value && value.trim().length > 0) return value
  return fallback
}

export const profile = {
  personName: 'Mamadou Oury Diallo',
  brandName: 'Janngo Agency',
  initials: 'OM',
  location: 'Dakar, Senegal',
  email: envValue(
    import.meta.env.VITE_CONTACT_EMAIL,
    'oury.diallo@janngo.agency',
  ),
  siteUrl: envValue(
    import.meta.env.VITE_SITE_URL,
    'https://portfolio.janngo.agency',
  ),
  linkedinUrl: envValue(
    import.meta.env.VITE_LINKEDIN_URL,
    'https://www.linkedin.com/in/ourymajor',
  ),
  whatsappUrl: envValue(import.meta.env.VITE_WHATSAPP_URL),
  xUrl: envValue(import.meta.env.VITE_X_URL, 'https://x.com/ourymajor'),
} as const
