#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { CertStack } from '../lib/cert-stack';
import { HomepageStack } from '../lib/homepage-stack';

const app = new cdk.App();

const tags = cdk.Tags.of(app);
tags.add('app', 'Homepage');
tags.add('repo', 'https://github.com/viet-aus-it/homepage');

const certStack = new CertStack(app, 'HomepageCertStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: 'us-east-1',
  },
  description: 'VAIT Homepage Certification Stack',
});

const homepageStack = new HomepageStack(app, 'HomepageStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: 'ap-southeast-2',
  },
  description: 'VAIT Homepage Stack',
});
homepageStack.addDependency(certStack);
