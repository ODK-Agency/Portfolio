import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { usePreferences } from '#/lib/preferences'
import { seoLinks, seoMeta } from '#/lib/seo'

export const Route = createFileRoute('/teaching')({
  head: () => ({
    meta: seoMeta({
      title: 'Formation | Mamadou Oury Diallo',
      description:
        'Formations Unity, C#, XR et VR par Mamadou Oury Diallo à Dakar, Conakry et dans des programmes panafricains.',
      path: '/teaching',
    }),
    links: seoLinks('/teaching'),
  }),
  component: TeachingPage,
})

const teachingStats = [
  {
    value: '200+',
    label: {
      en: 'developers trained in Unity, C# and XR',
      fr: 'développeurs formés en Unity, C# et XR',
    },
  },
  {
    value: '17',
    label: {
      en: 'African countries reached through Imisi 3D',
      fr: 'pays africains touchés avec Imisi 3D',
    },
  },
  {
    value: '3',
    label: {
      en: 'MVP teams mentored over three months',
      fr: 'équipes MVP mentorées sur trois mois',
    },
  },
  {
    value: '7+',
    label: {
      en: 'years building immersive experiences',
      fr: 'ans de production immersive',
    },
  },
]

const trainingContexts = [
  {
    title: { en: 'Imisi 3D AR/VR Metathon', fr: 'Imisi 3D AR/VR Metathon' },
    meta: {
      en: '17 countries, Unity VR curriculum, 1:1 mentoring',
      fr: '17 pays, curriculum Unity VR, mentoring 1:1',
    },
    copy: {
      en: 'Designed and delivered a VR Development on Unity curriculum for francophone learners, then supported teams through MVP development.',
      fr: 'Conception et animation d’un curriculum VR Development on Unity pour des apprenants francophones, puis accompagnement d’équipes jusqu’au MVP.',
    },
  },
  {
    title: { en: 'UCAD CURI', fr: 'UCAD CURI' },
    meta: {
      en: '3 cohorts, around 60 students',
      fr: '3 cohortes, environ 60 étudiants',
    },
    copy: {
      en: 'XR training sessions around VR, AR, MR, Unity scenes and headset deployment, with participant projects reviewed along the way.',
      fr: 'Sessions XR autour de VR, AR, MR, scènes Unity et déploiement casque, avec review des projets participants.',
    },
  },
  {
    title: { en: 'ESMT Dakar', fr: 'ESMT Dakar' },
    meta: {
      en: '2 classes, around 40 students',
      fr: '2 classes, environ 40 étudiants',
    },
    copy: {
      en: 'Introductory VR sessions built around use cases, interactive demonstrations and student exchanges.',
      fr: 'Sessions de découverte VR autour des cas d’usage, démonstrations interactives et échanges avec les étudiants.',
    },
  },
  {
    title: {
      en: 'Orange Digital Center Guinea',
      fr: 'Orange Digital Center Guinea',
    },
    meta: {
      en: 'Conakry, around 20 learners',
      fr: 'Conakry, environ 20 apprenants',
    },
    copy: {
      en: 'Game programming and Unity practice for learners entering interactive production.',
      fr: 'Game programming et pratique Unity pour des apprenants entrant dans la production interactive.',
    },
  },
  {
    title: { en: 'UAM Diamniadio', fr: 'UAM Diamniadio' },
    meta: { en: '2 cohorts', fr: '2 cohortes' },
    copy: {
      en: 'University cohort work around XR discovery, technical framing and prototype thinking.',
      fr: 'Travail de cohorte universitaire autour de la découverte XR, du cadrage technique et de la pensée prototype.',
    },
  },
  {
    title: { en: 'ADMI and Go My Code', fr: 'ADMI et Go My Code' },
    meta: {
      en: 'Game programming and development instruction',
      fr: 'Formation game programming et game development',
    },
    copy: {
      en: 'Earlier teaching roles that built the foundation for practical Unity, C# and gameplay instruction.',
      fr: 'Rôles de formation antérieurs qui ont construit la base pédagogique en Unity, C# et gameplay.',
    },
  },
]

const teachingMethods = [
  {
    title: { en: 'Build first', fr: 'Construire d’abord' },
    copy: {
      en: 'Learners start from a working scene, then add concepts as the prototype needs them.',
      fr: 'Les apprenants partent d’une scène fonctionnelle, puis ajoutent les concepts quand le prototype en a besoin.',
    },
  },
  {
    title: { en: 'Debug as a habit', fr: 'Déboguer comme pratique' },
    copy: {
      en: 'The course rhythm includes reading errors, isolating causes and building confidence with technical friction.',
      fr: 'Le rythme pédagogique inclut lecture d’erreurs, isolation des causes et confiance face à la friction technique.',
    },
  },
  {
    title: { en: 'Prototype to explain', fr: 'Prototyper pour expliquer' },
    copy: {
      en: 'A learner should be able to show what they made, explain why it works and defend the next iteration.',
      fr: 'Un apprenant doit pouvoir montrer ce qu’il a fait, expliquer pourquoi ça fonctionne et défendre l’itération suivante.',
    },
  },
]

