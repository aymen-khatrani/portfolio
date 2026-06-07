'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  usePrefersReducedMotion,
  useIsCoarsePointer,
} from '@/lib/usePrefersReducedMotion';

/* Page-wide breathing dot-field — inspired by the interactive canvas background
   of the Nexus hero, re-toned to the quiet-luxury palette.

   A grid of hairline dots (warm `bone`) gently pulse in opacity ("breathe") and
   brighten + swell in a soft pool around the cursor. It's a fixed overlay drawn
   on top of every section (the sections have opaque backgrounds, so a layer
   *behind* them wouldn't show) but kept sober: faint dots, a radial edge mask,
   and it sits below the navbar and grain.

   Honours the same two guards as ThreeDImageHero:
   - prefers-reduced-motion → draws a single static frame, no rAF, no float.
   - coarse pointer → no cursor-driven glow (touch devices), still breathes. */

const DOT_SPACING = 30;
const BASE_RADIUS = 1;
const BASE_OPACITY_MIN = 0.1;
const BASE_OPACITY_MAX = 0.24;
const INTERACTION_RADIUS = 170;
const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
const OPACITY_BOOST = 0.55;
const RADIUS_BOOST = 2.2;

interface Dot {
  x: number;
  y: number;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
}

/** Reads an `R G B` CSS custom property off :root into a tuple. */
function readRgbVar(name: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    return [parts[0], parts[1], parts[2]];
  }
  return fallback;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({ w: 0, h: 0, dpr: 1 });
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const colorRef = useRef<[number, number, number]>([226, 216, 196]);

  const reduced = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();

  const buildDots = useCallback(() => {
    const { w, h } = sizeRef.current;
    if (w === 0 || h === 0) return;
    const dots: Dot[] = [];
    const cols = Math.ceil(w / DOT_SPACING);
    const rows = Math.ceil(h / DOT_SPACING);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const base = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
        dots.push({
          x: i * DOT_SPACING + DOT_SPACING / 2,
          y: j * DOT_SPACING + DOT_SPACING / 2,
          targetOpacity: base,
          currentOpacity: base,
          opacitySpeed: Math.random() * 0.004 + 0.0015,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    sizeRef.current = { w, h, dpr };
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildDots();
  }, [buildDots]);

  /** Single static paint — used for the reduced-motion fallback. */
  const paintStatic = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const { w, h } = sizeRef.current;
    if (!ctx || w === 0) return;
    const [r, g, b] = colorRef.current;
    ctx.clearRect(0, 0, w, h);
    for (const dot of dotsRef.current) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${BASE_OPACITY_MAX.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, BASE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const { w, h } = sizeRef.current;
    const { x: mx, y: my } = mouseRef.current;
    if (!ctx || w === 0) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    const [r, g, b] = colorRef.current;
    ctx.clearRect(0, 0, w, h);

    for (const dot of dotsRef.current) {
      // breathe
      dot.currentOpacity += dot.opacitySpeed;
      if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
        dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
      }

      let factor = 0;
      if (mx !== null && my !== null) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < INTERACTION_RADIUS_SQ) {
          const f = 1 - Math.sqrt(distSq) / INTERACTION_RADIUS;
          factor = f * f;
        }
      }

      const opacity = Math.min(1, dot.currentOpacity + factor * OPACITY_BOOST);
      const radius = BASE_RADIUS + factor * RADIUS_BOOST;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Keep the dot colour in sync with the active theme.
  useEffect(() => {
    const sync = () => {
      colorRef.current = readRgbVar('--grid-dot', [226, 216, 196]);
      if (reduced) paintStatic();
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [reduced, paintStatic]);

  // Sizing + animation lifecycle.
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);

    if (reduced) {
      paintStatic();
      return () => window.removeEventListener('resize', resize);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, resize, animate, paintStatic]);

  // Cursor tracking — skipped on touch / reduced motion.
  useEffect(() => {
    if (reduced || coarse) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: null, y: null };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced, coarse]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        maskImage:
          'radial-gradient(ellipse 85% 75% at 50% 45%, rgba(0,0,0,1) 40%, transparent 92%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 85% 75% at 50% 45%, rgba(0,0,0,1) 40%, transparent 92%)',
      }}
    />
  );
}
