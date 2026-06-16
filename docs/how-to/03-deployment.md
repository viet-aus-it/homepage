# Deployment

How to deploy the VAIT Homepage.

Production is hosted on [Cloudflare Workers](https://workers.cloudflare.com/) at `vait.au`. The Worker is connected to the `viet-aus-it/homepage` GitHub repository and deploys from the Cloudflare dashboard — not via a deploy workflow in this repo.

> **Legacy AWS**: [AWS CDK](https://docs.aws.amazon.com/cdk/) infrastructure under `infra/` and [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) still exist while the AWS stack is retired. They are not the primary production path for `vait.au`.

## Production (Cloudflare)

**Domains:** `vait.au`, `www.vait.au`, `home.vait.au` (see `wrangler.toml`).

**Trigger:** merge to `master`.

**Cloudflare project:** Workers & Pages → `homepage` → Settings → Build.

| Setting           | Value                                                                     |
| ----------------- | ------------------------------------------------------------------------- |
| Production branch | `master`                                                                  |
| Build command     | `pnpm run ci && pnpm run test && pnpm run typecheck && pnpm run build:cf` |
| Deploy command    | `pnpm run deploy:cf`                                                      |
| Version command   | `npx wrangler versions upload`                                            |
| Root directory    | `/`                                                                       |

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
