<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Project overview

Pyro is a Next.js App Router app for color indexing and palette generation. It renders
color detail pages, generates palettes based on color theory, and provides random color
and palette discovery. Data is loaded from JSON files on disk (no database).

## Stack

- Next.js 16 App Router + TypeScript
- React 19
- Tailwind CSS
- next-intl for i18n
- culori for color math

## App routes (src/app)

- /: home page (featured color + brainstorm mode). dynamic = force-dynamic, revalidate=0.
  Uses hourly color, metadata helpers, and can toggle brainstorm cycling.
- /[color]: color detail page. Validates hex, redirects 3-digit to 6-digit, shows palettes
  and related colors. Query param r shows mobile regenerate button.
- /about: about page with localized content and attributions.
- /palette: route handler that redirects to a random palette URL.
- /palette/[colors]: palette generator page. Expects 3-8 colors as hyphen-separated hex.
- /random: route handler that redirects to a random color page with ?r.
- /api/brainstorm: returns 10 random named colors with full info.
- /api/random: returns a random named color hex as text. [currently disabled]
- /api/suggestions/[query]: returns name/hex suggestions for search.
- /favicon: edge route handler that returns an SVG favicon using ?hex.
- /not-found: custom 404 UI.

## Core domain logic (src/core)

- colorInfo.ts: derives IColorInfo (name, nearest named color, RGB/HSL/HSV/CMYK,
  palettes, related colors). Uses cached data and culori distance.
- paletteGenerator.ts: builds complementary, split, analogous, triadic, tetradic,
  shades, tints, and hues.
- colorGenerator.ts: random color generation and brainstorm set.
- randomPaletteGenerator.ts: picks a palette from a static dataset.
- cache.ts: loads color names, dark colors, and cached color info from JSON at startup.

## Data sources (no database)

- src/assets/data/colornames.min.json: hex -> name map
- src/assets/data/dark-colors.json: list of dark colors
- src/assets/colors/\*.json: cached color info blobs
- src/assets/data/palettes.ts: palette dataset used for random palettes

## UI components (src/components)

- MainColorComponent: brainstorm mode and featured color rendering.
- ColorCard/ColorDetails/Items/ColorTheory/Palette: color info + palettes UI.
- SearchInput + Suggestion: search with suggestions and hex picker.
- NavBar/Footer/ThemeSwitchButton: shell UI.
- Palette generator UI lives under src/app/palette/[colors]/\_components.

## i18n and theming

- next-intl config in src/i18n/request.ts and messages in src/i18n/messages.
- Theme stored in cookie, provided via ThemeContext and toggled client-side.

## Metadata and SEO

- src/util/meta.ts provides getMetadata/getViewport helpers.
- Dynamic favicon uses /favicon?hex=... (edge route).

## Runtime notes for agents

- Do not use Edge runtime for modules that touch fs (src/core/cache.ts).
- Most pages use server components; only specific UI bits are client components.
- Data is disk-backed JSON; no external DB or ORM.
