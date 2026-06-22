## Overview

The VAIT homepage is the public face of **Vietnamese Australians in Information Technology Inc.** — a not-for-profit community for Viet-Au IT professionals in Australia. The page opens on a **white canvas** with a **fixed dark navigation bar** (`{component.home-nav}`) over a **near-black hero band** (`{component.home-hero}`). Brand yellow (`{colors.brand-yellow}` — `#F5C518`) punctuates CTAs, the marquee band, and stat cards against charcoal and warm stone surfaces.

Type voice runs **Montserrat** (display/headings) and **Inter** (body), both self-hosted via `@fontsource-variable/*`. Hierarchy is carried by size steps, weight (Bold 700 for h1, SemiBold 600 for section titles), and colour (yellow emphasis on stat cards, muted grays on dark surfaces).

The page stacks vertically: dark hero → yellow hashtag marquee → warm-surface pillars and community reach → events preview → dark CTA band → three-column dark footer (`{component.home-footer}`). **Discord** is the single primary conversion path (`{component.discord-cta-link}`).

**Key Characteristics:**

- White page floor with dark hero and footer bookends; warm stone bands (`{colors.brand-surface-warm}`) for mid-page sections.
- Brand yellow accent on CTAs, marquee, and stat labels; near-black for hero and nav scroll state.
- Tick-and-star **VAIT logo** SVG (`{component.logo}`) with three colourways: full colour, gray, dark-gray.
- Fixed home nav with transparent-to-solid scroll transition; mobile sheet with ARIA toggles.
- Real community photography in hero and event cards.
- Skip link targets `#main-content`; title and description set in `index.html`.

**Route:** `/` via `src/routes/index.tsx` → `src/pages/home/`. Navigation hash links resolve against `HOME_PATH = '/'` in `src/lib/site-nav.ts`.

## Colors

Sourced from the **VAIT Branding Guidelines**. HEX/RGB drive screen; CMYK/PMS are for print (recorded here for reference, not used in CSS).

#### Primary

- **VAIT Yellow** (`{colors.brand-yellow}` — `#F5C518`, RGB 245·197·24, CMYK 0·20·90·4, PMS 109 C): Primary CTA fill, logo primary ticks, marquee band, accent. The single high-voltage brand colour.
- **Yellow Tint** (`{colors.brand-yellow-tint}` — `#FDF3C0`, RGB 253·243·192, CMYK 0·4·24·1): Soft yellow wash for tinted surfaces/backgrounds.
- **Yellow Shade** (`{colors.brand-yellow-shade}` — `#C9A010`, RGB 201·160·16, CMYK 0·20·92·21, PMS 1235 C): Deeper yellow for emphasis and hover depth. `{colors.brand-yellow-dark}` is a **deprecated alias** of this token, kept so existing `*-brand-yellow-dark` usages resolve.

#### Neutrals

Neutrals anchor text, backgrounds, and UI chrome without competing with the primary yellow.

- **Near Black** (`{colors.brand-near-black}` — `#1A1A1A`, RGB 26·26·26, CMYK 0·0·0·90, PMS Black 6 C): Hero background, nav scroll state, body ink, CTA label.
- **Dark Gray** (`{colors.brand-gray-dark}` — `#4A4A4A`, RGB 74·74·74, CMYK 0·0·0·71): Secondary text and UI chrome.
- **Mid Gray** (`{colors.brand-gray}` — `#8A8A8A`, RGB 138·138·138, CMYK 0·0·0·46, PMS Cool Gray 7 C): Dividers, secondary logo paths.
- **Light Gray** (`{colors.brand-gray-light}` — `#E8E8E4`, RGB 232·232·228, CMYK 0·0·2·9): Light surfaces and borders.

### Surface

