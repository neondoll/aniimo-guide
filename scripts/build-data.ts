import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

import { aniimos } from './aniimos.source.ts';
import { families } from './families.source.ts';
import { elements } from './elements.source.ts';
import { forms } from './forms.source.ts';
import { homelandAbilities } from './homeland-abilities.source.ts';
import { facilities } from './facilities.source.ts';
import { evolutions } from './evolutions.source.ts';
import { regions } from './regions.source.ts';
import { computeRecommendations } from './recommendations/formRecommendations.ts';
import { aniimoKey } from './aniimos.refs.ts';
import { familyKey } from './families.refs.ts';

import type { Aniimo, AniimoForm } from '../src/types/aniimo.ts';
import type { AniimoFormSource } from './aniimos.source.ts';
import type { Facility } from '../src/types/facility.ts';
import type { FormId } from '../src/enums/forms.ts';
import type { ElementWithStats, ElementAniimoRef, ElementFacilityRef } from '../src/types/element-stats.ts';
import type {
  HomelandAbilityWithStats,
  HomelandAbilityAniimoRef,
  HomelandAbilityFacilityRef,
} from '../src/types/homeland-ability-stats.ts';

import { compareByOrder, ELEMENT_ORDER, HOME_ABILITY_ORDER } from '../src/constants/sorting.ts';
import { StageIds } from '../src/enums/stages.ts';

const outputDir = path.resolve('public/data');

/* ───────────── Zod ───────────── */
const RegionSchema = z.object({ id: z.string(), name: z.string(), order: z.number() });
const ElementSchema = z.object({ id: z.string(), name: z.string().min(1), color: z.string() });
const HomelandAbilitySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  color: z.string(),
});
const AssignmentSchema = z.object({ id: z.string(), level: z.number().int().min(1).max(4) });

// Схема для AniimoRef (вложенный объект)
const AniimoRefSchema = z.object({
  region: z.string(),
  no: z.string(),
  name: z.string().min(1),
});

const AniimoSourceSchema = z.object({
  aniimo: AniimoRefSchema,
  form: z.string(),
  region: z.string().optional(), // override, если есть
  elements: z.array(AssignmentSchema).min(1),
  home_abilities: z.array(AssignmentSchema),
  season: z.number().int().min(1).optional(),
  stage: z.enum([StageIds.Lumin, StageIds.Gamma, StageIds.Nova, StageIds.Legendary]).optional(),
  fixed_personality: z.any().optional(),
});

const FacilityModeSchema = z.object({
  id: z.string(),
  name: z.string(),
  required_ability_level: z.number().int().min(0),
});
const FacilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  copies: z.number().int().min(0),
  estimated_aniimo_count: z.number().int().min(0).optional(),
  requires_abilities: z.array(z.string()),
  requires_families: z.array(z.string()),
  preferred_personality: z.any().optional(),
  modes: z.array(FacilityModeSchema).optional(),
  is_speed_capped: z.boolean().optional(),
});

// Схема для эволюции в НОВОМ формате
const EvolutionSourceSchema = z.object({
  from: AniimoRefSchema,
  from_form: z.string(),
  to: AniimoRefSchema,
  to_form: z.string(),
  requires_personality: z.any().optional(),
});

function validate() {
  z.array(RegionSchema).parse(regions);
  z.array(ElementSchema).parse(elements);
  z.array(HomelandAbilitySchema).parse(homelandAbilities);
  z.array(AniimoSourceSchema).parse(aniimos);
  z.array(FacilitySchema).parse(facilities);
  z.array(EvolutionSourceSchema).parse(evolutions);

  const regionIds = new Set(regions.map((r) => r.id));
  for (const a of aniimos) {
    if (!regionIds.has(a.aniimo.region)) {
      throw new Error(`Aniimo #${a.aniimo.no}: неизвестный регион ${a.aniimo.region}`);
    }
  }
}

