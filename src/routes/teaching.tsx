import { createFileRoute } from '@tanstack/react-router'

import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import { usePreferences } from '#/lib/preferences'
import { seoLinks, seoMeta } from '#/lib/seo'

export const Route = createFileRoute('/teaching')({
  head: () => ({
    meta: seoMeta({
      title: 'Formation | Mamadou Oury Diallo',
      description:
        'Travail de formation Unity, XR et creative technology par Mamadou Oury Diallo.',
      path: '/teaching',
    }),
    links: seoLinks('/teaching'),
  }),
  component: TeachingPage,
})

const teachingProofs = [
  {
    title: {
      en: 'Africa Digital Academy, Conakry',
      fr: 'Africa Digital Academy, Conakry',
    },
    meta: {
      en: 'Unity course, Orange Digital Center context',
      fr: 'Cours Unity, contexte Orange Digital Center',
    },
    copy: {
      en: 'A practical Unity training block built around scene structure, C# logic, interaction loops and prototype confidence for learners moving toward immersive production.',
      fr: 'Un bloc de formation Unity pratique autour de la structure de scène, de la logique C#, des boucles d’interaction et de la confiance prototype pour des apprenants qui entrent dans la production immersive.',
    },
  },
  {
    title: { en: 'XR mentoring', fr: 'Mentoring XR' },
    meta: {
      en: 'From tool discovery to headset delivery',
      fr: 'De la découverte outil à la livraison casque',
    },
    copy: {
      en: 'The teaching work is not only syntax. It connects creative intent, constraints, debugging habits and the production choices that make XR prototypes hold together.',
      fr: 'Le travail pédagogique ne se limite pas à la syntaxe. Il relie intention créative, contraintes, habitudes de debug et choix de production qui rendent un prototype XR solide.',
    },
  },
  {
    title: { en: 'Program design', fr: 'Design pédagogique' },
    meta: {
      en: 'Courses, reviews, exercises and applied labs',
      fr: 'Cours, reviews, exercices et labs appliqués',
    },
    copy: {
      en: 'Workshops are shaped around visible progress: one concept, one working scene, one review loop, then a cleaner iteration learners can explain and defend.',
      fr: 'Les ateliers sont construits autour d’un progrès visible: un concept, une scène fonctionnelle, une boucle de review, puis une itération plus propre que les apprenants peuvent expliquer et défendre.',
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
    src: '/stills/teaching/orange-digital-context.png',
    alt: {
      en: 'Orange Digital Center related visual context.',
      fr: 'Contexte visuel lié à Orange Digital Center.',
    },
    label: { en: 'Conakry teaching context', fr: 'Contexte formation Conakry' },
  },
  {
    src: '/stills/teaching/unity-training-screen.png',
    alt: {
      en: 'Unity interface used as visual proof for training work.',
      fr: 'Interface Unity utilisée comme preuve visuelle du travail de formation.',
    },
    label: { en: 'Unity practice', fr: 'Pratique Unity' },
  },
  {
    src: '/stills/teaching/unity-master-screen.png',
    alt: {
      en: 'Unity editor capture from training and production material.',
      fr: 'Capture éditeur Unity issue de matières de formation et production.',
    },
    label: { en: 'Production habits', fr: 'Habitudes production' },
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
              en: 'Teaching and program work',
              fr: 'Formation et programmes',
            })}
          </SectionEyebrow>
          <h1 className="mt-5 max-w-[8.5ch] text-[clamp(2.65rem,10.4vw,6rem)] font-semibold leading-[0.95] text-[color:var(--ink)] md:max-w-[10ch] md:text-8xl">
            {t({
              en: 'Turning tools into practice.',
              fr: 'Transformer les outils en pratique.',
            })}
          </h1>
          <p className="mt-7 max-w-[31ch] text-lg leading-8 text-[color:var(--muted)] sm:max-w-[58ch]">
            {t({
              en: 'The teaching side of the portfolio proves the same thing as the XR work: Mamadou Oury Diallo makes complex systems understandable, usable and ready for people who need to build with them.',
              fr: 'La partie formation du portfolio prouve la même chose que le travail XR: Mamadou Oury Diallo rend des systèmes complexes compréhensibles, utilisables et prêts pour des personnes qui doivent construire avec.',
            })}
          </p>
        </div>

        <div className="grid min-w-0 gap-5">
          <div className="teaching-gallery grid gap-4 md:grid-cols-12">
            {teachingImages.map((image, index) => (
              <figure
                key={image.src}
                className={[
                  'overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)]',
                  index === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5',
                ].join(' ')}
              >
                <img
                  src={image.src}
                  alt={image.alt[locale]}
                  width={index === 0 ? 1200 : 1600}
                  height={index === 0 ? 1500 : 1000}
                  decoding="async"
                  className={[
                    'w-full object-cover',
                    index === 0 ? 'aspect-[4/5] h-full' : 'aspect-[16/10]',
                  ].join(' ')}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <figcaption className="border-t border-[color:var(--border)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {t(image.label)}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="grid gap-3">
            {teachingProofs.map((proof, index) => (
              <article
                key={proof.title.en}
                className="grid gap-5 border-t border-[color:var(--border)] py-6 md:grid-cols-[0.18fr_0.32fr_0.5fr]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--heritage)]">
                  0{index + 1}
                </p>
                <div>
                  <h2 className="text-2xl font-semibold text-[color:var(--ink)]">
                    {t(proof.title)}
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
                    {t(proof.meta)}
                  </p>
                </div>
                <p className="max-w-[68ch] text-sm leading-7 text-[color:var(--muted)]">
                  {t(proof.copy)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