| Token                             | CSS variable                    | Value     | Use                                  |
| --------------------------------- | ------------------------------- | --------- | ------------------------------------ |
| `{colors.brand-surface-warm}`     | `--brand-surface-warm`          | `#fbfaf6` | Pillars / community reach background |
| `{colors.brand-border-warm}`      | `--brand-border-warm`           | `#eceae3` | Section borders on warm surfaces     |
| `{colors.brand-footer-dark}`      | `--brand-footer-dark`           | `#141414` | Footer background                    |
| `{colors.brand-surface-elevated}` | `--brand-surface-elevated`      | `#2a2a2a` | Elevated dark card gradients         |
| **Page floor**                    | —                               | `#ffffff` | Default page background              |
| **Hairline**                      | `{colors.border}` / oklch token | —         | shadcn borders where used            |

### Text on dark surfaces

| Token                             | CSS variable                    | Value     | Use                                     |
| --------------------------------- | ------------------------------- | --------- | --------------------------------------- |
| `{colors.brand-on-dark-muted}`    | `--brand-text-on-dark-muted`    | `#b9b9b9` | Body copy on dark hero / CTA            |
| `{colors.brand-on-dark-subtle}`   | `--brand-text-on-dark-subtle`   | `#9a9a9a` | Secondary copy on dark surfaces         |
| `{colors.brand-on-dark-emphasis}` | `--brand-text-on-dark-emphasis` | `#e6e6e6` | Emphasis text on dark surfaces          |
| `{colors.brand-nav-muted}`        | `--brand-text-nav-muted`        | `#cfcfcf` | Desktop nav link default colour         |
| `{colors.brand-footer-dim}`       | `--brand-text-footer-dim`       | `#9a9a9a` | Footer pending labels and legal subline |
| `{colors.brand-yellow-emphasis}`  | `--brand-text-yellow-emphasis`  | `#7a6406` | Labels on yellow stat cards             |

Tailwind utilities: `text-brand-on-dark-muted`, `text-brand-nav-muted`, etc. Defined in `src/index.css`.

### Semantic

- **Discord online dot** (`{colors.brand-discord-online}` — `#3ba55d`): Live member indicator in hero badge.
- **On Yellow** (`{colors.on-yellow}` — `{colors.brand-near-black}`): CTA label on yellow button.

## Typography

### Font Family

Two typefaces from the **VAIT Branding Guidelines**, self-hosted via `@fontsource-variable/*` npm packages (no Google Fonts network requests):

- **Montserrat Variable** (`{typography.font-display}` — CSS token `--font-display`): Display / headings. Tailwind utility: `font-display`.
- **Inter Variable** (`{typography.font-sans}` — CSS token `--font-sans`): Body, captions, UI chrome. Tailwind utility: `font-sans`. Applied globally via `body { font-sans }`.

Both tokens are registered in `src/index.css` `@theme inline` and installed as `@fontsource-variable/montserrat` + `@fontsource-variable/inter`.

### Hierarchy

| Token                        | Size                              | Face       | Weight | Use                                |
| ---------------------------- | --------------------------------- | ---------- | ------ | ---------------------------------- |
| `{typography.display-hero}`  | 36–60px (`text-4xl` → `text-6xl`) | Montserrat | 700    | Hero h1 (`font-display font-bold`) |
| `{typography.title-section}` | 24–30px (`text-2xl` → `text-3xl`) | Montserrat | 600    | Section headings                   |
| `{typography.body}`          | 16px (default)                    | Inter      | 400    | Section descriptions               |
| `{typography.footer}`        | 14px (`text-sm`)                  | Inter      | 400    | Footer legal lines                 |
| `{typography.nav-link}`      | 14px (`text-sm`)                  | Inter      | 500    | Desktop nav items                  |

### Principles

- **One accent colour in type**: yellow for emphasis on dark surfaces and stat cards; avoid introducing a second headline colour without updating tokens.
- **Montserrat is display-only**: apply `font-display` to h1/h2/h3 headings; leave body, nav, and buttons on Inter.

## Layout

### Spacing System

- **Base unit:** 4px (Tailwind default).
- **Home nav height** (`{spacing.home-nav}` — `--home-nav-height`): `5.25rem` mobile / `4.5rem` desktop. Utilities: `pt-home-nav`, `min-h-home-nav`.
- **Section padding:** Defined per section via `{component.home-section}` inner container (`HOME_SECTION_INNER`).
- **Hero clearance:** `HOME_NAV_CLEARANCE` exported from `{component.home-section}` so hero content clears the fixed nav.

