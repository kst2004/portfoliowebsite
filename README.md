# Saiteja Kolan Cinematic Portfolio

Premium cinematic creative portfolio built with Next.js, Tailwind CSS, Framer Motion, and Lenis.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- Lenis smooth scrolling

## Experience Highlights

- Cinematic dark art direction with restrained warm gold accents
- Transparent navbar with scroll blur + subtle border behavior
- Hero split-screen with rotating editorial subheading and ambient portrait glow
- Selected Works editorial cards with image zoom and soft glass hover glow
- About, Capabilities, Gallery Strip, Process, Contact, and premium minimal Footer sections
- Film grain overlay and slow, elegant reveal animation language
- Fully responsive layouts across mobile, tablet, and desktop

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Deploy On Vercel

1. Push this repository to GitHub.
2. In Vercel, click Add New -> Project and import this repository.
3. Keep the detected settings:
	- Framework Preset: Next.js
	- Install Command: npm ci
	- Build Command: npm run build
4. Click Deploy.

### Runtime Version

- Node.js is pinned in `package.json` via `engines.node` to `20.x` for consistent local and Vercel builds.

## Notes

- Assets in `public/works` and `public/gallery` are placeholder SVGs and can be swapped with real artwork.
- Social and contact links can be updated in `src/data/content.ts`.
