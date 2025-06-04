import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import type { Construct } from 'constructs';

import { BASE_DOMAIN } from './constants';

export class CertStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostedZone = route53.HostedZone.fromLookup(this, 'VAITHostedZone', { domainName: BASE_DOMAIN });
    const siteDomain = `home.${BASE_DOMAIN}`;

    const certificate = new acm.Certificate(this, 'SiteCertificate', {
      domainName: siteDomain,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });
    new cdk.CfnOutput(this, 'Certificate', { value: certificate.certificateArn });
  }
}
