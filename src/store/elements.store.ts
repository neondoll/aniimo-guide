import { createDataStore } from "./createDataStore";
import type { Element } from "../types/element";

export const useElementsStore = createDataStore<Element[]>({
  name: "elements",
  url: "data/elements.json",
  initialData: [],
});
