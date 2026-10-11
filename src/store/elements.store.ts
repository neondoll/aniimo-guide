import { createDataStore } from './createDataStore';
import type { Element } from '../types/element.type';

export const useElementsStore = createDataStore<Element>({
  name: 'elements',
  url: 'data/elements.json',
});