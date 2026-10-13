import { useEffect, useState } from 'react';

import { bootstrapData } from '../store/bootstrap'

export function useBootstrapData() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    bootstrapData()
      .then(() => !cancelled && setReady(true))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : 'Unknown error'));
    return () => { cancelled = true; };
  }, []);

  return { ready, error };
}