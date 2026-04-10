# KL React Gatsby Project Overview

## Snapshot
- Gatsby 3.2 + React 17 app driven by Yarn scripts (`package.json`) and Netlify hosting; tooling predates Gatsby 4/5, React 18, and Tailwind 3.
- Content is assembled from YAML (`src/data`), MDX (`src/contents`), and third-party APIs (Meetup, Twitter, AWS S3) with extensive manual GraphQL schema glue in `gatsby/custom-graphql.js`.
- Styling mixes Tailwind CSS 2.1 JIT (`tailwind.config.js`), Theme UI (`src/gatsby-plugin-theme-ui/index.js`), Emotion, and ad-hoc CSS modules (e.g., `src/components/banner.css`), so components rely on multiple styling paradigms simultaneously.
- Build process includes headless Puppeteer image generation (`gatsby/generate-image.js`) executed during `gatsby-node.js:onPostBuild`, plus Netlify form handling and redirects that are baked into the repo.

## Build & Deployment
- Yarn commands map directly to Gatsby tasks: `start` (`gatsby develop`), `build`, `clean`, `test`, `lint` (`package.json`).
- GitHub Actions workflow `.github/workflows/build.yml` targets Node 16 (now out of LTS), caches Yarn, runs `yarn lint`, `yarn test --coverage`, builds with secrets for Twitter + AWS, and deploys `public/` via `nwtgck/actions-netlify` using `NETLIFY_AUTH_TOKEN`/`NETLIFY_SITE_ID`.
- `gatsby-config.js` loads `.env.${NODE_ENV}` via `dotenv` and expects `TWITTER_*` plus `AWS_ACCESS_KEY`/`AWS_SECRET_ACCESS` at build time; missing keys trigger mock schemas rather than hard failures.
- Netlify specifics: `_redirects` in `static/` rewrites the default subdomain, and Netlify forms rely on `data-netlify` attributes inside `src/components/submit-talk-form.js` and `src/components/talk-topic-form.js`.

## Data & Content Sources
### Local structured content
- YAML collections (`src/data/event.yml`, `talk.yml`, `speaker.yml`, `update.yml`, `venue.yml`) feed `gatsby-transformer-yaml`, describing events, speakers, venues, and curated updates.
- MDX/Markdown lives under `src/contents/` (code of conduct, privacy policy, how-to guides). `gatsby/custom-mdx.js` adds slug fields via `createFilePath` and builds pages with `src/templates/note-template.js`.

### External APIs & plugins
- Meetup events: `gatsby-source-meetup` fetches `kl-react` events with RSVP metadata (`gatsby-config.js`). Custom resolvers stitch MeetupEvent nodes to YAML definitions for schedules, venues, and computed fields like `isFull`/`shouldClose` using `moment` (`gatsby/custom-graphql.js`).
- Twitter favorites: `gatsby-source-twitter` pulls `favorites/list` for `@KlReact` when `TWITTER_CONSUMER_KEY` et al are present. Without credentials, `gatsby/mock-graphql.js` supplies stub node types so components (e.g., `src/templates/react-on-twitter-template.js`, `src/components/tweets.js`) still build locally.
- Event photos: `gatsby-source-s3-image` points at `kl-react-photos` (prod) or `kl-react-meetup-dev` (dev) buckets using AWS credentials; GraphQL resolvers map `EventYaml.photos` to these nodes so components such as `src/components/photos.js` can render `gatsby-image` fluids.
- File system sources collect OG templates (`og-image/`), MDX content, and `src/contents`.

### GraphQL customization pipeline
- `gatsby/custom-graphql.js` defines bespoke types (`MeetupEvent`, `SpeakerYaml`, `EventYaml`, custom Twitter node) and resolvers linking YAML to remote nodes, deriving computed booleans, formatting dates, and downloading avatars via `createRemoteFileNode`.
- `gatsby-node.js` wires lifecycle APIs: `onCreateNode` delegates to MDX helpers, `createPages` builds `/event/*`, `/react-on-twitter`, and MDX pages, while `onPostBuild` queries `allMeetupEvent` and generates OG assets.
- `gatsby/mock-graphql.js` provides fallback schemas when env keys are absent to keep local development unblocked, an unusual pattern to note during future migrations.

