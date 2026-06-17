## Overview

The VAIT homepage is the public face of **Vietnamese Australians in Information Technology Inc.** — a not-for-profit community for Viet-Au IT professionals in Australia. The base atmosphere is a **warm cream-and-stone canvas** (`{colors.canvas}` — stone-50 / `#fafaf9`) with a **fixed animated gradient backdrop** (`{component.futuristic-background}`) and **charcoal ink** for reading. Where many community sites default to cold corporate blue, VAIT leads with **brand yellow** (`{colors.brand-yellow}` — `#F5C518`) as the single high-voltage accent — echoed in the tick-and-star logo, section headings, footer type, and the primary Discord CTA.

Type voice runs **Montserrat** (display/headings) and **Inter** (body), both self-hosted via `@fontsource-variable/*`. Hierarchy is carried by size steps (36px → 60px hero), weight (Bold 700 for h1, SemiBold 600 for h2), and colour (yellow-dark for section h2, gray-700 for body).

Component voltage comes from three anchors: the **floating pill nav** (`{component.nav-bar}`), the **full-viewport hero** with community CTA, and a **white elevated content shell** (`{component.content-shell}`) that holds alternating image/text bands. The **dark charcoal footer** (`{component.footer}`) inverts the warm page — yellow legal text on gray-dark — so the site closes with institutional weight, not another cream band.

**Key Characteristics:**

- Warm stone canvas (`{colors.canvas}`) plus cream gradient backdrop (`{colors.backdrop-from}` — `#fffbea` → white → `#fef9ef`).
- Brand yellow accent (`{colors.brand-yellow}` — `#F5C518`) on CTAs, footer ink, and section titles; gray scale for structure (`{colors.brand-gray}`, `{colors.brand-gray-dark}`).
- Tick-and-star **VAIT logo** SVG (`{component.logo}`) with three colourways: full colour, gray, dark-gray.
- **Discord** as the single primary conversion path (`{component.join-community-cta}`).
- Generous pill radii: `{rounded.full}` for nav and CTA, `{rounded.2xl}` for the content shell, `{rounded.md}` for shadcn defaults.
- Alternating **7/5-style** two-column sections (`{component.section-with-image}`) with real community photography.
- Footer is **dark** (`{colors.brand-gray-dark}`) — deliberate contrast to the warm page body.

## Colors

Sourced from the **VAIT Branding Guidelines**. HEX/RGB drive screen; CMYK/PMS are for print (recorded here for reference, not used in CSS).

#### Primary

- **VAIT Yellow** (`{colors.brand-yellow}` — `#F5C518`, RGB 245·197·24, CMYK 0·20·90·4, PMS 109 C): Primary CTA fill, logo primary ticks, accent. The single high-voltage brand colour.
- **Yellow Tint** (`{colors.brand-yellow-tint}` — `#FDF3C0`, RGB 253·243·192, CMYK 0·4·24·1): Soft yellow wash for tinted surfaces/backgrounds.
- **Yellow Shade** (`{colors.brand-yellow-shade}` — `#C9A010`, RGB 201·160·16, CMYK 0·20·92·21, PMS 1235 C): Deeper yellow for emphasis and hover depth. `{colors.brand-yellow-dark}` is a **deprecated alias** of this token, kept so existing `*-brand-yellow-dark` usages resolve.

#### Neutrals

Neutrals anchor text, backgrounds, and UI chrome without competing with the primary yellow.

- **Near Black** (`{colors.brand-near-black}` — `#1A1A1A`, RGB 26·26·26, CMYK 0·0·0·90, PMS Black 6 C): Dark surfaces (footer), charcoal ink, CTA label, hero subtitle.
- **Dark Gray** (`{colors.brand-gray-dark}` — `#4A4A4A`, RGB 74·74·74, CMYK 0·0·0·71): Secondary text and UI chrome.
- **Mid Gray** (`{colors.brand-gray}` — `#8A8A8A`, RGB 138·138·138, CMYK 0·0·0·46, PMS Cool Gray 7 C): Dividers, secondary logo paths, CTA hover background.
- **Light Gray** (`{colors.brand-gray-light}` — `#E8E8E4`, RGB 232·232·228, CMYK 0·0·2·9): Light surfaces and borders.

### Surface

