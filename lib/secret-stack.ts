import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

interface SecretStackProps extends cdk.StackProps {
    rotationLambda: lambda.Function;
}

export class SecretStack extends cdk.Stack {
    readonly secret: Secret;
    constructor(scope: Construct, id: string, props: SecretStackProps) {
        super(scope, id, props);

        this.secret = new Secret(this, 'TestSecret');
        this.secret.addRotationSchedule('RotationSchedule', {
            automaticallyAfter: cdk.Duration.days(30),
            rotateImmediatelyOnUpdate: true,
            rotationLambda: props.rotationLambda
        });
    }
}
