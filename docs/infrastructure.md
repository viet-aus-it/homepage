# Infrastructure Overview

This document provides a comprehensive overview of the VAIT Homepage infrastructure, built with AWS CDK and deployed on AWS.

## Architecture

The VAIT Homepage uses a modern serverless architecture optimized for performance, security, and scalability:

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

### Core Infrastructure

#### S3 Bucket (`home.vietausit.com`)
- **Purpose**: Static asset storage and hosting
- **Access**: Private (only accessible via CloudFront)
- **Versioning**: Enabled for backup and rollback
- **Encryption**: Server-side encryption enabled
- **Lifecycle**: Configured for optimal storage management

#### CloudFront Distribution
- **Purpose**: Content Delivery Network with global edge locations
- **Features**:
  - HTTPS enforcement with SSL certificates
  - Caching optimization for static assets
  - Security headers and protection
  - Geographic distribution for low latency
- **Cache Behavior**: Optimized for different asset types

#### Route53 DNS
- **Managed Domains**:
  - `vietausit.com` (root domain)
  - `www.vietausit.com` (www subdomain)
  - `home.vietausit.com` (site subdomain)
- **Records**: A records pointing to CloudFront distribution
- **SSL**: DNS-validated certificates via AWS Certificate Manager

### Security & Compliance

#### SSL Certificates
- **Provider**: AWS Certificate Manager
- **Validation**: DNS validation for all domains
- **Region**: us-east-1 (required for CloudFront)
- **Auto-renewal**: Enabled

#### Security Headers
- **HTTPS**: Strict Transport Security (HSTS)
- **Content Security Policy**: Prevents XSS attacks
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME-type sniffing protection

## Infrastructure as Code

### AWS CDK Stack Structure

#### HomepageStack (`infra/lib/homepage-stack.ts`)
```typescript
// Main stack containing all infrastructure resources
export class HomepageStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // Creates S3 bucket, CloudFront distribution, 
    // Route53 records, and SSL certificates
  }
}
```

#### CertStack (`infra/lib/cert-stack.ts`)
```typescript
// SSL certificate management stack
export class CertStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // Creates and validates SSL certificates
    // for all domain variants
  }
}
```

#### Constants (`infra/lib/constants.ts`)
```typescript
// Domain and configuration constants
export const BASE_DOMAIN = 'vietausit.com';
export const SITE_DOMAIN = 'home.vietausit.com';
export const WWW_DOMAIN = 'www.vietausit.com';
```

### CDK Configuration

#### Environment Setup
- **Runtime**: tsx for TypeScript execution
- **Context**: Extensive security and performance flags
- **Build**: Optimized for production deployment

#### Deployment Pipeline
1. **Build**: `pnpm run build` compiles frontend assets
2. **Synth**: `npx cdk synth` generates CloudFormation template
3. **Deploy**: `npx cdk deploy` provisions AWS resources
4. **Invalidate**: CloudFront cache invalidation for new content

## Deployment Workflow

### Development Environment
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

### Production Deployment
```bash
# Build frontend assets
cd ../ && pnpm run build

# Deploy infrastructure
cd infra/ && npx cdk deploy --profile prod

# Invalidate CloudFront cache (automatic)
# New content available within minutes
```

### CI/CD Integration
- **GitHub Actions**: Automated deployment on merge to main
- **Environment Promotion**: Staging → Production workflow
- **Rollback**: Previous version restoration capability

## Performance Optimisation

### CloudFront Configuration
- **Cache TTL**: Optimized for different content types
- **Compression**: Gzip and Brotli compression enabled
- **HTTP/2**: Modern protocol support
- **Edge Locations**: Global CDN coverage

### S3 Optimisation
- **Transfer Acceleration**: Faster uploads to S3
- **Intelligent-Tiering**: Cost-effective storage management
- **Cross-Origin**: Proper CORS configuration for APIs

## Monitoring & Maintenance

### AWS CloudWatch
- **Metrics**: Request counts, error rates, latency
- **Alarms**: Performance and availability alerts
- **Logs**: Access logs for security and debugging

### Cost Management
- **Budgets**: Monthly spending alerts
- **Cost Explorer**: Detailed cost analysis
- **Optimization**: Regular review of resource usage

## Security Best Practices

### Access Control
- **IAM Roles**: Least privilege principle
- **Resource Policies**: Restricted access patterns
- **VPC**: Network isolation where applicable

### Data Protection
- **Encryption**: At-rest and in-transit encryption
- **Backup**: Automated backup procedures
- **Compliance**: GDPR and Australian Privacy Act adherence

## Disaster Recovery

### Backup Strategy
- **S3 Versioning**: Automatic file versioning
- **Cross-Region**: Multi-region replication options
- **Point-in-Time**: Restore capability for any deployment

### Failover Planning
- **Health Checks**: Automated monitoring
- **Fallback**: Graceful degradation procedures
- **Recovery**: Rapid restoration processes

## Cross References

- **Development Guide**: See `docs/development.md` for local development
- **Testing Strategy**: See `docs/testing.md` for testing infrastructure
- **Commands Reference**: See `.agents/rules/commands.md` for deployment commands
- **Engineering Principles**: See `.agents/rules/engineering-principles.md` for infrastructure decisions

## Future Enhancements

### Planned Improvements
- **Edge Functions**: CloudFront Functions for dynamic content
- **A/B Testing**: Feature flag infrastructure
- **Analytics**: Enhanced monitoring and reporting
- **Performance**: Advanced optimisation techniques

### Scalability Considerations
- **Global Expansion**: Multi-region deployment options
- **Traffic Spikes**: Auto-scaling capabilities
- **Content Delivery**: Enhanced CDN strategies

This infrastructure provides a solid foundation for the VAIT Homepage, ensuring high availability, security, and performance for the community while maintaining cost-effectiveness and operational simplicity.