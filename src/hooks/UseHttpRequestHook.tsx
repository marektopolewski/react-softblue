import { useCallback, useEffect, useState } from 'react';

const BACKEND_URL = 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api';

export default function useHttpRequest<Data>(enpoint: string): [Data[], () => Promise<void>] {
  const [data, setData] = useState<Data[]>([]);

  const makeRequest = useCallback(async () => {
    const response = await fetch(`${BACKEND_URL}/${enpoint}`);
    if (!response.ok)
      return;
    const json: Data[] = await response.json();
    setData(json);
  }, [setData, enpoint]);

  useEffect(() => {
    makeRequest();
  }, [makeRequest]);

  return [data, makeRequest];
};
