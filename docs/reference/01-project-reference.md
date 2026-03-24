# Project Reference

Quick-reference lookup for the VAIT Homepage tech stack, commands, project structure, and testing tools.

## Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| [React](https://react.dev/) | UI framework | 19 |
| [Vite](https://vite.dev/) | Build tool | Latest |
| [TypeScript](https://www.typescriptlang.org/) | Type safety | Strict mode |
| [TanStack Router](https://tanstack.com/router) | Routing | Latest |
| [React Query](https://tanstack.com/query) | Server state management | Latest |
| [Zod](https://zod.dev/) | Schema validation | Latest |
| [Biome](https://biomejs.dev/) | Linting and formatting | Latest |
| [Vitest](https://vitest.dev/) | Testing framework | Latest |
| [Testing Library](https://testing-library.com/) | Component testing | Latest |
| [AWS CDK](https://docs.aws.amazon.com/cdk/) | Infrastructure as code | Latest |
| [Cloudflare Workers](https://workers.cloudflare.com/) | Edge deployment (migration target) | Latest |
| [GitHub Actions](https://docs.github.com/en/actions) | CI/CD | N/A |

## Commands

| Command | Purpose |
|---|---|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run test` | Run tests (watch mode) |
| `pnpm run test:run` | Run tests once |
| `pnpm run test:CI` | Run tests with coverage |
| `pnpm run lint` | Check for lint/format issues |
| `pnpm run lint:fix` | Auto-fix lint/format issues |
| `pnpm run typecheck` | Run [TypeScript](https://www.typescriptlang.org/) type checking |
| `pnpm run githooks:init` | Initialise [Husky](https://typicode.github.io/husky/) git hooks |

## Project Structure

```
src/           — Application source code (components, pages, hooks, services, types, utils)
infra/         — Infrastructure as code (AWS CDK)
public/        — Static assets
.github/       — CI/CD workflows (GitHub Actions)
docs/          — Project documentation (Diataxis framework)
.agents/       — AI agent rules and skills
```

## Testing Tools

| Tool | Purpose |
|---|---|
| [Vitest](https://vitest.dev/) | Unit and component test runner |
| [Testing Library](https://testing-library.com/) | React component testing utilities |
| [jsdom](https://github.com/jsdom/jsdom) | DOM environment for tests |

### Testing Philosophy

- Write small, focused tests for business logic and UI components
- Prefer testing user behaviour over implementation details
- Place tests alongside code or in `__tests__` folders

## Requirements

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+
