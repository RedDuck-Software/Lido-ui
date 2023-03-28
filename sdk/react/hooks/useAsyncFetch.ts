import { useEffect, useState } from 'react';

interface Response<B> {
  data: B | null;
  loading: boolean;
  error: Error | null;
}

export const useAsyncFetch = <T>(
  promise: () => Promise<T>,
  deps: any[],
): Response<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const response = await promise();
        setLoading(false);
        setData(response);
      })();
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error);
    }
    // eslint-disable-next-line
  }, [...deps]);

  return { data, error, loading };
};
