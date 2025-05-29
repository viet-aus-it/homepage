#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HomepageStack } from '../lib/homepage-stack';

const app = new cdk.App();
new HomepageStack(app, 'HomepageStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: 'ap-southeast-2',
  },
});
