#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { HomepageStack } from '../lib/homepage-stack';

const app = new cdk.App();

const tags = cdk.Tags.of(app);
tags.add('app', 'Homepage');
tags.add('repo', 'https://github.com/viet-aus-it/homepage');

new HomepageStack(app, 'HomepageStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: 'ap-southeast-2',
  },
  description: 'VAIT Homepage Stack',
});
