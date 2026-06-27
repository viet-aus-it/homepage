# Shared References

Compact index — load **only with a domain rule** or when extending agent config (see [AGENTS.md](../../AGENTS.md)). Do not preload every session.

## Docs

- [DESIGN.md](../../DESIGN.md) — visual tokens, component keys
- [docs/adr/README.md](../../docs/adr/README.md) — structural ADRs
- [docs/index.md](../../docs/index.md) — Diataxis hub
- [docs/explanation/01-architecture.md](../../docs/explanation/01-architecture.md) — stack overview
- [docs/explanation/02-infrastructure.md](../../docs/explanation/02-infrastructure.md) — Cloudflare
- [docs/reference/01-project-reference.md](../../docs/reference/01-project-reference.md) — commands, testing
- [docs/how-to/01-development.md](../../docs/how-to/01-development.md) · [02-contributing](../../docs/how-to/02-contributing.md) · [03-deployment](../../docs/how-to/03-deployment.md)

## Rules

`architecture-decisions` · `commands` · `code-style` · `patterns` · `engineering-principles` · `communication` · `special-considerations` · `infrastructure` — all under `.agents/rules/`.

## Skills

`create-github-issue` · `vait-commit` · `vait-create-pr` · `update-docs` — under `.agents/skills/`.

## Maintainers

New rule, skill, doc path, or ADR → update this file (+ [AGENTS.md](../../AGENTS.md) routing if needed). Procedure: [.agents/README.md](../README.md).

## Git hooks

[scripts/lint-gate.sh](../../scripts/lint-gate.sh) · [.husky/pre-commit](../../.husky/pre-commit) · [.husky/pre-push](../../.husky/pre-push) · `pnpm run lint:gate`
