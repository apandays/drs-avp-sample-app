import wretch from 'wretch';

export const httpClient = (baseUrl?: string) => {
  const w = wretch(baseUrl);

  const getClient = () => {
    return w;
  };

  const get = async <D>(endpoint: string, headers?: HeadersInit): Promise<D> => {
    const res = await w.headers(headers || {}).get(endpoint);
    return res.json();
  };

  const post = async <B, D>(body: B, endpoint: string, headers?: HeadersInit): Promise<D> => {
    const res = await w.headers(headers || {}).post(body, endpoint);
    return res.json();
  };

  const put = async <B, D>(body: B, endpoint: string, headers?: HeadersInit): Promise<D> => {
    const res = await w.headers(headers || {}).put(body, endpoint);
    return res.json();
  };

  return {
    getClient,
    get,
    post,
    put,
  };
};
