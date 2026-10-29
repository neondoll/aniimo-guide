import * as fs from "fs";
import * as path from "path";
import { z } from "zod";

import { aniimos, type AniimoFormSource } from './aniimos.source.ts'
import { elements } from './elements.source.ts'
import { evolutions } from './evolutions.source.ts';
import { facilities } from './facilities.source.ts';
import { families } from './families.source.ts'
import { forms } from './forms.source.ts'
import { homeAbilities } from './home-abilities.source.ts';
import { computeRecommendations } from './recommendations/formRecommendations.ts'
import { compareByOrder, ELEMENT_ORDER, HOME_ABILITY_ORDER } from '../src/constants/sorting.ts'
import type { AniimoNo } from '../src/enums/aniimos.ts';
import type { FamilyId } from '../src/enums/families.ts';
import { StageIds } from '../src/enums/stages.ts'
import type { Aniimo, AniimoForm } from '../src/types/aniimo.ts'
import type { ElementAniimoRef, ElementFacilityRef, ElementWithStats } from '../src/types/element-stats.ts'
import type { Facility } from '../src/types/facility.ts'
import type {
  HomeAbilityAniimoRef, HomeAbilityFacilityRef, HomeAbilityWithStats,
} from '../src/types/home-ability-stats.ts'

const outputDir = path.resolve('public/data');
const ID_REGEX = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;

/* ───────────── Zod ───────────── */
const ElementSchema = z.object({ id: z.string(), name: z.string().min(1), color: z.string() });
const HomeAbilitySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  color: z.string(),
});
const AssignmentSchema = z.object({ id: z.string(), level: z.number().int().min(1).max(4) });
const AniimoSourceSchema = z.object({
  no: z.string().regex(ID_REGEX),
  name: z.string().min(1),
  stage: z.enum([StageIds.Lumin, StageIds.Gamma, StageIds.Nova]).optional(),
  form_id: z.string(),
  elements: z.array(AssignmentSchema).min(1),
  home_abilities: z.array(AssignmentSchema),
  fixed_personality: z.any().optional(),
  season: z.number().int().min(1).optional(),
  image: z.string().optional(),
});
const FamilySchema = z.object({
  id: z.string().regex(ID_REGEX),
  name: z.string().min(1),
  member_nos: z.array(z.string()).min(1),
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
  requires_abilities: z.array(z.string()),
  requires_families: z.array(z.string()),
  preferred_personality: z.any().optional(),
  modes: z.array(FacilityModeSchema).optional(),
  is_speed_capped: z.boolean().optional(),
});
const EvolutionSchema = z.object({
  from_no: z.string(),
  from_form_id: z.string(),
  to_no: z.string(),
  to_form_id: z.string(),
  requires_personality: z.any().optional(),
});

