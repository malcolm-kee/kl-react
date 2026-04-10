# Migration Plan: Gatsby 3 to Next.js

## Context

The KL React community meetup site runs on Gatsby 3 (React 17, Node 16) with heavily outdated dependencies. The Meetup API it depends on is dead, the Twitter API is unreliable, and the site uses 3 overlapping styling systems (Tailwind, Theme UI, Emotion). This migration moves to Next.js 15 with static export, consolidates styling to Tailwind v4 only, inlines missing Meetup data into YAML, drops the Twitter page, removes OG image generation, and removes the S3 event photos feature.

---

## Phase 0: Data Preparation (before any code) — DONE

### 0.1 Enrich `src/data/event.yml` — DONE
All 22 events in `src/data/event.yml` have been enriched with the following fields:
- `displayName` — canonical public title. Replaces `MeetupEvent.name`.
- `date` — ISO 8601 datetime with timezone (e.g., `2022-08-23T18:30:00+08:00`). Single source of truth for sort order, date display, and upcoming-event detection.
- `meetupUrl` — canonical Meetup event URL. Replaces `MeetupEvent.link` for the "Meetup" link and default RSVP CTA when `rsvpLink` is absent.

Venue convention:
- If an event has a `venue` property, look up the venue name from `src/data/venue.yml`.
- **If an event has no `venue` property, it is an Online event.** The data layer should return `"Online event"` as the venue name in this case.

Notes (still applicable):
- Existing `rsvpLink` values are preserved; they continue to override `meetupUrl` for RSVP actions.
- Dynamic Meetup API fields (`status`, `isFull`, `isRsvpOpen`, `shouldClose`) were not backfilled; these will be removed or replaced with date-based logic.
- `mapURL` and `directions` live in `src/data/venue.yml`, not in event data. Events without a `venue` property are online and do not need map/directions.

---

## Phase 1: Project Scaffolding

### 1.1 Initialize Next.js 15
Create a new Next.js project (App Router). Key config in `next.config.ts`:
```ts
output: 'export'
images: { unoptimized: true }  // required for static export
```

### 1.2 Tailwind CSS v4
Install Tailwind v4 with `@tailwindcss/postcss`. Migrate the custom `primary` teal color palette and typography/forms plugins from current `tailwind.config.js`.

### 1.3 TypeScript (strict: all source code must be TypeScript post-migration)
Configure `tsconfig.json` for App Router with `@/` path alias for `src/` and `strict: true`. Use the `src/` directory structure (`src/app/`, `src/lib/`, `src/components/`, etc.). Enable the ESLint rule `@typescript-eslint/no-explicit-any` (set to `"error"`) to ban all uses of `any` — use `unknown` with type narrowing or research the correct type instead. **Every source file in the migrated codebase must be `.ts` or `.tsx` — no `.js` or `.jsx` files may remain in `src/app/`, `src/lib/`, `src/components/`, or `src/content/` directories.** Convert all files during migration, not as a follow-up.

### 1.4 Move content files
- `src/data/*.yml` → `src/data/` (stays in `src/`)
- `src/contents/*.md` and `*.mdx` → `src/content/pages/`
- `static/_redirects` → `public/`

**Key files:**
- `tailwind.config.js` — current Tailwind config to migrate
- `src/gatsby-plugin-theme-ui/index.js` — Theme UI tokens to consolidate into Tailwind

---

## Phase 2: Data Layer

### 2.1 Define TypeScript types (`src/lib/types.ts`)
Interfaces for: `Event`, `Speaker`, `Talk`, `Venue`, `Update`, `ScheduleItem`, `Material`. All data access code must be fully typed — `any` is banned across the entire codebase. Use `unknown` for values whose type is not known (e.g., raw YAML parse output) and narrow with type guards or assertions before use.

### 2.2 Data access module (`src/lib/data.ts`)
Replaces the entire `gatsby/custom-graphql.js` GraphQL layer. Uses `yaml` npm package + `fs.readFileSync` at build time. All functions must have explicit return types.

Core functions:
- `getAllEvents()`, `getEventByName(name)`
- `getAllSpeakers()`, `getSpeakerById(id)`
- `getAllTalks()`, `getTalkById(id)`
- `getAllVenues()`, `getVenueById(id)`
- `getAllUpdates()`

