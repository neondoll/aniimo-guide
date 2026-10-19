import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Tooltip } from '@/components/base';
import { Card } from '@/components/Card';
// import { Icon } from '@/components/Icon';
import type { FamilyId } from '@/enums/families'
import { assetUrl } from '@/lib/assets'
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';

export function AniimosPage() {
  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const homeAbilities = useHomeAbilitiesStore((s) => s.data);

  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const familyById = useMemo(() => new Map(families.map((f) => [f.id, f])), [families]);
  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const homeAbilityById = useMemo(() => new Map(homeAbilities.map((a) => [a.id, a])), [homeAbilities]);

  const byFamily = useMemo(() => {
    const map = new Map<FamilyId, typeof aniimos>();

    for (const a of aniimos) {
      const list = map.get(a.family_id) ?? [];

      list.push(a);

      map.set(a.family_id, list);
    }

    for (const list of map.values()) list.sort((x, y) => x.no.localeCompare(y.no));

    return [...map.entries()].sort(([x], [y]) => x.localeCompare(y));
  }, [aniimos]);

  return (
    <div className="p-6 mx-auto space-y-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-primary">Аниимо</h1>

      {byFamily.map(([familyId, members]) => {
        const family = familyById.get(familyId);

        return (
          <section key={familyId}>
            <div className="flex gap-3 items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">{family?.name ?? familyId}</h2>
              <Badge color="gray" size="sm">#{familyId} · {members.length} вид(ов)</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {members.map((a) => (
                <Card key={a.no} className="p-4 transition-shadow hover:shadow-md">
                  <header className="flex justify-between items-baseline mb-3">
                    <h3 className="text-lg font-semibold text-primary">
                      <Link className="transition-colors hover:text-brand-600" to={`/aniimos/${a.no}`}>
                        #{a.no} {a.name}
                      </Link>
                    </h3>

                    <Badge color="gray" size="sm">форм: {a.forms.length}</Badge>
                  </header>

                  <ul className="space-y-3">
                    {a.forms.map((f) => {
                      const formInfo = formById.get(f.form_id);

                      return (
                        <li className="flex gap-3 pl-3 border-l-2 border-gray-200" key={f.form_id}>
                          {f.image && (
                            <div className="aspect-2/3 flex overflow-hidden shrink-0 justify-center items-center w-14 bg-secondary/30 rounded-md">
                              <img alt="" className="object-contain max-w-full max-h-full" src={assetUrl(f.image)} />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap gap-2 items-center mb-1">
                              <span className="text-sm font-medium text-primary">{formInfo?.name ?? f.form_id}</span>
                              {f.is_final && <Badge color="success" size="sm">финал</Badge>}
                              {formInfo?.is_rare && <Badge color="purple" size="sm">редкий</Badge>}
                              {f.season !== undefined && <Badge color="warning" size="sm">Сезон {f.season}</Badge>}
                            </div>

                            <div className="flex flex-wrap gap-x-2 gap-y-1 items-center text-sm text-secondary">
                              <span className="text-tertiary">Элементы:</span>

                              {f.element_ids.map((id) => {
                                const el = elementById.get(id);

                                return el ? (
                                  <Tooltip key={id} title={el.name}>
                                    <span className="inline-flex gap-1 items-center">
                                      {/* <Icon src={el.icon} alt={el.name} size={16} /> */}
                                      {el.name}
                                    </span>
                                  </Tooltip>
                                ) : (
                                  <span key={id}>{id}</span>
                                );
                              })}
                            </div>

                            <div className="flex flex-wrap gap-x-2 gap-y-1 items-center text-sm text-secondary">
                              <span className="text-tertiary">Способности:</span>

                              {f.home_abilities.map((ha) => {
                                const ab = homeAbilityById.get(ha.id);

                                return ab ? (
                                  <Tooltip key={ha.id} title={`${ab.name} · уровень ${ha.level}`}>
                                    <span className="inline-flex gap-1 items-center">
                                      {/* <Icon src={ab.icon} alt={ab.name} size={16} /> */}
                                      {ab.name} ур.{ha.level}
                                    </span>
                                  </Tooltip>
                                ) : (
                                  <span key={ha.id}>{ha.id} ур.{ha.level}</span>
                                );
                              })}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
