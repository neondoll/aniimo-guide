import type { RegionId } from '../enums/regions.ts';

export interface Region {
  id: RegionId;
  name: string;
  order: number;
}