Computed/derived functions (replacing custom GraphQL resolvers):
- `getSpeakerImageUrl(speaker)` — returns explicit image or `https://github.com/{github}.png`
- `getSpeakersForEvent(event)` — extracts from schedule → talks → speakers
- `getTalksForSpeaker(speakerId)` — reverse lookup
- `getWorkshopsForSpeaker(speakerId)` — events where type=workshop and instructor includes speaker
- `getWebcastsForSpeaker(speakerId)` — same for webcasts
- `getEventForTalk(talkId)` — finds event containing talk in schedule
- `getVenueForEvent(event)` — resolves venue ID from `venue.yml`; if event has no `venue` property, returns `"Online event"` as the venue name
- `getUpdatesForEvent(eventName)` — filters by meetupEvent field

Add module-level caching so YAML files are read once per build.

### 2.3 Site metadata (`src/lib/site.ts`)
Static constants (typed with `as const satisfies`) replacing `gatsby-config.js` siteMetadata and `useSiteMetadata` hook.

**Key files to replicate logic from:**
- `gatsby/custom-graphql.js` — all computed fields and relationships
- `src/hooks/use-upcoming-event.js` — upcoming event logic
- `src/lib.js` — utility functions (groupBy, pluralize)

---

## Phase 3: App Shell & Layout

### 3.1 Root layout (`src/app/layout.tsx`)
- Import global CSS (Tailwind directives)
- Default metadata via Next.js Metadata API (replaces `react-helmet` / `Seo` component)
- Render Header/Footer

### 3.2 Migrate shell components
| Component | Changes |
|-----------|---------|
| `Header` | `gatsby` Link → `next/link`, `useSiteMetadata` → direct import, `activeClassName` → `usePathname()` |
| `Footer` | Replace `useLastBuild` with build-time env var |
| `Link` | Wrap `next/link` for internal, `<a>` for external |
| `NLink` / `NButton` | Keep Tailwind classes, drop Theme UI variants |
| `Seo` | **Delete** — replaced by Metadata API |

**Key files:**
- `src/components/header.js`
- `src/components/footer.js`
- `src/components/link.js`
- `src/components/seo.js`

---

## Phase 4: Static Pages

Each page loses its `graphql` export and calls data functions directly as a Server Component.

| Current file | New route | Key changes |
|-------------|-----------|-------------|
| `src/pages/index.js` | `src/app/page.tsx` | Replace `useUpcomingEvent()` + `allMeetupEvent` query with `getAllEvents()` filtered/sorted. Extract speakers from recent meetups. |
| `src/pages/events.js` | `src/app/events/page.tsx` | `getAllEvents()` sorted by date DESC |
| `src/pages/speakers.js` | `src/app/speakers/page.tsx` | `getAllSpeakers()` + resolve talks/workshops per speaker |
| `src/pages/talks.js` | `src/app/talks/page.tsx` | `getAllTalks()` sorted by title |
| `src/pages/submit-a-talk.js` | `src/app/submit-a-talk/page.tsx` | Netlify form markup unchanged. Convert to Tailwind. |
| `src/pages/submit-topic.js` | `src/app/submit-topic/page.tsx` | Same approach |
| `src/pages/this-month-on-react.js` | `src/app/this-month-on-react/page.tsx` | `getAllUpdates()` grouped by event |
| `src/pages/talk-submitted.js` | `src/app/talk-submitted/page.tsx` | Simple static page |
| `src/pages/topic-submitted.js` | `src/app/topic-submitted/page.tsx` | Simple static page |
| `src/pages/404.js` | `src/app/not-found.tsx` | Simple static page |

**Key files:**
- `src/pages/index.js` — most complex page
- `src/pages/events.js`

---

## Phase 5: Dynamic Pages

### 5.1 Event pages (`src/app/event/[name]/page.tsx`)
Single dynamic route replaces 4 Gatsby templates (meetup/webcast/workshop/codelab). Uses `generateStaticParams()` returning all event names. Dispatches to the appropriate sub-component based on `event.type`.

**Templates to merge:**
- `src/templates/meetup-template.js`
- `src/templates/webcast-template.js`
- `src/templates/workshop-template.js`
- `src/templates/codelab-template.js`

