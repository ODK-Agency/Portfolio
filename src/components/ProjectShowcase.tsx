import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Box, Film, Globe2, ImageIcon } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'

import type { MediaItem, MediaKind, PortfolioProject } from '#/data/projects'
import { usePreferences } from '#/lib/preferences'

const PanoramaViewer = lazy(() =>
  import('./PanoramaViewer').then((mod) => ({ default: mod.PanoramaViewer })),
)

function MediaIcon({ kind }: { kind: MediaKind }) {
  if (kind === 'video') return <Film size={15} aria-hidden="true" />
  if (kind === 'panorama360') return <Globe2 size={15} aria-hidden="true" />
  if (kind === 'model3d') return <Box size={15} aria-hidden="true" />
  return <ImageIcon size={15} aria-hidden="true" />
}

export function ProjectTile({
  project,
  emphasis = 'standard',
}: {
  project: PortfolioProject
  emphasis?: 'hero' | 'standard' | 'strip'
}) {
  const { locale, t } = usePreferences()
  const isHero = emphasis === 'hero'
  const isStrip = emphasis === 'strip'

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className={[
        'group relative block overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]',
        'hover:-translate-y-1 hover:border-[color:var(--heritage)]',
        isHero ? 'min-h-[560px]' : isStrip ? 'min-h-[260px]' : 'min-h-[420px]',
      ].join(' ')}
    >
      <img
        src={project.cover}
        alt={project.coverAlt[locale]}
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority={isHero ? 'high' : 'auto'}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        loading={isHero ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-[color:var(--ink)]/45 to-transparent" />
      <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[color:var(--canvas)]/25 bg-[color:var(--ink)]/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--canvas)] backdrop-blur"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-[color:var(--canvas)] md:p-7">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--signal)]">
          <span>{project.year}</span>
          {project.location ? <span>{project.location}</span> : null}
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold leading-tight md:text-4xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-[56ch] text-sm leading-6 text-[color:var(--canvas)]/78">
              {t(project.summary)}
            </p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[color:var(--canvas)] text-[color:var(--ink)] transition group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </div>
        {project.media.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.media.map((media) => (
              <span
                key={media.id}
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--canvas)]/10 px-3 py-1 text-xs text-[color:var(--canvas)]/82"
              >
                <MediaIcon kind={media.kind} />
                {media.kind}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export function MediaFallback({ project }: { project: PortfolioProject }) {
  const { locale, t } = usePreferences()
  const [primaryViewerOpen, setPrimaryViewerOpen] = useState(false)

  if (project.media.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--heritage)]">
          {t({ en: 'Case material', fr: 'Matière projet' })}
        </p>
        <p className="mt-3 max-w-[52ch] text-sm leading-6 text-[color:var(--muted)]">
          {t({
            en: 'Screenshots, excerpts and source material will be attached once the public case study assets are cleared.',
            fr: 'Captures, extraits et matières sources seront ajoutés quand les assets publics seront validés.',
          })}
        </p>
      </div>
    )
  }

  const [firstMedia, ...otherMedia] = project.media

  if (firstMedia.kind === 'video') {
    return (
      <div className="grid gap-4">
        <figure className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--ink)]">
          {firstMedia.is360 && primaryViewerOpen ? (
            <PanoramaFrame
              media={firstMedia}
              className="rounded-none border-0"
            />
          ) : firstMedia.is360 ? (
            <PrimaryPanoramaPrompt
              media={firstMedia}
              fallback={firstMedia.poster ?? project.cover}
              onOpen={() => setPrimaryViewerOpen(true)}
            />
          ) : (
            <video
              controls
              playsInline
              preload="metadata"
              poster={firstMedia.poster}
              className="aspect-video w-full object-cover"
              aria-label={firstMedia.alt[locale]}
            >
              <source src={firstMedia.src} type="video/mp4" />
              {t({
                en: 'Your browser cannot play this video.',
                fr: 'Ton navigateur ne peut pas lire cette vidéo.',
              })}
            </video>
          )}
          <figcaption className="p-4 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--canvas)]/68">
            {t(firstMedia.title)}
          </figcaption>
        </figure>
        <MediaGrid media={otherMedia} />
      </div>
    )
  }

  if (firstMedia.kind === 'panorama360') {
    return (
      <div className="grid gap-4">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--ink)]">
          {primaryViewerOpen ? (
            <PanoramaFrame
              media={firstMedia}
              className="rounded-none border-0"
            />
          ) : (
            <PrimaryPanoramaPrompt
              media={firstMedia}
              fallback={firstMedia.fallbackImage ?? firstMedia.src}
              onOpen={() => setPrimaryViewerOpen(true)}
            />
          )}
          <div className="flex items-center justify-between gap-5 p-5 text-[color:var(--canvas)]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--signal)]">
                {t({ en: 'Spatial field view', fr: 'Vue spatiale terrain' })}
              </p>
              <p className="mt-2 text-sm text-[color:var(--canvas)]/70">
                {t({
                  en: 'A panorama layer for field captures, delivered from external storage so the source archive stays outside Git.',
                  fr: 'Une couche panorama pour les captations terrain, livrée depuis un stockage externe afin de garder les sources hors Git.',
                })}
              </p>
            </div>
            <Globe2 aria-hidden="true" />
          </div>
        </div>
        <MediaGrid media={otherMedia} />
      </div>
    )
  }

  if (firstMedia.kind === 'model3d') {
    return (
      <div className="grid overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] md:grid-cols-[0.9fr_1.1fr]">
        <img
          src={firstMedia.fallbackImage ?? project.cover}
          alt={firstMedia.alt[locale]}
          width={1920}
          height={1080}
          decoding="async"
          className="h-full min-h-72 w-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-col justify-center p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--heritage)]">
            {t({ en: 'Object study', fr: 'Étude objet' })}
          </p>
          <h3 className="mt-4 text-3xl font-semibold">
            {t({ en: 'Interactive fragment', fr: 'Fragment interactif' })}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            {t({
              en: 'A lightweight GLB can be streamed from external storage, with this still image kept as the stable fallback.',
              fr: 'Un GLB léger pourra être chargé depuis un stockage externe, avec cette image comme fallback stable.',
            })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <figure className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)]">
        <img
          src={firstMedia.src}
          alt={firstMedia.alt[locale]}
          width={1920}
          height={1080}
          decoding="async"
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
        <figcaption className="p-4 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">
          {t(firstMedia.title)}
        </figcaption>
      </figure>
      <MediaGrid media={otherMedia} />
    </div>
  )
}

