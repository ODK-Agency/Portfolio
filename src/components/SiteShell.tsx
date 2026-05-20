import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Languages, Moon, Sun } from 'lucide-react'

import { SocialLinks } from '#/components/SocialLinks'
import { profile } from '#/config/profile'
import { usePreferences } from '#/lib/preferences'

const navItems = [
  { label: { en: 'Work', fr: 'Projets' }, to: '/work' },
  { label: { en: 'Teaching', fr: 'Formation' }, to: '/teaching' },
  {
    label: { en: 'Field Archive', fr: 'Archive terrain' },
    to: '/field-archive',
  },
  { label: { en: 'About', fr: 'À propos' }, to: '/about' },
  { label: { en: 'Contact', fr: 'Contact' }, to: '/contact' },
]

export function SiteHeader() {
  const { locale, theme, t, toggleLocale, toggleTheme } = usePreferences()

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--canvas)]/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-4 md:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Mamadou Oury Diallo home"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[color:var(--ink)] text-sm font-semibold text-[color:var(--canvas)]">
            {profile.initials}
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-semibold">
              {profile.personName}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
              {profile.brandName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-2 py-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm text-[color:var(--muted)] transition hover:bg-[color:var(--canvas)] hover:text-[color:var(--ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
              activeProps={{
                className:
                  'rounded-full bg-[color:var(--ink)] px-4 py-2 text-sm text-[color:var(--canvas)] transition focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]',
              }}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={
              theme === 'light'
                ? 'Switch to dark theme'
                : 'Switch to light theme'
            }
            onClick={toggleTheme}
            className="grid min-h-11 min-w-11 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
          >
            {theme === 'light' ? (
              <Moon size={17} aria-hidden="true" />
            ) : (
              <Sun size={17} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            aria-label="Switch language"
            onClick={toggleLocale}
            className="hidden min-h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)] sm:inline-flex"
          >
            <Languages size={16} aria-hidden="true" />
            {locale === 'en' ? 'FR' : 'EN'}
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-[color:var(--heritage)] px-4 py-2 text-sm font-semibold text-[color:var(--canvas)] transition hover:-translate-y-0.5 hover:bg-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)] sm:inline-flex"
          >
            <span className="max-[430px]:sr-only">
              {t({ en: 'Contact', fr: 'Contact' })}
            </span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </div>
    </header>
  )
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  )
}

export function Footer() {
  const { t } = usePreferences()

  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--ink)] text-[color:var(--canvas)]">
      <div className="mx-auto grid max-w-[1480px] gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--signal)]">
            Portfolio dot Janngo dot Agency
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {t({
              en: 'Immersive systems for heritage, training and interactive worlds.',
              fr: 'Systèmes immersifs pour le patrimoine, la formation et les mondes interactifs.',
            })}
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-3 text-sm text-[color:var(--canvas)]/72">
          <a
            className="w-fit text-base font-semibold text-[color:var(--canvas)] underline decoration-[color:var(--signal)] decoration-2 underline-offset-4"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
          <SocialLinks
            compact
            includeEmail={false}
            className="[&_a]:border-[color:var(--canvas)]/18 [&_a]:bg-[color:var(--canvas)]/8 [&_a]:text-[color:var(--canvas)]"
          />
          <p>
            {t({
              en: 'Mamadou Oury Diallo, Dakar. Janngo means tomorrow in pulaar.',
              fr: 'Mamadou Oury Diallo, Dakar. Janngo signifie demain en pulaar.',
            })}
          </p>
        </div>
      </div>
    </footer>
  )
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--heritage)]">
      {children}
    </p>
  )
}
