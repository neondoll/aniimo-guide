import type { ElementIds } from '../enums/elements.enum';

export type ElementId = (typeof ElementIds)[keyof typeof ElementIds];

export interface Element {
  id: ElementId;
  name: string;
}
