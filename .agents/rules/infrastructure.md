# Infrastructure Guidelines

This document provides comprehensive infrastructure guidelines for the VAIT Homepage project, covering AWS CDK patterns, deployment strategies, and operational best practices.

## AWS CDK Development Patterns

### Stack Organization
```typescript
// ✅ Good: Logical stack separation
export class HomepageStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'home.vietausit.com',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: Removal.DESTROY, // Development only
      versioned: true
    });

    // Create CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED
      },
      domainNames: ['home.vietausit.com', 'www.vietausit.com'],
      certificate: this.createSSLCertificate()
    });
  }

  private createSSLCertificate(): certmgr.Certificate {
    // SSL certificate creation logic
  }
}
```

### Environment-Specific Configuration
```typescript
// ✅ Good: Environment-aware configuration
export interface InfrastructureProps {
  environment: 'development' | 'staging' | 'production';
  domainName: string;
}

export class HomepageStack extends Stack {
  constructor(scope: Construct, id: string, props: InfrastructureProps) {
    super(scope, id, props);

    const removalPolicy = props.environment === 'production' 
      ? Removal.RETAIN 
      : Removal.DESTROY;

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `${props.environment}-${props.domainName}`,
      removalPolicy,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED
    });
  }
}
```

### Resource Naming Conventions
```typescript
// ✅ Good: Consistent resource naming
const RESOURCE_PREFIX = 'vait-homepage';

export class HomepageStack extends Stack {
  constructor(scope: Construct, id: string, props: InfrastructureProps) {
    super(scope, id, props);

    // Use descriptive, consistent names
    const websiteBucket = new s3.Bucket(this, `${RESOURCE_PREFIX}-website-bucket`, {
      bucketName: `${props.environment}.vait-homepage.com`
    });

    const cloudfrontDistribution = new cloudfront.Distribution(
      this, 
      `${RESOURCE_PREFIX}-cdn-distribution`,
      { /* config */ }
    );

    const sslCertificate = new certmgr.Certificate(
      this,
      `${RESOURCE_PREFIX}-ssl-cert`,
      { /* config */ }
    );
  }
}
```

## Security Best Practices

