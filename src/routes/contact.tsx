import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { SocialLinks } from '#/components/SocialLinks'
import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { profile } from '#/config/profile'
import { usePreferences } from '#/lib/preferences'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  const { t } = usePreferences()
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: 'XR project',
    message: '',
  })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(
      `[Portfolio] ${form.service} - ${form.name || 'New inquiry'}`,
    )
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Service: ${form.service}`,
        '',
        form.message,
      ].join('\n'),
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <PageFrame>
      <section className="mx-auto grid min-h-[calc(100dvh-12rem)] max-w-[1480px] gap-10 overflow-hidden px-5 py-16 md:px-8 lg:grid-cols-[0.76fr_1.24fr]">
        <div className="min-w-0">
          <SectionEyebrow>{t({ en: 'Contact', fr: 'Contact' })}</SectionEyebrow>
          <h1 className="mt-5 max-w-[9ch] break-words text-[clamp(2.55rem,11vw,6rem)] font-semibold leading-[0.98] text-[color:var(--ink)] md:max-w-full md:text-8xl">
            {t({
              en: "Let's talk.",
              fr: 'Parlons.',
            })}
          </h1>
          <p className="mt-6 max-w-[30ch] text-base leading-7 text-[color:var(--muted)] md:max-w-[38ch]">
            {t({
              en: 'XR builds, museum media, Unity training, 360 archives and interactive prototypes.',
              fr: 'Développements XR, médias muséaux, formations Unity, archives 360 et prototypes interactifs.',
            })}
          </p>
        </div>
        <div className="grid min-w-0 gap-4">
          <div className="max-w-full overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:rounded-[2.5rem] md:p-12">
            <p className="max-w-[32ch] text-lg leading-7 text-[color:var(--muted)] md:max-w-[56ch] md:text-xl md:leading-8">
              {t({
                en: 'For XR, heritage and Unity production.',
                fr: 'Pour les projets XR, patrimoine et production Unity.',
              })}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex max-w-full min-w-0 items-center gap-3 text-[clamp(1rem,4.2vw,1.875rem)] font-semibold text-[color:var(--ink)] underline decoration-[color:var(--heritage)] decoration-2 underline-offset-8"
            >
              <Mail className="shrink-0" size={22} aria-hidden="true" />
              <span className="min-w-0 break-all">{profile.email}</span>
              <ArrowUpRight className="shrink-0" size={22} aria-hidden="true" />
            </a>
            <SocialLinks className="mt-8" includeEmail={false} />
          </div>
          <form
            onSubmit={submit}
            className="grid gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--ink)] p-6 text-[color:var(--canvas)] md:rounded-[2.5rem] md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
                  {t({ en: 'Name', fr: 'Nom' })}
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="rounded-[1rem] border border-[color:var(--canvas)]/16 bg-[color:var(--canvas)]/8 px-4 py-3 text-base text-[color:var(--canvas)] outline-none transition placeholder:text-[color:var(--canvas)]/38 focus:border-[color:var(--signal)]"
                  placeholder="Mamadou Oury Diallo"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="rounded-[1rem] border border-[color:var(--canvas)]/16 bg-[color:var(--canvas)]/8 px-4 py-3 text-base text-[color:var(--canvas)] outline-none transition placeholder:text-[color:var(--canvas)]/38 focus:border-[color:var(--signal)]"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
                {t({ en: 'Service', fr: 'Service' })}
              </span>
              <select
                value={form.service}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    service: event.target.value,
                  }))
                }
                className="rounded-[1rem] border border-[color:var(--canvas)]/16 bg-[color:var(--canvas)]/8 px-4 py-3 text-base text-[color:var(--canvas)] outline-none transition focus:border-[color:var(--signal)]"
              >
                <option className="bg-[oklch(0.96_0.01_82)] text-[oklch(0.18_0.02_158)]">
                  XR project
                </option>
                <option className="bg-[oklch(0.96_0.01_82)] text-[oklch(0.18_0.02_158)]">
                  Unity training
                </option>
                <option className="bg-[oklch(0.96_0.01_82)] text-[oklch(0.18_0.02_158)]">
                  Museum / heritage
                </option>
                <option className="bg-[oklch(0.96_0.01_82)] text-[oklch(0.18_0.02_158)]">
                  360 field media
                </option>
                <option className="bg-[oklch(0.96_0.01_82)] text-[oklch(0.18_0.02_158)]">
                  Other
                </option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
                Message
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                className="resize-none rounded-[1rem] border border-[color:var(--canvas)]/16 bg-[color:var(--canvas)]/8 px-4 py-3 text-base leading-7 text-[color:var(--canvas)] outline-none transition placeholder:text-[color:var(--canvas)]/38 focus:border-[color:var(--signal)]"
                placeholder={t({
                  en: 'Tell me what you want to build, where it will be used, and the timeline.',
                  fr: 'Dis-moi ce que tu veux construire, où ce sera utilisé et le calendrier.',
                })}
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--signal)] px-5 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--canvas)]"
            >
              <Send size={16} aria-hidden="true" />
              {t({ en: 'Prepare email', fr: 'Préparer l’email' })}
            </button>
          </form>
        </div>
      </section>
    </PageFrame>
  )
}
