import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, MapPin } from 'lucide-react'

import { MediaFallback } from '#/components/ProjectShowcase'
import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { getProject } from '#/data/projects'
import { usePreferences } from '#/lib/preferences'
import { seoLinks, seoMeta } from '#/lib/seo'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return { project }
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project
    const path = project ? `/work/${project.slug}` : '/work'

    return {
      meta: seoMeta({
        title: project
          ? `${project.title} | Mamadou Oury Diallo`
          : 'Projet | Mamadou Oury Diallo',
        description:
          project?.summary.fr ??
          'Projets choisis en XR, patrimoine, formation et archives terrain.',
        path,
      }),
      links: seoLinks(path),
    }
  },
  component: WorkDetailPage,
})

function WorkDetailPage() {
  const { project } = Route.useLoaderData()
  const { locale, t } = usePreferences()

  return (
    <PageFrame>
      <article>
        <section className="mx-auto grid max-w-[1480px] gap-10 px-5 pb-16 pt-10 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="min-w-0">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t({ en: 'Back to work', fr: 'Retour aux projets' })}
            </Link>
            <SectionEyebrow>
              {project.kinds.map((kind) => t(kindLabels[kind])).join(' / ')}
            </SectionEyebrow>
            <h1 className="mt-5 max-w-[10.5ch] break-words text-[clamp(2.45rem,10.2vw,4.5rem)] font-semibold leading-[1.02] text-[color:var(--ink)] md:max-w-full md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[34ch] text-lg leading-8 text-[color:var(--muted)] md:max-w-[62ch]">
              {t(project.summary)}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[color:var(--surface)] px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]">
            <img
              src={project.cover}
              alt={project.coverAlt[locale]}
              width={1920}
              height={1440}
              decoding="async"
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </section>

        <section className="border-y border-[color:var(--border)] bg-[color:var(--surface)]">
          <div className="mx-auto grid max-w-[1480px] gap-6 px-5 py-8 md:grid-cols-4 md:px-8">
            <InfoBlock
              label={t({ en: 'Year', fr: 'Année' })}
              value={project.year}
            />
            <InfoBlock
              label={t({ en: 'Location', fr: 'Lieu' })}
              value={
                project.location ??
                t({ en: 'Remote and studio', fr: 'Remote et studio' })
              }
            />
            <InfoBlock
              label={t({ en: 'Role', fr: 'Rôle' })}
              value={project.role[locale]}
            />
            <InfoBlock
              label={t({ en: 'Status', fr: 'Statut' })}
              value={t(statusLabels[project.status])}
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-[1480px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {project.caseStudySections?.origin ? (
              <NarrativeBlock
                title={t({ en: 'Origin', fr: 'Origine' })}
                copy={t(project.caseStudySections.origin)}
              />
            ) : null}
            {project.caseStudySections?.experience ? (
              <NarrativeBlock
                title={t({ en: 'Experience', fr: 'Expérience' })}
                copy={t(project.caseStudySections.experience)}
              />
            ) : null}
            <NarrativeBlock
              title={t({ en: 'Impact', fr: 'Impact' })}
              copy={t(project.impact)}
            />
            {project.caseStudySections ? (
              <>
                <NarrativeBlock
                  title={t({ en: 'Challenge', fr: 'Enjeu' })}
                  copy={t(project.caseStudySections.challenge)}
                />
                <NarrativeBlock
                  title={t({ en: 'Contribution', fr: 'Contribution' })}
                  copy={t(project.caseStudySections.contribution)}
                />
                <NarrativeBlock
                  title={t({ en: 'Proof', fr: 'Preuve' })}
                  copy={t(project.caseStudySections.proof)}
                />
              </>
            ) : null}
            {project.location ? (
              <div className="flex items-start gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <MapPin
                  className="mt-1 text-[color:var(--heritage)]"
                  size={18}
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-[color:var(--muted)]">
                  {project.location}
                </p>
              </div>
            ) : null}
          </div>
          <MediaFallback project={project} />
        </section>
      </article>
    </PageFrame>
  )
}

const kindLabels = {
  heritage: { en: 'Heritage', fr: 'Patrimoine' },
  xr: { en: 'XR', fr: 'XR' },
  training: { en: 'Training', fr: 'Formation' },
  'field-archive': { en: 'Field archive', fr: 'Archive terrain' },
  simulation: { en: 'Simulation', fr: 'Simulation' },
  'creative-tech': { en: 'Creative technology', fr: 'Creative technology' },
  lab: { en: 'Lab note', fr: 'Note de lab' },
} as const

const statusLabels = {
  published: { en: 'Case study', fr: 'Étude de cas' },
  'short-entry': { en: 'Short entry', fr: 'Entrée courte' },
  hold: { en: 'Private', fr: 'Privé' },
} as const

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--heritage)]">
        {label}
      </p>
      <p className="mt-2 max-w-[32ch] break-words text-sm font-semibold leading-6 text-[color:var(--ink)] md:max-w-none">
        {value}
      </p>
    </div>
  )
}

function NarrativeBlock({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-[color:var(--ink)]">
        {title}
      </h2>
      <p className="mt-3 max-w-[68ch] text-base leading-7 text-[color:var(--muted)]">
        {copy}
      </p>
    </div>
  )
}
