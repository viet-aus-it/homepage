# Infrastructure Guidelines

This document provides comprehensive infrastructure guidelines for the VAIT Homepage project, covering Cloudflare Workers patterns, deployment strategies, and operational best practices.

## Cloudflare Workers Development Patterns

### Wrangler Configuration

The `wrangler.toml` file is the single source of truth for Cloudflare Workers configuration:

```toml
# ✅ Good: Clean wrangler config with static assets
name = "homepage"
compatibility_date = "2026-02-19"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = "dist"
not_found_handling = "single-page-application"
```

### Environment-Specific Configuration

Use `wrangler.toml` environments for different deployment targets:

```toml
# ✅ Good: Environment-aware wrangler config
[env.production]
name = "homepage-prod"
routes = [
  { pattern = "vait.au", custom_domain = true },
  { pattern = "www.vait.au", custom_domain = true },
]

[env.staging]
name = "homepage-staging"
routes = [
  { pattern = "staging.vait.au", custom_domain = true },
]
```

### Resource Naming

```toml
# ✅ Good: Consistent naming conventions
name = "homepage"              # Kebab-case, descriptive
compatibility_date = "2026-02-19"
```

## Security Best Practices

### HTTPS Configuration

Cloudflare Workers automatically enforce HTTPS at the edge. Additional security headers can be configured via Workers:

```typescript
// ✅ Good: Security headers via Cloudflare Workers
export default {
  async fetch(request: Request): Promise<Response> {
    const response = await env.ASSETS.fetch(request);

    const headers = new Headers(response.headers);
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubdomains; preload');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('X-XSS-Protection', '1; mode=block');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
```

### DDoS Protection

Cloudflare provides built-in DDoS protection at the edge — no additional configuration required. All traffic passes through Cloudflare's global network which filters malicious requests before they reach the Worker.

## Deployment Patterns

### Static Asset Deployment

```bash
# ✅ Good: Build and deploy
pnpm run build    # Compile frontend to dist/
pnpm run deploy   # wrangler deploy
```

### Rollback Strategy

```bash
# Rollback to previous version
wrangler rollback

# Rollback to specific version
wrangler rollback --version <version-id>
```

## Cost Optimisation

Cloudflare Workers pricing is based on requests and compute duration:

- **Free Tier**: 100,000 requests/day, 10ms CPU time per request
- **Paid Tier**: Unlimited requests, 30s CPU time per request
- **Static Assets**: No additional cost for asset serving via Workers

No lifecycle management needed — Cloudflare handles storage and caching automatically.

## Monitoring & Observability

### Workers Observability

Configured in `wrangler.toml`:

```toml
[observability]
enabled = true
head_sampling_rate = 1

[observability.logs]
invocation_logs = true
```

### Key Metrics

- **Request count**: Total requests per Worker
- **Error rate**: 5xx and 4xx response ratios
- **Latency**: P50, P95, P99 response times
- **CPU time**: Worker execution duration

Available via Cloudflare Dashboard or GraphQL Analytics API.

## Testing Infrastructure

### Worker Tests with Vitest

```typescript
// ✅ Good: Testing Cloudflare Workers
import { describe, it, expect } from 'vitest';

describe('Worker response', () => {
  it('should return 200 for valid routes', async () => {
    const request = new Request('https://vait.au/');
    const response = await worker.fetch(request);
    expect(response.status).toBe(200);
  });

  it('should return 200 for SPA fallback', async () => {
    const request = new Request('https://vait.au/unknown-route');
    const response = await worker.fetch(request);
    expect(response.status).toBe(200);
  });
});
```

## Cross References

- **Infrastructure Overview**: See `docs/explanation/02-infrastructure.md` for detailed architecture
- **Commands Reference**: See `commands.md` for deployment commands
- **Engineering Principles**: See `engineering-principles.md` for decision framework
- **Security Considerations**: See `special-considerations.md` for security guidelines

## Anti-Patterns to Avoid

### Deployment Anti-Patterns

```bash
# ❌ Bad: Deploying without building
pnpm run deploy  # Missing pnpm run build step

# ✅ Good: Build then deploy
pnpm run build && pnpm run deploy
```

### Configuration Anti-Patterns

```toml
# ❌ Bad: Missing SPA fallback
[assets]
directory = "dist"
# no not_found_handling

# ✅ Good: SPA fallback handled
[assets]
directory = "dist"
not_found_handling = "single-page-application"
```

### Security Anti-Patterns

```toml
# ❌ Bad: Disabling observability in production
[observability]
enabled = false  # No visibility into production issues

# ✅ Good: Production observability
[observability]
enabled = true
head_sampling_rate = 0.1  # 10% sampling for cost balance
```

These infrastructure guidelines ensure secure, cost-effective, and maintainable Cloudflare Workers deployments for the VAIT Homepage project.
