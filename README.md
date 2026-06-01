# Portfolio — Aymen Khatrani

Premium hero / landing page built with Next.js, TypeScript, Tailwind and Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # production server
npm run lint
```

## Where to put the hero image

The hero photograph lives in `public/acceuil-photo.png`. Replace that file (same name)
to swap the portrait, or update the `src` prop passed to `<ThreeDImageHero />` in
`src/components/Hero.tsx`. The image is loaded through `next/image` with `priority`,
so optimization, sizing, and preload are handled automatically.

## Stack

- Next.js 14 (App Router) · TypeScript
- Tailwind CSS 3 with a small editorial palette (`ink`, `bone`, `moss`)
- Framer Motion for spring-driven parallax & entrance animations
- Google Fonts via `next/font`: Instrument Serif (display), Inter (sans), JetBrains Mono (mono)

No Three.js / WebGL — the 3D effect is achieved with CSS transforms, layered DOM and
Framer Motion springs, so it degrades gracefully and remains fast everywhere.
