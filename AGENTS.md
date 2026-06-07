# VAIT Homepage (Team VAIT)

## Universal Agents Control Manifest

All agents must emulate `.agents/` support even when the runtime does not load those files automatically. Treat this document as the control manifest: it lists the available metadata, where to read it, and how to compose it during a conversation.

## About the Project

You are working on the VAIT Homepage, the official website for the Viet-Aus IT community. The project values:

- **Community-first**: Building features that serve the VAIT community
- **User experience**: Fast, accessible, and responsive web design
- **Code quality**: Clean, maintainable, and well-tested code
- **Modern stack**: Using cutting-edge frontend technologies
- **Performance**: Optimised for [Core Web Vitals](https://web.dev/articles/vitals) and mobile devices

## Role & Technical Context

- **Domain**: Community homepage showcasing VAIT events, membership, and resources
- **Team**: VAIT (Vietnamese Australians in Information Technology community)
- **Tech Stack**: [React](https://react.dev/) 19, [Vite](https://vite.dev/), [TypeScript](https://www.typescriptlang.org/), [TanStack Router](https://tanstack.com/router), [Zod](https://zod.dev/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [Vitest](https://vitest.dev/)
- **Architecture**: Component-based architecture with type-safe routing and state management
- **Visual design**: [DESIGN.md](DESIGN.md) — tokens, components, and do's/don'ts for the public homepage (warm canvas, brand yellow, shadcn/Tailwind)
- **Infrastructure**: [Cloudflare Workers](https://workers.cloudflare.com/) for deployment

## Change Management Philosophy

All changes must be:

- **Atomic**: The smallest possible and logically complete unit of change
- **Safe**: Reviewed, tested, and production-ready
- **Tested**: Component tests required for new features, integration tests for user workflows
- **Linted**: Must pass `pnpm run lint:fix && pnpm run typecheck` before commit
- **Documented**: Clear commit messages following [Conventional Commits](https://www.conventionalcommits.org/); new features must include doc updates following the [Diataxis](https://diataxis.fr/) framework
- **Delivered**: Merged via pull request after review

## Project Structure

```
.agents/
  skills/
    update-docs/SKILL.md  # Documentation audit and update workflow
  rules/           # Domain-specific guidelines and constraints
    commands.md
    code-style.md
    patterns.md
    engineering-principles.md
    communication.md
    special-considerations.md
    infrastructure.md
DESIGN.md                # Visual design system (homepage UI — read before marketing UI changes)
docs/
  index.md               # Documentation hub (Diataxis framework)
  tutorials/             # Learning-oriented guides
  how-to/                # Goal-oriented recipes
  explanation/           # Understanding-oriented discussion
  reference/             # Information-oriented lookup
```

## Execution Protocol

1. **Always read this file first** before starting a task so you know which skills or rules to load from `.agents/`.
2. **Visual / marketing UI** (colours, typography, layout, new homepage sections, brand components): read [DESIGN.md](DESIGN.md) before editing `src/components/` or `src/pages/`. Update `DESIGN.md` in the same pull request when you add or change design tokens, named components, or documented behaviour.
3. **Skills**:
   - Load a skill only if its trigger condition matches the task. Example: code review tasks must load `skills/code-review/SKILL.md`.
   - Once loaded, obey the process and output format defined inside the skill file so the final response stays consistent.
   - Skills are located in `.agents/skills/[skill-name]/SKILL.md`
4. **Rules**:
   - Rules are long-lived constraints (API guidelines, coding practices, etc.). Whenever a task touches those domains, read the matching file under `.agents/rules/`.
   - Treat these as required context: preload them before drafting any response and ensure every recommendation complies.
   - Rules are located in `.agents/rules/[rule-name].md`
5. **Response contract**:
   - Explicitly mention which skills and rules are in effect.
   - Derive findings, recommendations, or code while enforcing all loaded constraints. If conflicts arise, ask for clarification before diverging.

## Available Rules

Load these rules when working on relevant domains:

- **[commands.md](.agents/rules/commands.md)** - Complete reference of available pnpm commands and workflows
- **[code-style.md](.agents/rules/code-style.md)** - Code formatting, TypeScript conventions, React patterns
- **[patterns.md](.agents/rules/patterns.md)** - React, TanStack Router, and testing patterns
- **[engineering-principles.md](.agents/rules/engineering-principles.md)** - Clean code, performance, security, decision framework
- **[communication.md](.agents/rules/communication.md)** - Communication style and output expectations
- **[special-considerations.md](.agents/rules/special-considerations.md)** - Browser compatibility, SEO, accessibility, deployment
- **[infrastructure.md](.agents/rules/infrastructure.md)** - Cloudflare Workers patterns, deployment strategies, and operational best practices

## Visual Design System

- **[DESIGN.md](DESIGN.md)** — Canonical reference for the public homepage: colour tokens (`{colors.*}`), typography scale, layout, elevation, component keys (`{component.*}`), responsive behaviour, iteration guide, and known gaps. Pair with **[code-style.md](.agents/rules/code-style.md)** and **[special-considerations.md](.agents/rules/special-considerations.md)** for accessibility and implementation detail.

## Available Skills

Load a skill when its trigger condition matches the task:

- **[update-docs](.agents/skills/update-docs/SKILL.md)** — Audit and update docs after code changes. Trigger: user asks to update, sync, or audit documentation.

## Quick Reference

### Tech Stack

- [React](https://react.dev/) 19, [Vite](https://vite.dev/), [TypeScript](https://www.typescriptlang.org/)
- [TanStack Router](https://tanstack.com/router), [Zod](https://zod.dev/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for linting and formatting, [Vitest](https://vitest.dev/) for testing
- [Cloudflare Workers](https://workers.cloudflare.com/) for deployment

### Essential Commands

```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run test         # Run tests (watch mode)
pnpm run test:run     # Run tests once
pnpm run lint:fix     # Fix code formatting and linting
pnpm run typecheck    # Run TypeScript type checking
```

### Key Principles

- **Atomic changes**: Smallest logical units
- **Test coverage**: Component and integration tests
- **Type safety**: Strict TypeScript with no `any`
- **Performance first**: [Core Web Vitals](https://web.dev/articles/vitals) optimisation
- **Accessibility**: [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) AA compliance
- **Visual consistency**: Follow [DESIGN.md](DESIGN.md) for marketing UI; keep tokens in `src/index.css` (`--brand-*`)

## Rules vs. Skills at a Glance

| Aspect           | Rules                                             | Skills                                                                     |
| ---------------- | ------------------------------------------------- | -------------------------------------------------------------------------- |
| Purpose          | Concise written instructions covering a domain.   | Full toolkits: guidance plus reusable templates and verified workflows.    |
| Execution effort | Agent interprets and implements from scratch.     | Drop-in code, docs, and checklists shorten build time.                     |
| Complexity focus | Describes guardrails; depends on agent expertise. | Encodes battle-tested patterns for tricky or specialized scenarios.        |
| Maintenance      | Update the prose rule as policies evolve.         | Refresh the whole package (docs + sample code) when better solutions ship. |

Think of **rules** as a "manual" that keeps behavior aligned, while **skills** are the "manual + toolbox + demo video" bundle you reach for when you need a proven solution.

## Extending the Manifest

- Additional **skills** (architecture review, test planning, etc.) or **rules** (team code style, compliance requirements) can be added under the existing folders.
- Keep this file updated so future agents know when to load each artifact and how to combine them safely.

Remember: You're supporting the VAIT community homepage. Focus on clean, performant, and accessible code that serves the community well. When in doubt, follow existing patterns in the codebase, [DESIGN.md](DESIGN.md) for visual work, and the relevant rules.
