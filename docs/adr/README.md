# Architecture Decision Records

This directory tracks significant architectural and structural decisions for the VAIT Homepage. Each record captures **why** a decision was made, not **how** it is implemented — implementation lives in the codebase and may change without invalidating the rationale.

Records follow a lightweight [Architecture Decision Record (ADR)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) format adapted for this project.

**Agents and contributors:** [AGENTS.md](../../AGENTS.md), [.agents/rules/references.md](../../.agents/rules/references.md), and [.agents/rules/architecture-decisions.md](../../.agents/rules/architecture-decisions.md) point here for structural decisions. Rules and skills must not duplicate ADR content — update the ADR index when conventions change.

## Index

| ADR                                             | Title                         | Status   | Date       |
| ----------------------------------------------- | ----------------------------- | -------- | ---------- |
| [0001](./0001-shared-site-layout-components.md) | Shared site layout components | Accepted | 2026-06-26 |

## When to write an ADR

Create a new ADR when a decision:

- Affects project structure, boundaries between modules, or long-lived conventions
- Is hard to reverse or would surprise future contributors
- Has reasonable alternatives that were considered
- Should be understood without reading pull request threads

Do **not** write an ADR for routine feature work, bug fixes, dependency bumps, or visual tweaks that are fully described in [DESIGN.md](../../DESIGN.md).

## How to add a record

1. Copy the next number in sequence (`0002`, `0003`, …).
2. Use the filename pattern `NNNN-short-title.md`.
3. Fill in every section of the template below. Keep prose factual; **do not paste code, file paths, or API signatures** — those drift.
4. Set **Status** to `Proposed` while under review, `Accepted` once merged, or `Superseded` / `Deprecated` when replaced.
5. Add a row to the index table in this file.
6. Link to the ADR from [Architecture](../explanation/01-architecture.md) when the decision is structural.

## Template

Each ADR file should include these sections as markdown headings:

- **Title** — `# ADR NNNN: Short title`
- **Status, Date, Issue / PR** — metadata block at the top
- **Context** — problem or constraint
- **Decision drivers** — bullet list
- **Considered options** — numbered alternatives
- **Decision** — outcome and rules for contributors
- **Consequences** — positive and trade-offs subsections
- **Related documentation** — links to DESIGN.md, other ADRs, or explanation docs only

Do not include source code, file paths, import statements, or API signatures in ADR body text.

## Backfill

Earlier decisions may be captured retroactively. This index starts with ADR 0001; older choices can be documented when they next surface in review or refactoring work.
