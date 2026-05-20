import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { Locale } from '#/data/projects'

export type ThemeMode = 'light' | 'dark'

type PreferenceContextValue = {
  locale: Locale
  theme: ThemeMode
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  toggleTheme: () => void
  t: (copy: Record<Locale, string>) => string
}

const PreferenceContext = createContext<PreferenceContextValue | null>(null)

const localeKey = 'ourymajor-locale'
const themeKey = 'ourymajor-theme'

export function PreferenceProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false)

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeKey)
    const storedTheme = window.localStorage.getItem(themeKey)

    if (storedLocale === 'fr' || storedLocale === 'en') {
      setLocaleState(storedLocale)
    }

    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }

    setHasLoadedPreferences(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedPreferences) return

    document.documentElement.dataset.theme = theme
    document.documentElement.lang = locale
    window.localStorage.setItem(themeKey, theme)
    window.localStorage.setItem(localeKey, locale)
  }, [hasLoadedPreferences, locale, theme])

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === 'en' ? 'fr' : 'en'))
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<PreferenceContextValue>(
    () => ({
      locale,
      theme,
      setLocale,
      toggleLocale,
      toggleTheme,
      t: (copy) => copy[locale],
    }),
    [locale, setLocale, theme, toggleLocale, toggleTheme],
  )

  return (
    <PreferenceContext.Provider value={value}>
      {children}
    </PreferenceContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferenceContext)

  if (!context) {
    throw new Error('usePreferences must be used inside PreferenceProvider')
  }

  return context
}
