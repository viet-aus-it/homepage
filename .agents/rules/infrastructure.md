# Infrastructure Guidelines

This document provides comprehensive infrastructure guidelines for the VAIT Homepage project, covering Cloudflare Workers patterns, deployment strategies, and operational best practices.

## Cloudflare Workers Architecture

The VAIT Homepage runs as a [Cloudflare Worker](https://developers.cloudflare.com/workers/) serving static SPA assets. The Worker is configured in [`wrangler.jsonc`](../../wrangler.jsonc).

### Worker Configuration

```jsonc
// wrangler.jsonc — key settings
name = "homepage"
main = "dist/index.html"
compatibility_date = "..."

assets = { directory = "dist", not_found_handling = "single-page-application" }

routes = [
  { pattern = "vait.au", zone_id = "..." },
  { pattern = "www.vait.au", zone_id = "..." },
  { pattern = "home.vait.au", zone_id = "..." },
]
```

### Key Characteristics

- **Static assets**: Built by Vite into `dist/`, served directly by the Worker
- **SPA fallback**: `not_found_handling = "single-page-application"` serves `index.html` for all routes
- **Preview URLs**: Branch/commit previews for pre-production QA
- **No Node.js runtime**: The Worker runs on Cloudflare's infrastructure, not a traditional server

## Deployment

### Production

Deploys automatically via Cloudflare dashboard Git integration when changes merge to `master`.

### Pre-production (Preview URLs)

Enabled in `wrangler.jsonc` via `preview_urls = true`. Cloudflare posts preview links as comments on pull requests.

### Manual deploy

```bash
pnpm run build && pnpm run deploy
```

## Security Best Practices

### HTTPS

HTTPS is enforced by Cloudflare at the edge — no additional configuration needed. Ensure TLS is set to at least TLS 1.2 in the Cloudflare dashboard.

### Content Security Policy

Set CSP headers via Cloudflare dashboard Transform Rules or the `_headers` file in the build output:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
```

### Environment Variables

- Store secrets (API tokens, service keys) in Cloudflare dashboard → Workers → `homepage` → Variables
- Never commit secrets to the repository
- Use `wrangler secret put <KEY>` for local development

## Performance Optimisation

### Cloudflare CDN

- Automatic caching of static assets at Cloudflare's 330+ edge locations
- Cache static assets with long TTLs via `Cache-Control` headers set during Vite build (content-hashed filenames)
- Enable Auto Minify, Brotli compression, and HTTP/3 in the Cloudflare dashboard

### Vite Build Optimisations

- Content-hashed filenames for cache busting
- Code splitting via TanStack Router (lazy-loaded routes)
- Asset compression during build

## Monitoring & Observability

### Workers Logs

Enabled in Cloudflare dashboard → Workers → `homepage` → Logs. Provides real-time request/response logging.

### Cloudflare Analytics

Dashboard provides:

- Request count, bandwidth, and status code distribution
- Cache hit ratio
- Error rate monitoring

### Error Tracking

- Monitor 5xx errors in Cloudflare Analytics
- Set up [Cloudflare Alerts](https://dash.cloudflare.com/?to=/:account/notifications) for error spikes or availability drops

## Anti-Patterns to Avoid

### Cloudflare Anti-Patterns

```toml
# ❌ Bad: Disabling preview URLs (makes QA harder)
preview_urls = false

# ✅ Good: Always enable preview URLs for PR QA
preview_urls = true
```

```bash
# ❌ Bad: Deploying without building first
pnpm run deploy

# ✅ Good: Always build before deploying
pnpm run build && pnpm run deploy
```

### Security Anti-Patterns

- Avoid storing secrets in `wrangler.jsonc` or environment files committed to git
- Never disable HTTPS at the Cloudflare edge
- Do not expose internal service URLs or API keys in client-side code

## Related rules

Load [references.md](./references.md) with this rule for shared documentation links and the rules/skills index.
