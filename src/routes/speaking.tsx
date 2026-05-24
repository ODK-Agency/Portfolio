import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Mic2 } from 'lucide-react'

import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { usePreferences } from '#/lib/preferences'
import { seoLinks, seoMeta } from '#/lib/seo'

export const Route = createFileRoute('/speaking')({
  head: () => ({
    meta: seoMeta({
      title: 'Interventions | Mamadou Oury Diallo',
      description:
        'Panels, mentorat XR, écosystème immersif africain et interventions publiques de Mamadou Oury Diallo.',
      path: '/speaking',
    }),
    links: seoLinks('/speaking'),
  }),
  component: SpeakingPage,
})

const appearances = [
  {
    title: {
      en: 'International Partnerships Lead, Teranga Game Makers',
      fr: 'International Partnerships Lead, Teranga Game Makers',
    },
    meta: {
      en: '2025 to 2026, Senegal',
      fr: '2025 à 2026, Sénégal',
    },
    copy: {
      en: 'Coordination with the Embassy of Senegal in Poland, in connection with Ambassador Diamane Diome, as part of Be Ubuntu Senegal. Mobilizing the local community for the presence of Senegalese studios in international game jams.',
      fr: 'Coordination avec l’Ambassade du Sénégal en Pologne, en lien avec l’Ambassadeur Diamane Diome, dans le cadre de Be Ubuntu Senegal. Mobilisation de la communauté locale pour la présence des studios sénégalais en game jams internationaux.',
    },
  },
  {
    title: { en: 'eFest Africa 2026', fr: 'eFest Africa 2026' },
    meta: { en: 'Panel, Dakar', fr: 'Panel, Dakar' },
    copy: {
      en: 'Conversation around gaming, AI, music, XR and the transformation of African culture into interactive and immersive experiences.',
      fr: 'Conversation autour du gaming, de l’IA, de la musique, de la XR et de la transformation de la culture africaine en expériences interactives et immersives.',
    },
  },
  {
    title: {
      en: 'XR Design Challenge 2024',
      fr: 'XR Design Challenge 2024',
    },
    meta: {
      en: 'Mentor, Immersive Insiders with Meta, ShapesXR and IDEO',
      fr: 'Mentor, Immersive Insiders avec Meta, ShapesXR et IDEO',
    },
    copy: {
      en: 'Mentoring teams on the move from 2D ideas to XR concepts, with practical review on framing, interaction and prototype direction.',
      fr: 'Mentorat d’équipes sur le passage des idées 2D aux concepts XR, avec review pratique du cadrage, de l’interaction et de la direction prototype.',
    },
  },
  {
    title: { en: 'Be Ubuntu Game Jam', fr: 'Be Ubuntu Game Jam' },
    meta: {
      en: '96 hours, 3 continents, 5 countries',
      fr: '96 heures, 3 continents, 5 pays',
    },
    copy: {
      en: 'A collaborative production sprint with Teranga Game Makers, connecting African and European contributors around a playable prototype.',
      fr: 'Sprint de production collaborative avec Teranga Game Makers, reliant des contributeurs africains et européens autour d’un prototype jouable.',
    },
  },
  {
    title: { en: 'ASCA-XR', fr: 'ASCA-XR' },
    meta: {
      en: 'Animation and extended reality ecosystem',
      fr: 'Écosystème animation et réalités étendues',
    },
    copy: {
      en: 'Participation in community work around animation, XR and the structuring of local immersive practices in Senegal.',
      fr: 'Participation au travail communautaire autour de l’animation, de la XR et de la structuration des pratiques immersives locales au Sénégal.',
    },
  },
]

const topics = [
  {
    en: 'XR for education',
    fr: 'XR pour l’éducation',
  },
  {
    en: 'Unity learning pathways',
    fr: 'Parcours d’apprentissage Unity',
  },
  {
    en: 'African immersive ecosystems',
    fr: 'Écosystèmes immersifs africains',
  },
  {
    en: 'Cultural heritage and interactive media',
    fr: 'Patrimoine culturel et médias interactifs',
  },
  {
    en: 'From prototype to public experience',
    fr: 'Du prototype à l’expérience publique',
  },
]

function SpeakingPage() {
  const { t } = usePreferences()

  return (
    <PageFrame>
      <section className="mx-auto grid max-w-[1480px] gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <SectionEyebrow>
            {t({
              en: 'Speaking and mentoring',
              fr: 'Interventions et mentoring',
            })}
          </SectionEyebrow>
          <h1 className="mt-5 max-w-[9.5ch] text-[clamp(2.65rem,10vw,6rem)] font-semibold leading-[0.95] text-[color:var(--ink)] md:text-8xl">
            {t({
              en: 'XR, culture and practical prototypes.',
              fr: 'XR, culture et prototypes concrets.',
            })}
          </h1>
          <p className="mt-7 max-w-[58ch] text-lg leading-8 text-[color:var(--muted)]">
            {t({
              en: 'I speak and mentor around XR, Unity education, African creative technology and the practical path from prototype to public experience.',
              fr: 'J’interviens et je mentore autour de la XR, de la formation Unity, des écosystèmes créatifs africains et du passage du prototype à l’expérience publique.',
            })}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[color:var(--heritage)] px-6 py-3 text-sm font-semibold text-[color:var(--canvas)] transition hover:-translate-y-0.5 hover:bg-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
          >
            {t({
              en: 'Invite Oury',
              fr: 'Inviter Oury',
            })}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid min-w-0 gap-8">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[color:var(--ink)] text-[color:var(--canvas)]">
                <Mic2 size={20} aria-hidden="true" />
              </span>
              <p className="max-w-[66ch] text-xl font-semibold leading-8 text-[color:var(--ink)]">
                {t({
                  en: 'From panels to 96-hour game jams, the work stays practical: help teams frame ideas, build fast, review clearly and ship something they can defend.',
                  fr: 'Des panels aux game jams de 96 heures, l’approche reste pratique: aider les équipes à cadrer, construire vite, reviewer clairement et livrer quelque chose qu’elles peuvent défendre.',
                })}
              </p>
            </div>
          </div>

          <figure className="overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)]">
            <img
              src="/stills/speaking-efest-panel.jpg"
              alt={t({
                en: 'Mamadou Oury Diallo speaking with a microphone during an eFest Africa panel.',
                fr: 'Mamadou Oury Diallo intervient avec un micro pendant un panel eFest Africa.',
              })}
              className="h-full min-h-[320px] w-full object-cover object-[50%_34%] md:aspect-[16/10] md:min-h-0 lg:aspect-[16/9]"
              loading="eager"
              decoding="async"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border)] px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--heritage)]">
                {t({ en: 'Panel evidence', fr: 'Preuve panel' })}
              </span>
              <span className="max-w-[48ch] text-sm leading-6 text-[color:var(--muted)]">
                {t({
                  en: 'eFest Africa, public conversation on gaming, AI, music and XR.',
                  fr: 'eFest Africa, conversation publique sur le gaming, l’IA, la musique et la XR.',
                })}
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-4 md:grid-cols-2">
            {appearances.map((appearance) => (
              <article
                key={appearance.title.en}
                className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--heritage)]">
                  {t(appearance.meta)}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-[color:var(--ink)]">
                  {t(appearance.title)}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  {t(appearance.copy)}
                </p>
              </article>
            ))}
          </div>

          <div className="border-y border-[color:var(--border)] py-6">
            <SectionEyebrow>{t({ en: 'Topics', fr: 'Sujets' })}</SectionEyebrow>
            <div className="mt-5 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic.en}
                  className="rounded-full bg-[color:var(--surface)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)]"
                >
                  {t(topic)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