### 5.2 MDX content pages (`src/app/[slug]/page.tsx`)
Use `next-mdx-remote/rsc` to compile MDX at build time. `generateStaticParams()` reads `src/content/pages/` directory. Pass custom components (e.g., `ReactClinicDrawing`) via the `components` prop (since `next-mdx-remote` doesn't support inline imports).

Ensure `[slug]` doesn't conflict with other top-level routes (`events`, `speakers`, `talks`, etc.).

**Template to replace:**
- `src/templates/note-template.js`

### 5.3 Drop Twitter page
Delete `/react-on-twitter` and all tweet-related components (`tweets.js`, `tweet.js`, `progress-bar.js`, `react-on-twitter-template.js`, `use-interval.js`).

---

## Phase 6: Component Migration (Styling Consolidation)

For each of ~40 remaining components:
1. Rename `.js`/`.jsx` → `.tsx`, add typed props (use `interface` for component props, exported from the component file)
2. Replace `gatsby` imports (Link, graphql, Image)
3. Convert Theme UI `sx` props → Tailwind classes
4. Remove `/** @jsx jsx */` pragma and `theme-ui` imports
5. Replace `gatsby-image` → `next/image` (with `unoptimized`)
6. Remove GraphQL fragment exports
7. `any` is banned — use `unknown` and narrow with type guards when the type is uncertain, or research the correct type from library typings

**Components with heaviest Theme UI usage (convert first):**
- `src/components/schedule-item.js` — 13 `sx` props
- `src/components/banner.js` — mixed sx + Emotion + Tailwind
- `src/components/video-player.jsx` — sx responsive styles

**Components to delete:**
- `tweets.js`, `tweet.js`, `progress-bar.js` (Twitter feature)
- `photos.js` (photos feature removed)
- `seo.js` (replaced by Metadata API)
- `react-clinic-drawing.js` (if unused outside MDX — pass as MDX component instead)

---

## Phase 7: Forms

Netlify forms work with static exports — keep the `data-netlify="true"` attribute pattern. The two forms:
- `submit-talk-form` → convert to Tailwind, keep Netlify attributes
- `talk-topic-form` → same

Form components in `src/components/form/` are already TypeScript — minimal changes needed.

---

## Phase 8: Build & Deployment

### 8.1 Testing
Replace Jest 26 with Vitest. Update the single test file (`submit-talk-form.spec.js` → `submit-talk-form.spec.tsx`) — remove `ThemeProvider` wrapper after Theme UI removal. All test files must be `.ts` or `.tsx`.

### 8.2 Netlify config (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "https://kl-react.netlify.com/*"
  to = "https://kl-react.com/:splat"
  status = 301
  force = true
```

---

## Phase 9: Cleanup

### Delete Gatsby artifacts
- `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`
- `gatsby/` directory (custom-graphql.js, custom-mdx.js, mock-graphql.js, generate-image.js)
- `src/gatsby-plugin-theme-ui/`
- `jest.config.js`, `jest-preprocess.js`, `loadershim.js`, `__mocks__/`
- `og-image-template/`
- `test-screenshot.js`

### Verify no JavaScript source files remain
Run `find src/app/ src/lib/ src/components/ src/content/ -name '*.js' -o -name '*.jsx'` and confirm zero results. Only config files at the project root (e.g., `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`) are allowed — and these should also be `.ts`/`.mts` where the tooling supports it.

### Remove unused dependencies
`gatsby` and all `gatsby-*` packages, `theme-ui`, `@emotion/react`, `@emotion/styled`, `react-helmet`, `moment`, `@tailwindcss/ui` (deprecated), `gatsby-source-meetup`, `gatsby-source-twitter`, `gatsby-source-s3-image`, `snarkdown` (evaluate replacement)

---

## Verification

After each phase, verify:
1. `npx tsc --noEmit` passes with zero errors, then `npm run build` succeeds (produces `out/` directory)
2. `npx serve out` — manually check all routes:
   - Home, Events, Speakers, Talks pages load with correct data
   - All ~33 `/event/{name}` pages render correctly
   - All MDX content pages render (`/code-of-conduct`, `/privacy-policy`, etc.)
   - Forms display correctly (test Netlify submission after deploy)
   - Speaker images load (GitHub avatars, custom URLs)
   - Internal navigation works
   - 404 page shows for invalid routes
3. Compare URL inventory: every route on the current site should exist in the new build
4. Deploy preview on Netlify — verify forms, redirects, and metadata

---

## New Dependency List

| Package | Purpose | Replaces |
|---------|---------|----------|
| `next` (v15) | Framework | `gatsby` |
| `react` (v19) | UI library | `react` v17 |
| `tailwindcss` (v4) | Styling | `tailwindcss` v2 + `theme-ui` + `@emotion/*` |
| `@tailwindcss/postcss` | Build | `postcss` config |
| `@tailwindcss/typography` | Prose styling | same |
| `yaml` | YAML parsing | `gatsby-transformer-yaml` |
| `next-mdx-remote` | MDX rendering | `gatsby-plugin-mdx` |
| `react-player` | Video embeds | same (keep) |
| `react-feather` / `react-icons` | Icons | same (keep) |
| `classnames` | CSS class merging | same (keep) |
| `vitest` + `@testing-library/react` | Testing | `jest` |