function MediaGrid({ media }: { media: PortfolioProject['media'] }) {
  if (media.length === 0) return null

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {media.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function PrimaryPanoramaPrompt({
  fallback,
  media,
  onOpen,
}: {
  fallback: string
  media: MediaItem
  onOpen: () => void
}) {
  const { locale, t } = usePreferences()

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--signal)]"
    >
      <img
        src={fallback}
        alt={media.alt[locale]}
        width={1920}
        height={1080}
        decoding="async"
        className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)]/76 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--canvas)] backdrop-blur">
        <Globe2 size={14} aria-hidden="true" />
        {t({ en: 'View 360', fr: 'Voir 360' })}
      </span>
    </button>
  )
}

function MediaCard({ item }: { item: MediaItem }) {
  const { locale, t } = usePreferences()
  const [viewerOpen, setViewerOpen] = useState(false)

  if (item.kind === 'video') {
    if (item.is360 && viewerOpen) {
      return (
        <figure className="overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)]">
          <PanoramaFrame media={item} className="rounded-none border-0" />
          <figcaption className="flex items-center justify-between gap-3 p-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--canvas)]/68">
            {t(item.title)}
            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              className="rounded-full border border-[color:var(--canvas)]/20 px-3 py-1 text-[color:var(--canvas)] transition hover:border-[color:var(--signal)]"
            >
              {t({ en: 'Close', fr: 'Fermer' })}
            </button>
          </figcaption>
        </figure>
      )
    }

    return (
      <figure className="overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)]">
        {item.is360 ? (
          <button
            type="button"
            onClick={() => setViewerOpen(true)}
            className="group relative block w-full overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
          >
            <img
              src={item.poster}
              alt={item.alt[locale]}
              width={1920}
              height={1080}
              decoding="async"
              className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)]/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--canvas)] backdrop-blur">
              <Globe2 size={13} aria-hidden="true" />
              {t({ en: 'View 360', fr: 'Voir 360' })}
            </span>
          </button>
        ) : (
          <video
            controls
            playsInline
            preload="metadata"
            poster={item.poster}
            className="aspect-video w-full object-cover"
            aria-label={item.alt[locale]}
          >
            <source src={item.src} type="video/mp4" />
            {t({
              en: 'Your browser cannot play this video.',
              fr: 'Ton navigateur ne peut pas lire cette vidéo.',
            })}
          </video>
        )}
        <figcaption className="p-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--canvas)]/68">
          {t(item.title)}
        </figcaption>
      </figure>
    )
  }

  if (item.kind === 'panorama360') {
    if (viewerOpen) {
      return (
        <figure className="overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)]">
          <PanoramaFrame media={item} className="rounded-none border-0" />
          <figcaption className="flex items-center justify-between gap-3 p-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--canvas)]/68">
            {t(item.title)}
            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              className="rounded-full border border-[color:var(--canvas)]/20 px-3 py-1 text-[color:var(--canvas)] transition hover:border-[color:var(--signal)]"
            >
              {t({ en: 'Close', fr: 'Fermer' })}
            </button>
          </figcaption>
        </figure>
      )
    }

    return (
      <button
        type="button"
        onClick={() => setViewerOpen(true)}
        className="group overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] transition hover:-translate-y-0.5 hover:border-[color:var(--heritage)] focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)]"
      >
        <div className="relative">
          <img
            src={item.fallbackImage ?? item.src}
            alt={item.alt[locale]}
            width={1920}
            height={1080}
            decoding="async"
            className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)]/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--canvas)] backdrop-blur">
            <Globe2 size={13} aria-hidden="true" />
            {t({ en: 'View 360', fr: 'Voir 360' })}
          </span>
        </div>
        <p className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
          {t(item.title)}
        </p>
      </button>
    )
  }

  return (
    <figure className="overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]">
      <img
        src={item.src}
        alt={item.alt[locale]}
        width={1920}
        height={1080}
        decoding="async"
        className="aspect-video w-full object-cover"
        loading="lazy"
      />
      <figcaption className="p-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
        {t(item.title)}
      </figcaption>
    </figure>
  )
}

function PanoramaFrame({
  media,
  className,
}: {
  media: MediaItem
  className?: string
}) {
  return (
    <Suspense fallback={<PanoramaSkeleton className={className} />}>
      <PanoramaViewer media={media} className={className} />
    </Suspense>
  )
}

function PanoramaSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={[
        'grid aspect-video w-full place-items-center bg-[color:var(--ink)] text-[color:var(--canvas)]/70',
        className ?? '',
      ].join(' ')}
    >
      <span className="font-mono text-xs uppercase tracking-[0.16em]">
        Loading 360 viewer...
      </span>
    </div>
  )
}
