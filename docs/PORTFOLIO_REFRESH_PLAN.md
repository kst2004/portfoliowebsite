# Portfolio Experience Refresh

## Goal
Upgrade the existing portfolio into a fast, accessible, multi-disciplinary showcase while preserving the current production site. All implementation work belongs on `feature/portfolio-experience-2026`. Do not merge to `main` or deploy to production without explicit owner review and approval.

## Baseline
- Framework: Next.js App Router, React, TypeScript
- Styling and motion: Tailwind CSS, Framer Motion, Lenis
- Existing project and case-study content: `src/data/content.ts`
- Existing homepage composition: `src/app/page.tsx`
- Existing global metadata and providers: `src/app/layout.tsx`
- Existing production baseline must be checked before implementation.
- Resolve the documented Node.js runtime mismatch between `package.json` (24.x) and README (20.x) against the actual Vercel project configuration before changing it.

## Principles
1. Reuse the current cinematic visual identity and components where appropriate.
2. Keep a single canonical typed project catalogue for the homepage, archive, case studies, project universe, and live-demo links.
3. Never invent project outcomes, metrics, roles, clients, dates, or live demo URLs.
4. Draft and confidential projects must not appear in public pages, search, metadata, sitemap, or structured data.
5. Preserve responsive behavior, accessibility, reduced-motion support, and performance.
6. Do not introduce a database or CMS unless the implementation demonstrates a real need.
7. No production deployment or merge without explicit approval.

## Phases

### Phase 0 — Audit and baseline
- Map current routes, components, project data, assets, scripts, and deployment configuration.
- Run the existing build and available checks; record existing failures separately from regressions.
- Confirm current production branch and preview deployment behavior.
- Check image assets and permission to publish client work.
**Acceptance:** baseline documented; existing site remains unchanged.

### Phase 1 — Project catalogue and archive
- Extend typed project records with slug, title, summary, category, tags, tools, year/status where verified, featured flag, visibility, hero/gallery assets, comparison assets, and demo configuration.
- Support visibility values: `featured`, `archive`, `draft`, `private`.
- Build `/projects` with search and category/technology filters; synchronize filter state to URL where practical.
- Ensure homepage cards and case-study routes use the same catalogue.
- Add empty states, useful page titles, and responsive layouts.
**Acceptance:** search/filter behavior works; routes are valid; draft/private content is excluded from all public outputs.

### Phase 2 — Cinematic case studies and render comparison
- Create reusable case-study layouts with hero media, overview, role, process, tools, deliverables, gallery, and next/previous project navigation when content exists.
- Add a touch-friendly before/after slider with keyboard operation, labels, and a non-interactive fallback.
- Only enable comparison UI when both approved source and final images exist.
**Acceptance:** no broken assets; mobile and desktop layouts pass; case studies do not claim unsupported outcomes.

### Phase 3 — Command palette and Now Building
- Add `⌘K` / `Ctrl+K` command palette for project search, navigation, categories, and contact.
- Ensure focus trapping, Escape-to-close, visible focus, and accessible labels.
- Add a manually maintained Now Building section with explicit status and updated date.
**Acceptance:** keyboard and touch usage work; reduced-motion preferences are respected; status is not presented as live if manually maintained.

### Phase 4 — Interactive project universe
- Create an interactive SVG/canvas relationship view based on verified project categories and technologies.
- Clicking a node opens the corresponding public project.
- Provide a searchable/list-based alternative for mobile, keyboard and assistive technology users.
- Avoid excessive animation and unnecessary rendering work.
**Acceptance:** every node maps to a public project; the experience has an accessible alternative and performs acceptably on mobile.

### Phase 5 — Live demos
- Add demo metadata only for real, tested URLs or available demo routes.
- Prefer same-origin demo routes or sandboxed iframes with the minimum required permissions.
- Use mock data and read-only interactions where appropriate; never expose credentials, private APIs, personal data, or production controls.
- Provide a clear external-link fallback when embedding is unsuitable.
**Acceptance:** each demo is tested, safely isolated, and has a graceful unavailable/error state.

### Phase 6 — QA and review
- Run production build, TypeScript checks, and all existing tests; add tests for filters, visibility rules, palette, comparison slider, and project routes.
- Verify desktop, iPhone/mobile touch, keyboard navigation, reduced motion, contrast, empty states, and broken-link behavior.
- Review SEO metadata, canonical URLs, sitemap/robots behavior, image sizing/loading, and accessibility.
- Produce a preview and concise changelog with known issues.
**Acceptance:** preview is ready for owner review; production remains unchanged until explicit approval.

## Initial release order
1. Audit and baseline
2. Project catalogue + archive/search/filters
3. Case-study layouts + render slider
4. Command palette + Now Building
5. Project universe
6. Safe live demos
7. QA, preview, owner review

## Release gate
No merge to `main`, production alias change, or production deployment until the owner has reviewed the preview and explicitly approved release.
