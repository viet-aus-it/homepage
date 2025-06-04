import path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53_targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment';
import type { Construct } from 'constructs';

import { BASE_DOMAIN, SITE_DOMAIN, WWW_DOMAIN } from './constants';

export class HomepageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const zone = route53.HostedZone.fromLookup(this, 'VAITHostedZone', { domainName: BASE_DOMAIN });

    /**
     * acm.DnsValidatedCertificate is a deprecated construct, and dealing with proper cross stack regional reference in AWS
     * is still experimental and plainly a PITA. I'll revise this construct when they come up with a new solution.
     */
    const certificate = new acm.DnsValidatedCertificate(this, 'VAITHomeCertificate', {
      region: 'us-east-1',
      domainName: `*.${BASE_DOMAIN}`,
      hostedZone: zone,
    });

    const siteBucket = new s3.Bucket(this, 'HomepageSiteBucket', {
      bucketName: SITE_DOMAIN,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
    new cdk.CfnOutput(this, 'BucketArn', { value: siteBucket.bucketArn });

    const distribution = new cloudfront.Distribution(this, 'HomepageSiteDistribution', {
      defaultRootObject: 'index.html',
      certificate,
      domainNames: [SITE_DOMAIN],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      defaultBehavior: {
        origin: cloudfront_origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
      comment: 'Homepage Cloudfront Distribution',
    });
    distribution.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    const siteDomainTarget = new route53_targets.CloudFrontTarget(distribution);
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: SITE_DOMAIN,
      target: route53.RecordTarget.fromAlias(siteDomainTarget),
      zone,
    });
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: BASE_DOMAIN,
      target: route53.RecordTarget.fromAlias(siteDomainTarget),
      zone,
    });
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: WWW_DOMAIN,
      target: route53.RecordTarget.fromAlias(siteDomainTarget),
      zone,
    });

    const clientPath = path.resolve(__dirname, '..', '..', 'dist');
    const clientBundle = s3_deployment.Source.asset(clientPath);

    new s3_deployment.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [clientBundle],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
    new cdk.CfnOutput(this, 'DistributionDomain', { value: distribution.distributionDomainName });
  }
}