/* ───────────── Merge ───────────── */
function mergeAniimos(
  rows: AniimoFormSource[],
  familiesList: typeof families,
): Aniimo[] {
  const familyKeyByAniimoKey = new Map<string, string>();
  for (const fam of familiesList) {
    const fk = familyKey(fam);
    for (const member of fam.members) {
      familyKeyByAniimoKey.set(aniimoKey(member), fk);
    }
  }

  // Карта эффективных регионов всех форм.
  // Ключ: `${primaryRegion}:${no}:${form}`, значение — фактический регион формы.
  const formRegionMap = new Map<string, string>();
  for (const row of rows) {
    const effectiveRegion = row.region ?? row.aniimo.region;
    formRegionMap.set(
      `${row.aniimo.region}:${row.aniimo.no}:${row.form}`,
      effectiveRegion,
    );
  }

  const edgesByForm = new Map<string, AniimoForm['evolves_to']>();
  for (const e of evolutions) {
    const region = e.from.region;
    const key = `${region}:${e.from.no}:${e.from_form}`;

    // Ищем эффективный регион целевой формы
    const targetKey = `${e.to.region}:${e.to.no}:${e.to_form}`;
    const to_region = formRegionMap.get(targetKey) ?? e.to.region;

    const list = edgesByForm.get(key) ?? [];
    list.push({
      to_no: e.to.no,
      to_form: e.to_form,
      to_region: to_region as AniimoForm['evolves_to'][number]['to_region'],
      ...(e.requires_personality ? { requires_personality: e.requires_personality } : {}),
    });
    edgesByForm.set(key, list);
  }

  const byKey = new Map<string, Aniimo>();
  for (const row of rows) {
    const aKey = aniimoKey(row.aniimo);
    let entry = byKey.get(aKey);
    if (!entry) {
      const family_id = familyKeyByAniimoKey.get(aKey);
      if (!family_id) throw new Error(`Aniimo ${aKey} не привязан ни к одной семье`);
      entry = {
        no: row.aniimo.no,
        region: row.aniimo.region,
        name: row.aniimo.name,
        family_id,
        forms: [],
      };
      byKey.set(aKey, entry);
    }

    const region = row.region ?? row.aniimo.region;
    const formKey = `${region}:${row.aniimo.no}:${row.form}`;
    const evolves_to = edgesByForm.get(formKey) ?? [];

    entry.forms.push({
      form: row.form,
      ...(row.region ? { region: row.region } : {}),
      elements: [...row.elements].sort((x, y) => compareByOrder(ELEMENT_ORDER, x.id, y.id)),
      home_abilities: [...row.home_abilities].sort((x, y) => compareByOrder(HOME_ABILITY_ORDER, x.id, y.id)),
      evolves_to,
      is_final: evolves_to.length === 0,
      ...(row.image ? { image: row.image } : {}),
      ...(row.season !== undefined ? { season: row.season } : {}),
      ...(row.stage ? { stage: row.stage } : {}),
      ...(row.fixed_personality ? { fixed_personality: row.fixed_personality } : {}),
    });
  }

  const regionOrder = new Map(regions.map((r) => [r.id, r.order]));

  return [...byKey.values()]
    .map((a) => ({
      ...a,
      forms: [...a.forms].sort((x, y) =>
        x.form === 'basic' ? -1 : y.form === 'basic' ? 1 : x.form.localeCompare(y.form),
      ),
    }))
    .sort((a, b) => {
      const r = (regionOrder.get(a.region) ?? 0) - (regionOrder.get(b.region) ?? 0);
      if (r !== 0) return r;
      return a.no.localeCompare(b.no, undefined, { numeric: true });
    });
}

