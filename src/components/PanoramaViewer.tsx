import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import type { MediaItem } from '#/data/projects'
import { usePreferences } from '#/lib/preferences'

const INITIAL_FOV = 75
const MIN_FOV = 34
const MAX_FOV = 96
const MIN_PITCH = -Math.PI / 2 + 0.08
const MAX_PITCH = Math.PI / 2 - 0.08

type DragState = {
  active: boolean
  x: number
  y: number
  yaw: number
  pitch: number
}

export function PanoramaViewer({
  media,
  className = '',
}: {
  media: MediaItem
  className?: string
}) {
  const { locale, t } = usePreferences()
  const frameRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const textureRef = useRef<THREE.Texture | null>(null)
  const dragRef = useRef<DragState>({
    active: false,
    x: 0,
    y: 0,
    yaw: 0,
    pitch: 0,
  })
  const yawRef = useRef(0)
  const pitchRef = useRef(0)
  const fovRef = useRef(INITIAL_FOV)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const isVideo = media.kind === 'video'

  const resizeCurrentRenderer = () => {
    const stage = stageRef.current
    const camera = cameraRef.current
    const renderer = rendererRef.current
    if (!stage || !camera || !renderer) return

    const width = stage.clientWidth
    const height = stage.clientHeight
    if (!width || !height) return

    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  useEffect(() => {
    const fullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === frameRef.current)
      window.setTimeout(resizeCurrentRenderer, 0)
    }

    document.addEventListener('fullscreenchange', fullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', fullscreenChange)
  }, [])

  useEffect(() => {
    if (!isExpanded) return

    const previousOverflow = document.body.style.overflow
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpanded(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', keyDown)
    window.setTimeout(resizeCurrentRenderer, 0)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', keyDown)
    }
  }, [isExpanded])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    setLoaded(false)
    setError(false)
    setIsBuffering(false)
    setIsPlaying(false)
    yawRef.current = 0
    pitchRef.current = 0
    fovRef.current = INITIAL_FOV

    let disposed = false
    let animationFrame = 0
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(INITIAL_FOV, 2, 1, 1100)
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      setError(true)
      return
    }

    const geometry = new THREE.SphereGeometry(500, 80, 48)

    cameraRef.current = camera
    rendererRef.current = renderer
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(0x07120c, 1)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.className = 'absolute inset-0 z-0 h-full w-full'
    stage.appendChild(renderer.domElement)

    geometry.scale(-1, 1, 1)

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    const resizeRenderer = () => {
      const width = stage.clientWidth
      const height = stage.clientHeight
      if (!width || !height) return

      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(() => resizeRenderer())
    resizeObserver.observe(stage)
    resizeRenderer()

    const animate = () => {
      if (disposed) return
      camera.rotation.order = 'YXZ'
      camera.rotation.y = yawRef.current
      camera.rotation.x = pitchRef.current
      camera.fov = fovRef.current
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(animate)
    }

    const applyTexture = (texture: THREE.Texture, markLoaded = true) => {
      if (disposed) {
        texture.dispose()
        return
      }
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      textureRef.current = texture
      material.map = texture
      material.needsUpdate = true
      if (markLoaded) setLoaded(true)
    }

    if (isVideo) {
      const video = document.createElement('video')
      video.crossOrigin = 'anonymous'
      video.src = media.src
      video.poster = media.poster ?? ''
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.preload = 'auto'
      videoRef.current = video

      const texture = new THREE.VideoTexture(video)
      texture.generateMipmaps = false
      applyTexture(texture, false)

      const canPlay = () => setLoaded(true)
      const playing = () => {
        setIsPlaying(true)
        setIsBuffering(false)
      }
      const waiting = () => {
        if (!video.paused) setIsBuffering(true)
      }
      const pause = () => {
        setIsPlaying(false)
        setIsBuffering(false)
      }
      const failed = () => {
        setError(true)
        setIsBuffering(false)
      }

      video.addEventListener('canplay', canPlay)
      video.addEventListener('canplaythrough', canPlay)
      video.addEventListener('playing', playing)
      video.addEventListener('waiting', waiting)
      video.addEventListener('stalled', waiting)
      video.addEventListener('pause', pause)
      video.addEventListener('error', failed)
      video.load()

      animationFrame = window.requestAnimationFrame(animate)

      return () => {
        disposed = true
        window.cancelAnimationFrame(animationFrame)
        video.pause()
        video.removeEventListener('canplay', canPlay)
        video.removeEventListener('canplaythrough', canPlay)
        video.removeEventListener('playing', playing)
        video.removeEventListener('waiting', waiting)
        video.removeEventListener('stalled', waiting)
        video.removeEventListener('pause', pause)
        video.removeEventListener('error', failed)
        video.removeAttribute('src')
        video.load()
        cleanupScene(resizeObserver, renderer, geometry, material)
        texture.dispose()
        videoRef.current = null
        textureRef.current = null
        cameraRef.current = null
        rendererRef.current = null
      }
    }

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    loader.load(
      media.src,
      (texture) => applyTexture(texture),
      undefined,
      () => {
        if (!disposed) setError(true)
      },
    )
    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      disposed = true
      window.cancelAnimationFrame(animationFrame)
      cleanupScene(resizeObserver, renderer, geometry, material)
      textureRef.current?.dispose()
      textureRef.current = null
      cameraRef.current = null
      rendererRef.current = null
    }
  }, [media.poster, media.src, isVideo])

  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.closest('button')) {
      return
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      yaw: yawRef.current,
      pitch: pitchRef.current,
    }
  }

  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag.active) return
    yawRef.current = drag.yaw - (event.clientX - drag.x) * 0.003
    pitchRef.current = clamp(
      drag.pitch - (event.clientY - drag.y) * 0.003,
      MIN_PITCH,
      MAX_PITCH,
    )
  }

  const pointerUp = () => {
    dragRef.current.active = false
  }

  const wheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    fovRef.current = clamp(
      fovRef.current + event.deltaY * 0.04,
      MIN_FOV,
      MAX_FOV,
    )
  }

  const resetView = () => {
    yawRef.current = 0
    pitchRef.current = 0
    fovRef.current = INITIAL_FOV
  }

  const toggleVideo = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      setIsBuffering(true)
      try {
        await video.play()
      } catch {
        setIsBuffering(false)
        setError(true)
      }
    } else {
      video.pause()
    }
  }

  const toggleFullscreen = async () => {
    const frame = frameRef.current
    if (!frame) return

    if (isExpanded) {
      setIsExpanded(false)
      return
    }

    if (document.fullscreenElement === frame) {
      await document.exitFullscreen()
    } else {
      try {
        await frame.requestFullscreen()
      } catch {
        setIsExpanded(true)
      }
    }
  }

  const zoom = (direction: 'in' | 'out') => {
    fovRef.current = clamp(
      fovRef.current + (direction === 'in' ? -8 : 8),
      MIN_FOV,
      MAX_FOV,
    )
  }

  return (
    <div
      ref={frameRef}
      data-expanded={isExpanded ? 'true' : undefined}
      className={[
        'panorama-frame relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--ink)] fullscreen:rounded-none fullscreen:border-0',
        className,
      ].join(' ')}
    >
      <div
        ref={stageRef}
        className="panorama-stage relative aspect-[2/1] min-h-[280px] w-full cursor-grab touch-none overflow-hidden active:cursor-grabbing"
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        onWheel={wheel}
        aria-label={media.alt[locale]}
        role="img"
      >
        {error ? (
          <NativeFallback media={media} />
        ) : (
          <>
            {media.poster ? (
              <img
                src={media.poster}
                alt=""
                className={[
                  'absolute inset-0 z-10 h-full w-full scale-105 object-cover opacity-45 blur-sm transition-opacity duration-300',
                  loaded ? 'opacity-0' : 'opacity-45',
                ].join(' ')}
                aria-hidden="true"
              />
            ) : null}
            {!loaded || isBuffering ? (
              <LoadingOverlay
                label={t({
                  en: isVideo ? 'Loading 360 video' : 'Loading 360 sphere',
                  fr: isVideo
                    ? 'Chargement vidéo 360'
                    : 'Chargement sphère 360',
                })}
              />
            ) : null}
          </>
        )}

        {isVideo && loaded && !isPlaying && !isBuffering && !error ? (
          <button
            type="button"
            onClick={toggleVideo}
            className="absolute inset-0 z-30 grid place-items-center bg-[color:var(--ink)]/12 text-[color:var(--canvas)] transition hover:bg-[color:var(--ink)]/4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--signal)]"
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-[color:var(--canvas)] px-5 py-3 text-sm font-semibold text-[color:var(--ink)] shadow-[0_18px_60px_rgba(0,0,0,0.24)] transition active:scale-[0.97]">
              <Play size={16} aria-hidden="true" />
              {t({ en: 'Play 360 video', fr: 'Lire la vidéo 360' })}
            </span>
          </button>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-[color:var(--ink)]/90 to-transparent p-4 text-[color:var(--canvas)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--signal)]">
              {t({ en: 'Drag to look around', fr: 'Glisse pour regarder' })}
            </p>
            <p className="mt-1 text-sm font-semibold">{t(media.title)}</p>
          </div>
          <div className="pointer-events-auto flex gap-2">
            {isVideo ? (
              <button
                type="button"
                onClick={toggleVideo}
                disabled={error}
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--canvas)] px-4 py-2 text-xs font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isBuffering
                  ? t({ en: 'Loading', fr: 'Chargement' })
                  : isPlaying
                    ? t({ en: 'Pause', fr: 'Pause' })
                    : t({ en: 'Play', fr: 'Lire' })}
              </button>
            ) : null}
            <ControlButton
              onClick={() => zoom('out')}
              label={t({ en: 'Zoom out', fr: 'Dézoomer' })}
            >
              <ZoomOut size={15} aria-hidden="true" />
            </ControlButton>
            <ControlButton
              onClick={() => zoom('in')}
              label={t({ en: 'Zoom in', fr: 'Zoomer' })}
            >
              <ZoomIn size={15} aria-hidden="true" />
            </ControlButton>
            <ControlButton
              onClick={resetView}
              label={t({ en: 'Reset view', fr: 'Réinitialiser la vue' })}
            >
              <RotateCcw size={15} aria-hidden="true" />
            </ControlButton>
            <ControlButton
              onClick={toggleFullscreen}
              label={t({
                en:
                  isFullscreen || isExpanded
                    ? 'Exit fullscreen'
                    : 'Open fullscreen',
                fr:
                  isFullscreen || isExpanded
                    ? 'Quitter le plein écran'
                    : 'Ouvrir en plein écran',
              })}
            >
              {isFullscreen || isExpanded ? (
                <Minimize2 size={15} aria-hidden="true" />
              ) : (
                <Maximize2 size={15} aria-hidden="true" />
              )}
            </ControlButton>
          </div>
        </div>
      </div>
    </div>
  )
}

function ControlButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full border border-[color:var(--canvas)]/20 bg-[color:var(--ink)]/48 text-[color:var(--canvas)] backdrop-blur transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--signal)] active:scale-[0.97]"
      aria-label={label}
    >
      {children}
    </button>
  )
}

function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-[color:var(--ink)]/36 text-center text-[color:var(--canvas)] backdrop-blur-[1px]">
      <span className="inline-flex items-center gap-3 rounded-full border border-[color:var(--canvas)]/18 bg-[color:var(--ink)]/62 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
        <span
          className="size-4 rounded-full border-2 border-[color:var(--canvas)]/22 border-t-[color:var(--signal)]"
          style={{ animation: 'spin 720ms linear infinite' }}
          aria-hidden="true"
        />
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--canvas)]/86">
          {label}
        </span>
      </span>
    </div>
  )
}

function NativeFallback({ media }: { media: MediaItem }) {
  const { locale, t } = usePreferences()

  if (media.kind === 'video') {
    return (
      <video
        controls
        playsInline
        muted
        poster={media.poster}
        src={media.src}
        className="absolute inset-0 z-20 h-full w-full object-cover"
      />
    )
  }

  return (
    <div className="absolute inset-0 z-20">
      <img
        src={media.fallbackImage ?? media.src}
        alt={media.alt[locale]}
        className="h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 grid place-items-center bg-[color:var(--ink)]/42 p-8 text-center text-[color:var(--canvas)]">
        <p className="max-w-[36ch] text-sm leading-6 text-[color:var(--canvas)]/82">
          {t({
            en: 'The spherical viewer could not load this media. Showing the fallback image.',
            fr: 'Le viewer sphérique ne peut pas charger ce média. Affichage de l’image de secours.',
          })}
        </p>
      </div>
    </div>
  )
}

function cleanupScene(
  resizeObserver: ResizeObserver,
  renderer: THREE.WebGLRenderer,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
) {
  resizeObserver.disconnect()
  geometry.dispose()
  material.dispose()
  renderer.dispose()
  renderer.domElement.remove()
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
