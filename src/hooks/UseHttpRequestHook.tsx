import { useCallback, useEffect, useState } from 'react';

import  { RequestData } from '../types';

const BACKEND_URL = process.env.NODE_ENV === 'development'
  ? 'https://some_url_that_doesnt_exist'
  : 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api';

type HttpOptions = {
  method: string
  body?: string,
  headers?: HeadersInit
};

type MaybeArray<T> = T[] | undefined;

type MakeRequestFoo = (options?: HttpOptions) => void;

export function useHttpRequest<T extends RequestData>(endpoint: string, explicit?: boolean): [MaybeArray<T>, MakeRequestFoo] {
  const [data, setData] = useState<MaybeArray<T>>([]);

  const makeRequest = useCallback(async (options?: HttpOptions) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${endpoint}`, options);
      console.log(response)
      if (!response.ok)
        throw new Error();
      const json: T[] = await response.json();
      setData(json);
    }
    catch (err: any) {
      setData(undefined);
    }
  }, [setData, endpoint]);

  useEffect(() => {
    if (explicit)
      return;
    makeRequest();
  }, [explicit, makeRequest]);

  return [data, makeRequest];
};