/* ───────────── Stats ───────────── */
function computeStats(mergedAniimos: Aniimo[], facilitiesList: Facility[]) {
  const resolvedFacilities = facilitiesList.map((f) => {
    const modes = f.modes && f.modes.length > 0
      ? f.modes
      : [{ id: 'default', name: 'По умолчанию', required_ability_level: f.requires_abilities.length > 0 ? 1 : 0 }];
    return { ...f, resolved_modes: modes };
  });

  const elementColorById = new Map(elements.map((e) => [e.id, e.color]));

  const makeRef = (a: Aniimo, formId: FormId, level: number, colors: string[]) => ({
    no: a.no,
    region: a.region,
    name: a.name,
    form: formId,
    level,
    element_colors: colors,
  });

  const elementsWithStats: ElementWithStats[] = elements.map((el) => {
    const aniimosRef: ElementAniimoRef[] = [];
    for (const a of mergedAniimos) {
      for (const f of a.forms) {
        const match = f.elements.find((e) => e.id === el.id);
        if (match) {
          aniimosRef.push(makeRef(a, f.form, match.level, f.elements.map((e) => elementColorById.get(e.id)).filter((c): c is string => !!c)));
        }
      }
    }
    const facilitiesRef: ElementFacilityRef[] = [];
    for (const f of resolvedFacilities) {
      if (!f.requires_abilities.includes(el.id)) continue;
      facilitiesRef.push({
        facility_id: f.id, facility_name: f.name, copies: f.copies,
        modes: f.resolved_modes.map((m) => ({
          mode_id: m.id,
          mode_name: m.name,
          required_ability_level: m.required_ability_level,
        })),
      });
    }
    return {
      id: el.id, name: el.name, color: el.color,
      aniimo_count: aniimosRef.length, aniimos: aniimosRef,
      facility_count: facilitiesRef.length, facilities: facilitiesRef,
    };
  });

  const homelandAbilitiesWithStats: HomelandAbilityWithStats[] = homelandAbilities.map((ab) => {
    const aniimosRef: HomelandAbilityAniimoRef[] = [];
    for (const a of mergedAniimos) {
      for (const f of a.forms) {
        const match = f.home_abilities.find((ha) => ha.id === ab.id);
        if (match) {
          aniimosRef.push(makeRef(a, f.form, match.level, f.elements.map((e) => elementColorById.get(e.id)).filter((c): c is string => !!c)));
        }
      }
    }
    const facilitiesRef: HomelandAbilityFacilityRef[] = [];
    for (const f of resolvedFacilities) {
      if (!f.requires_abilities.includes(ab.id)) continue;
      facilitiesRef.push({
        facility_id: f.id, facility_name: f.name, copies: f.copies,
        modes: f.resolved_modes.map((m) => ({
          mode_id: m.id,
          mode_name: m.name,
          required_ability_level: m.required_ability_level,
        })),
      });
    }
    return {
      id: ab.id, name: ab.name, description: ab.description, color: ab.color,
      aniimo_count: aniimosRef.length, aniimos: aniimosRef,
      facility_count: facilitiesRef.length, facilities: facilitiesRef,
    };
  });

  return { elementsWithStats, homelandAbilitiesWithStats, resolvedFacilities };
}

/* ───────────── Запись ───────────── */
function write(name: string, data: unknown) {
  const file = path.join(outputDir, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`✅ ${file}`);
}

function main() {
  console.log('Начинаем генерацию...');
  fs.mkdirSync(outputDir, { recursive: true });
  validate();

  const mergedAniimos = mergeAniimos(aniimos, families);
  const { elementsWithStats, homelandAbilitiesWithStats, resolvedFacilities } = computeStats(mergedAniimos, facilities);

  const rareFormIds = new Set(forms.filter((f) => f.is_rare).map((f) => f.id));
  const recommendations = computeRecommendations(mergedAniimos, resolvedFacilities, rareFormIds);

  const familiesJson = families.map((fam) => ({
    id: fam.id,
    region: fam.region,
    name: fam.name,
    member_nos: fam.members.map((m) => m.no),
  }));

  write('regions', regions);
  write('elements', elementsWithStats);
  write('homeland-abilities', homelandAbilitiesWithStats);
  write('forms', forms);
  write('families', familiesJson);
  write('facilities', resolvedFacilities);
  write('aniimos', mergedAniimos);
  write('recommendations', { forms: recommendations });
  write('meta', {
    generatedAt: new Date().toISOString(),
    categories: ['regions', 'elements', 'homeland-abilities', 'forms', 'families', 'facilities', 'aniimos', 'recommendations'],
  });

  console.log('Готово.');
}

try {
  main();
}
catch (e) {
  console.error('❌', e);
  process.exit(1);
}