/* ───────────── Валидация ───────────── */
function validate() {
  z.array(ElementSchema).parse(elements);
  z.array(HomeAbilitySchema).parse(homeAbilities);
  z.array(AniimoSourceSchema).parse(aniimos);
  z.array(FamilySchema).parse(families);
  z.array(FacilitySchema).parse(facilities);
  z.array(EvolutionSchema).parse(evolutions);

  const elementIds = new Set(elements.map((e) => e.id));
  const formIds = new Set(forms.map((f) => f.id));
  const homeAbilityIds = new Set(homeAbilities.map((ha) => ha.id));

  for (const a of aniimos) {
    if (!formIds.has(a.form_id)) {
      throw new Error(`${a.name} (#${a.no}): неизвестная форма "${a.form_id}"`);
    }

    const eSeen = new Set<string>();

    for (const e of a.elements) {
      if (!elementIds.has(e.id)) {
        throw new Error(`${a.name} (#${a.no}): неизвестный элемент "${e.id}"`);
      }

      if (eSeen.has(e.id)) {
        throw new Error(`${a.name} (#${a.no}): элемент "${e.id}" указан дважды`);
      }

      eSeen.add(e.id);
    }

    const haSeen = new Set<string>();

    for (const ha of a.home_abilities) {
      if (!homeAbilityIds.has(ha.id)) {
        throw new Error(`${a.name} (#${a.no}): неизвестная способность дома "${ha.id}"`);
      }

      if (haSeen.has(ha.id)) {
        throw new Error(`${a.name} (#${a.no}): способность "${ha.id}" указана дважды`);
      }

      haSeen.add(ha.id);
    }
  }

  const aniimoNameByNo = new Map<AniimoNo, string>();
  const aniimoNos = new Set(aniimos.map((a) => a.no));
  const memberToFamily = new Map<AniimoNo, FamilyId>();

  for (const a of aniimos) {
    aniimoNameByNo.set(a.no, a.name);
  }

  for (const f of families) {
    if (f.member_nos.length === 0) {
      throw new Error(`Семья ${f.id}: пустой member_nos`);
    }

    for (const no of f.member_nos) {
      if (!aniimoNos.has(no)) {
        throw new Error(`Семья ${f.id}: неизвестный участник #${no}`);
      }

      if (memberToFamily.has(no)) {
        throw new Error(`Анимо #${no} указан в нескольких семьях: ${memberToFamily.get(no)} и ${f.id}`);
      }

      memberToFamily.set(no, f.id);
    }

    const minNo = [...f.member_nos].sort()[0];

    if (f.id !== minNo) {
      throw new Error(`Семья ${f.id}: id должен совпадать с младшим номером (${minNo})`);
    }

    if (f.name !== aniimoNameByNo.get(minNo)) {
      throw new Error(`Семья ${f.id}: имя "${f.name}" не совпадает с именем анимо #${minNo} ("${aniimoNameByNo.get(minNo)}")`);
    }
  }

  for (const no of aniimoNos) {
    if (!memberToFamily.has(no)) {
      throw new Error(`Анимо #${no} не принадлежит ни одной семье`);
    }
  }

  const formKeys = new Set(aniimos.map((a) => `${a.no}:${a.form_id}`));
  const adj = new Map<string, string[]>();

  for (const e of evolutions) {
    const from = `${e.from_no}:${e.from_form_id}`;
    const to = `${e.to_no}:${e.to_form_id}`;

    if (!formKeys.has(from)) {
      throw new Error(`Эволюция из несуществующей формы ${from}`);
    }

    if (!formKeys.has(to)) {
      throw new Error(`Эволюция в несуществующую форму ${to}`);
    }

    if (from === to) {
      throw new Error(`Петля на ${from}`);
    }

    if (!adj.has(from)) {
      adj.set(from, []);
    }

    adj.get(from)!.push(to);
  }

  const formsByKey = new Map(aniimos.map((a) => [`${a.no}:${a.form_id}`, a]));

  for (const e of evolutions) {
    if (!e.requires_personality) continue;

    const target = formsByKey.get(`${e.to_no}:${e.to_form_id}`);

    if (!target) continue;

    const fixed = target.fixed_personality;

    if (!fixed) {
      throw new Error(`Эволюция в #${e.to_no}:${e.to_form_id} требует характер, но у целевой формы нет fixed_personality`);
    }

    for (const [axis, side] of Object.entries(e.requires_personality)) {
      if (fixed[axis as keyof typeof fixed] !== side) {
        throw new Error(`Эволюция в #${e.to_no}:${e.to_form_id}: requires_personality.${axis}=${side} не совпадает с fixed_personality.${axis}=${fixed[axis as keyof typeof fixed]}`);
      }
    }
  }

  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map<string, number>();

  for (const k of formKeys) color.set(k, WHITE);

  function dfs(node: string) {
    color.set(node, GRAY);

    for (const next of adj.get(node) ?? []) {
      const c = color.get(next)!;

      if (c === GRAY) throw new Error(`Цикл в графе эволюций: ${node} → ${next}`);

      if (c === WHITE) dfs(next);
    }

    color.set(node, BLACK);
  }

  for (const k of formKeys) if (color.get(k) === WHITE) dfs(k);

  const byNo = new Map<AniimoNo, AniimoFormSource[]>();

  for (const a of aniimos) {
    const list = byNo.get(a.no) ?? [];
    list.push(a);
    byNo.set(a.no, list);
  }

  for (const f of facilities) {
    for (const ra of f.requires_abilities) {
      if (!homeAbilityIds.has(ra)) {
        throw new Error(`Facility ${f.id}: неизвестная способность "${ra}"`);
      }
    }

    for (const rf of f.requires_families) {
      if (!families.some((f) => f.id === rf)) {
        throw new Error(`Facility ${f.id}: неизвестное семейство "${rf}"`);
      }
    }

    if (f.requires_families.length > 0) {
      for (const rf of f.requires_families) {
        const family = families.find((f) => f.id === rf)!;

        for (const ability of f.requires_abilities) {
          const ok = family.member_nos.some((no) =>
            (byNo.get(no) ?? []).some((form) =>
              form.home_abilities.some((ha) => ha.id === ability),
            ),
          );

          if (!ok) {
            throw new Error(`Facility ${f.id}: семейство ${rf} не может покрыть способность "${ability}"`);
          }
        }
      }
    }
  }
}

