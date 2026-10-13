import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

import { aniimos } from './aniimos.source.ts';
import type { AniimoFormSource } from './aniimos.source.ts';
import { elements } from './elements.source.ts';
import { forms } from './forms.source.ts';
import { homeAbilities } from './home-abilities.source.ts';
import type { Aniimo } from '../src/types/aniimo.type.ts';

const outputDir = path.resolve("public/data");

const AniimoHomeAbilityAssignmentSchema = z.object({
  id: z.string(),
  level: z.number().int().min(1).max(4),
});
const AniimoSchema = z.object({
  no: z.string().regex(/^\d{3}$/, 'no должен быть трёхзначным'),
  name: z.string().min(1),
  form_id: z.string(),
  element_ids: z.array(z.string()).min(1),
  home_abilities: z.array(AniimoHomeAbilityAssignmentSchema),
});
const ElementSchema = z.object({ id: z.string(), name: z.string().min(1) });
const FormSchema = z.object({ id: z.string(), name: z.string().min(1) });
const HomeAbilitySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
});

function validate() {
  z.array(AniimoSchema).parse(aniimos);
  z.array(ElementSchema).parse(elements);
  z.array(FormSchema).parse(forms);
  z.array(HomeAbilitySchema).parse(homeAbilities);

  const validElements = new Set(elements.map((e) => e.id));
  const validForms = new Set(forms.map((f) => f.id));
  const validHomeAbilities = new Set(homeAbilities.map((a) => a.id));

  for (const a of aniimos) {
    if (!validForms.has(a.form_id)) {
      throw new Error(`${a.name} (#${a.no}): неизвестная форма "${a.form_id}"`);
    }

    for (const id of a.element_ids) {
      if (!validElements.has(id)) {
        throw new Error(`${a.name} (#${a.no}): неизвестный элемент "${id}"`);
      }
    }

    const seen = new Set<string>();

    for (const ha of a.home_abilities) {
      if (!validHomeAbilities.has(ha.id)) {
        throw new Error(`${a.name} (#${a.no}): неизвестная способность дома "${ha.id}"`);
      }

      if (seen.has(ha.id)) {
        throw new Error(`${a.name} (#${a.no}): способность "${ha.id}" указана дважды`);
      }

      seen.add(ha.id);
    }
  }
}

function mergeAniimos(rows: AniimoFormSource[]): Aniimo[] {
  const byNo = new Map<string, Aniimo>();

  for (const row of rows) {
    let entry = byNo.get(row.no);

    if (!entry) {
      entry = { no: row.no, name: row.name, forms: [] };
      byNo.set(row.no, entry);
    }
    else if (entry.name !== row.name) {
      throw new Error(`Aniimo #${row.no}: имя "${row.name}" не совпадает с ранее указанным "${entry.name}"`);
    }

    if (entry.forms.some((f) => f.form_id === row.form_id)) {
      throw new Error(`Aniimo #${row.no} (${row.name}): форма "${row.form_id}" указана дважды`);
    }

    entry.forms.push({
      form_id: row.form_id,
      element_ids: row.element_ids,
      home_abilities: [...row.home_abilities].sort(
        (x, y) => y.level - x.level || x.id.localeCompare(y.id),
      ),
    });
  }

  return [...byNo.values()]
    .map((a) => ({ ...a, forms: [...a.forms].sort((x, y) => x.form_id.localeCompare(y.form_id)) }))
    .sort((a, b) => a.no.localeCompare(b.no));
}

function write(name: string, data: unknown) {
  const file = path.join(outputDir, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`✅ ${file}`);
}

function main() {
  console.log("Начинаем генерацию статических данных...");
  fs.mkdirSync(outputDir, { recursive: true });

  validate();

  const mergedAniimos = mergeAniimos(aniimos);

  write('aniimos', mergedAniimos);
  write('elements', elements);
  write('forms', forms);
  write('home-abilities', homeAbilities);
  write('meta', {
    generatedAt: new Date().toISOString(),
    categories: ['aniimos', 'elements', 'forms', 'home-abilities'],
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
