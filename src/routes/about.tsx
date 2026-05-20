import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Cpu, Globe2, GraduationCap, MapPin } from 'lucide-react'

import { SocialLinks } from '#/components/SocialLinks'
import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { profile } from '#/config/profile'
import { usePreferences } from '#/lib/preferences'

export const Route = createFileRoute('/about')({ component: AboutPage })

const proofRows = [
  {
    icon: MapPin,
    label: { en: 'Base', fr: 'Base' },
    value: { en: 'Dakar, Senegal', fr: 'Dakar, Sénégal' },
  },
  {
    icon: Cpu,
    label: { en: 'Core tools', fr: 'Outils clés' },
    value: {
      en: 'Unity, C#, VR, 360 media, 3D workflows',
      fr: 'Unity, C#, VR, médias 360, workflows 3D',
    },
  },
  {
    icon: Globe2,
    label: { en: 'Public focus', fr: 'Focus public' },
    value: {
      en: 'Heritage, training, simulation and field archives',
      fr: 'Patrimoine, formation, simulation et archives terrain',
    },
  },
  {
    icon: GraduationCap,
    label: { en: 'Teaching layer', fr: 'Couche formation' },
    value: {
      en: 'Unity and XR learning programs in Dakar, Conakry and remote',
      fr: 'Programmes Unity et XR à Dakar, Conakry et en remote',
    },
  },
]

const workingNotes = [
  {
    title: { en: 'Proof first', fr: 'Preuve d’abord' },
    copy: {
      en: 'Projects are shown through roles, media, constraints and working interfaces, not inflated claims.',
      fr: 'Les projets sont montrés par les rôles, médias, contraintes et interfaces fonctionnelles, pas par des promesses gonflées.',
    },
  },
  {
    title: { en: 'Field material', fr: 'Matière terrain' },
    copy: {
      en: 'The cultural layer starts from places, voices, training rooms, archives and real production contexts.',
      fr: 'La couche culturelle part des lieux, voix, salles de formation, archives et contextes réels de production.',
    },
  },
  {
    title: { en: 'Useful XR', fr: 'XR utile' },
    copy: {
      en: 'VR and 3D are treated as tools for learning, mediation, simulation and transmission.',
      fr: 'La VR et la 3D sont traitées comme outils pour apprendre, transmettre, simuler et médiatiser.',
    },
  },
]

function AboutPage() {
  const { t } = usePreferences()

  return (
    <PageFrame>
      <section className="mx-auto grid max-w-[1480px] gap-8 overflow-hidden px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="min-w-0">
          <SectionEyebrow>{t({ en: 'About', fr: 'À propos' })}</SectionEyebrow>
          <h1 className="mt-5 max-w-[11ch] break-words text-[clamp(3rem,10vw,6.75rem)] font-semibold leading-[0.96] text-[color:var(--ink)] md:max-w-[12ch]">
            {t({
              en: 'Builder, teacher, field collector.',
              fr: 'Développeur, formateur, collecteur terrain.',
            })}
          </h1>
        </div>

        <div className="grid min-w-0 gap-5 md:grid-cols-[0.86fr_1.14fr] md:items-end">
          <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)]">
            <img
              src="/stills/profile/mamadou-oury-diallo.jpg"
              alt={t({
                en: 'Portrait of Mamadou Oury Diallo.',
                fr: 'Portrait de Mamadou Oury Diallo.',
              })}
              width={1200}
              height={1500}
              loading="eager"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--heritage)]">
              {profile.brandName}
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-[color:var(--ink)]">
              {profile.personName}
            </h2>
            <p className="mt-4 max-w-[42ch] text-base leading-7 text-[color:var(--muted)]">
              {t({
                en: 'XR developer and creative technologist building immersive systems for heritage, education and simulation.',
                fr: 'Développeur XR et creative technologist construisant des systèmes immersifs pour le patrimoine, l’éducation et la simulation.',
              })}
            </p>
            <SocialLinks className="mt-6" compact includeEmail={false} />
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-[color:var(--surface)]">
        <div className="mx-auto grid max-w-[1480px] gap-5 px-5 py-6 md:grid-cols-4 md:px-8">
          {proofRows.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label.en} className="min-w-0 py-2">
                <div className="flex items-center gap-2">
                  <Icon
                    className="text-[color:var(--heritage)]"
                    size={16}
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--heritage)]">
                    {t(item.label)}
                  </p>
                </div>
                <p className="mt-3 max-w-[28ch] text-sm font-semibold leading-6 text-[color:var(--ink)]">
                  {t(item.value)}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1480px] gap-10 px-5 py-20 md:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionEyebrow>
            {t({ en: 'Working position', fr: 'Position de travail' })}
          </SectionEyebrow>
          <p className="mt-5 max-w-[31ch] text-3xl font-semibold leading-tight text-[color:var(--ink)] md:text-5xl">
            {t({
              en: 'Technology is useful when it carries context.',
              fr: 'La technologie devient utile quand elle porte un contexte.',
            })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-[color:var(--canvas)] transition hover:-translate-y-0.5 hover:bg-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
            >
              {t({ en: 'View work', fr: 'Voir les projets' })}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
            >
              {t({ en: 'Start a conversation', fr: 'Ouvrir une discussion' })}
            </Link>
          </div>
        </div>

        <div className="grid gap-10">
          <div className="grid gap-6 text-lg leading-8 text-[color:var(--muted)]">
            <p className="max-w-[68ch]">
              {t({
                en: 'Mamadou Oury Diallo builds immersive and interactive systems across Unity, VR, 3D workflows, cultural mediation and technical education.',
                fr: 'Mamadou Oury Diallo construit des systèmes immersifs et interactifs entre Unity, VR, workflows 3D, médiation culturelle et formation technique.',
              })}
            </p>
            <p className="max-w-[68ch]">
              {t({
                en: 'The portfolio is organized around proof: institutional work, field captures, practical training and prototypes that can move from idea to working interface.',
                fr: 'Le portfolio est organisé autour des preuves: travail institutionnel, captations terrain, formation pratique et prototypes capables de passer de l’idée à l’interface fonctionnelle.',
              })}
            </p>
            <p className="max-w-[68ch]">
              {t({
                en: 'Janngo means tomorrow in pulaar. The studio layer exists to build useful futures from local memory, technical skill and production discipline.',
                fr: 'Janngo signifie demain en pulaar. La couche studio existe pour construire des futurs utiles à partir de mémoire locale, de compétence technique et de discipline de production.',
              })}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workingNotes.map((note) => (
              <div
                key={note.title.en}
                className="border-t border-[color:var(--border)] pt-5"
              >
                <h3 className="text-xl font-semibold text-[color:var(--ink)]">
                  {t(note.title)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {t(note.copy)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
