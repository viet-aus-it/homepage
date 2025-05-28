#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HomepageStack } from '../lib/homepage-stack';

const app = new cdk.App();
new HomepageStack(app, 'HomepageStack', {});
