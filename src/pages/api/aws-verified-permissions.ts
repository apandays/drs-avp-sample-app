const AWS = require('aws-verified-permissions');
import { Config } from '@utils';

const client = new AWS.VerifiedPermissions({ region: Config.region });

export type Entity = {
  EntityType: string;
  EntityId: string;
};

type Action = {
  ActionType: string;
  ActionId: string;
};

export async function isAuthorized(
  principal: Entity,
  resource: Entity,
  action: Action,
  riskScore: number,
) {
  try {
    const result = await client
      .isAuthorized({
        PolicyStoreIdentifier: Config.policyStoreId,
        Principal: principal,
        Resource: resource,
        Action: action,
        Context: {
          riskScore: { Long: riskScore },
        },
      })
      .promise();

    return result.Decision == 'Allow';
  } catch (err) {
    console.log('Failed handling isAuthorized using AVP, err: ' + err);
  }
}
