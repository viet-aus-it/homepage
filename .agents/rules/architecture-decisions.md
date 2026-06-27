# Architecture Decision Records

This rule tells agents **where structural decisions live** and **what not to duplicate** in rules, skills, or [AGENTS.md](../../AGENTS.md).

## Source of truth

| Concern                     | Read first                                     | Holds                                                                                                      |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Visual design**           | [DESIGN.md](../../DESIGN.md)                   | Colour tokens, typography, component keys, layout rhythm, do's and don'ts                                  |
| **Structural architecture** | [docs/adr/README.md](../../docs/adr/README.md) | Why modules exist, naming conventions, composition rules, boundaries between public site and future app UI |
| **Implementation**          | Codebase                                       | Current files, imports, and tests — may change without updating ADRs                                       |

**ADRs record rationale, not implementation.** They must not contain source code, file paths, or API signatures. When code and an ADR appear to disagree, trust the ADR for **intent** and the code for **current behaviour** — then fix the mismatch in the same pull request (update code or supersede the ADR).

## Do not duplicate ADRs in agent prompts

Rules under `.agents/rules/`, skills under `.agents/skills/`, and [AGENTS.md](../../AGENTS.md) describe **workflow and guardrails**. They must **not** restate ADR decisions (for example which shared layout layer exists, how public routes compose nav and footer, or why a folder is named `site`).

When you need structural context:

1. Open [docs/adr/README.md](../../docs/adr/README.md) and read the index.
2. Read every **Accepted** ADR that applies to the task.
3. Implement against the codebase; use [DESIGN.md](../../DESIGN.md) for visual contracts.

If a rule or skill still describes a structural layout that an ADR superseded, follow the ADR and flag the stale rule text for update — do not treat the rule as authoritative for structure.

## When to read ADRs

Load this rule and read applicable ADRs before:

- Adding or restructuring **shared** components used across public routes
- Introducing a new **public route** or page module
- Changing **module boundaries** (for example site chrome vs page sections vs UI primitives)
- Renaming top-level component areas or cross-cutting layers
- Proposing alternatives to a documented structural pattern

Visual-only work (colours, spacing, typography, section content) needs [DESIGN.md](../../DESIGN.md), not necessarily a new ADR.

## When to write or update an ADR

Add or update an ADR in the same pull request when the change:

- Establishes or reverses a **structural** convention
- Has reasonable alternatives worth recording
- Would surprise a reviewer who skipped the PR description

Follow the process in [docs/adr/README.md](../../docs/adr/README.md). Link the ADR from [Architecture](../../docs/explanation/01-architecture.md) when it affects how contributors navigate the project.

## Cross references

- **Visual design rule**: [code-style.md](./code-style.md) — public site UI tokens and components
- **Documentation audit**: [update-docs skill](../skills/update-docs/SKILL.md) — when to update ADRs vs DESIGN.md
- **Tech stack overview**: [docs/explanation/01-architecture.md](../../docs/explanation/01-architecture.md)
