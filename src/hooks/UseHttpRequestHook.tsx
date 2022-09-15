import { useCallback, useEffect, useState } from 'react';

const BACKEND_URL = 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api';

type HttpOptions = {
  method: string
  body?: string,
  headers?: HeadersInit
};

type MakeRequestFoo = (options?: HttpOptions) => void;

export default function useHttpRequest<Data>(endpoint: string, explicit?: boolean): [Data[], MakeRequestFoo] {
  const [data, setData] = useState<Data[]>([]);

  const makeRequest = useCallback(async (options?: HttpOptions) => {
    const response = await fetch(`${BACKEND_URL}/${endpoint}`, options);
    if (!response.ok)
      return;
    const json: Data[] = await response.json();
    setData(json);
  }, [setData, endpoint]);

  useEffect(() => {
    if (explicit)
      return;
    makeRequest();
  }, [explicit, makeRequest]);

  return [data, makeRequest];
};
