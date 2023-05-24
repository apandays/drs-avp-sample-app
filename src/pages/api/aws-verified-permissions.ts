const AWS = require('./sdks/avp');

const client = new AWS.VerifiedPermissions({ region: 'us-east-1' });

export type Entity = {
  EntityType: string;
  EntityId: string;
};

type Action = {
  ActionType: string;
  ActionId: string;
};

export async function isAuthorized(principal: Entity, resource: Entity, action: Action, riskScore: number) {
  try {
    const policyStore = await client.listPolicyStores().promise();
    const policyStoreId = policyStore.PolicyStores[0].PolicyStoreId;

    const result = await client
      .isAuthorized({
        PolicyStoreIdentifier: policyStoreId,
        Principal: principal,
        Resource: resource,
        Action: action,
        Context: {
          riskScore: { Long: riskScore }
        }, 
      })
      .promise();

    return result.Decision == 'Allow';
  } catch (err) {
    console.log('Failed handling isAuthorized using AVP, err: ' + err);
  }
}
