import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { PreferenceProvider } from '#/lib/preferences'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Mamadou Oury Diallo | XR, Heritage and Unity Portfolio',
      },
      {
        name: 'description',
        content:
          'Portfolio of Mamadou Oury Diallo, XR builder, Unity educator and creative technologist working across heritage, training and immersive media.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <PreferenceProvider>{children}</PreferenceProvider>
        <Scripts />
      </body>
    </html>
  )
}