- **Canvas** (`{colors.canvas}` — `stone-50` / ~`#fafaf9`): Page floor on `{page.index}`.
- **Backdrop From** (`{colors.backdrop-from}` — `#fffbea`): Gradient start on `{component.futuristic-background}`.
- **Backdrop Via** (`{colors.backdrop-via}` — `#ffffff`): Gradient centre.
- **Backdrop To** (`{colors.backdrop-to}` — `#fef9ef`): Gradient end.
- **Blob Peach** (`{colors.blob-peach}` — `#ffe7d6`): Top-left animated blob (30% opacity, blur).
- **Blob Cream** (`{colors.blob-cream}` — `#ffeacc`): Bottom-right animated blob.
- **Surface Card** (`{colors.surface-card}` — `#ffffff`): Main content shell — white, `rounded-2xl`, `shadow-md`.
- **Surface Nav** (`{colors.surface-nav}` — `{colors.background}` / shadcn `background`): Floating nav pill fill.
- **Hairline** (`{colors.hairline}` — `{colors.border}` / oklch border token): Nav border, shadcn inputs.

### Text

- **Ink** (`{colors.ink}` — `{colors.foreground}`): Default body from shadcn theme (~near-black oklch).
- **Body** (`{colors.body}` — `gray-700`): Section descriptions in `{component.section-with-image}`.
- **Muted** (`{colors.muted}` — `{colors.muted-foreground}`): shadcn muted copy where used.
- **On Yellow** (`{colors.on-yellow}` — `{colors.brand-near-black}`): CTA label on yellow button.
- **On Dark** (`{colors.on-dark}` — `{colors.brand-yellow}`): Footer primary line on charcoal.

### Semantic (shadcn)

- **Primary** (`{colors.primary}`): shadcn default button (outline nav icon uses `{component.button-outline}`).
- **Destructive** (`{colors.destructive}`): Form/error states (reserved).
- **Ring** (`{colors.ring}`): Focus rings on interactive elements.

## Typography

### Font Family

Two typefaces from the **VAIT Branding Guidelines**, self-hosted via `@fontsource-variable/*` npm packages (no Google Fonts network requests):

- **Montserrat Variable** (`{typography.font-display}` — CSS token `--font-display`): Display / headings. Tailwind utility: `font-display`.
- **Inter Variable** (`{typography.font-sans}` — CSS token `--font-sans`): Body, captions, UI chrome. Tailwind utility: `font-sans`. Applied globally via `body { font-sans }`.

Both tokens are registered in `src/index.css` `@theme inline` and installed as `@fontsource-variable/montserrat` + `@fontsource-variable/inter`.

### Hierarchy

| Token                           | Size                              | Face       | Weight | Line Height | Letter Spacing | Use                                                           |
| ------------------------------- | --------------------------------- | ---------- | ------ | ----------- | -------------- | ------------------------------------------------------------- |
| `{typography.display-hero}`     | 36–60px (`text-4xl` → `text-6xl`) | Montserrat | 700    | 1.2         | tight          | Hero h1 (`font-display font-bold`)                            |
| `{typography.display-subtitle}` | 30–36px (`text-3xl` → `text-4xl`) | Montserrat | 600    | default     | tight          | Hero h2 / subtitle (`font-display font-semibold`)             |
| `{typography.title-section}`    | 24–30px (`text-2xl` → `text-3xl`) | Montserrat | 600    | default     | 0              | Section h2 — brand yellow-dark (`font-display font-semibold`) |
| `{typography.body}`             | 16px (default)                    | Inter      | 400    | default     | 0              | Section descriptions (`text-gray-700`)                        |
| `{typography.footer}`           | 14px (`text-sm`)                  | Inter      | 400    | default     | 0              | Footer legal lines                                            |
| `{typography.button-cta}`       | 18px (`text-lg`)                  | Inter      | 600    | default     | 0              | Join Community CTA                                            |
| `{typography.nav-link}`         | 14px (`text-sm`)                  | Inter      | 500    | default     | 0              | Desktop nav items (shadcn NavigationMenu)                     |
| `{typography.badge}`            | 12px (`text-xs`)                  | Inter      | 500    | default     | 0              | Section anchor badges (`#{sectionId}`)                        |

### Principles

- **One accent colour in type**: yellow-dark for section titles; avoid introducing a second headline colour without updating tokens.
- **Hero subtitle** uses charcoal (`{colors.brand-near-black}`), not muted gray — keeps the value prop readable on backgrounds.
- **Montserrat is display-only**: apply `font-display` to h1/h2/h3 headings; leave body, nav, and buttons on Inter.

