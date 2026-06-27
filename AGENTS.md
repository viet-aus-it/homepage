# VAIT Homepage — Agent Manifest

`PROJECT_CONTEXT_SIGNATURE: "VAIT_HOMEPAGE_AGENTS_v1.0"`

Official site for **Vietnamese Australians in IT** (not-for-profit community). Stack: React 19, Vite, TypeScript, TanStack Router, Zod, Oxlint/Oxfmt, Vitest, Cloudflare Workers. Australian English.

Emulate `.agents/` even when the runtime does not load it automatically.

## Load policy

**Default: this file only.** Do not preload domain rules, skills, `references.md`, or `.agents/README.md`.

| Trigger                                  | Also load                                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| UI / `src/components/` / `src/pages/`    | [DESIGN.md](DESIGN.md)                                                                                                            |
| Shared layout, routes, module boundaries | [docs/adr/README.md](docs/adr/README.md) + applicable ADRs + [architecture-decisions.md](.agents/rules/architecture-decisions.md) |
| Domain work (see below)                  | Matching `.agents/rules/<name>.md` + [references.md](.agents/rules/references.md)                                                 |
| Commit / PR / issue / docs audit         | Matching `.agents/skills/*/SKILL.md`                                                                                              |
| Extend agent config                      | [.agents/README.md](.agents/README.md) + [references.md](.agents/rules/references.md)                                             |

**Domain rules** (one at a time, not all): `commands`, `code-style`, `patterns`, `engineering-principles`, `communication`, `special-considerations`, `infrastructure`.

**Skills:** `create-github-issue`, `vait-commit`, `vait-create-pr`, `update-docs`.

Full path index: [references.md](.agents/rules/references.md).

## Mandatory

1. Before commit/push/PR: `pnpm run lint:gate` — auto-fix then verify (`ci`); fix remaining lint errors manually until it passes. Husky runs `scripts/lint-gate.sh`. Also `pnpm run typecheck` (+ `pnpm run test:run` when behaviour changed).
2. Visual → update [DESIGN.md](DESIGN.md). Structural → add/update [ADR](docs/adr/README.md). Do not copy either into rules.
3. Atomic commits/PRs; Conventional Commits; explicit `git add` when committing.

## Response

Name loaded rules/skills. Ask if constraints conflict.

**Drift:** Structure lives in ADRs; visuals in DESIGN.md; links in `references.md` — not duplicated across rule files.