### IAM Role Configuration
```typescript
// ✅ Good: Least privilege IAM roles
export class DeploymentRole extends Role {
  constructor(scope: Construct, id: string, environment: string) {
    super(scope, id, {
      assumedBy: new AccountRootPrincipal(),
      roleName: `${environment}-vait-homepage-deployment-role`,
      inlinePolicies: {
        S3Access: new PolicyDocument({
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
              resources: [`arn:aws:s3:::${environment}.vait-homepage.com/*`]
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['cloudfront:CreateInvalidation'],
              resources: ['*']
            })
          ]
        })
      }
    });
  }
}
```

### S3 Security Configuration
```typescript
// ✅ Good: Secure S3 bucket configuration
export class SecureWebsiteBucket extends s3.Bucket {
  constructor(scope: Construct, id: string, bucketName: string) {
    super(scope, id, {
      bucketName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      lifecycleRules: [
        {
          id: 'DeleteOldVersions',
          enabled: true,
          noncurrentVersionTransitions: [
            {
              storageClass: s3.StorageClass.GLACIER,
              transitionAfter: Duration.days(30)
            }
          ],
          noncurrentVersionExpiration: Duration.days(90)
        }
      ],
      publicReadPolicy: false // Private access only
    });
  }
}
```

### CloudFront Security Headers
```typescript
// ✅ Good: Security headers via CloudFront
export class SecureCloudFrontDistribution extends cloudfront.Distribution {
  constructor(scope: Construct, id: string, origin: origins.Origin) {
    super(scope, id, {
      defaultBehavior: {
        origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: new cloudfront.ResponseHeadersPolicy(
          scope,
          'SecurityHeaders',
          {
            securityHeadersBehavior: {
              strictTransportSecurity: {
                accessControlMaxAge: Duration.days(365),
                includeSubdomains: true,
                preload: true
              },
              contentTypeOptions: { override: true },
              frameOptions: {
                frameOption: cloudfront.HeadersFrameOption.DENY,
                override: true
              },
              referrerPolicy: {
                referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
                override: true
              },
              xssProtection: { protection: true, modeBlock: true, override: true }
            }
          }
        )
      }
    });
  }
}
```

## Deployment Patterns

### Multi-Environment Setup
```typescript
// ✅ Good: Environment-specific stacks
const app = new cdk.App();

// Development environment
new HomepageStack(app, 'VaitHomepageDev', {
  environment: 'development',
  domainName: 'dev.vait-homepage.com',
  env: {
    account: process.env.DEV_ACCOUNT,
    region: 'us-east-1'
  }
});

// Production environment
new HomepageStack(app, 'VaitHomepageProd', {
  environment: 'production',
  domainName: 'vait-homepage.com',
  env: {
    account: process.env.PROD_ACCOUNT,
    region: 'us-east-1'
  }
});
```

### Blue-Green Deployment Strategy
```typescript
// ✅ Good: Blue-green deployment with CloudFront
export class BlueGreenDeployment extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Blue environment (current)
    const blueBucket = new s3.Bucket(this, 'BlueBucket', {
      bucketName: 'vait-homepage-blue'
    });

    // Green environment (new)
    const greenBucket = new s3.Bucket(this, 'GreenBucket', {
      bucketName: 'vait-homepage-green'
    });

    // CloudFront with origin failover
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(blueBucket),
        originGroups: {
          primaryOriginId: blueBucket.originId,
          fallbackOriginId: greenBucket.originId
        }
      }
    });
  }
}
```

## Cost Optimisation

### S3 Lifecycle Management
```typescript
// ✅ Good: Cost-effective S3 lifecycle rules
export class OptimizedS3Bucket extends s3.Bucket {
  constructor(scope: Construct, id: string, bucketName: string) {
    super(scope, id, {
      bucketName,
      lifecycleRules: [
        {
          id: 'IntelligentTiering',
          enabled: true,
          transitions: [
            {
              storageClass: s3.StorageClass.INTELLIGENT_TIERING,
              transitionAfter: Duration.days(30)
            }
          ]
        },
        {
          id: 'ArchiveOldVersions',
          enabled: true,
          noncurrentVersionTransitions: [
            {
              storageClass: s3.StorageClass.GLACIER,
              transitionAfter: Duration.days(90)
            }
          ]
        }
      ],
      intelligentTieringConfig: {
        status: s3.IntelligentTieringStatus.ENABLED
      }
    });
  }
}
```

### CloudFront Cost Optimisation
```typescript
// ✅ Good: Optimized CloudFront configuration
export class CostOptimizedDistribution extends cloudfront.Distribution {
  constructor(scope: Construct, id: string, origin: origins.Origin) {
    super(scope, id, {
      defaultBehavior: {
        origin,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true, // Enable compression
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100, // Use cheapest edge locations
      httpVersion: cloudfront.HttpVersion.HTTP2, // HTTP/2 for better performance
      enableLogging: true,
      logBucket: new s3.Bucket(scope, 'AccessLogsBucket', {
        bucketName: 'vait-homepage-access-logs',
        lifecycleRules: [
          {
            id: 'DeleteOldLogs',
            enabled: true,
            expiration: Duration.days(90)
          }
        ]
      })
    });
  }
}
```

## Monitoring & Observability

### CloudWatch Alarms
```typescript
// ✅ Good: Comprehensive monitoring setup
export class MonitoringSetup extends Construct {
  constructor(scope: Construct, id: string, distribution: cloudfront.Distribution) {
    super(scope, id);

    // Error rate alarm
    new cloudwatch.Alarm(this, 'HighErrorRate', {
      metric: new cloudwatch.Metric({
        namespace: 'AWS/CloudFront',
        metricName: '4xxErrorRate',
        statistic: 'Average',
        period: Duration.minutes(5),
        dimensionsMap: {
          DistributionId: distribution.distributionId
        }
      }),
      threshold: 5, // 5% error rate
      evaluationPeriods: 2,
      alarmDescription: 'High error rate detected'
    });

    // Latency alarm
    new cloudwatch.Alarm(this, 'HighLatency', {
      metric: new cloudwatch.Metric({
        namespace: 'AWS/CloudFront',
        metricName: 'TotalLatency',
        statistic: 'Average',
        period: Duration.minutes(5),
        dimensionsMap: {
          DistributionId: distribution.distributionId
        }
      }),
      threshold: 1000, // 1 second
      evaluationPeriods: 3,
      alarmDescription: 'High latency detected'
    });
  }
}
```

### Custom Metrics
```typescript
// ✅ Good: Custom CloudWatch metrics
export class CustomMetrics extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Deployment success metric
    const deploymentMetric = new cloudwatch.Metric({
      namespace: 'VAIT/Homepage',
      metricName: 'DeploymentSuccess',
      statistic: 'Sum',
      period: Duration.minutes(1)
    });

    // Publish deployment metric
    new cloudwatch.Alarm(this, 'DeploymentFailure', {
      metric: deploymentMetric,
      threshold: 0,
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      evaluationPeriods: 1,
      alarmDescription: 'Deployment failed'
    });
  }
}
```

## Testing Infrastructure

### CDK Unit Tests
```typescript
// ✅ Good: CDK stack testing
import { Template } from 'aws-cdk-lib/assertions';
import { HomepageStack } from '../lib/homepage-stack';

describe('HomepageStack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new HomepageStack(app, 'TestStack', {
      environment: 'test',
      domainName: 'test.vait-homepage.com'
    });
    template = Template.fromStack(stack);
  });

  it('should create S3 bucket', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'test.vait-homepage.com',
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true
      }
    });
  });

  it('should create CloudFront distribution', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        DefaultCacheBehavior: {
          ViewerProtocolPolicy: 'redirect-to-https',
          TargetOriginId: expect.any(String)
        }
      }
    });
  });

  it('should enforce HTTPS', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        DefaultCacheBehavior: {
          ViewerProtocolPolicy: 'redirect-to-https'
        }
      }
    });
  });
});
```

## Cross References

- **Infrastructure Overview**: See `docs/infrastructure.md` for detailed architecture
- **Commands Reference**: See `commands.md` for deployment commands
- **Engineering Principles**: See `engineering-principles.md` for decision framework
- **Security Considerations**: See `special-considerations.md` for security guidelines

## Anti-Patterns to Avoid

### CDK Anti-Patterns
```typescript
// ❌ Bad: Hard-coded values
const bucket = new s3.Bucket(this, 'Bucket', {
  bucketName: 'vait-homepage', // Hard-coded
  removalPolicy: Removal.DESTROY // Always destroy
});

// ✅ Good: Environment-aware configuration
const bucket = new s3.Bucket(this, 'Bucket', {
  bucketName: `${props.environment}.vait-homepage.com`,
  removalPolicy: props.environment === 'production' 
    ? Removal.RETAIN 
    : Removal.DESTROY
});
```

### Security Anti-Patterns
```typescript
// ❌ Bad: Public S3 bucket
const bucket = new s3.Bucket(this, 'Bucket', {
  publicReadPolicy: true, // Security risk!
  blockPublicAccess: BlockPublicAccess.BLOCK_NONE
});

// ✅ Good: Private bucket with CloudFront access
const bucket = new s3.Bucket(this, 'Bucket', {
  blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  encryption: s3.BucketEncryption.S3_MANAGED
});
```

These infrastructure guidelines ensure secure, cost-effective, and maintainable AWS deployments for the VAIT Homepage project.