## Layout

### Spacing System

- **Base unit:** 4px (Tailwind default).
- **Tokens:** `{spacing.1}` 4px · `{spacing.2}` 8px · `{spacing.3}` 12px · `{spacing.4}` 16px · `{spacing.6}` 24px · `{spacing.8}` 32px · `{spacing.16}` 64px.
- **Nav offset:** `top-6` + `inset-x-4` — floating nav breathes below viewport edge.
- **Section padding:** `py-8` inside sections; `my-8` around content shell; `my-16` around standalone CTA block.
- **Hero:** `min-h-screen`, centred column, `max-w-screen-md` for copy.

### Grid & Container

- **Max content width:** `max-w-screen-lg` (~1024px) for nav, content shell, and section grid.
- **Hero:** Single centred column; background is full-bleed fixed layer.
- **Sections:** `grid-cols-1` → `md:grid-cols-2` with `md:gap-16`; `reverse` alternates image/text order.
- **Footer:** Full-width band, centred stacked legal copy.

### Whitespace Philosophy

VAIT uses **vertical rhythm through full-viewport hero + card shell** rather than many separated bands. Warm background fills negative space; the white shell concentrates scan path for three feature stories. Avoid adding more boxed cards inside the shell — alternation already provides rhythm.

## Elevation & Depth

| Level         | Treatment                                        | Use                                 |
| ------------- | ------------------------------------------------ | ----------------------------------- |
| Flat backdrop | Fixed gradient + soft blobs + noise line texture | `{component.futuristic-background}` |
| Floating nav  | `bg-background` + border, no heavy shadow        | `{component.nav-bar}`               |
| Content shell | `shadow-md` on white card                        | `{component.content-shell}`         |
| CTA emphasis  | `shadow-lg` on yellow pill                       | `{component.join-community-cta}`    |
| Footer band   | Flat charcoal, top border `border-brand-gray`    | `{component.footer}`                |

Depth is **atmospheric** (gradient blobs) plus **one card elevation** for editorial content — not a multi-shadow marketing stack.

### Decorative Depth

- **Animated warm blobs** — pulse animation, heavy blur; not tokenised beyond hex fills above.
- **Repeating hairline texture** — 1px horizontal lines at 0.5% black alpha over the backdrop.

## Shapes

### Border Radius Scale

| Token            | Value                               | Use                                       |
| ---------------- | ----------------------------------- | ----------------------------------------- |
| `{rounded.sm}`   | `calc(var(--radius) - 4px)` (~6px)  | shadcn small controls                     |
| `{rounded.md}`   | `calc(var(--radius) - 2px)` (~8px)  | Default buttons, badges                   |
| `{rounded.lg}`   | `var(--radius)` (10px / 0.625rem)   | Base `--radius` in `:root`                |
| `{rounded.xl}`   | `calc(var(--radius) + 4px)` (~14px) | shadcn xl variant                         |
| `{rounded.2xl}`  | 16px (Tailwind)                     | Content shell                             |
| `{rounded.full}` | 9999px                              | Nav bar, Discord CTA, outline icon button |

## Components

### Top Navigation

**`nav-bar`** — Fixed pill nav, 56px tall (`h-14`), `{colors.surface-nav}` background, `{rounded.full}`, `max-w-screen-lg` centred, `top-6` inset. Left: `{component.logo}` dark-gray. Centre/right: `{component.nav-menu}` (desktop) + vertical separator + Discord `{component.button-outline-icon}` + `{component.nav-sheet}` (mobile).

**`nav-menu`** — Anchor links to `#knowledge-sharing`, `#networking-events`, `#professional-growth`. Hidden below `md`.

**`nav-sheet`** — Mobile slide-out; carries logo + same anchors + Discord CTA pattern.

### Buttons

**`button-primary`** (shadcn default) — `{colors.primary}` fill; used sparingly on marketing surface.

**`button-outline`** — Hairline border; Discord icon affordance in nav (`rounded-full`, `size="icon"`).

**`join-community-cta`** — `{colors.brand-yellow}` background, `{colors.on-yellow}` text, `{rounded.full}`, `text-lg`, `shadow-lg`, Discord icon inline. Hover: `{colors.brand-gray}` background, white text. Links to `{links.discord}`.

### Cards & Containers

