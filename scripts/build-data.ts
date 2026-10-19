import * as fs from "fs";
import * as path from "path";
import { z } from "zod";

import { type AniimoFormSource, aniimos } from "./aniimos.source.ts";
import { elements } from "./elements.source.ts";
import { evolutions } from "./evolutions.source.ts";
import { facilities } from "./facilities.source.ts";
import { families } from "./families.source.ts";
import { forms } from "./forms.source.ts";
import { homeAbilities } from "./home-abilities.source.ts";
import { buildRecommendations } from "./recommendations/build.ts";
import type { AniimoNo } from "../src/enums/aniimos.ts";
import { ElementOrder } from "../src/enums/elements.ts";
import type { FamilyId } from "../src/enums/families.ts";
import { HomeAbilityOrder } from "../src/enums/home-abilities.ts";
import type { Aniimo, AniimoForm } from "../src/types/aniimo.ts";
import { compareByOrder } from "../src/utils/sorting.ts";

const ID_REGEX = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;
const OUTPUT_DIR = path.resolve("public/data");

/* ───────────────────────── Zod-схемы ───────────────────────── */

const ElementSchema = z.object({ id: z.string(), name: z.string().min(1) });
const FormSchema = z.object({ id: z.string(), name: z.string().min(1), is_rare: z.boolean().optional() });
const HomeAbilitySchema = z.object({ id: z.string(), name: z.string().min(1), description: z.string().optional() });
const HomeAbilityAssignmentSchema = z.object({ id: z.string(), level: z.number().int().min(1).max(4) });
const PartialPersonalitySchema = z.object({
  EI: z.enum(["E", "I"]).optional(),
  SN: z.enum(["S", "N"]).optional(),
  TF: z.enum(["T", "F"]).optional(),
  JP: z.enum(["J", "P"]).optional(),
}).strict();
const AniimoSourceSchema = z.object({
  no: z.string().regex(ID_REGEX),
  name: z.string().min(1),
  form_id: z.string(),
  element_ids: z.array(z.string()).min(1),
  home_abilities: z.array(HomeAbilityAssignmentSchema),
  image: z.string().optional(),
  season: z.number().int().min(1).optional(),
  fixed_personality: PartialPersonalitySchema.optional(),
});
const FamilySchema = z.object({
  id: z.string().regex(ID_REGEX),
  name: z.string().min(1),
  member_nos: z.array(z.string().regex(ID_REGEX)).min(1),
});
const FacilitySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["material_production", "material_processing", "item_production", "utility", "aniimo_objects"]),
  requires_abilities: z.array(z.string()),
  requires_families: z.array(z.string()),
  required_ability_level: z.number().int().min(0),
  preferred_personality: PartialPersonalitySchema.optional(),
  is_speed_capped: z.boolean().optional(),
  copies: z.number().int().min(0),
  dedication: z.enum(["dedicated", "flexible", "shared", "none"]),
});
const EvolutionSchema = z.object({
  from_no: z.string().regex(ID_REGEX),
  from_form_id: z.string(),
  to_no: z.string().regex(ID_REGEX),
  to_form_id: z.string(),
  requires_personality: PartialPersonalitySchema.optional(),
});

/* ───────────────────────── Валидация ───────────────────────── */

