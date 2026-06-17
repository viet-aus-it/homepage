# Infrastructure

This document explains the VAIT Homepage infrastructure architecture.

## Cloudflare Workers (production)

The public site at `vait.au` is served by the **`homepage`** Worker in the VAIT Cloudflare account.

```
┌──────────────────────┐     ┌─────────────────────────┐
│  GitHub              │     │  Cloudflare Worker      │
│  viet-aus-it/homepage│────▶│  homepage               │
│  branch: master      │     │                         │
└──────────────────────┘     │  • vait.au              │
                             │  • www.vait.au          │
                             │  • home.vait.au         │
                             │  • dist/ (SPA assets)   │
                             └─────────────────────────┘
```

- **Configuration:** [`wrangler.toml`](../../wrangler.toml) — routes, assets, `preview_urls`
- **Deploy:** Cloudflare dashboard Git build (see [Deployment](../how-to/03-deployment.md))
- **Pre-production:** Preview URLs on pull requests (`workers.dev`, not custom domains)
- **Observability:** Workers Logs enabled in the Cloudflare dashboard

## Security

- **HTTPS**: Strict Transport Security ([HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)) enforced by Cloudflare
- **Content Security Policy**: Prevents XSS attacks
- **Encryption**: At-rest and in-transit encryption via Cloudflare

## Performance Optimisation

- **Cloudflare CDN**: Global edge network with automatic caching
- **Compression**: Automatic Gzip and Brotli
- **HTTP/2 and HTTP/3**: Modern protocol support

## Monitoring

- **Workers Logs**: Enabled in the Cloudflare dashboard
- **Cloudflare Analytics**: Request counts, error rates, bandwidth metrics

---

See also:

- [Deployment](../how-to/03-deployment.md) — How to deploy
- [Architecture](./01-architecture.md) — Tech stack and design decisions