**`futuristic-background`** — `fixed inset-0 z-0` gradient layer with two pulsing blobs and subtle line texture. Sits behind all page content.

**`hero`** — `min-h-screen` centred band; h1 `{typography.display-hero}`, h2 `{typography.display-subtitle}`, embeds `{component.join-community-cta}`.

**`content-shell`** — `bg-white rounded-2xl shadow-md p-8 my-8 max-w-screen-lg` wrapping all `{component.section-with-image}` blocks.

**`section-with-image`** — Two-column section; `{component.badge}` with `#{sectionId}`; h2 in brand yellow-dark; body `{colors.body}`; image `rounded` (default lg radius). `reverse` flips column order at `md+`.

**`footer`** — Full-width `{colors.brand-gray-dark}` band; `{colors.on-dark}` for ABN / Association lines; `{colors.brand-gray}` for copyright subline; centred stack, `md` row for legal pair.

### Logo

**`logo`** — SVG tick-and-star mark. Variants: `colour` (yellow + gray ticks), `gray`, `dark-gray` (charcoal + gray). Props: standard SVG attributes (`className`, `width`, `height`).

### Tabs / Badges

**`badge`** (shadcn secondary) — Section labels like `#knowledge-sharing`; small, muted fill.

## Do's and Don'ts

### Do

- Keep the page on **warm stone + cream gradient** — it signals community, not enterprise SaaS cold gray.
- Use **brand yellow** only for emphasis: CTAs, footer highlights, section titles — not body paragraphs.
- Keep **Discord** as the primary outward CTA unless a second channel is officially approved.
- Alternate `{component.section-with-image}` with `reverse` for scan rhythm.
- Use the **dark footer** for legal/trust content — contrast anchors the organisation as established NFP.
- Respect `max-w-screen-lg` for nav and editorial width — do not stretch text edge-to-edge on desktop.
- Honour `prefers-reduced-motion` when extending blob animations (not yet wired).

### Don't

- Don't add a second competing accent (e.g. blue CTAs) without updating `{colors.brand-yellow}` contract.
- Don't flatten the page to pure white — lose `{component.futuristic-background}` and the site reads generic.
- Don't use the dark footer palette in the hero body — warmth is the opening move; charcoal is the close.
- Don't introduce heavy card grids inside `{component.content-shell}` — one shell is enough elevation.
- Don't document or rely on hover as a brand signal beyond existing CTA/nav patterns.
- Don't load a cold geometric sans that fights the yellow warmth without a design review.

## Responsive Behavior

### Breakpoints

| Name             | Width    | Key Changes                                                                                                            |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Mobile           | < 768px  | `{component.nav-sheet}` replaces `{component.nav-menu}`; hero type scales down (`text-4xl` h1); sections single column |
| Tablet / Desktop | ≥ 768px  | Full horizontal nav; section grids 2-column; footer legal inline with separator                                        |
| Wide             | ≥ 1024px | `max-w-screen-lg` containers centred with side margin via `mx-auto`                                                    |

### Touch Targets

- `{component.join-community-cta}` — `size="lg"` shadcn button (~48px height target).
- Nav Discord icon button — `size="icon"`; ensure 44×44px hit area when auditing.

### Collapsing Strategy

- Nav collapses to sheet under `md`.
- Hero remains centred single column at all breakpoints.
- Section images stack below copy on mobile regardless of `reverse`.
- Content shell retains white card and horizontal padding (`px-4` page, `p-8` shell).

## Iteration Guide

1. Focus on **one component** per change — reference keys above (`{component.nav-bar}`, etc.).
2. Map new colours to CSS variables in `src/index.css` (`--brand-*`) and add utilities in `@layer utilities` — avoid inline hex in components.
3. When adding pages, reuse `{component.futuristic-background}` + `{component.nav-bar}` + footer pattern before inventing new shells.
4. Section copy changes belong in page config (`sections` array on index) — not hard-coded in presentational components.
5. Logo colour changes must update `LOGO_COLOURS` in `{component.logo}` and CSS tokens together.
6. Display typography changes should update the hierarchy table in this file in the same PR.

## Known Gaps

