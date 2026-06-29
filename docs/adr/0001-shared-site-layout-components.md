# ADR 0001: Shared site layout components

- **Status:** Accepted
- **Date:** 2026-06-26
- **Issue / PR:** [#70](https://github.com/viet-aus-it/homepage/issues/70), [#72](https://github.com/viet-aus-it/homepage/pull/72)

## Context

The VAIT Homepage is expanding from a single landing route to multiple public pages (for example `/community`, and future routes such as events or membership). The homepage originally embedded navigation, footer, section spacing, and repeated section patterns inside page-specific components. Secondary pages would either duplicate that chrome or diverge visually and behaviourally.

We needed a shared layer for layout and section composition that multiple public routes could reuse without copying markup or styles.

## Decision drivers

- **Consistency:** Public pages must share the same nav, footer, section rhythm, and CTA patterns documented in [DESIGN.md](../../DESIGN.md).
- **Maintainability:** A change to site chrome (nav scroll behaviour, footer columns, section padding) should land once, not per page.
- **Clear boundaries:** Public marketing-style pages are separate from future authenticated or in-app UI; the component layer should reflect that scope.
- **Naming honesty:** VAIT is a community organisation, not a product marketing site. Folder and component naming should describe **site structure**, not promotional intent.
- **Document stability:** Architectural docs record decisions and roles, not implementation details that change every refactor.

## Considered options

1. **Keep page-local components** — Leave navigation, footer, and section shells inside each page module (for example homepage-only nav and footer). Simple initially, but guarantees duplication as soon as a second public route ships.

2. **Shared components under a “marketing” name** — Common industry label for pre-app static pages. Rejected because it implies a sales or growth function that does not match VAIT’s mission, and it collides with how this repo uses “marketing” informally in older docs for “public-facing UI.”

3. **Shared “site” layout components** — Extract reusable chrome and section primitives into a dedicated site component area, with design contracts in DESIGN.md and structural rationale in ADRs. **Chosen.**

## Decision

We extract reusable **site layout components** for all public routes:

| Role               | Component key (design)       | Responsibility                                                                                                                              |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Site navigation    | `{component.site-nav}`       | Fixed or sticky top bar; **landing** variant for the homepage hero; **inner** variant for secondary public routes with active-route styling |
| Site footer        | `{component.site-footer}`    | Three-column footer, Discord CTA, explore/follow links, legal and ACNC charity mark                                                         |
| Page section shell | `{component.page-section}`   | Outer section surface plus inner max-width and vertical padding                                                                             |
| Section header     | `{component.section-header}` | Eyebrow, title, and optional lede                                                                                                           |
| Stat tile          | `{component.stat-card}`      | Credibility or reach statistics                                                                                                             |
| CTA band           | `{component.cta-band}`       | Full-width dark call-to-action band                                                                                                         |

**Homepage-specific sections** (hero, marquee, event preview, and similar) remain in the homepage page module. They **compose** shared site components where appropriate rather than redefining chrome.

**Navigation destinations** (routes, hash links, enabled flags) stay in a central nav configuration module — not hard-coded inside presentational components.

**Naming:** The shared folder and components use **site**, not **marketing**. DESIGN.md holds visual tokens and component keys; ADRs hold structural decisions without code.

## Consequences

### Positive

- New public pages compose existing site chrome instead of forking nav or footer.
- Visual and accessibility behaviour (skip link, mobile sheet, scroll-solid nav) stays aligned across routes.
- Reviewers can separate **design changes** (DESIGN.md) from **structural decisions** (ADRs).
- The name **site** scales to community, about, events, and join flows without sounding promotional.

### Negative / trade-offs

- Homepage refactors must migrate to shared components when they touch chrome — slightly more indirection than page-local files.
- Nav variants (landing vs inner) add a small conceptual cost; contributors must pick the correct variant per route.
- DESIGN.md and ADRs must stay in sync when component **roles** change, even though neither stores implementation code.

## Related documentation

- [DESIGN.md](../../DESIGN.md) — Component keys, colours, typography, and public-site do's and don'ts
- [Architecture](../explanation/01-architecture.md) — Tech stack and documentation map
- Epic: [Community page (#69)](https://github.com/viet-aus-it/homepage/issues/69)
