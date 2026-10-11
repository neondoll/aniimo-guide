import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

import { aniimoForms } from './aniimo-forms.source.ts';
import { aniimos } from './aniimos.source.ts';
import { elements } from './elements.source.ts';

const outputDir = path.resolve("public/data");

const AniimoFormSchema = z.object({ id: z.string(), name: z.string().min(1) });
const AniimoSchema = z.object({
  no: z.string().regex(/^\d{3}$/, 'no должен быть трёхзначным'),
  name: z.string().min(1),
  form_id: z.string(),
  element_ids: z.array(z.string()).min(1),
});
const ElementSchema = z.object({ id: z.string(), name: z.string().min(1) });

function validate() {
  z.array(AniimoFormSchema).parse(aniimoForms);
  z.array(AniimoSchema).parse(aniimos);
  z.array(ElementSchema).parse(elements);

  const validAniimoForms = new Set(aniimoForms.map((f) => f.id));
  const validElements = new Set(elements.map((e) => e.id));

  for (const a of aniimos) {
    if (!validAniimoForms.has(a.form_id)) {
      throw new Error(`${a.name} (#${a.no}): неизвестная форма "${a.form_id}"`);
    }

    for (const id of a.element_ids) {
      if (!validElements.has(id)) {
        throw new Error(`${a.name} (#${a.no}): неизвестный элемент "${id}"`);
      }
    }
  }
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

  write('aniimo-forms', aniimoForms);
  write('aniimos', aniimos);
  write('elements', elements);
  write('meta', {
    generatedAt: new Date().toISOString(),
    categories: ['aniimo-forms', 'aniimos', 'elements'],
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
