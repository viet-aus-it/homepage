# Infrastructure

This document explains the VAIT Homepage infrastructure architecture, security model, and migration strategy.

> **Migration Notice**: This project currently supports dual deployment to both [AWS CDK](https://docs.aws.amazon.com/cdk/) and [Cloudflare Workers](https://workers.cloudflare.com/). The longer-term goal is to remove the AWS deployment entirely in favour of Cloudflare.

## Architecture

The VAIT Homepage uses a serverless architecture optimised for performance, security, and scalability:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Route53       │    │   CloudFront     │    │   S3 Bucket     │
│   (DNS)         │───▶│   (CDN)          │───▶│   (Static)      │
│                 │    │                  │    │                 │
│ • vietausit.com │    │ • HTTPS          │    │ • dist/         │
│ • www.          │    │ • Cache          │    │ • Private       │
│ • home.         │    │ • Security       │    │ • Versioned     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## AWS Resources

### [S3](https://aws.amazon.com/s3/) Bucket (`home.vietausit.com`)
- **Purpose**: Static asset storage and hosting
- **Access**: Private (only accessible via [CloudFront](https://aws.amazon.com/cloudfront/))
- **Versioning**: Enabled for backup and rollback
- **Encryption**: Server-side encryption enabled
- **Lifecycle**: Configured for optimal storage management

### CloudFront Distribution
- **Purpose**: Content Delivery Network with global edge locations
- **Features**: HTTPS enforcement, caching optimisation, security headers, geographic distribution
- **Cache Behaviour**: Optimised for different asset types (HTML, JS, CSS, images)

### [Route 53](https://aws.amazon.com/route53/) DNS
- **Managed Domains**: `vietausit.com`, `www.vietausit.com`, `home.vietausit.com`
- **Records**: A records pointing to CloudFront distribution
- **SSL**: DNS-validated certificates via [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)

## CDK Stack Structure

### HomepageStack (`infra/lib/homepage-stack.ts`)
Main stack containing S3 bucket, CloudFront distribution, Route 53 records, and SSL certificates.

### CertStack (`infra/lib/cert-stack.ts`)
SSL certificate management stack. Creates and validates certificates for all domain variants.

### Constants (`infra/lib/constants.ts`)
Domain and configuration constants (`BASE_DOMAIN`, `SITE_DOMAIN`, `WWW_DOMAIN`).

## Security

- **HTTPS**: Strict Transport Security ([HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)) enforced
- **Content Security Policy**: Prevents XSS attacks
- **X-Frame-Options**: Clickjacking protection
- **IAM Roles**: Least privilege principle for all AWS resources
- **Encryption**: At-rest and in-transit encryption
- **Compliance**: GDPR and Australian Privacy Act adherence

## Performance Optimisation

- **CloudFront Cache TTL**: Optimised per content type
- **Compression**: Gzip and Brotli enabled
- **HTTP/2**: Modern protocol support
- **S3 Intelligent-Tiering**: Cost-effective storage management

## Monitoring

- **[CloudWatch](https://aws.amazon.com/cloudwatch/)**: Request counts, error rates, latency metrics
- **Alarms**: Performance and availability alerts
- **Cost Management**: Monthly spending alerts and regular usage reviews

## Disaster Recovery

- **S3 Versioning**: Automatic file versioning for point-in-time restore
- **Cross-Region Replication**: Multi-region options available
- **Health Checks**: Automated monitoring with graceful failover

---

See also:
- [Deployment](../how-to/03-deployment.md) — How to deploy
- [Architecture](./01-architecture.md) — Tech stack and design decisions
