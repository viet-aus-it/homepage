# Deployment

How to deploy the VAIT Homepage.

Production is hosted on [Cloudflare Workers](https://workers.cloudflare.com/) at `vait.au`. The Worker is connected to the `viet-aus-it/homepage` GitHub repository and deploys from the Cloudflare dashboard — not via a deploy workflow in this repo.

> **Legacy AWS**: [AWS CDK](https://docs.aws.amazon.com/cdk/) infrastructure under `infra/` and [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) still exist while the AWS stack is retired. They are not the primary production path for `vait.au`.

## Production (Cloudflare)

**Domains:** `vait.au`, `www.vait.au`, `home.vait.au` (see `wrangler.toml`).

**Trigger:** merge to `master`.

**Cloudflare project:** Workers & Pages → `homepage` → Settings → Build.

| Setting           | Value                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| Production branch | `master`                                                                              |
| Build command     | `pnpm run ci && pnpm run test && pnpm run typecheck && pnpm run build:cf`             |
| Deploy command    | `pnpm run deploy:cf`                                                                  |
| Version command   | `npx wrangler versions upload`                                                        |
| Root directory    | `/`                                                                                   |
| Include paths     | `*`                                                                                   |
| Exclude paths     | See [Skipping preview and production builds](#skipping-preview-and-production-builds) |

After merge, check **Deployments** in the Cloudflare dashboard for build status.

### Manual production deploy

For emergencies or local verification (requires `wrangler login` or Cloudflare API credentials):

```bash
pnpm run deploy:cf
```

## Preview deployments (pre-production QA)

[Preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled in `wrangler.toml` (`preview_urls = true`, `workers_dev = true`).

**Trigger:** open or update a pull request, or push to a non-production branch (`Builds for non-production branches` is enabled in the Cloudflare project).

**How it works:**

1. Cloudflare runs the same build pipeline as production.
2. `npx wrangler versions upload` publishes a preview version (not production routes).
3. Cloudflare posts **branch** and **commit** preview links as a comment on the pull request.
4. The branch preview URL stays stable across commits; it always serves the latest version of that branch.

Preview URLs use the `workers.dev` subdomain — not `vait.au`. Custom preview domains are not supported yet.

### Skipping preview and production builds

Cloudflare **Build watch paths** (Settings → Build) control whether a push triggers a Workers build. Use this to avoid preview deploys on doc-only PRs.

**Include paths:** `*`

**Exclude paths** (comma-separated, paste into the dashboard):

```text
docs/how-to/*, docs/explanation/*, docs/reference/*, docs/tutorials/*, docs/index.md, .agents/rules/*, .agents/skills/*, .github/workflows/*, .github/actions/*, .github/CODEOWNERS, .github/PULL_REQUEST_TEMPLATE.md, infra/*, infra/lib/*, infra/bin/*, README.md, AGENTS.md, DESIGN.md, LICENSE, skills-lock.json, .cursor/*, .vscode/*, .zed/*, .husky/*, .gitignore, .editorconfig, .nvmrc, .tool-versions
```

| Change type                                                        | Cloudflare build | GitHub Actions (lint/test) |
| ------------------------------------------------------------------ | ---------------- | -------------------------- |
| `src/`, `public/`, `wrangler.toml`, `package.json`, Vite/TS config | Yes              | Yes                        |
| `docs/`, `.agents/`, `infra/`, root `*.md`, editor/git config      | No               | Yes (on PR)                |
| Mixed code + docs                                                  | Yes              | Yes                        |

Paths are evaluated per [Build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/): excludes are checked first; if every changed file is excluded, the build is skipped.

To skip a build for a specific commit regardless of paths, add **`[skip ci]`** to the commit message (case-insensitive). GitHub Actions does not honour this tag — only Cloudflare Workers Builds.

### Testing a change before merge

1. Push a feature branch and open a PR against `master`.
2. Wait for the Cloudflare build on the PR (and GitHub Actions lint/test).
3. Open the preview link from the Cloudflare comment on the PR.
4. Merge to `master` when QA passes — production deploys automatically.

No GitHub secrets or `staging` branch are required.

## Local development

```bash
# Standard Vite dev server
pnpm run dev

# Vite with Cloudflare plugin (closer to production Worker behaviour)
pnpm run dev:cf
```

## Legacy AWS deployment

The CDK stack previously served `vietausit.com`. It remains in the repo for teardown, not for `vait.au`.

```bash
cd infra/
pnpm install
npx cdk deploy --profile prod   # requires AWS credentials
```

GitHub Actions on `master` may still run CDK deploy until the AWS stack is removed.

---

See also:

- [Infrastructure](../explanation/02-infrastructure.md) — Cloudflare and legacy AWS architecture
- [Project Reference](../reference/01-project-reference.md) — All commands
