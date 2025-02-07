#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SecretRotationLambdaStack } from '../lib/secret-rotation-lambda-stack';
import { SecretStack } from '../lib/secret-stack';
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
const dummyAccount = '000000000000';

new SecretRotationLambdaStack(app, 'SecretRotationLambdaStack', {
  env: { account: dummyAccount, region: 'us-east-1' },
});

// Comment out below 2 stacks to succesfully cdk synth
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    env: { account: dummyAccount, region: 'us-east-1' }
});
new SecretStack(app, 'SecretStack', {
    env: { account: dummyAccount, region: 'us-east-1' },
    rotationLambda: lambdaStack.lambda
});