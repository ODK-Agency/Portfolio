import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Globe2, Play } from 'lucide-react'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'

import { PageFrame, SectionEyebrow } from '#/components/SiteShell'
import type { MediaItem } from '#/data/projects'
import { fieldLocations, getProject } from '#/data/projects'
import { usePreferences } from '#/lib/preferences'
import { seoLinks, seoMeta } from '#/lib/seo'

const PanoramaViewer = lazy(() =>
  import('#/components/PanoramaViewer').then((mod) => ({
    default: mod.PanoramaViewer,
  })),
)

export const Route = createFileRoute('/field-archive')({
  head: () => ({
    meta: seoMeta({
      title: 'Archive terrain Guinée | Mamadou Oury Diallo',
      description:
        'Archive terrain Guinée 360 avec médias spatiaux, lieux et matière de recherche patrimoniale.',
      path: '/field-archive',
    }),
    links: seoLinks('/field-archive'),
  }),
  component: FieldArchivePage,
})

function FieldArchivePage() {
  const { locale, t } = usePreferences()
  const project = getProject('guinea-360-field-captures')
  const media = useMemo(() => project?.media ?? [], [project?.media])
  const [activeId, setActiveId] = useState(media[0]?.id)
  const [viewerOpen, setViewerOpen] = useState(false)
  const activeMedia = media.find((item) => item.id === activeId) ?? media[0]

  useEffect(() => {
    setViewerOpen(false)
  }, [activeId])

  return (
    <PageFrame>
      <section className="mx-auto max-w-[1480px] px-5 py-16 md:px-8">
        <SectionEyebrow>
          {t({
            en: 'Guinea 360 field archive',
            fr: 'Archive terrain Guinée 360',
          })}
        </SectionEyebrow>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <h1 className="text-6xl font-semibold leading-[0.95] text-[color:var(--ink)] md:text-8xl">
            {t({
              en: 'Places before pixels.',
              fr: 'Les lieux avant les pixels.',
            })}
          </h1>
          <div className="flex flex-col justify-end gap-6">
            <p className="max-w-[68ch] text-lg leading-8 text-[color:var(--muted)]">
              {t({
                en: 'A growing 360 field archive from Guinea: routes, water, rocks, training contexts and landscape textures gathered as spatial proof for future heritage and mediation work.',
                fr: 'Une archive terrain 360 en construction depuis la Guinée: routes, eau, roches, contextes de formation et textures paysagères réunies comme preuve spatiale pour de futurs travaux patrimoniaux et de médiation.',
              })}
            </p>
            <Link
              to="/work/$slug"
              params={{ slug: 'guinea-360-field-captures' }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
            >
              {t({ en: 'Open case study', fr: 'Ouvrir l’étude de cas' })}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1480px] gap-5 px-5 pb-12 md:px-8 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--ink)]">
          <ArchiveMedia
            media={activeMedia}
            viewerOpen={viewerOpen}
            onOpenViewer={() => setViewerOpen(true)}
          />
          <div className="grid gap-4 p-6 text-[color:var(--canvas)] md:grid-cols-[0.72fr_0.28fr] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--signal)]">
                {t(activeMedia.title)}
              </p>
              <p className="mt-3 max-w-[62ch] leading-7 text-[color:var(--canvas)]/72">
                {t({
                  en: 'Each item opens inside the embedded 360 viewer. Drag inside the scene, zoom with the wheel, and play video layers when needed.',
                  fr: 'Chaque élément s’ouvre dans le viewer 360 intégré. Glisse dans la scène, zoome avec la molette et lance les couches vidéo quand nécessaire.',
                })}
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--canvas)]/18 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--canvas)]/78">
                <Globe2 size={14} aria-hidden="true" />
                360 layer
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {media.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              aria-pressed={item.id === activeMedia.id}
              className={[
                'grid min-h-24 grid-cols-[5rem_1fr_auto] items-center gap-4 rounded-[1.5rem] border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]',
                item.id === activeMedia.id
                  ? 'border-[color:var(--heritage)] bg-[color:var(--surface)]'
                  : 'border-[color:var(--border)] bg-[color:var(--surface)]/76 hover:-translate-y-0.5 hover:border-[color:var(--heritage)]',
              ].join(' ')}
            >
              <img
                src={item.fallbackImage ?? item.poster ?? project?.cover}
                alt=""
                width={400}
                height={400}
                decoding="async"
                className="aspect-square rounded-[1rem] object-cover"
                loading="lazy"
              />
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--heritage)]">
                  {item.kind}
                </span>
                <span className="mt-2 block text-base font-semibold leading-tight text-[color:var(--ink)]">
                  {t(item.title)}
                </span>
              </span>
              {item.kind === 'video' ? (
                <Play size={18} aria-hidden="true" />
              ) : (
                <Globe2 size={18} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1480px] gap-3 px-5 pb-24 md:grid-cols-4 md:px-8">
        {fieldLocations.map((location) => (
          <div
            key={location.name}
            className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
          >
            <p className="text-2xl font-semibold">{location.name}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--heritage)]">
              {location.coordinates}
            </p>
            <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
              {t(location.note)}
            </p>
          </div>
        ))}
      </section>
    </PageFrame>
  )
}

function ArchiveMedia({
  media,
  onOpenViewer,
  viewerOpen,
}: {
  media?: MediaItem
  onOpenViewer: () => void
  viewerOpen: boolean
}) {
  const { locale, t } = usePreferences()

  if (!media) {
    return (
      <div className="grid aspect-video place-items-center text-[color:var(--canvas)]/70">
        {t({ en: 'No field media loaded.', fr: 'Aucun média terrain chargé.' })}
      </div>
    )
  }

  if (media.is360 || media.kind === 'panorama360') {
    return viewerOpen ? (
      <Suspense fallback={<PanoramaSkeleton />}>
        <PanoramaViewer media={media} className="rounded-none border-0" />
      </Suspense>
    ) : (
      <button
        type="button"
        onClick={onOpenViewer}
        className="group relative block w-full overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--signal)]"
      >
        <img
          src={media.fallbackImage ?? media.poster ?? media.src}
          alt={media.alt[locale]}
          width={1920}
          height={1080}
          decoding="async"
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="eager"
          fetchPriority="high"
        />
        <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)]/76 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--canvas)] backdrop-blur">
          <Globe2 size={14} aria-hidden="true" />
          {t({ en: 'View 360', fr: 'Voir 360' })}
        </span>
      </button>
    )
  }

  if (media.kind === 'video') {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
        className="aspect-video w-full object-cover"
      >
        <source src={media.src} type="video/mp4" />
        {t({
          en: 'Your browser cannot play this video.',
          fr: 'Ton navigateur ne peut pas lire cette vidéo.',
        })}
      </video>
    )
  }

  return (
    <img
      src={media.src}
      alt={media.alt[locale]}
      width={1920}
      height={1080}
      decoding="async"
      className="aspect-video w-full object-cover"
      loading="lazy"
    />
  )
}

function PanoramaSkeleton() {
  return (
    <div className="grid aspect-video w-full place-items-center bg-[color:var(--ink)] text-[color:var(--canvas)]/70">
      <span className="font-mono text-xs uppercase tracking-[0.16em]">
        Loading 360 viewer...
      </span>
    </div>
  )
}
