# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — **the command Vercel actually runs** (`tsc -b && vite build`). Always verify changes with this, not `npx vite build` alone — plain `vite build` skips TypeScript type-checking entirely and will report success even when `tsc` would fail, which has caused silent production deploy failures before.
- `npm run lint` — oxlint
- `npm run preview` — preview the production build locally

There is no test suite/framework configured in this repo.

## Deployment

Hosted on Vercel, connected to GitHub (`narosolab-hub/portfolio`); pushing to `main` auto-deploys to production. `vercel.json` has a catch-all rewrite to `index.html` so client-side routes resolve on direct load/refresh.

## Architecture

This is a single-purpose Korean-language PM portfolio site: 3 routed pages, each a stack of `Tile` sections.

- **Routing** (`src/App.tsx`): `/` → `Home`, `/b2b-platform` → `B2BProject`, `/sub-projects` → `SubProjects`. Every route also has a job-posting-scoped variant under `/:slug`: `/:slug` → variant `Home` (see below), `/:slug/b2b-platform` → `B2BProject`, `/:slug/sub-projects` → `SubProjects`. The scoped B2B/Sub pages render the **same** content as the unscoped ones **by default**, but a variant may override their case-study copy per posting (see `b2bPage`/`subPage` below); the slug in the URL also keeps `GlobalNav`'s whole tab set inside that posting (its "Overview" link points back to `/:slug`, not `/`). `GlobalNav` (`src/components/GlobalNav.tsx`) reads the current slug via `useParams()` and prefixes every tab link with `/<slug>` when present, so navigating between tabs never drops the posting context. `src/pages/Pilot.tsx` exists but is **not** registered in the router — it's not part of the live site.
- **Job-posting variants (`src/variants/`)**: a per-company overlay on `Home` (hero copy, About paragraphs, "How I Work" card `title`/`body`, project-button copy, section `order`/`hidden`) and, optionally, on the two case-study pages via `b2bPage`/`subPage` (each an intro `title`/`body` plus keyed `sections` overriding a Tile's `eyebrow`/`title`/`subcopy` — copy only; diagrams/data stay fixed, and omitting a field falls back to the default). Visiting `/<slug>` renders `Home` with that variant merged over the defaults; any unregistered slug redirects to `/`. These links aren't exposed in nav/search/default pages — only someone given the exact URL reaches them.
  - **Code-split per variant (privacy).** Each posting lives in its own file (`src/variants/bgzt.ts`, `focus-media.ts`, …) `export default`-ing a `Variant`, and `src/variants/index.ts` holds the shared types plus a `VARIANT_LOADERS` registry mapping slug → `() => import("./<slug>")`. `App.tsx` `import()`s only the visited posting's chunk, so **one posting's tailored copy (and the company name in it) never ships in the same bundle another company sees**. All three scoped routes (`/:slug`, `/:slug/b2b-platform`, `/:slug/sub-projects`) share one `useVariantState(slug)` hook that loads the chunk and passes the `Variant` into `Home`/`B2BProject`/`SubProjects`; an unregistered slug redirects to the corresponding unscoped route. Note the slug **names** still appear in the main bundle (unavoidable on a static site); only the per-posting data is isolated.
  - **Per-slug favicon.** `VARIANT_FAVICONS` in `index.ts` maps slug → favicon path (e.g. `/favicon-bgzt.png` in `public/`); `useRouteFavicon` in `App.tsx` swaps `<link rel="icon">` to it (falling back to `/favicon.svg`) based on the URL's first segment, so the browser-tab icon matches the posting on `/:slug` and its sub-tabs. Favicon paths are kept in this **synchronous** map (not the lazy chunk) so the icon updates instantly with no flash; a path is not sensitive.
  - **To add a new posting:** create `src/variants/<slug>.ts`, add `"<slug>": () => import("./<slug>")` to `VARIANT_LOADERS`, and (optionally) a `VARIANT_FAVICONS` entry with a logo dropped in `public/`.
- **`Tile` (`src/components/Tile.tsx`/`.css`)** is the layout primitive every page section is built from. It takes a `variant` (`light` / `parchment` / `dark`, controlling the section's background/text color scheme) plus `eyebrow`, `title`, `subcopy`, `role` (bullet list), `footer`, and `children` slots. Page files (`Home.tsx`, `B2BProject.tsx`, `SubProjects.tsx`) are essentially sequences of `<Tile>` blocks with copy and, in the two case-study pages, a "diagram" component as children.
- **Design tokens (`src/styles/tokens.css`)**: CSS custom properties for color/spacing/radius/shadow, plus the shared typography scale (`.text-hero-display`, `.text-body`, `.text-caption`, etc.) used across all pages instead of per-component font rules. All of these typography classes have `white-space: pre-line` — a literal `\n` inside any JSX text prop (e.g. `subcopy="...line1\nline2..."`) renders as a real line break, which is the intended way to force a manual line break in inline copy.
- **Diagrams (`src/diagrams/*`)**: one component per case-study visual (e.g. `ExpansionTimeline`, `SellerModelComparison`, `CartFlowShowcase`, `SettlementDiscrepancy`). These are bespoke to `B2BProject.tsx`/`SubProjects.tsx` and hold their own content data inline (not shared).
- **Shared small patterns (`src/components/patterns/*`)**: `ComparisonTable`, `StepFlow`, `StatBand`, `OrdinalBars` — reusable building blocks used by multiple diagrams/pages, distinct from the one-off diagram components above.
- **`ToolIcon` (`src/components/ToolIcon.tsx`)**: renders the tool chips in Home's "Tools" section. Some tools (Notion/Slack/Figma/Claude) use real bitmap logo images that are clipped/scaled/backed with the brand color to hide white canvas padding baked into the source images (`ICON_RADIUS`, per-icon `scale` in `IMAGE_ICON_STYLE`); others (Google Sheets, PowerPoint) fall back to hand-drawn inline SVGs since no bitmap asset was supplied for them.
- **Content lives in code**: all page copy is inline JSX/string literals in the page files — there's no CMS, i18n layer, or separate content directory.
