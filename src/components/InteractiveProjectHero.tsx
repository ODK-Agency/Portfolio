import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Orbit, ScanLine } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { PortfolioProject } from '#/data/projects'
import { usePreferences } from '#/lib/preferences'

const heroSlugs = [
  'guinea-360-field-captures',
  'micro-folie-digital-heritage',
  'langa-bouri',
  'grande-vadrouille-vr',
  'portsafe-vr',
]

const markerPositions: Record<
  string,
  { x: string; y: string; align?: 'right' }
> = {
  'micro-folie-digital-heritage': { x: '58%', y: '35%' },
  'langa-bouri': { x: '82%', y: '28%', align: 'right' },
  'grande-vadrouille-vr': { x: '82%', y: '57%', align: 'right' },
  'guinea-360-field-captures': { x: '66%', y: '73%' },
  'portsafe-vr': { x: '44%', y: '49%' },
}

export function InteractiveProjectHero({
  projects,
}: {
  projects: PortfolioProject[]
}) {
  const { locale, t } = usePreferences()
  const heroProjects = useMemo(
    () => projects.filter((project) => heroSlugs.includes(project.slug)),
    [projects],
  )
  const [activeSlug, setActiveSlug] = useState('guinea-360-field-captures')
  const heroRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const activeProject =
    heroProjects.find((project) => project.slug === activeSlug) ??
    heroProjects[0]

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="interactive-hero relative isolate -mt-24 min-h-[100dvh] overflow-hidden bg-[color:var(--ink)] text-[color:var(--canvas)]"
      onPointerMove={(event) => {
        if (!heroRef.current || event.pointerType === 'touch') return
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        const tiltX = (y - 50) * -0.09
        const tiltY = (x - 50) * 0.09

        if (frameRef.current) {
          window.cancelAnimationFrame(frameRef.current)
        }

        frameRef.current = window.requestAnimationFrame(() => {
          heroRef.current?.style.setProperty('--pointer-x', `${x}%`)
          heroRef.current?.style.setProperty('--pointer-y', `${y}%`)
          heroRef.current?.style.setProperty('--tilt-x', `${tiltX}deg`)
          heroRef.current?.style.setProperty('--tilt-y', `${tiltY}deg`)
        })
      }}
      onPointerLeave={() => {
        heroRef.current?.style.setProperty('--pointer-x', '50%')
        heroRef.current?.style.setProperty('--pointer-y', '50%')
        heroRef.current?.style.setProperty('--tilt-x', '0deg')
        heroRef.current?.style.setProperty('--tilt-y', '0deg')
      }}
    >
      <div className="interactive-hero__field absolute inset-0">
        {heroProjects.map((project) => (
          <img
            key={project.slug}
            src={project.cover}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority={
              project.slug === 'guinea-360-field-captures' ? 'high' : 'auto'
            }
            aria-hidden="true"
            className={[
              'interactive-hero__media absolute inset-0 h-full w-full object-cover',
              project.slug === activeProject.slug ? 'is-active' : '',
            ].join(' ')}
          />
        ))}
      </div>

      <div className="interactive-hero__grid absolute inset-0" />
      <div className="interactive-hero__scanner absolute inset-0" />
      <div className="interactive-hero__contours absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--ink)]/86 via-[color:var(--ink)]/44 to-[color:var(--ink)]/24" />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-transparent to-[color:var(--ink)]/35" />

      <div
        className="project-constellation"
        aria-label="Cultural project branches"
      >
        {heroProjects.map((project) => {
          const position = markerPositions[project.slug] ?? {
            x: '50%',
            y: '50%',
          }
          const isActive = project.slug === activeProject.slug

          return (
            <Link
              key={project.slug}
              to="/work/$slug"
              params={{ slug: project.slug }}
              onMouseEnter={() => setActiveSlug(project.slug)}
              onFocus={() => setActiveSlug(project.slug)}
              onClick={() => setActiveSlug(project.slug)}
              aria-current={isActive ? 'true' : undefined}
              className={[
                'project-marker group',
                position.align === 'right' ? 'is-right' : '',
                isActive ? 'is-active' : '',
              ].join(' ')}
              style={
                {
                  '--marker-x': position.x,
                  '--marker-y': position.y,
                } as CSSProperties
              }
            >
              <span className="project-marker__dot" />
              <span className="project-marker__text">
                <span className="project-marker__kind">
                  {project.kinds[0]?.replace('-', ' ')}
                </span>
                <span className="project-marker__title">{project.title}</span>
              </span>
            </Link>
          )
        })}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1480px] flex-col justify-end px-5 pb-6 pt-32 md:px-8 md:pb-9">
        <div className="max-w-3xl">
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--canvas)]/20 bg-[color:var(--ink)]/28 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--signal)] backdrop-blur">
              <ScanLine size={14} aria-hidden="true" />
              Field layer
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--canvas)]/20 bg-[color:var(--ink)]/28 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--canvas)]/74 backdrop-blur">
              <Orbit size={14} aria-hidden="true" />
              XR / 3D / 360
            </span>
          </div>

          <h1 className="max-w-[12ch] text-[clamp(3.8rem,7.4vw,6.8rem)] font-semibold leading-[0.88] text-[color:var(--canvas)]">
            Mamadou Oury Diallo
          </h1>
          <p className="mt-8 max-w-[58ch] text-lg leading-8 text-[color:var(--canvas)]/78 md:text-xl">
            {t({
              en: 'Immersive systems for museum material, field archives, VR simulation and Unity education. Move through the work like a spatial archive.',
              fr: 'Systèmes immersifs pour contenus muséaux, archives terrain, simulation VR et formation Unity. Parcours le travail comme une archive spatiale.',
            })}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/work/$slug"
              params={{ slug: activeProject.slug }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--signal)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:bg-[color:var(--canvas)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
            >
              {t({ en: 'Open active project', fr: 'Ouvrir le projet actif' })}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link
              to="/work"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[color:var(--canvas)]/20 bg-[color:var(--ink)]/28 px-6 py-3 text-sm font-semibold text-[color:var(--canvas)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[color:var(--canvas)]/12 focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
            >
              {t({ en: 'Explore all work', fr: 'Voir tous les projets' })}
            </Link>
          </div>
        </div>

        <div className="mobile-project-markers mt-10 grid gap-3">
          {heroProjects.map((project) => (
            <Link
              key={project.slug}
              to="/work/$slug"
              params={{ slug: project.slug }}
              onFocus={() => setActiveSlug(project.slug)}
              onClick={() => setActiveSlug(project.slug)}
              aria-current={
                project.slug === activeProject.slug ? 'true' : undefined
              }
              className={[
                'mobile-project-marker',
                project.slug === activeProject.slug ? 'is-active' : '',
              ].join(' ')}
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
                  {project.kinds[0]?.replace('-', ' ')}
                </span>
                <span className="mt-1 block text-lg font-semibold">
                  {project.title}
                </span>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>

        <div className="mt-9 grid gap-3 border-t border-[color:var(--canvas)]/14 pt-5 md:grid-cols-4">
          {[
            [
              t({ en: 'Active layer', fr: 'Couche active' }),
              activeProject.title,
            ],
            [t({ en: 'Role', fr: 'Rôle' }), activeProject.role[locale]],
            ['Stack', activeProject.stack.slice(0, 3).join(' / ')],
            [
              t({ en: 'Proof', fr: 'Preuve' }),
              activeProject.media[0]?.kind ?? 'case study',
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
                {label}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--canvas)]/72">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