### Grid & Container

- **Max content width:** `max-w-screen-lg` (~1024px) for section inner containers.
- **Hero:** Split layout — copy column + community photo; dark background full-bleed under fixed nav.
- **Footer:** Three-column grid (`4fr / 1fr / 1fr` at `lg`) on `{colors.brand-footer-dark}`.

### Whitespace Philosophy

The page uses **vertical section rhythm** — each band owns its surface colour (dark hero, yellow marquee, warm stone, white events, dark CTA, dark footer). Avoid adding competing card shells inside sections; elevation comes from surface contrast, not stacked shadows.

## Elevation & Depth

| Level        | Treatment                       | Use                            |
| ------------ | ------------------------------- | ------------------------------ |
| Flat page    | White or warm stone fill        | Mid-page sections              |
| Dark bands   | Near-black / footer-dark        | Hero, CTA band, footer         |
| CTA emphasis | Hover lift + yellow glow shadow | `{component.discord-cta-link}` |
| Hero texture | Dot-grid overlay on dark hero   | `{component.home-hero}`        |

Depth is **surface contrast** plus **CTA hover glow** — not a multi-shadow marketing stack.

## Shapes

### Border Radius Scale

| Token            | Value                              | Use                             |
| ---------------- | ---------------------------------- | ------------------------------- |
| `{rounded.md}`   | `calc(var(--radius) - 2px)` (~8px) | Default controls                |
| `{rounded.lg}`   | `var(--radius)` (10px / 0.625rem)  | Base `--radius` in `:root`      |
| `{rounded.full}` | 9999px                             | Discord CTA links, nav controls |

## Components

### Navigation

**`home-nav`** — Fixed top bar (`position: fixed`). Transparent over the dark hero at page top; solid `{colors.brand-near-black}` after scroll. Mobile sheet toggles with `aria-expanded` / `aria-hidden`. Internal links use TanStack Router `Link`; hash links resolve via `HOME_PATH` in `src/lib/site-nav.ts`. Discord CTA uses `{component.discord-cta-link}` `variant="outlined"`.

### CTAs

**`discord-cta-link`** — Shared Discord CTA with `variant="solid"` (yellow fill, dark text) or `variant="outlined"` (ghost on dark footer). Sizes: `sm` | `md` | `lg` | `xl`. Hover lift, glow, and active press on both variants. Links to `{links.discord}`.

### Page sections

**`home-hero`** — Dark split hero with dot-grid texture, community photo, member badge. Section uses `{spacing.home-nav}` top padding (`HOME_NAV_CLEARANCE`) so content clears the fixed nav while the dark background extends under it.

**`home-section`** — Section shell: outer `section` owns surface styles; inner container owns `{HOME_SECTION_INNER}` spacing. Export `HOME_NAV_CLEARANCE` for hero offset.

**`home-marquee`** — Yellow hashtag band; duplicate track for infinite scroll; second track hidden under `prefers-reduced-motion`.

