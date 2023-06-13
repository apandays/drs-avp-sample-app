import { Config } from "@utils";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthorized } from "./aws-verified-permissions";
import { RecommendationResult } from "./recommendation.types";
const AWS = require("aws-sdk");

function parseActionToken(actionToken: unknown) {
  if (typeof actionToken == "string") {
    return JSON.parse(
      Buffer.from(actionToken.split(".")[1], "base64").toString()
    );
  }
  return {};
}

function formatPresentedRecommendation(
  recommendationResponse: RecommendationResult
) {
  const { recommendation, risk_score } = recommendationResponse;
  let presentedRecommendation;
  switch (recommendation?.type) {
    case "TRUST":
      presentedRecommendation = "TRUST";
      break;
    case "ALLOW":
      presentedRecommendation = "ALLOW";
      break;
    case "CHALLENGE":
      presentedRecommendation = "CHALLENGE";
      break;
    case "DENY":
      presentedRecommendation = "DENY";
      break;
    default:
      presentedRecommendation = null;
  }

  const returnedScore = !Number(risk_score) ? null : risk_score;

  return {
    recommendation: presentedRecommendation,
    risk_score: returnedScore,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { actionToken } = req.query;
    try {
      const accessToken = await getToken();
      console.log("Authenticating");
      const recommendationResponse = await fetchRecommendation(
        actionToken as string,
        accessToken
      );

      if (Config.enableAWSVerifiedPermissions) {
        console.log("Authorizing");
        const actionPayload = parseActionToken(actionToken);
        let userEntities: AWS.VerifiedPermissions.EntitiesDefinition =
          getUserEntitiesFromToken(actionPayload);

        const { actionType, userId } = actionPayload;
        const resource = {
          // default resource example

          EntityType: 'Account',
          EntityId: `account-${userId}`,
        };

        if (userId) {
          const isAuthorizedForAction = await isAuthorized(
            { entityType: "User", entityId: userId },
            resource,
            {
              actionType: "Action",
              actionId: actionType,
            },
            recommendationResponse?.risk_score,
            userEntities
          );
          console.log(isAuthorizedForAction);
          if (!isAuthorizedForAction) {
            res.status(403).send({
              message: "Action is forbidden for this user!",
            });
            console.log("Authorization resulted in forbidden");
            return;
          }
        } else {
          res.status(403).send({
            message: "No user is set!",
          });
          console.log("No user is set");
          return;
        }
      }
      // We return the recommendation result to the client just for demo presenting, hence we format it to avoid Cross-Site-scripting (XSS) vulnerability
      const returnedRecommendation = formatPresentedRecommendation(
        recommendationResponse
      );
      console.log(returnedRecommendation);
      res.send({ ...returnedRecommendation, status: res.status });
    } catch (e) {
      console.error(e);
      const message = axios.isAxiosError(e)
        ? e.response?.data?.message
        : "An error occured";
      res.status(500).send({
        message,
      });
    }
  }
}

const getToken = async (): Promise<string> => {
  const res = await axios.post(
    `${Config.drsApiUrl}/v1/oauth/token`,
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: Config.transmitClientId,
      client_secret: Config.transmitClientSecret,
      scope: "riskid.recommendation.fetch",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const { data } = res;
  return data.access_token;
};

const fetchRecommendation = async (
  actionToken: string | undefined,
  accessToken: string
) => {
  if (actionToken) {
    const query = new URLSearchParams({
      action_token: actionToken,
    }).toString();
    const resp = await axios.get(
      `${Config.drsApiUrl}/v1/recommendation?${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return resp.data;
  }
  return null;
};
function getUserEntitiesFromToken(
  actionPayload: any
): AWS.VerifiedPermissions.EntitiesDefinition {
  let attributes: AWS.VerifiedPermissions.EntityAttributes = {};
  Object.entries(actionPayload).forEach(([key, value]) => {
    attributes[key] = {
      string: JSON.stringify(value),
    };
  });

  const { userId } = actionPayload;
  let entityItem: AWS.VerifiedPermissions.EntityItem = {
    attributes: attributes,
    identifier: {
      entityType: "User",
      entityId: userId,
    },
  };

  let entities: AWS.VerifiedPermissions.EntitiesDefinition = {
    entityList: [entityItem],
  };
  return entities;
}
