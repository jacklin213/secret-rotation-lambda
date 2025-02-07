import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class SecretRotationLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const rotationLambda = new lambda.Function(this, 'TestLambda', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: new lambda.InlineCode('console.log("works")')
        });

        const secret = new Secret(this, 'TestSecret');
        secret.addRotationSchedule('RotationSchedule', {
            automaticallyAfter: cdk.Duration.days(30),
            rotateImmediatelyOnUpdate: true,
            rotationLambda
        });
    }
}
