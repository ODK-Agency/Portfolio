# Design System Master

Project: OuryMajor Portfolio.

Generated from `ui-ux-pro-max`, then corrected for the portfolio direction in `DESIGN.md`.

When building a specific page, first check `design-system/ourymajor-portfolio/pages/[page-name].md`. If that file exists, it overrides this file. If not, follow this master file.

## Product Type

Premium bilingual portfolio for an XR developer, creative technologist and heritage-oriented educator.

## Global Design Principle

Proof first, then atmosphere. The work should feel real, field-tested and technically sharp.

## Palette

Use OKLCH tokens in Tailwind or CSS variables.

| Role     | Token              | Value                    | Usage                              |
| -------- | ------------------ | ------------------------ | ---------------------------------- |
| Canvas   | `--color-canvas`   | `oklch(0.965 0.012 82)`  | Main page background               |
| Surface  | `--color-surface`  | `oklch(0.935 0.014 88)`  | Quiet bands and raised surfaces    |
| Ink      | `--color-ink`      | `oklch(0.205 0.028 165)` | Primary text                       |
| Muted    | `--color-muted`    | `oklch(0.56 0.03 112)`   | Secondary text                     |
| Field    | `--color-field`    | `oklch(0.34 0.075 158)`  | Deep active sections               |
| Heritage | `--color-heritage` | `oklch(0.55 0.11 38)`    | Cultural accent                    |
| Signal   | `--color-signal`   | `oklch(0.75 0.13 77)`    | Small highlights and focus markers |
| Border   | `--color-border`   | `oklch(0.80 0.018 95)`   | Dividers and outlines              |
| Danger   | `--color-danger`   | `oklch(0.54 0.16 30)`    | Error states                       |

Rules:

- No pure black.
- No pure white.
- No blue-purple gradient identity.
- Accent usage should stay intentional and sparse.
- Media should carry color when possible.

## Typography

Preferred stack:

- Display: Satoshi or Cabinet Grotesk.
- Body: Geist or Satoshi.
- Mono: Geist Mono or JetBrains Mono.

Rules:

- Base body text: 16px minimum.
- Body line-height: 1.55 to 1.7.
- Long copy: 65 to 75 characters maximum.
- Metadata can use mono and tabular figures.
- Avoid oversized generic hero typography.

## Layout System

Use an asymmetric editorial grid.

Breakpoints:

- Small: 375px.
- Medium: 768px.
- Large: 1024px.
- Wide: 1440px.

Spacing:

- Base rhythm: 4px and 8px increments.
- Small sections: 48px vertical.
- Major sections: 80px to 128px vertical.
- Case studies may use wider rhythm when media needs breathing room.

Avoid:

- Three identical cards as a main section.
- Nested cards.
- Decorative blobs.
- Generic centered hero.
- Full-screen sections based on `h-screen`.

## Components

Required components should include:

- Header with language switch.
- Hero with field media and concise positioning.
- Proof strip with non-generic evidence.
- Project index with filters.
- Case study layout.
- Media rail.
- 360 panorama viewer.
- 3D model viewer.
- Field archive module.
- Contact block.

Each interactive component needs:

- Loading state.
- Empty state.
- Error or unavailable state.
- Keyboard support.
- Reduced motion support.

## Motion

Motion should clarify place, evidence and continuity.

Allowed:

- Scroll reveals using opacity and transform.
- Subtle parallax on media only.
- Shared transitions between work index and case studies if the implementation stays light.
- Hover states under 300ms.

Forbidden:

- Animating layout dimensions.
- Bounce or elastic motion.
- Blocking loaders.
- Scroll trapping.
- Decorative perpetual motion on large regions.

## Media

Heavy media must stay outside Git.

Allowed in Git:

- Optimized thumbnails.
- Small still images.
- Content data and remote media URLs.

External media:

- Video files.
- Insta360 source files.
- 360 panoramas.
- Large 3D models.
- Blender files.

Use R2 URLs through environment-driven base paths.

## Accessibility Checklist

- Text contrast meets WCAG AA.
- Focus states are visible.
- Icon-only controls have labels.
- Language switch announces current language.
- 360 and 3D viewers have text fallbacks.
- No horizontal scroll at 375px.
- Touch targets are at least 44px.

## Pre-delivery Checks

- Run typecheck.
- Run build.
- Test desktop and mobile.
- Verify reduced motion.
- Check images and media reserve space.
- Capture browser screenshots after visual changes.
