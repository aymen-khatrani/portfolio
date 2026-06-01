# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server on http://localhost:3000
npm run build    # Production build (also runs type-check + lint)
npm run start    # Run the built app
npm run lint     # next lint
npx tsc --noEmit # Type-check only, no build
```

There is no test runner configured.

## Stack

- Next.js 14 App Router + TypeScript (strict) + React 18
- Tailwind CSS 3
- Framer Motion for animation
- `next/font/google` for `Instrument_Serif` (display), `Inter` (sans), `JetBrains_Mono` (mono)
- Path alias: `@/*` → `src/*`

## Architecture

The site is a single full-screen editorial hero. Composition tree:

```
app/page.tsx
└── <main>
    ├── Navbar          (fixed, minimal)
    └── Hero            (full-screen section, text + image columns)
        ├── CTAButton × 2
        └── ThreeDImageHero  ← centerpiece, owns the 3D effect
```

### The 3D effect (ThreeDImageHero)

There is no WebGL. The "3D" is a layered DOM stack driven by Framer Motion springs,
on purpose: cheap on the GPU, accessible, and degrades cleanly.

Three coordinate spaces parallax against each other from one shared pointer source:

| Layer            | Direction      | Magnitude | Purpose                       |
| ---------------- | -------------- | --------- | ----------------------------- |
| Background glow  | Opposite cursor| Large     | Depth illusion behind card    |
| Image card       | With cursor    | Tilt only | Subject of the hero           |
| Foreground caps  | With cursor    | Larger    | Floating editorial metadata   |

Card transform uses `rotateX` / `rotateY` (springs over normalized `[-0.5, 0.5]` pointer
position) plus a slow `y` loop for floating. A cursor-tracking radial gradient is rendered
on top of the image with `mix-blend-screen` to simulate specular sheen.

All interactivity is gated by two hooks in `src/lib/usePrefersReducedMotion.ts`:
- `usePrefersReducedMotion()` — honours OS setting
- `useIsCoarsePointer()` — disables mouse-driven tilt on touch devices

When either is true the component renders static (no pointer listeners, no sheen, no
float loop), but the image, frame, ambient glow and captions still display — so the
layout stays premium without motion.

### Styling system

`tailwind.config.ts` defines the palette and fonts; nothing else lives there. Three
custom CSS utilities in `src/app/globals.css` are worth knowing:

- `.noise` — adds a fixed SVG-noise overlay via `::before`
- `.editorial-grid` — hairline grid background with radial mask
- `.scanlines` — repeating horizontal lines (used inside the image card)
- `.stage-perspective` / `.preserve-3d` — for the 3D card stage

There is a global `prefers-reduced-motion` reset at the bottom of `globals.css` that
neutralises all animations/transitions; the JS reduced-motion guards above are the
additional, smarter layer.

## Hero content & image

The image is `public/acceuil-photo.png`, referenced as `/acceuil-photo.png` and loaded
through `next/image` with `priority`. To swap it, replace that file or edit the `src`
prop in `src/components/Hero.tsx`.

Hero copy (name, title, accroche, metadata grid) lives directly in `Hero.tsx` — there
is no CMS or content layer. Edit there.

## Conventions

- All interactive components are `'use client'`; static ones stay server components.
- Animation tuning happens via the `spring` config object at the top of `ThreeDImageHero.tsx`.
- Mono captions (image corners, metadata) use the `font-mono` + `uppercase tracking-[0.22em]` recipe — keep it consistent when adding more.
- Colour tokens: prefer the `ink-*` / `bone-*` / `moss-*` scales over raw hex.