- Typography CSS variables (`--font-display`, `--font-sans`) and fonts are set; formal `{typography.*}` size/spacing tokens are not yet extracted to CSS variables — sizes still live in Tailwind classes only.
- Dark mode tokens exist in `:root` / `.dark` but the marketing page does not toggle dark theme.
- Blob animation timings and `prefers-reduced-motion` overrides are not formalised.
- Form inputs and validation states are shadcn defaults — not extracted for marketing.
- Additional routes (`not-found`, future pages) are not fully specified in this document.
- In-app or member portal UI is out of scope — this file covers the public homepage only.

## Home v2 landing (`/v2` staging)

Staging redesign at `/v2` until promotion to `/`. Production `/` still uses the legacy warm-canvas layout documented above.

### Surfaces and tokens

| Token                             | CSS variable                    | Value                               | Use                                                              |
| --------------------------------- | ------------------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| `{colors.brand-surface-warm}`     | `--brand-surface-warm`          | `#fbfaf6`                           | Pillars / community reach background                             |
| `{colors.brand-border-warm}`      | `--brand-border-warm`           | `#eceae3`                           | Section borders on warm surfaces                                 |
| `{colors.brand-footer-dark}`      | `--brand-footer-dark`           | `#141414`                           | v2 footer background                                             |
| `{colors.brand-on-dark-muted}`    | `--brand-text-on-dark-muted`    | `#b9b9b9`                           | Body copy on dark hero / CTA                                     |
| `{colors.brand-on-dark-subtle}`   | `--brand-text-on-dark-subtle`   | `#9a9a9a`                           | Secondary copy on dark surfaces                                  |
| `{colors.brand-on-dark-emphasis}` | `--brand-text-on-dark-emphasis` | `#e6e6e6`                           | Emphasis text on dark surfaces                                   |
| `{colors.brand-nav-muted}`        | `--brand-text-nav-muted`        | `#cfcfcf`                           | Desktop nav link default colour                                  |
| `{colors.brand-footer-dim}`       | `--brand-text-footer-dim`       | `#9a9a9a`                           | Footer pending labels and legal subline (WCAG AA on footer dark) |
| `{colors.brand-yellow-emphasis}`  | `--brand-text-yellow-emphasis`  | `#7a6406`                           | Labels on yellow stat cards                                      |
| `{colors.brand-surface-elevated}` | `--brand-surface-elevated`      | `#2a2a2a`                           | Elevated dark card gradients                                     |
| `{colors.brand-discord-online}`   | `--brand-discord-online`        | `#3ba55d`                           | Live member indicator dot                                        |
| `{spacing.landing-nav}`           | `--landing-nav-height`          | `5.25rem` mobile / `4.5rem` desktop | Fixed nav bar height and hero clearance                          |

Tailwind utilities: `pt-landing-nav`, `min-h-landing-nav`, `text-brand-on-dark-muted`, etc. Defined in `src/index.css`.

### Components

**`discord-cta-link`** — Shared Discord CTA with `variant="solid"` (yellow fill, dark text) or `variant="outlined"` (ghost on dark footer). Sizes: `sm` | `md` | `lg` | `xl`. Hover lift, glow, and active press on both variants.

**`landing-nav`** — Fixed top bar (`position: fixed`). Transparent over the dark hero at page top; solid `{colors.brand-near-black}` after scroll. Mobile sheet toggles with `aria-expanded` / `aria-hidden`. Internal links use TanStack Router `Link`; Discord CTA uses `{component.discord-cta-link}` `variant="outlined"`.

**`home-hero`** — Dark split hero with dot-grid texture, community photo, member badge. Section uses `{spacing.landing-nav}` top padding (`LANDING_NAV_CLEARANCE`) so content clears the fixed nav while the dark background extends under it.

**`home-section`** — Section shell: outer `section` owns surface styles; inner container owns `{HOME_SECTION_INNER}` spacing. Export `LANDING_NAV_CLEARANCE` for hero offset.

**`home-marquee`** — Yellow hashtag band; duplicate track for infinite scroll; second track hidden under `prefers-reduced-motion`.

**`home-v2-footer`** — Three-column footer on `{colors.brand-footer-dark}` (brand blurb, Explore, Follow). Follow column uses empty external URLs until social links are configured.

### Staging behaviour

- Route: `/v2` (`src/routes/v2/index.tsx` → `src/pages/home-v2/`).
- `HOME_PATH = '/v2'` in `src/lib/site-nav.ts` — flip to `/` on promotion.
- Page sets `noindex, nofollow` via robots meta; restored on unmount.
- Skip link targets `#main-content`.
