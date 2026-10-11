import { useEffect } from 'react';

import { useAniimoFormsStore } from '../store/aniimo-forms.store';
import { useAniimosStore } from '../store/aniimos.store';
import { useElementsStore } from '../store/elements.store';

export function useBootstrapData() {
  const fetchAniimoForms = useAniimoFormsStore((s) => s.fetchData);
  const fetchAniimos = useAniimosStore((s) => s.fetchData);
  const fetchElements = useElementsStore((s) => s.fetchData);

  useEffect(() => {
    void Promise.all([fetchElements(), fetchAniimoForms(), fetchAniimos()]);
  }, [fetchAniimoForms, fetchAniimos, fetchElements]);
}