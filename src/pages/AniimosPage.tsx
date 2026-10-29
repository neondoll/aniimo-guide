import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { Badge } from '@/components/base/badges/badges';
import { ElementBadge } from '@/components/ElementBadge';
import { AniimoAvatar } from '@/components/AniimoAvatar';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomelandAbilitiesStore } from '@/store/homeland-abilities.store';
import { useFamiliesStore } from '@/store/families.store';
import { useRegionsStore } from '@/store/regions.store';
import { STAGE_LABELS } from '@/enums/stages';
import type { Aniimo, AniimoForm } from '@/types/aniimo';

export function AniimosPage() {
  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const abilities = useHomelandAbilitiesStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const regionsData = useRegionsStore((s) => s.data);

  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const abilityById = useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
  const familyById = useMemo(() => new Map(families.map((f) => [`${f.region}:${f.id}`, f])), [families]);

  const grouped = useMemo(() => {
    const byRegion = new Map<string, Map<string, { aniimo: Aniimo; forms: AniimoForm[] }>>();

    for (const a of aniimos) {
      for (const f of a.forms) {
        const region: string = f.region ?? a.region;
        let perAniimo = byRegion.get(region);
        if (!perAniimo) {
          perAniimo = new Map();
          byRegion.set(region, perAniimo);
        }
        let group = perAniimo.get(a.no);
        if (!group) {
          group = { aniimo: a, forms: [] };
          perAniimo.set(a.no, group);
        }
        group.forms.push(f);
      }
    }

    const regionOrder = new Map<string, number>(regionsData.map((r) => [r.id, r.order]));

    return [...byRegion.entries()]
      .sort(([a], [b]) => (regionOrder.get(a) ?? 0) - (regionOrder.get(b) ?? 0))
      .map(([regionId, perAniimo]) => ({
        region: regionsData.find((r) => r.id === regionId)!,
        members: [...perAniimo.values()].sort((a, b) =>
          a.aniimo.no.localeCompare(b.aniimo.no, undefined, { numeric: true }),
        ),
      }));
  }, [aniimos, regionsData]);

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary">Анимо</h1>

      {grouped.map(({ region, members }) => (
        <section key={region.id}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-primary">{region.name}</h2>
            <Badge color="gray" size="sm">{members.length} вид(ов)</Badge>
          </div>

          {/* Одна колонка анимо: каждый анимо — отдельная строка */}
          <div className="space-y-4">
            {members.map(({ aniimo, forms }) => {
              const family = familyById.get(aniimo.family_id);
              const isCrossRegion = region.id !== aniimo.region;

              return (
                <Card key={aniimo.no} className="p-4">
                  <header className="flex items-baseline gap-2 flex-wrap mb-3">
                    <h3 className="text-lg font-bold text-primary">#{aniimo.no} {aniimo.name}</h3>
                    {family && (
                      <span className="text-xs text-tertiary">
                        {isCrossRegion ? `Из семьи «${family.name}»` : `Семья «${family.name}»`}
                      </span>
                    )}
                  </header>

                  {/* Формы — сеткой, 1–3 в ряд */}
                  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {forms.map((f) => {
                      const formInfo = formById.get(f.form);
                      const colors = f.elements
                        .map((el) => elementById.get(el.id)?.color)
                        .filter((c): c is string => !!c);
                      const link = `/aniimos/${f.region ?? aniimo.region}/${aniimo.no}-${f.form}`;

                      return (
                        <Link
                          key={f.form}
                          to={link}
                          className="block rounded-lg border border-secondary p-3 hover:bg-secondary/20 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <AniimoAvatar name={aniimo.name} colors={colors} size="md" />

                            <div className="flex-1 space-y-2 min-w-0">
                              <div className="text-sm font-semibold text-primary">
                                {formInfo?.name ?? f.form}
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {f.is_final && <Badge color="success" size="sm">Финал</Badge>}
                                {formInfo?.is_rare && <Badge color="purple" size="sm">Редкий</Badge>}
                                {f.season !== undefined && (
                                  <Badge color="warning" size="sm">Сезон {f.season}</Badge>
                                )}
                                {f.stage && (
                                  <Badge color="gray" size="sm">{STAGE_LABELS[f.stage]}</Badge>
                                )}
                              </div>

                              {f.elements.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {f.elements.map((el) => (
                                    <ElementBadge
                                      key={el.id}
                                      name={elementById.get(el.id)?.name ?? el.id}
                                      color={elementById.get(el.id)?.color}
                                      level={el.level}
                                    />
                                  ))}
                                </div>
                              )}

                              {f.home_abilities.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {f.home_abilities.map((ha) => (
                                    <ElementBadge
                                      key={ha.id}
                                      name={abilityById.get(ha.id)?.name ?? ha.id}
                                      color={abilityById.get(ha.id)?.color}
                                      level={ha.level}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
