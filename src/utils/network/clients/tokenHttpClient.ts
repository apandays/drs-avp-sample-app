import axios from 'axios';
import { Config } from 'src/utils/config';
import { PASSWORD_GRANT_TYPE, TOKEN_GRANT_TYPE } from 'src/utils/consts';
import { httpClient } from './httpClient';

export const tokenHttpClient = (baseUrl?: string, appId?: string, clientSecret?: string) => {
  const client = httpClient(baseUrl);
  const tokenClient = httpClient(`${Config.idpServiceUrl}/oidc/token`);

  async function getMgmtAppToken(): Promise<string | undefined | null> {
    const data: any = {
      client_id: Config.mgmtClientId,
      client_secret: Config.mgmtClientSecret,
      grant_type: TOKEN_GRANT_TYPE,
    };
    const body = new URLSearchParams(data).toString();
    const res: any = await tokenClient.post(body, '', { 'Content-Type': 'application/x-www-form-urlencoded' });

    return res?.access_token;
  }

  async function getAppToken(): Promise<string | undefined | null> {
    const data: any = {
      client_id: appId || Config.appClientId,
      client_secret: clientSecret || Config.appClientSecret,
      grant_type: TOKEN_GRANT_TYPE,
    };
    const body = new URLSearchParams(data).toString();
    const res: any = await tokenClient.post(body, '', { 'Content-Type': 'application/x-www-form-urlencoded' });

    return res?.access_token;
  }

  const getUserToken = async (email: string, password: string): Promise<string | undefined | null> => {
    const data: any = {
      client_id: Config.appClientId,
      client_secret: Config.appClientSecret,
      grant_type: PASSWORD_GRANT_TYPE,
      username: email,
      password,
    };
    const body = new URLSearchParams(data).toString();
    const res = (await tokenClient.post(body, '', { 'Content-Type': 'application/x-www-form-urlencoded' })) as string;
    return res;
  };

  const getHotelsAppToken = async () => {
    const data: any = {
      client_id: Config.hotelsClientId,
      client_secret: Config.hotelsClientSecret,
      grant_type: TOKEN_GRANT_TYPE,
    };
    const body = new URLSearchParams(data).toString();
    const res: any = await tokenClient.post(body, '', { 'Content-Type': 'application/x-www-form-urlencoded' });

    return res?.access_token;
  };

  const getGiftsAppToken = async () => {
    const data: any = {
      client_id: Config.giftsClientId,
      client_secret: Config.giftsClientSecret,
      grant_type: TOKEN_GRANT_TYPE,
    };
    const body = new URLSearchParams(data).toString();
    const res: any = await tokenClient.post(body, '', { 'Content-Type': 'application/x-www-form-urlencoded' });

    return res?.access_token;
  };

  const setUserPhone = async (userId: string, phone: string) => {
    const mgmtToken = await getMgmtAppToken();
    await axios.put(
      `${baseUrl}/manage/users/${userId}`,
      { phone_number: phone },
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${mgmtToken}` } },
    );
  };

  const assignUserToHotelsAndGifts = async (userId: string, credentials: { username: string; password: string }) => {
    const mgmtToken = await getMgmtAppToken();

    await axios.put(
      `${baseUrl}/manage/users/${userId}/apps/`,
      { app_id: '0s9f6ngp4gpmg9c48vdr9' },
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${mgmtToken}` } },
    );
    await axios.put(
      `${baseUrl}/manage/users/${userId}/apps/`,
      { app_id: '4lfkeccv6oxp76ywr1974' },
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${mgmtToken}` } },
    );

    const hotelsToken = await getHotelsAppToken();
    axios.post(`${baseUrl}/users/${userId}/password`, credentials, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${hotelsToken}` },
    });
    await axios.put(
      `${baseUrl}/users/${userId}`,
      {
        custom_app_data: {
          favorite_chain: 'hilton',
          favorite_room_type: 'suite',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${hotelsToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const giftsToken = await getGiftsAppToken();
    axios.post(`${baseUrl}/users/${userId}/password`, credentials, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${giftsToken}` },
    });
    await axios.put(
      `${baseUrl}/users/${userId}`,
      {
        custom_app_data: {
          favorite_category: 'food',
          favorite_card: 'best_restaurant',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${giftsToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
  };

  const getClient = () => {
    return client.getClient;
  };

  const get = async <D>(endpoint: string, token?: string): Promise<D | void> => {
    if (!token) {
      token = (await getAppToken()) as any;
    }

    let updatedHeaders: { [key: string]: string } = { 'Content-Type': 'application/json' };

    if (token) {
      updatedHeaders = { ...updatedHeaders, Authorization: `Bearer ${token}` };
    }
    return await client.get(endpoint, updatedHeaders);
  };

  const post = async <B, D>(
    body: B,
    endpoint: string,
    headers?: { [key: string]: string },
    token?: string,
  ): Promise<D> => {
    if (!token) {
      token = (await getAppToken()) as any;
    }

    let updatedHeaders: { [key: string]: string } = { ...(headers ?? {}), 'Content-Type': 'application/json' };

    if (token) {
      updatedHeaders = { ...updatedHeaders, Authorization: `Bearer ${token}` };
    }

    try {
      return await client.post(body, endpoint, updatedHeaders);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const put = async <B, D>(
    body: B,
    endpoint: string,
    headers?: { [key: string]: string },
    token?: string,
  ): Promise<D> => {
    if (!token) {
      token = (await getAppToken()) as any;
    }

    let updatedHeaders: { [key: string]: string } = { ...(headers ?? {}), 'Content-Type': 'application/json' };

    if (token) {
      updatedHeaders = { ...updatedHeaders, Authorization: `Bearer ${token}` };
    }

    try {
      return await client.put(body, endpoint, updatedHeaders);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return {
    getClient,
    get,
    post,
    getAppToken,
    getUserToken,
    assignUserToHotelsAndGifts,
    put,
    setUserPhone,
  };
};
