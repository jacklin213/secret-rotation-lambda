import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LambdaStack extends cdk.Stack {
    readonly lambda: lambda.Function;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.lambda = new lambda.Function(this, 'TestLambda', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: new lambda.InlineCode('console.log("works")')
        });
    }
}
