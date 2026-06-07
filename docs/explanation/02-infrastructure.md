# Infrastructure

This document explains the VAIT Homepage infrastructure architecture and security model.

## Architecture

The VAIT Homepage uses a serverless architecture on [Cloudflare Workers](https://workers.cloudflare.com/), optimised for performance, security, and scalability:

```
┌──────────────────┐    ┌─────────────────────┐
│   Cloudflare     │    │   Cloudflare        │
│   DNS + CDN      │───▶│   Workers + Assets  │
│                  │    │                     │
│ • vait.au        │    │ • Static assets     │
│ • www.vait.au    │    │ • SPA routing       │
│ • home.vait.au   │    │ • Edge delivery     │
└──────────────────┘    └─────────────────────┘
```

## Cloudflare Workers Configuration

### Wrangler Configuration (`wrangler.toml`)

- **Runtime**: Cloudflare Workers with `nodejs_compat` compatibility flag
- **Static Assets**: Served from `dist/` directory with SPA fallback handling
- **Observability**: Logging and head sampling enabled for performance monitoring
- **Routes**: Custom domains configured via `vait.au`, `www.vait.au`, and `home.vait.au`

### Asset Delivery

- Static assets are built with Vite and deployed as Cloudflare Workers static assets
- SPA routing handled by `not_found_handling = "single-page-application"`
- Automatic compression (Brotli, Gzip) at the edge
- HTTP/2 and HTTP/3 support via Cloudflare edge network

## Security

- **HTTPS**: Enforced by Cloudflare at the edge
- **Content Security Policy**: Prevents XSS attacks
- **DDoS Protection**: Cloudflare's global edge network provides built-in DDoS mitigation
- **TLS**: Automatic certificate management via Cloudflare

## Performance Optimisation

- **Edge Delivery**: Assets served from 330+ Cloudflare data centres globally
- **Cache Optimisation**: Cloudflare edge caching with appropriate TTLs
- **HTTP/3**: Enabled by default on all Cloudflare zones
- **Compression**: Automatic Brotli and Gzip compression at the edge

## Monitoring

- **Observability**: Cloudflare Workers observability with head sampling
- **Logs**: Invocation logs enabled for debugging
- **Metrics**: Request counts, error rates, and latency via Cloudflare dashboard

## Disaster Recovery

- **Versioned Deployments**: Rollback via `wrangler rollback`
- **Git-based Recovery**: Recovery from historical git commits
- **No Single Point of Failure**: Cloudflare's globally distributed network

---

See also:

- [Deployment](../how-to/03-deployment.md) — How to deploy
- [Architecture](./01-architecture.md) — Tech stack and design decisions
