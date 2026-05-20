const SITE_URL = 'https://portfolio.janngo.agency'
const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`

export function absoluteSiteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

export function seoMeta({
  description,
  path = '/',
  title,
}: {
  description: string
  path?: string
  title: string
}) {
  const url = absoluteSiteUrl(path)

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Mamadou Oury Diallo' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: OG_IMAGE_URL },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    {
      property: 'og:image:alt',
      content: 'Mamadou Oury Diallo, portfolio XR et patrimoine',
    },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:locale:alternate', content: 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: OG_IMAGE_URL },
  ]
}

export function seoLinks(path = '/') {
  const url = absoluteSiteUrl(path)

  return [
    { rel: 'canonical', href: url },
    { rel: 'alternate', hrefLang: 'en', href: url },
    { rel: 'alternate', hrefLang: 'fr', href: url },
    { rel: 'alternate', hrefLang: 'x-default', href: url },
  ]
}
