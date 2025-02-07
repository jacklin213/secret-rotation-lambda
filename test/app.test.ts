import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SecretRotationLambdaStack } from '../lib/secret-rotation-lambda-stack';

// example resource in lib/secret-rotation-lambda-stack.ts
test('Lambda, Secret and RotationSchedule created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SecretRotationLambdaStack(app, 'MyTestStack');
    // THEN
    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::Lambda::Function', 1);
    template.resourceCountIs('AWS::SecretsManager::Secret', 1);
    template.hasResourceProperties('AWS::SecretsManager::RotationSchedule', {
        RotateImmediatelyOnUpdate: true,
        RotationLambdaARN: {
            'Fn::GetAtt': ['TestLambda2F70C45E', 'Arn']
        },
        RotationRules: {
            ScheduleExpression: 'rate(30 days)'
        },
        SecretId: {
            Ref: 'TestSecret16AF87B1'
        }
    });
});
