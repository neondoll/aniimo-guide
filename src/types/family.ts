import type { AniimoNo } from "../enums/aniimos.ts";
import type { FamilyId } from "../enums/families.ts";

export interface Family {
  id: FamilyId;         // = no самого младшего
  name: string;
  member_nos: AniimoNo[];
}