function validate() {
  z.array(ElementSchema).parse(elements);
  z.array(FormSchema).parse(forms);
  z.array(HomeAbilitySchema).parse(homeAbilities);
  z.array(AniimoSourceSchema).parse(aniimos);
  z.array(FamilySchema).parse(families);
  z.array(FacilitySchema).parse(facilities);
  z.array(EvolutionSchema).parse(evolutions);

  const elementIds = new Set(elements.map((e) => e.id));
  const formIds = new Set(forms.map((f) => f.id));
  const homeAbilityIds = new Set(homeAbilities.map((ha) => ha.id));

  // 1. Анимо: ссылочная целостность + отсутствие дубликатов способностей
  for (const a of aniimos) {
    if (!formIds.has(a.form_id)) throw new Error(`${a.name} (#${a.no}): неизвестная форма "${a.form_id}"`);

    for (const id of a.element_ids) {
      if (!elementIds.has(id)) throw new Error(`${a.name} (#${a.no}): неизвестный элемент "${id}"`);
    }

    const seen = new Set<string>();

    for (const ha of a.home_abilities) {
      if (!homeAbilityIds.has(ha.id)) throw new Error(`${a.name} (#${a.no}): неизвестная способность дома "${ha.id}"`);

      if (seen.has(ha.id)) throw new Error(`${a.name} (#${a.no}): способность "${ha.id}" указана дважды`);

      seen.add(ha.id);
    }
  }

  // 2. Семьи: непустые, участники существуют, каждый анимо — ровно в одной семье
  const aniimoNameByNo = new Map<AniimoNo, string>();
  const aniimoNos = new Set(aniimos.map((a) => a.no));
  const memberToFamily = new Map<AniimoNo, FamilyId>();

  for (const a of aniimos) aniimoNameByNo.set(a.no, a.name);

  for (const fam of families) {
    if (fam.member_nos.length === 0) throw new Error(`Семья ${fam.id}: пустой member_nos`);

    for (const no of fam.member_nos) {
      if (!aniimoNos.has(no)) throw new Error(`Семья ${fam.id}: неизвестный участник #${no}`);

      if (memberToFamily.has(no)) {
        throw new Error(`Анимо #${no} указан в нескольких семьях: ${memberToFamily.get(no)} и ${fam.id}`);
      }

      memberToFamily.set(no, fam.id);
    }

    // имя семьи = имя младшего (min member_nos)
    const minNo = [...fam.member_nos].sort()[0];

    if (fam.id !== minNo) throw new Error(`Семья ${fam.id}: id должен совпадать с младшим номером (${minNo})`);

    if (fam.name !== aniimoNameByNo.get(minNo)) {
      throw new Error(`Семья ${fam.id}: имя "${fam.name}" не совпадает с именем анимо #${minNo} ("${aniimoNameByNo.get(minNo)}")`);
    }
  }

  for (const no of aniimoNos) {
    if (!memberToFamily.has(no)) throw new Error(`Анимо #${no} не принадлежит ни одной семье`);
  }

  // 3. Эволюции: ссылочная целостность, нет петель и циклов
  const formKeys = new Set(aniimos.map((a) => `${a.no}:${a.form_id}`));
  const adj = new Map<string, string[]>();

  for (const e of evolutions) {
    const from = `${e.from_no}:${e.from_form_id}`;
    const to = `${e.to_no}:${e.to_form_id}`;

    if (!formKeys.has(from)) throw new Error(`Эволюция из несуществующей формы ${from}`);

    if (!formKeys.has(to)) throw new Error(`Эволюция в несуществующую форму ${to}`);

    if (from === to) throw new Error(`Петля на ${from}`);

    if (!adj.has(from)) {
      adj.set(from, []);
    }

    adj.get(from)!.push(to);
  }

  const formsByKey = new Map(aniimos.map((a) => [`${a.no}:${a.form_id}`, a]));

  for (const e of evolutions) {
    if (!e.requires_personality) continue;

    const target = formsByKey.get(`${e.to_no}:${e.to_form_id}`);

    if (!target) continue; // уже отловлено выше

    const fixed = target.fixed_personality;

    if (!fixed) {
      throw new Error(
        `Эволюция в #${e.to_no}:${e.to_form_id} требует характер, но у целевой формы нет fixed_personality`,
      );
    }

    for (const [axis, side] of Object.entries(e.requires_personality)) {
      if (fixed[axis as keyof typeof fixed] !== side) {
        throw new Error(
          `Эволюция в #${e.to_no}:${e.to_form_id}: requires_personality.${axis}=${side} не совпадает с fixed_personality.${axis}=${fixed[axis as keyof typeof fixed]}`,
        );
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

  // 4. Строения: способность существует; если указано семейство, у всех членов есть способность
  const byNo = new Map<AniimoNo, AniimoFormSource[]>();

  for (const a of aniimos) {
    const list = byNo.get(a.no) ?? [];
    list.push(a);
    byNo.set(a.no, list);
  }

  for (const f of facilities) {
    // способности существуют
    for (const a of f.requires_abilities) {
      if (!homeAbilityIds.has(a)) throw new Error(`Facility ${f.id}: неизвестная способность "${a}"`);
    }

    // семейства существуют
    for (const famId of f.requires_families) {
      if (!families.some((fam) => fam.id === famId)) {
        throw new Error(`Facility ${f.id}: неизвестное семейство "${famId}"`);
      }
    }

    // если есть семейное ограничение — все члены всех этих семейств
    // должны покрывать ВСЕ требуемые способности (хотя бы какая-то из их форм)
    if (f.requires_families.length > 0) {
      for (const famId of f.requires_families) {
        const fam = families.find((x) => x.id === famId)!;

        for (const ability of f.requires_abilities) {
          const ok = fam.member_nos.some((no) =>
            (byNo.get(no) ?? []).some((form) =>
              form.home_abilities.some((ha) => ha.id === ability),
            ),
          );

          if (!ok) {
            throw new Error(`Facility ${f.id}: семейство ${famId} не может покрыть способность "${ability}"`);
          }
        }
      }
    }
  }
}

/* ───────────────────────── Merge аниимо ───────────────────────── */

function mergeAniimos(rows: AniimoFormSource[], familiesList: typeof families): Aniimo[] {
  const familyByNo = new Map<AniimoNo, FamilyId>();

  for (const fam of familiesList) {
    for (const no of fam.member_nos) familyByNo.set(no, fam.id);
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
      form_id: row.form_id,
      element_ids: row.element_ids,
      home_abilities: [...row.home_abilities].sort((x, y) => compareByOrder(HomeAbilityOrder, x.id, y.id)),
      evolves_to,
      is_final: evolves_to.length === 0,
      ...(row.image ? { image: row.image } : {}),
      ...(row.season !== undefined ? { season: row.season } : {}),
      ...(row.fixed_personality ? { fixed_personality: row.fixed_personality } : {}),
      ...(row.unique_group ? { unique_group: row.unique_group } : {}),
    });
  }

  return [...byNo.values()]
    .map((a) => ({
      ...a,
      forms: [...a.forms].sort((x, y) => x.form_id.localeCompare(y.form_id)),
    }))
    .sort((a, b) => a.no.localeCompare(b.no));
}

/* ───────────────────────── Запись ───────────────────────── */

function write(name: string, data: unknown) {
  const file = path.join(OUTPUT_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`✅ ${file}`);
}

function main() {
  console.log("Начинаем генерацию статических данных...");
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  validate();

  const mergedAniimos = mergeAniimos(aniimos, families);
  const rareFormIds = new Set(forms.filter((f) => f.is_rare).map((f) => f.id));
  const recommendations = buildRecommendations({ aniimos: mergedAniimos, facilities, rareFormIds });

  write("aniimos", mergedAniimos);
  write("elements", [...elements].sort((a, b) => compareByOrder(ElementOrder, a.id, b.id)));
  write("facilities", facilities);
  write("families", families);
  write("forms", forms);
  write("home-abilities", [...homeAbilities].sort((a, b) => compareByOrder(HomeAbilityOrder, a.id, b.id)));
  write("recommendations", recommendations);
  write("meta", {
    generatedAt: new Date().toISOString(),
    categories: ["aniimos", "elements", "facilities", "families", "forms", "home-abilities", "recommendations"],
  });

  console.log(
    `Готово. Аниимо: ${mergedAniimos.length}, ` +
    `форм: ${mergedAniimos.reduce((s, a) => s + a.forms.length, 0)}, ` +
    `рекомендаций: ${Object.keys(recommendations.forms).length}.`,
  );
}

try {
  main();
}
catch (e) {
  console.error("❌", e);
  process.exit(1);
}
