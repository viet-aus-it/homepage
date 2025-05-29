# VAIT Homepage

Welcome to the homepage for Vietnamese Australians in Information Technology Inc. (VAIT).

---

## What is this?
A not-for-profit landing page for Viet-Au IT professionals in Australia. Built for rapid, modern web delivery and easy developer onboarding.

## Tech Stack
- **Frontend:** React 19 + Vite + TypeScript
- **State/Router:** TanStack Router, React Query, Zod
- **Testing:** Vitest, Testing Library
- **Lint/Format:** Biome
- **Infrastructure:** AWS CDK (TypeScript), S3 + CloudFront
- **CI/CD:** GitHub Actions

## Quickstart
```sh
# Install dependencies (Node.js 22+, pnpm 10+ required)
pnpm install

# Start local dev server
pnpm run dev

# Run tests
pnpm run test

# Lint & format
pnpm run lint
pnpm run format

# Build for production
pnpm run build
```

## Project Structure
- `src/` – App source code (components, pages, hooks, services, types, utils)
- `infra/` – Infrastructure as code (AWS CDK)
- `.github/` – CI/CD workflows
- `public/` – Static assets

See [docs/architecture.md](docs/architecture.md) for more details.

## Development
- Strict TypeScript config (`tsconfig.json`)
- Biome for linting/formatting
- Husky for git hooks
- See [docs/development.md](docs/development.md) for workflow, conventions, and tips

## Infrastructure
- AWS CDK (TypeScript)
- See [infra/README.md](infra/README.md) and [docs/infra.md](docs/infra.md)

## CI/CD
- Automated via GitHub Actions
- See [docs/ci-cd.md](docs/ci-cd.md)

## Contributing
- Please read [docs/contributing.md](docs/contributing.md)

---

For more, see the [docs/](docs/) directory.
