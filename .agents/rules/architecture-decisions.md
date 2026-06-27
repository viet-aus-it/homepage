# Architecture Decision Records (agents)

Load only for **structural** work (see [AGENTS.md](../../AGENTS.md)). With this file, read applicable **Accepted** ADRs from [docs/adr/README.md](../../docs/adr/README.md).

## Split

| Layer          | Source                                         |
| -------------- | ---------------------------------------------- |
| Visual         | [DESIGN.md](../../DESIGN.md)                   |
| Structure      | ADRs — rationale only, no code                 |
| Implementation | Codebase (authoritative for current behaviour) |

ADRs state **intent**. If code and an ADR disagree, fix both in one PR (update code or supersede ADR).

## Read ADRs before

Shared components across public routes · new public routes · module boundary or naming changes.

Visual-only work → DESIGN.md, not necessarily a new ADR.

## Write ADR when

Convention is new, reversible, had alternatives, or would surprise reviewers. Process: [docs/adr/README.md](../../docs/adr/README.md).

## Do not

Restate ADR decisions in other rules, skills, or AGENTS.md — link to ADRs instead.
