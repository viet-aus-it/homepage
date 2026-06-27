# Architecture

This document explains the design decisions and tech stack rationale behind the VAIT Homepage.

## Overview

The VAIT Homepage is a static landing page for the Vietnamese Australians in Information Technology (VAIT) community. It is built as a single-page application with server-side optimisations for performance and SEO.

## Tech Stack Rationale

- **[React](https://react.dev/) 19**: Component-based UI with the latest concurrent features. Chosen for its ecosystem maturity and community support.
- **[Vite](https://vite.dev/)**: Fast build tool with hot module replacement. Chosen over alternatives for its speed and simplicity.
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type safety across the codebase. Reduces runtime errors and improves developer experience.
- **[TanStack Router](https://tanstack.com/router)**: Type-safe routing with built-in code splitting. Chosen for its first-class TypeScript support over React Router.
- **[React Query](https://tanstack.com/query)**: Server state management with caching, background refetching, and stale-while-revalidate patterns.
- **[Zod](https://zod.dev/)**: Schema validation for runtime type checking at system boundaries (API responses, form inputs, route params).
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)**: High-performance linter and formatter built on the Oxc compiler stack.
- **[Vitest](https://vitest.dev/)**: Testing framework with native Vite integration. Runs tests in the same pipeline as the build.

## Project Structure

```
src/           — Application source code (components, pages, hooks, services, types, utils)
public/        — Static assets
.github/       — CI/CD workflows (GitHub Actions)
docs/          — Project documentation (Diataxis framework)
docs/adr/      — Architecture Decision Records (structural decisions; no implementation code)
.agents/       — AI agent rules and skills
DESIGN.md      — Public site visual design system (repository root)
```

## Architecture Decision Records

Significant structural choices are recorded under [docs/adr/](./adr/README.md). ADRs explain **why** (for example shared site layout components, naming conventions, module boundaries). They intentionally omit code and file paths so they do not drift when refactors land.

The first accepted record, [ADR 0001: Shared site layout components](./adr/0001-shared-site-layout-components.md), covers extracting reusable navigation, footer, and section primitives for all public routes.

## Design Principles

- **Community-first**: Features serve the VAIT community's needs
- **Performance**: Optimised for [Core Web Vitals](https://web.dev/articles/vitals) and mobile devices
- **Accessibility**: Targets [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) AA compliance with semantic HTML and keyboard navigation
- **Simplicity**: Minimal dependencies, clear code paths, no over-engineering

## Visual Design

Public site UI (colours, typography, layout, component keys) is documented in [DESIGN.md](../../DESIGN.md) at the repository root. That file is the source of truth for:

- Brand colours and landing page surfaces (dark hero, warm mid-page bands, dark footer)
- Named components (`{component.site-nav}`, `{component.page-section}`, `{component.home-hero}`, `{component.discord-cta-link}`, `{component.site-footer}`, and related keys)
- Typography hierarchy, spacing, and responsive breakpoints
- Do's and don'ts (for example brand yellow for emphasis only, dark hero/footer bookends, Discord as primary CTA)

Structural layout decisions — such as why shared site components exist and how public routes compose them — are recorded in [ADRs](../adr/README.md), starting with [ADR 0001](../adr/0001-shared-site-layout-components.md). ADRs hold rationale; DESIGN.md holds visual contracts. Neither stores implementation code.

When changing public-site visuals, read `DESIGN.md` first and update it in the same pull request if tokens or documented component behaviour change. When introducing a new structural pattern (new module boundary, naming convention, or cross-route layer), add or update an ADR.

---

See also:

- [Design System](../../DESIGN.md) — Full visual design reference
- [Architecture Decision Records](../adr/README.md) — Structural decisions (ADRs)
- [Infrastructure](./02-infrastructure.md) — Cloudflare Workers architecture
- [Project Reference](../reference/01-project-reference.md) — Tech stack versions and commands