### Social image generation
- `gatsby/generate-image.js` uses Puppeteer + Mustache templates from `og-image-template/*.html` to render 1200×628 PNGs into `public/og_image/` for meetups, workshops, and compact variants. This runs after each build (`gatsby-node.js:onPostBuild`) and has its own development harness in `test-screenshot.js`.

## UI & Styling Stack
- Tailwind CSS 2.1 runs in JIT mode with custom colors/typography (`tailwind.config.js`) and is activated globally via `gatsby-browser.js` importing `src/tailwind.css`.
- Theme UI supplies design tokens and the `sx` prop (`src/gatsby-plugin-theme-ui/index.js`), while many components include the pragma `/** @jsx jsx */` and use Theme UI primitives (e.g., `ScheduleItem`, `Photos`, `Note`).
- Emotion (`@emotion/react`, `@emotion/styled`) powers bespoke animations such as `src/components/progress-bar.js` and the illustrated `src/components/react-clinic-drawing.js`.
- Classic CSS is still present (e.g., `src/components/banner.css`’s giant inline SVG background). The coexistence of Tailwind utility classes, Theme UI `sx`, Emotion CSS, and raw CSS makes styling non-standard and potentially hard to port to another stack.
- Media utilities lean on deprecated `gatsby-image` fragments (`...GatsbyImageSharpFluid_withWebp`, `...Fixed`) rather than the modern `gatsby-plugin-image`.
- Content rendering quirks include `snarkdown` for speaker bios (`src/components/speaker-card.js`) and manual pluralization helpers in `src/lib.js`.

## Forms & Interactive Features
- Talk submission (`src/pages/submit-a-talk.js`) and topic suggestion (`src/pages/submit-topic.js`) reuse shared form components under `src/components/form/` (TypeScript) and rely on Netlify form attributes for backend handling. There is a targeted Jest test in `src/components/submit-talk-form.spec.js`.
- Tweets carousel (`src/components/tweets.js`) rotates curated favorites, recalculating delay per tweet/media and enabling developer-only playback controls when `NODE_ENV === 'development'`.
- Video embeds use `react-player` (`src/components/video-player.jsx`). CTA flows (e.g., `Banner`, `CTA`) depend on `useUpcomingEvent` hook, which queries GraphQL for the next event and merges Meetup + YAML fields (`src/hooks/use-upcoming-event.js`).

## Key Pages & Templates
- Landing page logic lives in `src/pages/index.js`, which blends upcoming event data, speaker highlights, talk schedule, CTA, and optional video/workshop summaries.
- Archive-style pages such as `events.js`, `speakers.js`, `talks.js`, and `this-month-on-react.js` pull from GraphQL fragments (`EventCard`, `SpeakerCard`, `Talk`, `Update`). Note that `this-month-on-react.js` comments mention GraphQL `groupBy` limitations, so updates are regrouped imperatively via a helper.
- Templates under `src/templates/` (meetup/workshop/webcast/codelab/react-on-twitter/note) shape detail pages. They expect the custom GraphQL schema (e.g., `EventYaml.seoImagePublicUrl`, `EventYaml.photos`, `MeetupEvent.info`).

## Testing, TypeScript & Tooling
- Jest 26 is configured via `jest.config.js`, using `babel-jest` with `babel-preset-gatsby` for JS and `ts-jest` for TS. Coverage targets `src/**/*.{js,jsx,ts,tsx}` and collects JUnit output.
- TypeScript exists primarily for form components; `tsconfig.json` targets `es5` + `commonjs`, enables `strict`, but mixes with JS files. Babel still handles most compilation, so migrating to modern TS/ESM will need config changes.
- ESLint extends `react-app`, warns on default exports except for page/template files (`.eslintrc`), and there is no project-level formatting script beyond `.prettierrc`.

