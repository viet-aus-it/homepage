# Deployment

How to deploy the VAIT Homepage to AWS and Cloudflare Workers.

> **Migration Notice**: This project currently supports dual deployment to both [AWS CDK](https://docs.aws.amazon.com/cdk/) and [Cloudflare Workers](https://workers.cloudflare.com/). The longer-term goal is to migrate entirely to Cloudflare Workers.

## Staging Deployment (Cloudflare)

Staging runs on Cloudflare at **https://staging.vait.au** and deploys automatically when changes are pushed to the `staging` branch.

### Branch flow

1. Merge feature work into `staging` for QA on `staging.vait.au`.
2. When ready, merge `staging` into `master` for production.

### First-time setup

After the staging infrastructure merges to `master`, create the deploy branch:

```bash
git checkout master && git pull
git checkout -b staging
git push -u origin staging
```

Configure these GitHub secrets (recommended: `staging` GitHub Environment):

| Secret | Purpose |
| ------ | ------- |
| `CLOUDFLARE_API_TOKEN` | Wrangler deploy auth (Workers Scripts Edit, Workers Routes Edit) |
| `CLOUDFLARE_ACCOUNT_ID` | Target Cloudflare account |

### Manual staging deploy

```bash
# Build for Cloudflare and deploy to staging.vait.au
pnpm run deploy:cf:staging
```

Requires local `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` environment variables (or `wrangler login`).

### CI/CD

- **[GitHub Actions](https://docs.github.com/en/actions)**: [`.github/workflows/deploy-staging.yml`](../.github/workflows/deploy-staging.yml) runs on push to `staging`
- **Search indexing**: `public/robots-staging.txt` is copied to `dist/robots.txt` before staging deploys

## Development Deployment (AWS)

```bash
# Navigate to infrastructure directory
cd infra/

# Install dependencies
pnpm install

# Watch for changes (development)
pnpm run watch

# Deploy to development account
npx cdk deploy --profile dev
```

## Production Deployment (AWS)

```bash
# Build frontend assets
cd ../ && pnpm run build

# Deploy infrastructure
cd infra/ && npx cdk deploy --profile prod

# CloudFront cache invalidation happens automatically
# New content available within minutes
```

## Cloudflare production (manual)

Production Cloudflare routes (`vait.au`, `www.vait.au`, `home.vait.au`) are configured in `wrangler.toml`. Deploy manually until production Cloudflare CI replaces AWS on `master`:

```bash
pnpm run deploy:cf
```

## Deployment Pipeline

### AWS (current production on `master`)

1. **Build**: `pnpm run build` compiles frontend assets with [Vite](https://vite.dev/)
2. **Synth**: `npx cdk synth` generates [CloudFormation](https://aws.amazon.com/cloudformation/) template
3. **Deploy**: `npx cdk deploy` provisions AWS resources
4. **Invalidate**: [CloudFront](https://aws.amazon.com/cloudfront/) cache invalidation for new content

### Cloudflare staging (on `staging` branch)

1. **Build**: `pnpm run build:cf` compiles with the Cloudflare Vite plugin
2. **Robots**: `robots-staging.txt` copied to `dist/robots.txt`
3. **Deploy**: `wrangler deploy --env staging` publishes to `homepage-staging` at `staging.vait.au`

## CI/CD Integration

- **Production (AWS)**: Automated deployment on merge to `master`
- **Staging (Cloudflare)**: Automated deployment on push to `staging`
- **Rollback**: Previous version restoration via [S3](https://aws.amazon.com/s3/) versioning (AWS) or Cloudflare deployment history (staging)

---

See also:

- [Infrastructure](../explanation/02-infrastructure.md) — Architecture and security details
- [Project Reference](../reference/01-project-reference.md) — All commands
