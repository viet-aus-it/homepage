# Architecture Overview

This document provides a high-level overview of the VAIT Homepage architecture.

---

## Structure
- **Frontend:** React + Vite + TypeScript
- **Infrastructure:** AWS CDK (TypeScript), S3, CloudFront
- **CI/CD:** GitHub Actions

### Key Directories
- `src/` – Application source code
- `infra/` – Infrastructure as code
- `.github/` – CI/CD workflows

## Main Technologies
- **React 19** for UI
- **TanStack Router** for routing
- **Zod** for schema validation
- **Biome** for linting/formatting
- **Vitest** for testing
- **AWS CDK** for infrastructure as code
- **AWS S3** for static hosting
- **AWS CloudFront** for CDN
- **AWS Route53** for DNS management

## More Details
- See [Development Guide](./development.md) for workflow and conventions
- See [Testing Guide](./testing.md) for testing strategy
- See [infra/README.md](../infra/README.md) for infrastructure setup