## Notable Non-standard Behaviors & Migration Risks
1. **Outdated core stack** – React 17, Gatsby 3, Tailwind 2.1, Theme UI 0.6, `gatsby-image`, `gatsby-source-meetup`, `@tailwindcss/ui`, and `moment` are legacy dependencies in `package.json`. Upgrading or migrating to another framework will require replacement of deprecated APIs (e.g., switch to `gatsby-plugin-image`, move away from Meetup/Twitter plugins that no longer support modern auth flows).
2. **Heavy custom GraphQL layer** – `gatsby/custom-graphql.js` injects numerous derived fields, cross-type links, and remote file downloads. Any migration must reimplement logic for speaker avatars (GitHub/Twitter fallbacks), computed booleans (`isFull`, `shouldClose`), venue lookups, and S3 photo associations.
3. **Environment-gated features** – Twitter favorites, S3 photos, and `/react-on-twitter` page creation are conditional (`gatsby-config.js`, `gatsby-node.js`). Missing keys silently fall back to mock schemas, so production-only behavior can differ from local dev. Future platforms should surface configuration errors explicitly.
4. **Automated OG image generation** – Puppeteer renders templates into `public/og_image/*.png` during `onPostBuild`. Hosting environments must allow headless Chromium + filesystem writes, or this pipeline needs to be replaced with a serverless or build-service alternative.
5. **Mixed styling paradigms** – Components frequently interleave Tailwind classes, Theme UI `sx`, Emotion `css`, and plain CSS files. A migration (e.g., to Next.js or Remix) should plan an incremental styling strategy to avoid blocking on refactoring all UI primitives at once.
6. **Content coupling to Meetups** – Event workflows assume Meetup IDs embedded inside YAML (`EventYaml.meetup`) and use custom resolvers to join against live Meetup API responses. If the Meetup API goes away, the schedule, banner, RSVP buttons, and SEO data would all break simultaneously.
7. **Netlify-specific behaviors** – Forms rely on Netlify’s build-time parsing, `_redirects` expects Netlify routing, and build/deploy automation is tied to Netlify’s API. Alternative hosts will need equivalent functionality or rewrites for talk submission flows.
8. **Partial TypeScript adoption** – Form components are TS while most of the codebase remains JS. Tooling such as `ts-jest` and `tsconfig.json` still target ES5/CommonJS, which is atypical for modern bundlers and may complicate ESM/React 18 migrations.
9. **Manual data utilities** – `src/lib.js` includes helpers (e.g., `groupBy`) with defects (`if (!isFilledArray)` never calls the function), suggesting bespoke utility code needs auditing before reuse.
10. **Limited automated tests** – Aside from `submit-talk-form.spec.js`, there is little coverage. Future refactors should budget time for regression tests, especially around GraphQL data transformations and OG image generation.

## Quick Reference of Important Files
- `package.json`, `yarn.lock` – dependency and script definitions.
- `gatsby-config.js`, `gatsby-node.js`, `gatsby/` directory – project-specific Gatsby pipeline code.
- `src/data/*.yml`, `src/contents/*` – authorable content sources.
- `src/pages/*`, `src/templates/*`, `src/components/*` – UI implementation (notably `src/pages/index.js`, `src/components/banner.js`, `src/components/tweets.js`, `src/components/speaker-card.js`).
- `static/_redirects`, `.github/workflows/build.yml`, `test-screenshot.js`, `og-image-template/*` – deployment, routing, and asset-generation artifacts.

Use this document as the starting point for future migration planning: identify which custom behaviors must be reimplemented, which dependencies can be replaced in bulk, and where environment-specific assumptions (Netlify, Meetup, Twitter, AWS S3) need new equivalents.
