# Deployment

How to deploy the VAIT Homepage to AWS and Cloudflare Workers.

> **Migration Notice**: This project currently supports dual deployment to both [AWS CDK](https://docs.aws.amazon.com/cdk/) and [Cloudflare Workers](https://workers.cloudflare.com/). The longer-term goal is to migrate entirely to Cloudflare Workers.

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

## Deployment Pipeline

1. **Build**: `pnpm run build` compiles frontend assets with [Vite](https://vite.dev/)
2. **Synth**: `npx cdk synth` generates [CloudFormation](https://aws.amazon.com/cloudformation/) template
3. **Deploy**: `npx cdk deploy` provisions AWS resources
4. **Invalidate**: [CloudFront](https://aws.amazon.com/cloudfront/) cache invalidation for new content

## CI/CD Integration

- **[GitHub Actions](https://docs.github.com/en/actions)**: Automated deployment on merge to main
- **Environment Promotion**: Staging → Production workflow
- **Rollback**: Previous version restoration via [S3](https://aws.amazon.com/s3/) versioning

---

See also:
- [Infrastructure](../explanation/02-infrastructure.md) — Architecture and security details
- [Project Reference](../reference/01-project-reference.md) — All commands
