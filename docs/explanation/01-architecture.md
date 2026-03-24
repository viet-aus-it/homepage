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
- **[Biome](https://biomejs.dev/)**: Unified linter and formatter replacing ESLint + Prettier. Faster and simpler configuration.
- **[Vitest](https://vitest.dev/)**: Testing framework with native Vite integration. Runs tests in the same pipeline as the build.

## Project Structure

```
src/           — Application source code (components, pages, hooks, services, types, utils)
infra/         — Infrastructure as code (AWS CDK)
public/        — Static assets
.github/       — CI/CD workflows (GitHub Actions)
docs/          — Project documentation (Diataxis framework)
.agents/       — AI agent rules and skills
```

## Design Principles

- **Community-first**: Features serve the VAIT community's needs
- **Performance**: Optimised for [Core Web Vitals](https://web.dev/articles/vitals) and mobile devices
- **Accessibility**: Targets [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) AA compliance with semantic HTML and keyboard navigation
- **Simplicity**: Minimal dependencies, clear code paths, no over-engineering

---

See also:
- [Infrastructure](./02-infrastructure.md) — AWS and Cloudflare architecture
- [Project Reference](../reference/01-project-reference.md) — Tech stack versions and commands
