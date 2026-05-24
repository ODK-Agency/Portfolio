import { Link, useLocation } from '@tanstack/react-router'
import { ArrowUpRight, Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import { SocialLinks } from '#/components/SocialLinks'
import { profile } from '#/config/profile'
import { usePreferences } from '#/lib/preferences'

const navItems = [
  { label: { en: 'Work', fr: 'Projets' }, to: '/work' },
  { label: { en: 'Teaching', fr: 'Formation' }, to: '/teaching' },
  { label: { en: 'Speaking', fr: 'Interventions' }, to: '/speaking' },
  {
    label: { en: 'Archive', fr: 'Archive' },
    to: '/field-archive',
  },
  { label: { en: 'About', fr: 'À propos' }, to: '/about' },
  { label: { en: 'Contact', fr: 'Contact' }, to: '/contact' },
]

function getFocusableElements(root: HTMLElement | null) {
  if (!root) return []

  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled'))
}

export function SiteHeader() {
  const { locale, theme, t, toggleLocale, toggleTheme } = usePreferences()
  const location = useLocation()
  const mobileMenuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    restoreFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusable = getFocusableElements(mobilePanelRef.current)
    focusable[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const currentFocusable = getFocusableElements(mobilePanelRef.current)
      if (currentFocusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = currentFocusable[0]
      const last = currentFocusable[currentFocusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      restoreFocusRef.current?.focus()
    }
  }, [menuOpen])

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
                ? t({
                    en: 'Switch to dark theme',
                    fr: 'Passer au thème sombre',
                  })
                : t({
                    en: 'Switch to light theme',
                    fr: 'Passer au thème clair',
                  })
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
            aria-label={t({ en: 'Switch language', fr: 'Changer de langue' })}
            onClick={toggleLocale}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
          >
            <Languages
              className="hidden sm:block"
              size={16}
              aria-hidden="true"
            />
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
          <button
            type="button"
            ref={menuButtonRef}
            aria-label={
              menuOpen
                ? t({ en: 'Close navigation', fr: 'Fermer la navigation' })
                : t({ en: 'Open navigation', fr: 'Ouvrir la navigation' })
            }
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMenuOpen((current) => !current)}
            className="grid min-h-11 min-w-11 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)] md:hidden"
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div
          id={mobileMenuId}
          ref={mobilePanelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t({
            en: 'Mobile navigation',
            fr: 'Navigation mobile',
          })}
          className="fixed inset-x-0 top-[73px] z-40 max-h-[calc(100dvh-73px)] overflow-y-auto border-t border-[color:var(--canvas)]/10 bg-[color:var(--ink)] px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-5 text-[color:var(--canvas)] shadow-[0_24px_70px_rgba(18,33,29,0.28)] md:hidden"
        >
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-[1.25rem] border border-[color:var(--canvas)]/10 bg-[color:var(--canvas)]/6 px-5 py-4 text-2xl font-semibold leading-tight text-[color:var(--canvas)] transition hover:border-[color:var(--signal)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
                activeProps={{
                  className:
                    'rounded-[1.25rem] border border-[color:var(--signal)] bg-[color:var(--signal)] px-5 py-4 text-2xl font-semibold leading-tight text-[color:var(--ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]',
                }}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              aria-label={t({
                en: 'Switch language',
                fr: 'Changer de langue',
              })}
              onClick={toggleLocale}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--canvas)]/18 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--canvas)] transition hover:border-[color:var(--signal)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
            >
              <Languages size={16} aria-hidden="true" />
              {locale === 'en' ? 'FR' : 'EN'}
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--heritage)] px-4 py-2 text-sm font-semibold text-[color:var(--canvas)] transition hover:bg-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
            >
              {t({ en: 'Contact', fr: 'Contact' })}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  const { t } = usePreferences()

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[color:var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--canvas)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
      >
        {t({ en: 'Skip to main content', fr: 'Aller au contenu principal' })}
      </a>
      <SiteHeader />
      <main id="main-content" className="pt-24">
        {children}
      </main>
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
            Mamadou Oury Diallo · Janngo Agency · Dakar
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
