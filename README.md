# VAIT Homepage

Welcome to the homepage for Vietnamese Australians in Information Technology Inc. (VAIT).

---

## What is this?
A not-for-profit landing page for Viet-Au IT professionals in Australia. Built for rapid, modern web delivery and easy developer onboarding.

## Tech Stack
- **Frontend:** [React](https://react.dev/) 19 + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **State/Router:** [TanStack Router](https://tanstack.com/router), [React Query](https://tanstack.com/query), [Zod](https://zod.dev/)
- **Testing:** [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/)
- **Lint/Format:** [Biome](https://biomejs.dev/)
- **Infrastructure:** [AWS CDK](https://docs.aws.amazon.com/cdk/) (TypeScript), [S3](https://aws.amazon.com/s3/) + [CloudFront](https://aws.amazon.com/cloudfront/)
- **CI/CD:** [GitHub Actions](https://docs.github.com/en/actions)

## Quickstart
```sh
# Install dependencies (Node.js 22+, pnpm 10+ required)
pnpm install

# Start local dev server
pnpm run dev

# Run tests
pnpm run test

# Lint & format (auto-fix)
pnpm run lint
pnpm run lint:fix

# Build for production
pnpm run build
```
> **Note:** `pnpm run lint:fix` will both lint and format the codebase using Biome.

## Project Structure
- `.github/`  – CI/CD workflows
- `infra/`    – Infrastructure as code (AWS CDK)
- `public/`   – Static assets
- `src/`      – App source code (components, pages, hooks, services, types, utils)

See [docs/index.md](docs/index.md) for more details.

## Development
- Strict TypeScript config (`tsconfig.json`)
- [Biome](https://biomejs.dev/) for linting/formatting
- [Husky](https://typicode.github.io/husky/) for git hooks
- See [docs/how-to/01-development.md](docs/how-to/01-development.md) for workflow, conventions, and tips

## Infrastructure
- [AWS CDK](https://docs.aws.amazon.com/cdk/) (TypeScript)
- See [infra/README.md](infra/README.md) and [docs/explanation/02-infrastructure.md](docs/explanation/02-infrastructure.md)

## CI/CD
- Automated via [GitHub Actions](https://docs.github.com/en/actions)
- See [docs/how-to/03-deployment.md](docs/how-to/03-deployment.md)

## Contributing
- Please read [docs/how-to/02-contributing.md](docs/how-to/02-contributing.md)

---

For more, see the [documentation index](docs/index.md).
