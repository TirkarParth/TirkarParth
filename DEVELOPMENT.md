# Parth Tirkar — Portfolio

Premium cinematic personal portfolio built with React, Vite, TypeScript, React Three Fiber, GSAP, and Lenis.

## Develop

```bash
npm install
npm run dev
```

Open `http://localhost:5173/PT/`

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

The Vite `base` is set to `/PT/` for `https://tirkarparth.github.io/PT/`.

```bash
npm run build
# publish the `dist` folder to the `gh-pages` branch / Pages source
```

## Stack

- React + Vite + TypeScript
- Three.js / React Three Fiber / Drei
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Tailwind CSS
- Zustand

## Notes

- Legacy static site is preserved under `_legacy/`
- Resume: `public/downloads/PtDev.pdf`
- Respects `prefers-reduced-motion` and WebGL fallbacks
