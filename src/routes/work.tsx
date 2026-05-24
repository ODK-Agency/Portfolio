import { Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'

import { ProjectTile } from '#/components/ProjectShowcase'
import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { portfolioProjects } from '#/data/projects'
import type { ProjectKind } from '#/data/projects'
import { usePreferences } from '#/lib/preferences'
import { seoLinks, seoMeta } from '#/lib/seo'

export const Route = createFileRoute('/work')({
  head: () => ({
    meta: seoMeta({
      title: 'Projets | Mamadou Oury Diallo',
      description:
        'Projets choisis en XR, patrimoine, formation et archives terrain.',
      path: '/work',
    }),
    links: seoLinks('/work'),
  }),
  component: WorkPage,
})

const filters: {
  label: { en: string; fr: string }
  kind: ProjectKind | 'all'
}[] = [
  { label: { en: 'All', fr: 'Tout' }, kind: 'all' },
  { label: { en: 'Narrative', fr: 'Narratif' }, kind: 'narrative' },
  { label: { en: 'Heritage', fr: 'Patrimoine' }, kind: 'heritage' },
  { label: { en: 'XR', fr: 'XR' }, kind: 'xr' },
  { label: { en: 'Training', fr: 'Formation' }, kind: 'training' },
  {
    label: { en: 'Field archive', fr: 'Archive terrain' },
    kind: 'field-archive',
  },
  { label: { en: 'Simulation', fr: 'Simulation' }, kind: 'simulation' },
  {
    label: { en: 'Creative tech', fr: 'Creative tech' },
    kind: 'creative-tech',
  },
]

function WorkPage() {
  const { t } = usePreferences()
  const [activeFilter, setActiveFilter] = useState<ProjectKind | 'all'>('all')
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/work') {
    return <Outlet />
  }

  const visibleProjects =
    activeFilter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((project) =>
          project.kinds.includes(activeFilter),
        )

  return (
    <PageFrame>
      <section className="mx-auto max-w-[1480px] px-5 pb-16 pt-10 md:px-8">
        <SectionEyebrow>
          {t({ en: 'Selected work index', fr: 'Index projets' })}
        </SectionEyebrow>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <h1 className="text-6xl font-semibold leading-[0.95] text-[color:var(--ink)] md:text-8xl">
            {t({ en: 'Project index.', fr: 'Index des projets.' })}
          </h1>
          <div className="flex flex-col justify-end">
            <p className="max-w-[68ch] text-lg leading-8 text-[color:var(--muted)]">
              {t({
                en: 'A curated index of heritage, XR, teaching and field archive work. Every entry is structured around role, tools, outcomes and proof.',
                fr: 'Un index curaté de projets patrimoine, XR, formation et archive terrain. Chaque entrée est structurée autour du rôle, des outils, des résultats et des preuves.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.kind}
                  type="button"
                  aria-pressed={activeFilter === filter.kind}
                  onClick={() => setActiveFilter(filter.kind)}
                  className={[
                    'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition',
                    activeFilter === filter.kind
                      ? 'border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--canvas)]'
                      : 'border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--muted)] hover:border-[color:var(--heritage)] hover:text-[color:var(--ink)]',
                  ].join(' ')}
                >
                  {t(filter.label)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        key={activeFilter}
        className="work-grid mx-auto grid max-w-[1480px] gap-5 px-5 pb-24 md:px-8 lg:grid-cols-12"
      >
        {visibleProjects.map((project, index) => (
          <div
            key={project.slug}
            className={[
              'work-grid-item',
              index === 0
                ? 'lg:col-span-7'
                : index === 1
                  ? 'lg:col-span-5'
                  : index === 2
                    ? 'lg:col-span-5'
                    : index === 3
                      ? 'lg:col-span-7'
                      : 'lg:col-span-6',
            ].join(' ')}
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <ProjectTile
              project={project}
              emphasis={
                index === 0 || index === 3
                  ? 'hero'
                  : index > 3
                    ? 'strip'
                    : 'standard'
              }
            />
          </div>
        ))}
      </section>
    </PageFrame>
  )
}
