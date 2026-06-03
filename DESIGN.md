## Overview

The VAIT homepage is the public face of **Vietnamese Australians in Information Technology Inc.** — a not-for-profit community for Viet-Au IT professionals in Australia. The base atmosphere is a **warm cream-and-stone canvas** (`{colors.canvas}` — stone-50 / `#fafaf9`) with a **fixed animated gradient backdrop** (`{component.futuristic-background}`) and **charcoal ink** for reading. Where many community sites default to cold corporate blue, VAIT leads with **brand yellow** (`{colors.brand-yellow}` — `#f4df4d`) as the single high-voltage accent — echoed in the tick-and-star logo, section headings, footer type, and the primary Discord CTA.

Type voice runs the **system UI stack** (shadcn/Tailwind default sans) at **semibold display weights** for hero and section titles, with **tracking-tight** on headlines. There is no licensed display face yet; hierarchy is carried by size steps (36px → 60px hero) and colour (yellow-dark for section h2, gray-700 for body).

Component voltage comes from three anchors: the **floating pill nav** (`{component.nav-bar}`), the **full-viewport hero** with community CTA, and a **white elevated content shell** (`{component.content-shell}`) that holds alternating image/text bands. The **dark charcoal footer** (`{component.footer}`) inverts the warm page — yellow legal text on gray-dark — so the site closes with institutional weight, not another cream band.

**Key Characteristics:**
- Warm stone canvas (`{colors.canvas}`) plus cream gradient backdrop (`{colors.backdrop-from}` — `#fffbea` → white → `#fef9ef`).
- Brand yellow accent (`{colors.brand-yellow}` — `#f4df4d`) on CTAs, footer ink, and section titles; gray scale for structure (`{colors.brand-gray}`, `{colors.brand-gray-dark}`).
- Tick-and-star **VAIT logo** SVG (`{component.logo}`) with three colourways: full colour, gray, dark-gray.
- **Discord** as the single primary conversion path (`{component.join-community-cta}`).
- Generous pill radii: `{rounded.full}` for nav and CTA, `{rounded.2xl}` for the content shell, `{rounded.md}` for shadcn defaults.
- Alternating **7/5-style** two-column sections (`{component.section-with-image}`) with real community photography.
- Footer is **dark** (`{colors.brand-gray-dark}`) — deliberate contrast to the warm page body.

## Colors

### Brand & Accent
- **Brand Yellow** (`{colors.brand-yellow}` — `#f4df4d`): Primary CTA fill, footer headline text, logo primary ticks. Logo source also lists `#F5DF4D` — treat as the same family; CSS token is canonical for the site.
- **Brand Yellow Dark** (`{colors.brand-yellow-dark}` — `#e0c944`): Section h2 emphasis (`text-brand-yellow-dark`).
- **Brand Yellow Darker** (`{colors.brand-yellow-darker}` — `#c7b139`): Deeper yellow for future badges or hover depth (utility classes exist; lightly used today).
- **Brand Gray** (`{colors.brand-gray}` — `#959595`): Footer divider, secondary logo paths, CTA hover background. Logo secondary: `#939597`.
- **Brand Gray Dark** (`{colors.brand-gray-dark}` — `#1c1c1c`): Footer background, CTA label ink, hero subtitle (`text-brand-dark-gray` in components — maps to this token).

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
- **On Yellow** (`{colors.on-yellow}` — `{colors.brand-gray-dark}`): CTA label on yellow button.
- **On Dark** (`{colors.on-dark}` — `{colors.brand-yellow}`): Footer primary line on charcoal.

### Semantic (shadcn)
- **Primary** (`{colors.primary}`): shadcn default button (outline nav icon uses `{component.button-outline}`).
- **Destructive** (`{colors.destructive}`): Form/error states (reserved).
- **Ring** (`{colors.ring}`): Focus rings on interactive elements.

## Typography

