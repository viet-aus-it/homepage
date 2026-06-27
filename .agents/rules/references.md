# Shared References

Central map of **documentation**, **agent rules**, and **skills** for the VAIT Homepage. Other rules link here instead of maintaining duplicate cross-reference lists that drift.

## When to load this rule

**Always load `references.md` together with any other rule** from `.agents/rules/`. Domain rules (code style, patterns, infrastructure, etc.) cover _how_ to work; this file covers _where_ to look.

Do not copy links from this file into other rules — link to this file instead.

## Documentation sources

| Source                      | Path                                                                                   | Use for                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Agent manifest**          | [AGENTS.md](../../AGENTS.md)                                                           | Execution protocol, project structure, available rules and skills, essential commands |
| **Visual design**           | [DESIGN.md](../../DESIGN.md)                                                           | Colour tokens, typography, component keys, layout rhythm, public-site do's and don'ts |
| **Structural decisions**    | [docs/adr/README.md](../../docs/adr/README.md)                                         | Accepted ADRs — module boundaries, shared layout, naming (rationale only, no code)    |
| **ADR workflow for agents** | [architecture-decisions.md](./architecture-decisions.md)                               | When to read/write ADRs; do not duplicate ADR content in other rules                  |
| **Documentation hub**       | [docs/index.md](../../docs/index.md)                                                   | Diataxis index — tutorials, how-to, explanation, reference                            |
| **Architecture overview**   | [docs/explanation/01-architecture.md](../../docs/explanation/01-architecture.md)       | Tech stack rationale and link to ADRs                                                 |
| **Infrastructure overview** | [docs/explanation/02-infrastructure.md](../../docs/explanation/02-infrastructure.md)   | Cloudflare Workers context                                                            |
| **Project reference**       | [docs/reference/01-project-reference.md](../../docs/reference/01-project-reference.md) | Commands, tech stack versions, testing tools                                          |
| **Development how-to**      | [docs/how-to/01-development.md](../../docs/how-to/01-development.md)                   | Day-to-day workflows                                                                  |
| **Contributing how-to**     | [docs/how-to/02-contributing.md](../../docs/how-to/02-contributing.md)                 | PRs, reviews, documentation expectations                                              |
| **Deployment how-to**       | [docs/how-to/03-deployment.md](../../docs/how-to/03-deployment.md)                     | Production and preview deploys                                                        |

### Diataxis quick map

| Type        | Directory                                    | Question              |
| ----------- | -------------------------------------------- | --------------------- |
| Tutorial    | [docs/tutorials/](../../docs/tutorials/)     | Can you teach me to…? |
| How-to      | [docs/how-to/](../../docs/how-to/)           | How do I…?            |
| Explanation | [docs/explanation/](../../docs/explanation/) | Why…?                 |
| Reference   | [docs/reference/](../../docs/reference/)     | What is…?             |
| ADR         | [docs/adr/](../../docs/adr/)                 | Why did we decide…?   |

## Agent rules

Load the domain rule that matches the task **plus this file**.

| Rule                   | File                                                     | Domain                                                |
| ---------------------- | -------------------------------------------------------- | ----------------------------------------------------- |
| Shared references      | [references.md](./references.md)                         | Documentation and rules map (this file — always load) |
| Architecture decisions | [architecture-decisions.md](./architecture-decisions.md) | ADR workflow; structural source of truth              |
| Commands               | [commands.md](./commands.md)                             | pnpm commands and git workflows                       |
| Code style             | [code-style.md](./code-style.md)                         | TypeScript, React, formatting, file organisation      |
| Patterns               | [patterns.md](./patterns.md)                             | React, TanStack Router, testing patterns              |
| Engineering principles | [engineering-principles.md](./engineering-principles.md) | Clean code, performance, security, decision framework |
| Communication          | [communication.md](./communication.md)                   | Agent and contributor communication style             |
| Special considerations | [special-considerations.md](./special-considerations.md) | SEO, accessibility, browser compatibility, security   |
| Infrastructure         | [infrastructure.md](./infrastructure.md)                 | Cloudflare Workers, deployment, observability         |

## Agent skills

Load when the trigger in [AGENTS.md](../../AGENTS.md) matches the task.

| Skill               | File                                                                   | Trigger (summary)               |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------- |
| Create GitHub issue | [create-github-issue/SKILL.md](../skills/create-github-issue/SKILL.md) | Draft or file structured issues |
| VAIT commit         | [vait-commit/SKILL.md](../skills/vait-commit/SKILL.md)                 | Atomic Conventional Commits     |
| VAIT create PR      | [vait-create-pr/SKILL.md](../skills/vait-create-pr/SKILL.md)           | Open or update pull requests    |
| Update docs         | [update-docs/SKILL.md](../skills/update-docs/SKILL.md)                 | Audit and sync documentation    |

## Maintenance

When adding a new rule, skill, or top-level documentation path, update **this file only** — not every domain rule's cross-reference section.
