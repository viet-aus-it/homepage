# Deployment

How to deploy the VAIT Homepage.

Production is hosted on [Cloudflare Workers](https://workers.cloudflare.com/) at `vait.au`. The Worker is connected to the `viet-aus-it/homepage` GitHub repository and deploys from the Cloudflare dashboard — not via GitHub Actions.

> **Note:** The build configuration (build command, deploy command, watch paths) is set in the Cloudflare dashboard — this is **clickops** and cannot be configured as infrastructure-as-code. This is because the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/libraries/vite-plugin/) is a build-time dependency that only runs inside the Cloudflare Workers Build environment, so the build pipeline must be configured there rather than in `wrangler.toml` or a workflow file.

## Production (Cloudflare)

**Domains:** `vait.au`, `www.vait.au`, `home.vait.au` (see `wrangler.toml`).

**Trigger:** merge to `master`.

**Cloudflare project:** Workers & Pages → `homepage` → Settings → Build.

| Setting           | Value                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| Production branch | `master`                                                                              |
| Build command     | `pnpm run ci && pnpm run test && pnpm run typecheck && pnpm run build`                |
| Deploy command    | `pnpm run deploy`                                                                     |
| Version command   | `npx wrangler versions upload`                                                        |
| Root directory    | `/`                                                                                   |
| Include paths     | `*`                                                                                   |
| Exclude paths     | See [Skipping preview and production builds](#skipping-preview-and-production-builds) |

After merge, check **Deployments** in the Cloudflare dashboard for build status.

### Manual production deploy

For emergencies or local verification (requires `wrangler login` or Cloudflare API credentials). The Cloudflare build pipeline already builds before deploy; locally, build first:

```bash
pnpm run build && wrangler deploy
```

## Preview deployments (pre-production QA)

[Preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) are enabled in `wrangler.toml` (`preview_urls = true`). The generic `workers.dev` route stays off (`workers_dev = false`); only branch/commit preview URLs are used for QA.

**Trigger:** open or update a pull request, or push to a non-production branch (`Builds for non-production branches` is enabled in the Cloudflare project).

**How it works:**

1. Cloudflare runs the same build pipeline as production.
2. `npx wrangler versions upload` publishes a preview version (not production routes).
3. Cloudflare posts **branch** and **commit** preview links as a comment on the pull request.
4. The branch preview URL stays stable across commits; it always serves the latest version of that branch.

Preview URLs use the `workers.dev` subdomain — not `vait.au`. Custom preview domains are not supported yet.

### Skipping preview and production builds

Cloudflare **Build watch paths** (Settings → Build) control whether a push triggers a Workers build. Use this to avoid preview deploys on doc-only PRs.

Wildcards match across path separators — `docs/*` covers nested paths such as `docs/how-to/03-deployment.md` ([Pages build watch paths](https://developers.cloudflare.com/pages/configuration/build-watch-paths/), same UI for Workers projects).

**Include paths:** `*`

**Exclude paths** (comma-separated, paste into the dashboard):

```text
docs/*, .agents/*, .github/*, *.md, .cursor/*, .vscode/*, .zed/*, .husky/*, LICENSE, skills-lock.json, .gitignore, .editorconfig, .nvmrc, .tool-versions
```

| Pattern                                           | Skips builds for                                  |
| ------------------------------------------------- | ------------------------------------------------- |
| `docs/*`                                          | All documentation under `docs/`                   |
| `.agents/*`                                       | Agent rules and skills                            |
| `.github/*`                                       | GitHub Actions workflows and templates            |
| `*.md`                                            | Markdown anywhere (e.g. `README.md`, `DESIGN.md`) |
| `.cursor/*`, `.vscode/*`, `.zed/*`, `.husky/*`    | Editor and git hook config                        |
| `LICENSE`, `skills-lock.json`, `.gitignore`, etc. | Repo metadata                                     |

| Change type                                                        | Cloudflare build | GitHub Actions (lint/test) |
| ------------------------------------------------------------------ | ---------------- | -------------------------- |
| `src/`, `public/`, `wrangler.toml`, `package.json`, Vite/TS config | Yes              | Yes                        |
| Paths covered by excludes above                                    | No               | Yes (on PR)                |
| Mixed code + docs                                                  | Yes              | Yes                        |

Excludes are checked first; if every changed file in a push matches an exclude, the build is skipped ([Workers build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/)).

To skip a build for a specific commit regardless of paths, add **`[skip ci]`** to the commit message (case-insensitive). GitHub Actions does not honour this tag — only Cloudflare Workers Builds.

### Testing a change before merge

1. Push a feature branch and open a PR against `master`.
2. Wait for the Cloudflare build on the PR (and GitHub Actions lint/test).
3. Open the preview link from the Cloudflare comment on the PR.
4. Merge to `master` when QA passes — production deploys automatically.

No GitHub secrets or `staging` branch are required.

## Local development

```bash
# Standard Vite dev server (always uses Cloudflare plugin)
pnpm run dev
```

---

See also:

- [Infrastructure](../explanation/02-infrastructure.md) — Cloudflare Workers architecture
- [Project Reference](../reference/01-project-reference.md) — All commands