const teachingImages = [
  {
    src: '/stills/teaching-live/odc-huawei-esmt-group.jpg',
    alt: {
      en: 'Training group in a classroom context with Orange Digital Center and Huawei Academy visual markers.',
      fr: 'Groupe de formation en salle avec marqueurs visuels Orange Digital Center et Huawei Academy.',
    },
    label: { en: 'Training cohort', fr: 'Cohorte formation' },
  },
  {
    src: '/stills/teaching-live/training-group-exterior.jpg',
    alt: {
      en: 'Outdoor group photo with learners and instructors after a training session.',
      fr: 'Photo de groupe en extérieur avec apprenants et formateurs après une session.',
    },
    label: { en: 'Learner community', fr: 'Communauté apprenante' },
  },
  {
    src: '/stills/teaching/unity-training-screen.png',
    alt: {
      en: 'Unity interface used as visual proof for training work.',
      fr: 'Interface Unity utilisée comme preuve visuelle du travail de formation.',
    },
    label: { en: 'Unity practice', fr: 'Pratique Unity' },
  },
]

function TeachingPage() {
  const { locale, t } = usePreferences()

  return (
    <PageFrame>
      <section className="mx-auto grid max-w-[1480px] gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <SectionEyebrow>
            {t({
              en: 'Unity and XR teaching',
              fr: 'Formation Unity et XR',
            })}
          </SectionEyebrow>
          <h1 className="mt-5 max-w-[9.5ch] text-[clamp(2.65rem,10.4vw,6rem)] font-semibold leading-[0.95] text-[color:var(--ink)] md:text-8xl">
            {t({
              en: 'From syntax to working prototypes.',
              fr: 'De la syntaxe au prototype fonctionnel.',
            })}
          </h1>
          <p className="mt-7 max-w-[58ch] text-lg leading-8 text-[color:var(--muted)]">
            {t({
              en: 'Training 200+ developers across Unity, C#, XR and prototype production, with cohorts in Dakar, Conakry and pan-African programs.',
              fr: 'Plus de 200 développeurs formés à Unity, C#, XR et à la production de prototypes, avec des cohortes à Dakar, Conakry et dans des programmes panafricains.',
            })}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[color:var(--heritage)] px-6 py-3 text-sm font-semibold text-[color:var(--canvas)] transition hover:-translate-y-0.5 hover:bg-[color:var(--field)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
          >
            {t({
              en: 'Build a training program',
              fr: 'Construire une formation',
            })}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid min-w-0 gap-8">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {teachingStats.map((stat) => (
              <div
                key={stat.value}
                className="border-t border-[color:var(--border)] pt-5"
              >
                <p className="text-4xl font-semibold text-[color:var(--ink)]">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {t(stat.label)}
                </p>
              </div>
            ))}
          </div>

          <div className="teaching-gallery grid gap-4 md:grid-cols-12">
            {teachingImages.map((image, index) => (
              <figure
                key={image.src}
                className={[
                  'overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)]',
                  index === 0 ? 'md:col-span-6' : 'md:col-span-3',
                ].join(' ')}
              >
                <img
                  src={image.src}
                  alt={image.alt[locale]}
                  width={1600}
                  height={1000}
                  decoding="async"
                  className="aspect-[16/11] w-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <figcaption className="border-t border-[color:var(--border)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {t(image.label)}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {trainingContexts.map((context) => (
              <article
                key={context.title.en}
                className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--heritage)]">
                  {t(context.meta)}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-[color:var(--ink)]">
                  {t(context.title)}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                  {t(context.copy)}
                </p>
              </article>
            ))}
          </div>

          <div className="border-y border-[color:var(--border)]">
            {teachingMethods.map((method, index) => (
              <article
                key={method.title.en}
                className="grid gap-4 border-b border-[color:var(--border)] py-6 last:border-b-0 md:grid-cols-[0.16fr_0.3fr_0.54fr]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--heritage)]">
                  0{index + 1}
                </p>
                <h2 className="text-2xl font-semibold text-[color:var(--ink)]">
                  {t(method.title)}
                </h2>
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  {t(method.copy)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
