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

- **Routing** (`src/App.tsx`): `/` → `Home`, `/b2b-platform` → `B2BProject`, `/sub-projects` → `SubProjects`. `src/pages/Pilot.tsx` exists but is **not** registered in the router — it's not part of the live site.
- **`Tile` (`src/components/Tile.tsx`/`.css`)** is the layout primitive every page section is built from. It takes a `variant` (`light` / `parchment` / `dark`, controlling the section's background/text color scheme) plus `eyebrow`, `title`, `subcopy`, `role` (bullet list), `footer`, and `children` slots. Page files (`Home.tsx`, `B2BProject.tsx`, `SubProjects.tsx`) are essentially sequences of `<Tile>` blocks with copy and, in the two case-study pages, a "diagram" component as children.
- **Design tokens (`src/styles/tokens.css`)**: CSS custom properties for color/spacing/radius/shadow, plus the shared typography scale (`.text-hero-display`, `.text-body`, `.text-caption`, etc.) used across all pages instead of per-component font rules. All of these typography classes have `white-space: pre-line` — a literal `\n` inside any JSX text prop (e.g. `subcopy="...line1\nline2..."`) renders as a real line break, which is the intended way to force a manual line break in inline copy.
- **Diagrams (`src/diagrams/*`)**: one component per case-study visual (e.g. `ExpansionTimeline`, `SellerModelComparison`, `CartFlowShowcase`, `SettlementDiscrepancy`). These are bespoke to `B2BProject.tsx`/`SubProjects.tsx` and hold their own content data inline (not shared).
- **Shared small patterns (`src/components/patterns/*`)**: `ComparisonTable`, `StepFlow`, `StatBand`, `OrdinalBars` — reusable building blocks used by multiple diagrams/pages, distinct from the one-off diagram components above.
- **`ToolIcon` (`src/components/ToolIcon.tsx`)**: renders the tool chips in Home's "Tools" section. Some tools (Notion/Slack/Figma/Claude) use real bitmap logo images that are clipped/scaled/backed with the brand color to hide white canvas padding baked into the source images (`ICON_RADIUS`, per-icon `scale` in `IMAGE_ICON_STYLE`); others (Google Sheets, PowerPoint) fall back to hand-drawn inline SVGs since no bitmap asset was supplied for them.
- **Content lives in code**: all page copy is inline JSX/string literals in the page files — there's no CMS, i18n layer, or separate content directory.
