import type { RegionId } from '../enums/regions.ts'

export interface Family {
  region: RegionId;
  id: string;
  name: string;
  member_nos: string[];
}