**`home-footer`** — Three-column footer on `{colors.brand-footer-dark}` (`4fr / 1fr / 1fr` grid at `lg`): brand blurb + Discord CTA, Explore, Follow. Bottom bar stacks legal copy (copyright, ABN, tagline) beside the **ACNC Registered Charity Tick** (reverse mono, 76px height, links to the ACNC charity register). Follow links: `FOOTER_FOLLOW` in `src/lib/site-nav.ts` (URLs from `SOCIAL_LINKS` in `constants.ts`; short links managed in [static-sites](https://github.com/viet-aus-it/static-sites)). ACNC asset and URLs: `ACNC` in `constants.ts`; logo at `public/images/acnc-registered-charity-reverse.png`.

### Logo

**`logo`** — SVG tick-and-star mark rendered by `src/components/ui/logo.tsx` (`{component.logo}`). Variants: `colour` (yellow + gray ticks), `gray`, `dark-gray` (charcoal + gray). Props: standard SVG attributes (`className`, `width`, `height`).

**Favicon assets** — Browser chrome and iOS home-screen icons use a **dedicated favicon mark** (rounded `{colors.brand-gray-dark}` tile, yellow `#F5C518` + white ticks) for legibility at 16×16 / 32×32 — separate from `{component.logo}` above. Design source: `tmp/logo-favicon.svg` (not served). Declared in `index.html`:

| File                   | Size      | Usage                                      |
| ---------------------- | --------- | ------------------------------------------ |
| `favicon.svg`          | 83×83 SVG | Modern browsers (`rel="icon"`)             |
| `favicon-32x32.png`    | 32×32     | PNG fallback                               |
| `favicon-16x16.png`    | 16×16     | PNG fallback                               |
| `apple-touch-icon.png` | 180×180   | iOS home screen (`rel="apple-touch-icon"`) |

Regenerate raster PNGs from `public/favicon.svg` via `rsvg-convert`. `index.html` sets `theme-color` to `#ffffff` (page background).

## Do's and Don'ts

### Do

- Keep the **dark hero / warm mid-page / dark footer** rhythm — it signals community with institutional weight at the close.
- Use **brand yellow** only for emphasis: CTAs, marquee, stat labels — not body paragraphs.
- Keep **Discord** as the primary outward CTA unless a second channel is officially approved.
- Use `{component.home-section}` for new landing sections before inventing new shells.
- Respect `max-w-screen-lg` for editorial width — do not stretch text edge-to-edge on desktop.
- Honour `prefers-reduced-motion` for marquee animation (second track hidden).
- Configure nav items in `src/lib/site-nav.ts` with progressive `enabled` flags as routes ship.

### Don't

- Don't add a second competing accent (e.g. blue CTAs) without updating `{colors.brand-yellow}` contract.
- Don't remove the skip link or `#main-content` target — required for keyboard accessibility.
- Don't hard-code nav destinations in components — use `site-nav.ts` helpers.
- Don't load a cold geometric sans that fights the yellow warmth without a design review.

## Responsive Behavior

### Breakpoints

| Name             | Width    | Key Changes                                                            |
| ---------------- | -------- | ---------------------------------------------------------------------- |
| Mobile           | < 768px  | `{component.home-nav}` mobile sheet; hero stacks; footer columns stack |
| Tablet / Desktop | ≥ 768px  | Full horizontal nav; hero split layout; footer three-column grid       |
| Wide             | ≥ 1024px | `max-w-screen-lg` containers centred with side margin via `mx-auto`    |

### Touch Targets

- `{component.discord-cta-link}` — `size="lg"` / `size="xl"` variants (~48px+ height target).
- Mobile nav menu button — ensure 44×44px hit area when auditing.

### Collapsing Strategy

- Nav collapses to sheet under `md`.
- Hero photo stacks below copy on mobile.
- Footer grid collapses to single column on small screens.

## Iteration Guide

1. Focus on **one component** per change — reference keys above (`{component.home-nav}`, etc.).
2. Map new colours to CSS variables in `src/index.css` (`--brand-*`) and add utilities in `@layer utilities` — avoid inline hex in components.
3. When adding pages, reuse `{component.home-nav}` + `{component.home-footer}` pattern before inventing new shells.
4. Nav and footer link changes belong in `src/lib/site-nav.ts` — not hard-coded in presentational components.
5. Logo colour changes must update `LOGO_COLOURS` in `{component.logo}` and CSS tokens together.
6. Display typography changes should update the hierarchy table in this file in the same PR.

## Known Gaps

- Typography CSS variables (`--font-display`, `--font-sans`) and fonts are set; formal `{typography.*}` size/spacing tokens are not yet extracted to CSS variables — sizes still live in Tailwind classes only.
- Dark mode tokens exist in `:root` / `.dark` but the marketing page does not toggle dark theme.
- Marquee animation timings and `prefers-reduced-motion` overrides are not formalised beyond hiding the duplicate track.
- Form inputs and validation states are shadcn defaults — not extracted for marketing.
- Additional routes (`not-found`, future pages) are not fully specified in this document.
- Open Graph and structured data meta tags are not yet implemented.
- In-app or member portal UI is out of scope — this file covers the public homepage only.