### Font Family
The system uses the **Tailwind/shadcn default sans stack** (system UI). No custom webfont is loaded in `index.html`. Headlines rely on **weight and size**, not a display face.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-hero}` | 36–60px (`text-4xl` → `text-6xl`) | 600 | 1.2 | tight | Hero h1 |
| `{typography.display-subhero}` | 30–36px (`text-3xl` → `text-4xl`) | 400 (default) | default | tight | Hero h2 / subtitle |
| `{typography.title-section}` | 24–30px (`text-2xl` → `text-3xl`) | 600 | default | 0 | Section h2 — brand yellow-dark |
| `{typography.body}` | 16px (default) | 400 | default | 0 | Section descriptions (`text-gray-700`) |
| `{typography.footer}` | 14px (`text-sm`) | 400 | default | 0 | Footer legal lines |
| `{typography.button-cta}` | 18px (`text-lg`) | 600 | default | 0 | Join Community CTA |
| `{typography.nav-link}` | 14px (`text-sm`) | 500 | default | 0 | Desktop nav items (shadcn NavigationMenu) |
| `{typography.badge}` | 12px (`text-xs`) | 500 | default | 0 | Section anchor badges (`#{sectionId}`) |

### Principles
- **One accent colour in type**: yellow-dark for section titles; avoid introducing a second headline colour without updating tokens.
- **Hero subtitle** uses charcoal (`{colors.brand-gray-dark}`), not muted gray — keeps the value prop readable on warm backgrounds.
- **Semibold** is the ceiling for marketing headlines; heavier weights are unnecessary on the system stack.

### Note on Font Substitutes
When a display face is introduced, prefer a **warm, slightly rounded sans** (e.g. DM Sans, Plus Jakarta Sans) that harmonises with yellow without competing with the logo ticks. Until then, tighten tracking on display sizes only.

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

| Level | Treatment | Use |
|---|---|---|
| Flat backdrop | Fixed gradient + soft blobs + noise line texture | `{component.futuristic-background}` |
| Floating nav | `bg-background` + border, no heavy shadow | `{component.nav-bar}` |
| Content shell | `shadow-md` on white card | `{component.content-shell}` |
| CTA emphasis | `shadow-lg` on yellow pill | `{component.join-community-cta}` |
| Footer band | Flat charcoal, top border `border-brand-gray` | `{component.footer}` |

Depth is **atmospheric** (gradient blobs) plus **one card elevation** for editorial content — not a multi-shadow marketing stack.

### Decorative Depth
- **Animated warm blobs** — pulse animation, heavy blur; not tokenised beyond hex fills above.
- **Repeating hairline texture** — 1px horizontal lines at 0.5% black alpha over the backdrop.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | `calc(var(--radius) - 4px)` (~6px) | shadcn small controls |
| `{rounded.md}` | `calc(var(--radius) - 2px)` (~8px) | Default buttons, badges |
| `{rounded.lg}` | `var(--radius)` (10px / 0.625rem) | Base `--radius` in `:root` |
| `{rounded.xl}` | `calc(var(--radius) + 4px)` (~14px) | shadcn xl variant |
| `{rounded.2xl}` | 16px (Tailwind) | Content shell |
| `{rounded.full}` | 9999px | Nav bar, Discord CTA, outline icon button |

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

**`hero`** — `min-h-screen` centred band; h1 `{typography.display-hero}`, h2 `{typography.display-subhero}`, embeds `{component.join-community-cta}`.

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

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | `{component.nav-sheet}` replaces `{component.nav-menu}`; hero type scales down (`text-4xl` h1); sections single column |
| Tablet / Desktop | ≥ 768px | Full horizontal nav; section grids 2-column; footer legal inline with separator |
| Wide | ≥ 1024px | `max-w-screen-lg` containers centred with side margin via `mx-auto` |

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

- No custom webfont or formal `{typography.*}` CSS variables — sizes live in Tailwind classes only.
- `text-brand-dark-gray` is used in components but the utility is named `text-brand-gray-dark` — align naming in a follow-up.
- `{colors.brand-yellow}` vs logo `#F5DF4D` are slightly different hex values; consolidate to one token.
- Dark mode tokens exist in `:root` / `.dark` but the marketing page does not toggle dark theme.
- Blob animation timings and `prefers-reduced-motion` overrides are not formalised.
- Form inputs and validation states are shadcn defaults — not extracted for marketing.
- Additional routes (`not-found`, future pages) are not fully specified in this document.
- In-app or member portal UI is out of scope — this file covers the public homepage only.
