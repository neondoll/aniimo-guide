import type { ElementId } from "../enums/elements.ts";

export interface Element {
  id: ElementId;
  name: string;
  color: string;
}
