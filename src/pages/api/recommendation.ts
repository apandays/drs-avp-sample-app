import { Config } from '@utils';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAuthorized } from './aws-verified-permissions';

function parseActionToken(actionToken: unknown) {
  if (typeof actionToken == 'string') {
    return JSON.parse(Buffer.from(actionToken.split('.')[1], 'base64').toString());
  }
  return {};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { actionToken } = req.query;
    try {
      const accessToken = await getToken();
      const recommendationResponse = await fetchRecommendation(actionToken as string, accessToken);
      if (Config.enableAWSVerifiedPermissions) {
        const actionPayload = parseActionToken(actionToken);
        const { actionType, userId } = actionPayload;
        const resource = { // default resource example
          EntityType: 'Account',
          EntityId: `account-${userId}`
        };

        if (userId) {
          const isAuthorizedForAction = await isAuthorized({ EntityType: 'User', EntityId: userId }, resource, {
            ActionType: 'Action',
            ActionId: actionType,
          }, recommendationResponse?.risk_score);
          if (!isAuthorizedForAction) {
            res.status(403).send({
              message: 'Action is forbidden for this user!',
            });
            return;
          }
        }
      }
      res.send({ ...recommendationResponse, status: res.status });
    } catch (e) {
      console.error(e);
      const message = axios.isAxiosError(e) ? e.response?.data?.message : 'An error occured';
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
      grant_type: 'client_credentials',
      client_id: Config.transmitClientId,
      client_secret: Config.transmitClientSecret,
      scope: 'riskid.recommendation.fetch',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  const { data } = res;
  return data.access_token;
};

const fetchRecommendation = async (actionToken: string | undefined, accessToken: string) => {
  if (actionToken) {
    const query = new URLSearchParams({
      action_token: actionToken,
    }).toString();
    const resp = await axios.get(`${Config.drsApiUrl}/v1/recommendation?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return resp.data;
  }
  return null;
};