/* ───────────── Merge ───────────── */
function mergeAniimos(rows: AniimoFormSource[], familiesList: typeof families): Aniimo[] {
  const familyByNo = new Map<AniimoNo, FamilyId>();

  for (const fam of familiesList) {
    for (const no of fam.member_nos) {
      familyByNo.set(no, fam.id);
    }
  }

  const edgesByForm = new Map<string, AniimoForm["evolves_to"]>();

  for (const e of evolutions) {
    const key = `${e.from_no}:${e.from_form_id}`;
    const list = edgesByForm.get(key) ?? [];
    list.push({
      to_no: e.to_no,
      to_form_id: e.to_form_id,
      ...(e.requires_personality ? { requires_personality: e.requires_personality } : {}),
    });
    edgesByForm.set(key, list);
  }

  const byNo = new Map<AniimoNo, Aniimo>();

  for (const row of rows) {
    let entry = byNo.get(row.no);

    if (!entry) {
      const family_id = familyByNo.get(row.no);

      if (!family_id) throw new Error(`Aniimo #${row.no} не привязан ни к одной семье`);

      entry = { no: row.no, name: row.name, family_id, forms: [] };
      byNo.set(row.no, entry);
    }
    else if (entry.name !== row.name) {
      throw new Error(`Aniimo #${row.no}: имя "${row.name}" не совпадает с ранее указанным "${entry.name}"`);
    }

    if (entry.forms.some((f) => f.form_id === row.form_id)) {
      throw new Error(`Aniimo #${row.no} (${row.name}): форма "${row.form_id}" указана дважды`);
    }

    const key = `${row.no}:${row.form_id}`;
    const evolves_to = edgesByForm.get(key) ?? [];

    entry.forms.push({
      ...(row.stage ? { stage: row.stage } : {}),
      form_id: row.form_id,
      elements: [...row.elements].sort((x, y) =>
        x.level === y.level ? compareByOrder(ELEMENT_ORDER, x.id, y.id) : y.level - x.level,
      ),
      home_abilities: [...row.home_abilities].sort((x, y) =>
        x.level === y.level ? compareByOrder(HOME_ABILITY_ORDER, x.id, y.id) : y.level - x.level,
      ),
      ...(row.fixed_personality ? { fixed_personality: row.fixed_personality } : {}),
      evolves_to,
      is_final: evolves_to.length === 0,
      ...(row.season !== undefined ? { season: row.season } : {}),
      ...(row.image ? { image: row.image } : {}),
    });
  }


  return [...byNo.values()]
    .map((a) => ({
      ...a,
      // forms: [...a.forms].sort((x, y) => x.form_id === 'base' ? -1 : y.form_id === 'base' ? 1 : x.form_id.localeCompare(y.form_id)),
    }))
    .sort((a, b) => a.no.localeCompare(b.no, undefined, { numeric: true }));
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

  // Элементы: считаем по form.elements
  const elementsWithStats: ElementWithStats[] = elements.map((el) => {
    const aniimosRef: ElementAniimoRef[] = [];
    for (const a of mergedAniimos) {
      for (const f of a.forms) {
        const match = f.elements.find((e) => e.id === el.id);
        if (match) {
          aniimosRef.push({
            no: a.no,
            name: a.name,
            form_id: f.form_id,
            level: match.level,
            element_colors: f.elements
              .map((e) => elementColorById.get(e.id))
              .filter((c): c is string => !!c),
          });
        }
      }
    }

    const facilitiesRef: ElementFacilityRef[] = [];
    for (const f of resolvedFacilities) {
      if (!f.requires_abilities.includes(el.id)) continue;
      facilitiesRef.push({
        facility_id: f.id,
        facility_name: f.name,
        copies: f.copies,
        modes: f.resolved_modes.map((m) => ({ mode_id: m.id, mode_name: m.name, required_ability_level: m.required_ability_level })),
      });
    }

    return {
      id: el.id, name: el.name, color: el.color,
      aniimo_count: aniimosRef.length, aniimos: aniimosRef,
      facility_count: facilitiesRef.length, facilities: facilitiesRef,
    };
  });

  // Способности дома: считаем по form.home_abilities (только неэлементные)
  const homeAbilitiesWithStats: HomeAbilityWithStats[] = homeAbilities.map((ab) => {
    const aniimosRef: HomeAbilityAniimoRef[] = [];
    for (const a of mergedAniimos) {
      for (const f of a.forms) {
        const match = f.home_abilities.find((ha) => ha.id === ab.id);
        if (match) {
          aniimosRef.push({
            no: a.no,
            name: a.name,
            form_id: f.form_id,
            level: match.level,
            element_colors: f.elements
              .map((e) => elementColorById.get(e.id))
              .filter((c): c is string => !!c),
          });
        }
      }
    }

    const facilitiesRef: HomeAbilityFacilityRef[] = [];
    for (const f of resolvedFacilities) {
      if (!f.requires_abilities.includes(ab.id)) continue;
      facilitiesRef.push({
        facility_id: f.id,
        facility_name: f.name,
        copies: f.copies,
        modes: f.resolved_modes.map((m) => ({ mode_id: m.id, mode_name: m.name, required_ability_level: m.required_ability_level })),
      });
    }

    return {
      id: ab.id, name: ab.name, description: ab.description, color: ab.color,
      aniimo_count: aniimosRef.length, aniimos: aniimosRef,
      facility_count: facilitiesRef.length, facilities: facilitiesRef,
    };
  });

  return { elementsWithStats, homeAbilitiesWithStats, resolvedFacilities };
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
  const { elementsWithStats, homeAbilitiesWithStats, resolvedFacilities } = computeStats(mergedAniimos, facilities);

  const rareFormIds = new Set(forms.filter((f) => f.is_rare).map((f) => f.id));
  const recommendations = computeRecommendations(mergedAniimos, resolvedFacilities, rareFormIds);

  write('elements', elementsWithStats);
  write('home-abilities', homeAbilitiesWithStats);
  write('forms', forms);
  write('families', families);
  write('facilities', resolvedFacilities);
  write('aniimos', mergedAniimos);
  write('recommendations', { forms: recommendations });

  write("meta", {
    generatedAt: new Date().toISOString(),
    categories: ['elements', 'home-abilities', 'forms', 'families', 'facilities', 'aniimos', 'recommendations'],
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
