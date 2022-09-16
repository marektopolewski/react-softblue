import { useCallback, useEffect, useState } from 'react';

import  { RequestData } from '../types';

const BACKEND_URL = 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api';

type HttpOptions = {
  method: string
  body?: string,
  headers?: HeadersInit
};

type MaybeArray<T> = T[] | undefined;

type MakeRequestFoo = (options?: HttpOptions) => void;

export default function useHttpRequest<T extends RequestData>(endpoint: string, explicit?: boolean): [MaybeArray<T>, MakeRequestFoo] {
  const [data, setData] = useState<MaybeArray<T>>([]);

  const makeRequest = useCallback(async (options?: HttpOptions) => {
    const response = await fetch(`${BACKEND_URL}/${endpoint}`, options);
    if (!response.ok) {
      setData(undefined);
      return;
    }
    const json: T[] = await response.json();
    setData(json);
  }, [setData, endpoint]);

  useEffect(() => {
    if (explicit)
      return;
    makeRequest();
  }, [explicit, makeRequest]);

  return [data, makeRequest];
};
