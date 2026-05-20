# DESIGN.md

## Design Direction

Hybrid patrimoine immersif and XR lab.

Scene sentence: a cultural program director opens the portfolio on a laptop after a WhatsApp recommendation, while Oury's work must feel credible enough for a grant committee and alive enough for a creative technology partner.

The visual direction should combine:

- Editorial calm.
- Field archive material.
- Precise technical UI.
- Warm cultural texture.
- Controlled motion.

Reference image:

- `F:\Codex General\portfolio_directions\04_hybrid_patrimoine_xr_lab.png`

Reference models:

- Maxx Berkowitz for individual portfolio clarity.
- Active Theory for technical ambition.
- Marshmallow Laser Feast for immersive sensory storytelling.
- Persepolis Reimagined for contextual heritage narrative.
- onformative for clean case study rhythm.

## Color Strategy

Use a restrained full palette, not monochrome and not AI purple.

Suggested OKLCH roles:

- `canvas`: warm ivory, around `oklch(0.965 0.012 82)`.
- `ink`: charcoal green, around `oklch(0.205 0.028 165)`.
- `muted`: stone olive, around `oklch(0.56 0.03 112)`.
- `heritage`: ocre red, around `oklch(0.55 0.11 38)`.
- `field`: deep forest, around `oklch(0.34 0.075 158)`.
- `signal`: amber gold, around `oklch(0.75 0.13 77)`.

Rules:

- Never use pure black or pure white.
- No purple-blue gradient identity.
- Accents should appear as evidence markers, active states and moments of warmth, not as decoration everywhere.
- The 360 and project media should carry much of the visual energy.

## Typography

Preferred direction:

- Display: Satoshi, Cabinet Grotesk or similar high-character sans.
- Body: Geist or Satoshi.
- Mono: Geist Mono or JetBrains Mono for metadata, coordinates, dates and stack labels.

Rules:

- Body line-height at least 1.55.
- Long copy capped at 65 to 75 characters.
- No negative letter spacing for body text.
- Avoid giant screaming headlines. Use contrast, rhythm and composition instead.

## Layout

The site should use asymmetric editorial grids.

Patterns:

- Left aligned hero with media field, not centered generic text.
- Work index as curated evidence, not a uniform card wall.
- Case studies with alternating text, media and metadata bands.
- Field Archive can use a map, timeline or media table structure.
- About page should feel personal and professional, not corporate.

Avoid:

- Three equal feature cards as a main section.
- Nested cards.
- Generic gradient hero.
- Decorative blobs.
- Stock imagery.

## Motion

Motion should feel like navigation through material, not fireworks.

Use:

- Soft reveals on scroll.
- Media crossfades.
- Small parallax on field images.
- Shared transitions between project index and case pages if feasible.
- Transform and opacity animations only for UI.
- Reduced motion support.

Avoid:

- Blocking loaders.
- Bounce and elastic effects.
- Scroll jacking that traps the user.
- Infinite animation on large surfaces.

## Media System

Heavy media stays external.

Use:

- Cloudflare R2 public URLs for video, 360 and 3D.
- Local optimized thumbnails for Git.
- Aspect ratios reserved in CSS.
- Lazy loading for non-critical media.
- Poster images for every video.

360 viewer:

- Use for selected Guinea captures.
- Provide fallback thumbnail and caption.
- Do not load multiple panoramas at once on first paint.

3D viewer:

- Use for selected lightweight `.glb` assets only.
- Provide fallback image.
- Load on interaction or when near viewport.

## Components

Core components expected:

- `SiteHeader`
- `LanguageSwitcher`
- `HeroField`
- `ProofStrip`
- `ProjectIndex`
- `ProjectFeature`
- `CaseStudyLayout`
- `MediaRail`
- `PanoramaViewer`
- `ModelViewer`
- `FieldArchiveMap`
- `ContactBlock`
- `Footer`

Every interactive component needs:

- Loading state.
- Empty state when data is missing.
- Error or unavailable state when media cannot load.
- Keyboard and reduced motion handling.

## Accessibility

- Contrast target: WCAG AA minimum.
- Every interactive element has visible focus.
- Icon-only buttons need accessible labels.
- Navigation must work with keyboard.
- Language switch must expose current locale.
- Images need alt text or empty alt when decorative.
- 360 and 3D viewers need textual fallback.

## Responsive Rules

- Mobile first.
- No horizontal scroll on 375px width.
- Use stable dimensions for viewers and media.
- Avoid `h-screen`. Use `min-height: 100dvh` patterns.
- Keep touch targets at least 44px.
- Ensure text wraps cleanly in English and French.

## Implementation Notes

When the app is scaffolded:

- Use Tailwind tokens mapped from the OKLCH palette.
- Check `package.json` before importing UI or motion libraries.
- Prefer small route-level components.
- Keep project content data typed.
- Keep media URL data separate from copy.
- Add `.env.example` for site and media base URLs.
