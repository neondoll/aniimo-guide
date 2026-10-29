import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { AniimoAvatar } from '@/components/AniimoAvatar.tsx'
import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import type { FamilyId } from '@/enums/families'
import { STAGE_LABELS } from '@/enums/stages';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';

export function AniimosPage() {
  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const abilities = useHomeAbilitiesStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);

  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const abilityById = useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
  const familyById = useMemo(() => new Map(families.map((f) => [f.id, f])), [families]);

  const byFamily = useMemo(() => {
    const map = new Map<FamilyId, typeof aniimos>();

    for (const a of aniimos) {
      const list = map.get(a.family_id) ?? [];
      list.push(a);
      map.set(a.family_id, list);
    }

    for (const list of map.values()) list.sort((x, y) => x.no.localeCompare(y.no, undefined, { numeric: true }));

    return [...map.entries()].sort(([x], [y]) => x.localeCompare(y, undefined, { numeric: true }));
  }, [aniimos]);

  return (
    <div className="p-6 mx-auto space-y-10 max-w-6xl">
      <h1 className="text-3xl font-bold text-primary">Анимо</h1>

      {byFamily.map(([familyId, members]) => {
        const family = familyById.get(familyId);

        return (
          <section key={familyId}>
            <div className="flex gap-3 items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">{family?.name ?? familyId}</h2>
              <Badge color="gray" size="sm">#{familyId} · {members.length} вид(ов)</Badge>
            </div>

            <div className="grid gap-4 items-start md:grid-cols-2">
              {members.map((a) => (
                <Card className="overflow-hidden divide-y divide-secondary" key={a.no}>
                  {a.forms.map((f) => {
                    const formInfo = formById.get(f.form_id);
                    const colors = f.elements
                      .map((el) => elementById.get(el.id)?.color)
                      .filter((c): c is string => !!c);

                    return (
                      <Link
                        className="block relative p-4 transition-colors hover:bg-secondary/20"
                        key={f.form_id}
                        to={`/aniimos/${a.no}-${f.form_id}`}
                      >
                        <div
                          className="absolute top-0 bottom-0 left-0 w-1"
                          style={{ backgroundColor: elementById.get(f.elements[0]?.id)?.color ?? '#ccc' }}
                        />

                        <div className="flex gap-4 items-start">
                          <AniimoAvatar colors={colors} name={a.name} size="md" />

                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="flex flex-wrap gap-2 items-baseline">
                              <h3 className="text-lg font-bold text-primary">#{a.no} {a.name}</h3>
                              <span className="text-sm font-medium text-tertiary">({formInfo?.name ?? f.form_id})</span>
                              {f.is_final && <Badge color="success" size="sm">Финал</Badge>}
                              {formInfo?.is_rare && <Badge color="purple" size="sm">Редкий</Badge>}
                              {f.season !== undefined && <Badge color="warning" size="sm">Сезон {f.season}</Badge>}
                              {f.stage && <Badge color="gray" size="sm">{STAGE_LABELS[f.stage]}</Badge>}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {f.elements.map((el) => (
                                <ElementBadge
                                  color={elementById.get(el.id)?.color}
                                  key={el.id}
                                  level={el.level}
                                  name={elementById.get(el.id)?.name ?? el.id}
                                />
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {f.home_abilities.map((ha) => (
                                <ElementBadge
                                  color={abilityById.get(ha.id)?.color}
                                  key={ha.id}
                                  level={ha.level}
                                  name={abilityById.get(ha.id)?.name ?? ha.id}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
