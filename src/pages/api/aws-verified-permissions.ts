const AWS = require('aws-verified-permissions');
import { Config } from "@utils";

const client = new AWS.VerifiedPermissions({ region: Config.region });


export async function isAuthorized(principal: AWS.VerifiedPermissions.EntityIdentifier, resource: AWS.VerifiedPermissions.EntityIdentifier, action: AWS.VerifiedPermissions.Action, riskScore: number, entities: AWS.VerifiedPermissions.EntitiesDefinition) {
  try {
    
    console.log("Authorization entites: ",JSON.stringify(entities));
    let isAuthorizedInput: AWS.VerifiedPermissions.IsAuthorizedInput = {

      policyStoreId: Config.policyStoreId,
      principal: principal,
      resource: resource,
      action: action,
      context: {
        context: {
          riskScore: { long: riskScore }
        }
      },
      entities
    }


    
    const result: AWS.VerifiedPermissions.IsAuthorizedOutput = await client
      .isAuthorized(isAuthorizedInput)
      .promise();
    console.log("authorized", result);
    return result.decision.toLowerCase() == 'allow';
  } catch (err) {
    console.log('Failed handling isAuthorized using AVP, err: ' + err);
    console.log(JSON.stringify(err));
  }
}
