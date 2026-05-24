import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Mail, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import { SocialLinks } from '#/components/SocialLinks'
import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { profile } from '#/config/profile'
import { contactServiceLabels, getContactServiceLabel } from '#/lib/contact'
import type { ContactService } from '#/lib/contact'
import { usePreferences } from '#/lib/preferences'
import { seoLinks, seoMeta } from '#/lib/seo'

const contactImage = '/stills/contact-vr-guidance.jpg'

const serviceOptions = Object.entries(contactServiceLabels).map(
  ([value, label]) => ({
    value: value as ContactService,
    label,
  }),
)

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error' | 'fallback'

const successMessageDurationMs = 8000

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: seoMeta({
      title: 'Contact | Mamadou Oury Diallo',
      description:
        'Contacter Mamadou Oury Diallo pour des projets XR, formations Unity, médias muséaux et archives 360.',
      path: '/contact',
    }),
    links: seoLinks('/contact'),
  }),
  component: ContactPage,
})

function ContactPage() {
  const { locale, t } = usePreferences()
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: 'xr-project',
    message: '',
    company: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [fallbackUrl, setFallbackUrl] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (status !== 'sent') return undefined

    const timer = window.setTimeout(() => {
      setStatus('idle')
      setStatusMessage('')
    }, successMessageDurationMs)

    return () => window.clearTimeout(timer)
  }, [status])

  const buildMailtoUrl = () => {
    const serviceLabel = getContactServiceLabel(form.service, locale)

    const subject = encodeURIComponent(
      `[Portfolio] ${serviceLabel} - ${form.name || 'New inquiry'}`,
    )
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Service: ${serviceLabel}`,
        '',
        form.message,
      ].join('\n'),
    )
    return `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setStatusMessage('')
    setFallbackUrl('')

    const nextFallbackUrl = buildMailtoUrl()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          locale,
        }),
      })

      if (response.ok) {
        setStatus('sent')
        setStatusMessage(
          t({
            en: "Message sent. I'll get back to you as soon as possible. In the meantime, you can also connect with me on LinkedIn.",
            fr: 'Message envoyé. Je vous réponds dans les plus brefs délais. En attendant, vous pouvez aussi me retrouver sur LinkedIn.',
          }),
        )
        setForm({
          name: '',
          email: '',
          service: 'xr-project',
          message: '',
          company: '',
        })
        return
      }

      const result = (await response.json().catch(() => null)) as {
        code?: string
      } | null

      if (result?.code === 'validation_failed') {
        setStatus('error')
        setStatusMessage(
          t({
            en: 'Please check your email, service and message before sending.',
            fr: 'Vérifie ton email, le service et le message avant l’envoi.',
          }),
        )
        return
      }

      if (result?.code === 'rate_limited') {
        setStatus('error')
        setStatusMessage(
          t({
            en: 'Please wait a moment before sending another message.',
            fr: 'Attends un instant avant d’envoyer un autre message.',
          }),
        )
        return
      }

      setStatus('fallback')
      setFallbackUrl(nextFallbackUrl)
      setStatusMessage(
        t({
          en: 'The direct email service is not available yet. You can send the same message with your email app.',
          fr: 'L’envoi direct n’est pas encore disponible. Tu peux envoyer le même message avec ton application mail.',
        }),
      )
    } catch {
      setStatus('fallback')
      setFallbackUrl(nextFallbackUrl)
      setStatusMessage(
        t({
          en: 'The connection failed. You can send the same message with your email app.',
          fr: 'La connexion a échoué. Tu peux envoyer le même message avec ton application mail.',
        }),
      )
    }
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
          <figure className="mt-8 max-w-[26rem] overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] md:mt-10 lg:max-w-[30rem]">
            <img
              src={contactImage}
              alt={t({
                en: 'Oury guiding a VR headset experience during an immersive session.',
                fr: 'Oury accompagne une expérience en casque VR pendant une session immersive.',
              })}
              width={1200}
              height={1800}
              className="aspect-[2/3] w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
        <div className="grid min-w-0 gap-4">
          <div className="max-w-full overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:rounded-[2.5rem] md:p-12">
            <p className="max-w-[32ch] text-lg leading-7 text-[color:var(--muted)] md:max-w-[56ch] md:text-xl md:leading-8">
              {t({
                en: 'For XR, heritage and Unity production.',
                fr: 'Pour les projets XR, patrimoine et production Unity.',
              })}
            </p>
            <p className="mt-4 max-w-[44ch] text-sm leading-6 text-[color:var(--muted)]">
              {t({
                en: 'Response within two business days, Dakar time.',
                fr: 'Réponse sous deux jours ouvrés, fuseau Dakar.',
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
                  minLength={2}
                  maxLength={120}
                  name="name"
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
                  maxLength={160}
                  name="email"
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
                name="service"
                value={form.service}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    service: event.target.value,
                  }))
                }
                className="rounded-[1rem] border border-[color:var(--canvas)]/16 bg-[color:var(--canvas)]/8 px-4 py-3 text-base text-[color:var(--canvas)] outline-none transition focus:border-[color:var(--signal)]"
              >
                {serviceOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[oklch(0.96_0.01_82)] text-[oklch(0.18_0.02_158)]"
                  >
                    {option.label[locale]}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
                Message
              </span>
              <textarea
                required
                minLength={12}
                maxLength={2400}
                name="message"
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
            <label className="hidden">
              Company
              <input
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    company: event.target.value,
                  }))
                }
              />
            </label>
            <div className="min-h-6">
              {statusMessage ? (
                <div
                  role={status === 'sent' ? 'status' : 'alert'}
                  className={`rounded-[1.25rem] border px-4 py-3 text-sm leading-6 ${
                    status === 'sent'
                      ? 'border-[oklch(0.68_0.15_150)]/45 bg-[oklch(0.25_0.09_155)] font-medium text-[oklch(0.91_0.06_150)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'border-[color:var(--canvas)]/14 bg-[color:var(--canvas)]/8 text-[color:var(--canvas)]/78'
                  }`}
                >
                  <p>{statusMessage}</p>
                  {status === 'sent' ? (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex w-fit font-semibold text-[oklch(0.91_0.06_150)] underline decoration-[oklch(0.78_0.12_150)]/70 underline-offset-4 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.12_150)]/70 focus:ring-offset-2 focus:ring-offset-[color:var(--ink)]"
                    >
                      {t({
                        en: 'Connect on LinkedIn',
                        fr: 'Me retrouver sur LinkedIn',
                      })}
                    </a>
                  ) : null}
                </div>
              ) : null}
              {fallbackUrl ? (
                <a
                  href={fallbackUrl}
                  className="mt-2 inline-flex text-sm font-semibold text-[color:var(--signal)] underline underline-offset-4"
                >
                  {t({
                    en: 'Open email app',
                    fr: 'Ouvrir l’application mail',
                  })}
                </a>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--signal)] px-5 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--canvas)] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <Send size={16} aria-hidden="true" />
              {status === 'sending'
                ? t({ en: 'Sending...', fr: 'Envoi...' })
                : status === 'sent'
                  ? t({
                      en: 'Send another message',
                      fr: 'Envoyer un autre message',
                    })
                  : status === 'fallback' || status === 'error'
                    ? t({
                        en: 'Retry direct send',
                        fr: 'Réessayer l’envoi direct',
                      })
                    : t({ en: 'Send message', fr: 'Envoyer le message' })}
            </button>
          </form>
        </div>
      </section>
    </PageFrame>
  )
}
