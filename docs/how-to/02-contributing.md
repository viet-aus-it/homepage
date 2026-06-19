# Contributing

Thank you for your interest in contributing to the VAIT Homepage project!

## Getting Started

- Read the [Getting Started](../tutorials/01-getting-started.md) tutorial for setup and first-run instructions.
- Make sure your environment matches the requirements ([Node.js](https://nodejs.org/) 24+, [pnpm](https://pnpm.io/) 11+).

## Proposing Changes

- Fork the repository or create a new branch from `master`.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for branch and commit naming.
- Keep changes focused and atomic.

## Code Review

- Open a pull request with a clear title and description. Follow `.github/PULL_REQUEST_TEMPLATE.md` (Context, Changes, Checklist). See the [vait-create-pr skill](../../.agents/skills/vait-create-pr/SKILL.md) for AI-assisted drafting.
- Ensure your code passes all checks (lint, test, build).
- For UI changes, use the **branch preview URL** posted by Cloudflare on the PR (see [Deployment](./03-deployment.md#preview-deployments-pre-production-qa)).
- Be open to feedback and iterate as needed.

## Documentation

- New features, architectural changes, and configuration changes **must** include corresponding documentation updates.
- The `docs/` directory follows the [Diataxis](https://diataxis.fr/) framework — place content in the correct category (tutorial, how-to, explanation, or reference).
- Marketing UI changes (colours, typography, layout, new sections) **must** align with [DESIGN.md](../../DESIGN.md); update that file when tokens or documented components change.
- Every mention of an external tool, framework, or standard must include a hyperlink on first mention per document.

## Where to Ask for Help

- Use the team chat or open a GitHub Discussion for questions.
- For bugs or feature requests, open an issue using the **Task** template (`.github/ISSUE_TEMPLATE/task.yml`). See the [create-github-issue skill](../../.agents/skills/create-github-issue/SKILL.md) for section guidance.

---

See also:

- [Development](./01-development.md) — Day-to-day workflows and conventions
- [Project Reference](../reference/01-project-reference.md) — Commands and tech stack
- [Architecture](../explanation/01-architecture.md) — Design decisions
- [Design System](../../DESIGN.md) — Homepage visual design reference
