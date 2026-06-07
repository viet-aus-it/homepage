# Deployment

How to deploy the VAIT Homepage to Cloudflare Workers.

## Prerequisites

- Node.js 24+ and pnpm 11+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (included as dev dependency)

## Build

```bash
# Build frontend assets
pnpm run build

# Output goes to dist/ directory
```

## Deploy to Cloudflare Workers

```bash
# Deploy to Cloudflare Workers
pnpm run deploy
```

This runs `wrangler deploy`, which uploads the built assets and deploys the worker configuration defined in `wrangler.toml`.

## Rollback

```bash
# Rollback to previous version
wrangler rollback

# Rollback to specific version
wrangler rollback --version <version-id>
```

---

See also:

- [Infrastructure](../explanation/02-infrastructure.md) — Architecture and security details
- [Project Reference](../reference/01-project-reference.md) — All commands
