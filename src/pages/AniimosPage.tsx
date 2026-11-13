import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AniimoAvatar } from '@/components/AniimoAvatar';
import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import type { ElementId } from '@/enums/elements'
import { STAGE_LABELS } from '@/enums/stages';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomelandAbilitiesStore } from '@/store/homeland-abilities.store';
import { useRegionsStore } from '@/store/regions.store';
import type { Aniimo, AniimoForm } from '@/types/aniimo';
import { cx } from '@/utils/cx';

export function AniimosPage() {
  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const abilities = useHomelandAbilitiesStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const regionsData = useRegionsStore((s) => s.data);

  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [selectedElements, setSelectedElements] = useState<Set<ElementId>>(new Set());
  const [onlyFinal, setOnlyFinal] = useState(false);
  const [onlySeasonal, setOnlySeasonal] = useState(false);

  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const abilityById = useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
  const familyById = useMemo(() => new Map(families.map((f) => [`${f.region}:${f.id}`, f])), [families]);

  const toggleElement = (id: ElementId) => {
    setSelectedElements((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Фильтрация форм перед группировкой
  const filteredByRegion = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = new Map<string, Map<string, { aniimo: Aniimo; forms: AniimoForm[] }>>();

    for (const a of aniimos) {
      // Регион-фильтр применяем к эффективному региону формы
      for (const f of a.forms) {
        const effRegion = f.region ?? a.region;
        if (regionFilter !== 'all' && effRegion !== regionFilter) continue;

        // Поиск по имени/номеру
        if (q && !`${a.no} ${a.name}`.toLowerCase().includes(q)) continue;

        // Фильтр по элементам (все выбранные должны присутствовать)
        if (selectedElements.size > 0) {
          const formEls = new Set(f.elements.map((e) => e.id));
          let ok = true;
          for (const needed of selectedElements) if (!formEls.has(needed)) {
            ok = false;
            break;
          }
          if (!ok) continue;
        }

        if (onlyFinal && !f.is_final) continue;
        if (onlySeasonal && f.season === undefined) continue;

        let perAniimo = result.get(effRegion);
        if (!perAniimo) {
          perAniimo = new Map();
          result.set(effRegion, perAniimo);
        }
        let group = perAniimo.get(a.no);
        if (!group) {
          group = { aniimo: a, forms: [] };
          perAniimo.set(a.no, group);
        }
        group.forms.push(f);
      }
    }

    return result;
  }, [aniimos, query, regionFilter, selectedElements, onlyFinal, onlySeasonal]);

  const grouped = useMemo(() => {
    const regionOrder = new Map<string, number>(regionsData.map((r) => [r.id, r.order]));
    return [...filteredByRegion.entries()]
      .sort(([a], [b]) => (regionOrder.get(a) ?? 0) - (regionOrder.get(b) ?? 0))
      .map(([regionId, perAniimo]) => ({
        region: regionsData.find((r) => r.id === regionId)!,
        members: [...perAniimo.values()].sort((a, b) =>
          a.aniimo.no.localeCompare(b.aniimo.no, undefined, { numeric: true }),
        ),
      }))
      .filter((g) => g.region && g.members.length > 0);
  }, [filteredByRegion, regionsData]);

  const totalVisible = grouped.reduce(
    (sum, g) => sum + g.members.reduce((s, m) => s + m.forms.length, 0),
    0,
  );

  const hasFilters =
    query !== '' ||
    regionFilter !== 'all' ||
    selectedElements.size > 0 ||
    onlyFinal ||
    onlySeasonal;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary">Анимо</h1>

      {/* Панель фильтров */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Поиск по имени или номеру…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-50 rounded-md border border-secondary bg-primary px-3 py-2 text-sm focus:outline-brand"
          />

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="rounded-md border border-secondary bg-primary px-3 py-2 text-sm"
          >
            <option value="all">Все регионы</option>
            {regionsData.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <label className="flex items-center gap-1.5 text-sm text-secondary">
            <input type="checkbox" checked={onlyFinal} onChange={(e) => setOnlyFinal(e.target.checked)} />
            только финальные
          </label>

          <label className="flex items-center gap-1.5 text-sm text-secondary">
            <input type="checkbox" checked={onlySeasonal} onChange={(e) => setOnlySeasonal(e.target.checked)} />
            только сезонные
          </label>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setRegionFilter('all');
                setSelectedElements(new Set());
                setOnlyFinal(false);
                setOnlySeasonal(false);
              }}
              className="text-xs text-tertiary hover:text-primary"
            >
              сбросить
            </button>
          )}
        </div>

        {/* Фильтр по элементам */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-tertiary">Элементы:</span>
          {elements.map((el) => {
            const active = selectedElements.has(el.id);
            return (
              <button
                key={el.id}
                type="button"
                onClick={() => toggleElement(el.id)}
                className={cx(
                  'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
                  active ? 'border-transparent text-white' : 'border-secondary text-secondary',
                )}
                style={active
                  ? { backgroundColor: el.color, borderColor: el.color }
                  : { backgroundColor: `${el.color}15`, borderColor: `${el.color}40`, color: el.color }}
              >
                <span className="size-1.5 rounded-full" style={{ backgroundColor: el.color }} />
                {el.name}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-tertiary">
          Показано: <span className="font-semibold text-primary">{totalVisible}</span> форм
          {hasFilters && <span> · фильтры применены</span>}
        </div>
      </Card>

      {grouped.length === 0 && (
        <p className="text-center text-tertiary py-10">Ничего не найдено. Попробуйте убрать фильтры.</p>
      )}

      {grouped.map(({ region, members }) => (
        <section key={region.id}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-primary">{region.name}</h2>
            <Badge color="gray" size="sm">{members.length} вид(ов)</Badge>
          </div>

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
                                {f.season !== undefined && <Badge color="warning" size="sm">Сезон {f.season}</Badge>}
                                {aniimo.stage && <Badge color="gray" size="sm">{STAGE_LABELS[aniimo.stage]}</Badge>}
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
