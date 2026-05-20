import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { InteractiveProjectHero } from '#/components/InteractiveProjectHero'
import { ProjectTile } from '#/components/ProjectShowcase'
import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { featuredProjects, fieldLocations } from '#/data/projects'
import { usePreferences } from '#/lib/preferences'

export const Route = createFileRoute('/')({ component: Home })

const productionSignals = [
  {
    label: { en: 'Institutional heritage', fr: 'Patrimoine institutionnel' },
    proof: {
      en: 'Micro-Folie with Institut français, Musée Théodore Monod and ASHIA',
      fr: 'Micro-Folie avec Institut français, Musée Théodore Monod et ASHIA',
    },
    artifact: {
      en: 'Digitization, mediation workflow, public cultural material',
      fr: 'Numérisation, workflow de médiation, contenus culturels publics',
    },
  },
  {
    label: { en: 'Field archive', fr: 'Archive terrain' },
    proof: {
      en: '360 captures from Conakry, Lélouma, Labé and Korbé',
      fr: 'Captations 360 de Conakry, Lélouma, Labé et Korbé',
    },
    artifact: {
      en: 'Spatial media, location notes and lightweight public previews',
      fr: 'Médias spatiaux, notes de lieux et previews publiques légères',
    },
  },
  {
    label: { en: 'XR delivery', fr: 'Production XR' },
    proof: {
      en: 'Grande Vadrouille VR, Langa Bouri, PortSafe VR and YangoVR production paths',
      fr: 'Parcours de production Grande Vadrouille VR, Langa Bouri, PortSafe VR et YangoVR',
    },
    artifact: {
      en: 'Unity, C#, Meta Quest, interaction design, 3D integration',
      fr: 'Unity, C#, Meta Quest, interaction design, intégration 3D',
    },
  },
  {
    label: { en: 'Transmission', fr: 'Transmission' },
    proof: {
      en: 'Africa Digital Academy Unity training at Orange Digital Center Conakry',
      fr: 'Formation Unity Africa Digital Academy à Orange Digital Center Conakry',
    },
    artifact: {
      en: 'Course delivery, mentoring, practical prototype guidance',
      fr: 'Animation de cours, mentoring, accompagnement de prototypes',
    },
  },
]

function Home() {
  const { t } = usePreferences()
  const microFolie = featuredProjects[0]
  const otherFeatured = featuredProjects.slice(1, 5)

  return (
    <PageFrame>
      <InteractiveProjectHero projects={featuredProjects} />

      <section className="mx-auto max-w-[1480px] px-5 py-24 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>
              {t({ en: 'Selected work', fr: 'Projets choisis' })}
            </SectionEyebrow>
            <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-[color:var(--ink)] md:text-7xl">
              {t({ en: 'Selected case files.', fr: 'Études de cas choisies.' })}
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--heritage)] hover:bg-[color:var(--surface)]"
          >
            {t({ en: 'Open all work', fr: 'Voir tous les projets' })}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <ProjectTile project={microFolie} emphasis="hero" />
          <div className="grid gap-5">
            {otherFeatured.map((project, index) => (
              <ProjectTile
                key={project.slug}
                project={project}
                emphasis={index === 2 ? 'strip' : 'standard'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--ink)] text-[color:var(--canvas)]">
        <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <div>
            <SectionEyebrow>
              {t({ en: 'Field archive', fr: 'Archive terrain' })}
            </SectionEyebrow>
            <h2 className="mt-4 text-5xl font-semibold leading-tight md:text-7xl">
              {t({
                en: 'Guinea as spatial memory.',
                fr: 'La Guinée comme mémoire spatiale.',
              })}
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-8 text-[color:var(--canvas)]/68">
              {t({
                en: 'The archive is a navigable layer for 360 captures, locations and captions. It connects field evidence from Guinea with the same interaction discipline used in XR production.',
                fr: 'L’archive est une couche navigable pour captations 360, lieux et légendes. Elle relie les preuves de terrain de Guinée à la même discipline d’interaction utilisée en production XR.',
              })}
            </p>
          </div>
          <div className="grid gap-3">
            {fieldLocations.map((location) => (
              <div
                key={location.name}
                className="grid gap-4 rounded-[1.5rem] border border-[color:var(--canvas)]/12 bg-[color:var(--canvas)]/6 p-5 md:grid-cols-[0.45fr_0.55fr]"
              >
                <div>
                  <p className="text-2xl font-semibold">{location.name}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--signal)]">
                    {location.coordinates}
                  </p>
                </div>
                <p className="text-sm leading-6 text-[color:var(--canvas)]/70">
                  {t(location.note)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-24 md:px-8">
        <div className="border-y border-[color:var(--border)]">
          {productionSignals.map((signal, index) => (
            <div
              key={signal.label.en}
              className="grid gap-4 border-b border-[color:var(--border)] py-7 last:border-b-0 md:grid-cols-[0.16fr_0.28fr_0.56fr] md:items-center"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--heritage)]">
                0{index + 1}
              </p>
              <h3 className="text-2xl font-semibold text-[color:var(--ink)]">
                {t(signal.label)}
              </h3>
              <div className="grid gap-2 md:grid-cols-2">
                <p className="text-sm leading-6 text-[color:var(--ink)]">
                  {t(signal.proof)}
                </p>
                <p className="text-sm leading-6 text-[color:var(--muted)]">
                  {t(signal.artifact)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageFrame>
  )
}
