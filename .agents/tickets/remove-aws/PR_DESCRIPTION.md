## Context

Removes all AWS/CDK infrastructure code, documentation, and CI/CD workflows from the repository. The project is now Cloudflare Workers-only — Cloudflare auto-fetches from the repo on push, so no CI deploy step is needed.

See issue [#30: Migrate this repo fully to just using Cloudflare](https://github.com/viet-aus-it/homepage/issues/30).

## Changes

### Infrastructure removal

- **Delete `infra/`** — entire CDK directory (stacks, config, context, constants, README)
- Remove `infra/` from `pnpm-workspace.yaml` and `setup-node-deps` GitHub Action
- Remove `infra/cdk.out` from `.oxlintrc.json` and `.oxfmtrc.json` ignore patterns

### CI/CD cleanup

- **Delete `build-and-deploy.yml`** — AWS CDK deploy workflow (no longer needed)
- **Delete `deploy.yml`** — orphaned workflow calling deleted build-and-deploy.yml
- **Strip `cdk-diff` job** from `pull-request.yml` — no more CDK diff checks

### Application config

- **`vite.config.ts`** — Always include `cloudflare()` plugin; remove `DEPLOY_TO_CLOUDFLARE` env toggle and AWS S3 comment
- **`package.json`** — Drop `dev:cf` → rename to `dev`; drop `build:cf` → rename to `build`; rename `deploy:cf` → `deploy`

### Documentation

- Rewrite `docs/explanation/02-infrastructure.md` for Cloudflare Workers architecture
- Rewrite `docs/how-to/03-deployment.md` for wrangler-only deployment
- Update `README.md`, `AGENTS.md`, `docs/index.md`, `docs/reference/01-project-reference.md`
- Rewrite `.agents/rules/infrastructure.md` with Cloudflare patterns
- Update `.agents/rules/commands.md`, `special-considerations.md`, `engineering-principles.md`
- Update `.agents/skills/update-docs/SKILL.md` infrastructure mapping

## Checklist

- [x] Code builds and runs locally (`pnpm run build`)
- [x] Lint and formatting checks pass (`pnpm run lint:fix`)
- [x] Type checking passes (`pnpm run typecheck`)
- [x] Tests pass (`pnpm run test:run`)
- [x] Documentation updated (`docs/`, `AGENTS.md`, `.agents/`)
