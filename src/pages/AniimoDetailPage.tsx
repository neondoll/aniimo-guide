import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AniimoAvatar } from '@/components/AniimoAvatar';
import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { SimpleTabs, type TabItem } from '@/components/SimpleTabs';
import { TraitAxisPills, RequiredPersonalityPills, PreferredPersonalityPills } from '@/components/TraitAxisPills';
import { PERSONALITY_LABELS, type PersonalitySide } from '@/constants/personality-labels';
import type { FormId } from '@/enums/forms'
import { STAGE_LABELS } from '@/enums/stages';
import { rankBranches } from '@/lib/personalityScore';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomelandAbilitiesStore } from '@/store/homeland-abilities.store';
import { useRecommendationsStore } from '@/store/recommendations.store';
import type { Aniimo } from '@/types/aniimo';
import type { Form } from '@/types/form';
import type { Personality } from '@/types/personality';
import type { ElementId } from '@/enums/elements.ts'
import type { HomelandAbilityId } from '@/enums/homeland-abilities.ts'

function parseSlug(slug?: string) {
  if (!slug) return { no: '' };

  const idx = slug.lastIndexOf('-');

  return idx === -1 ? { no: slug } : { no: slug.slice(0, idx), form: slug.slice(idx + 1) as FormId };
}

/* ───────────── Путь эволюции ───────────── */

interface EvolutionStep {
  region: string;
  no: string;
  form: string;
  name: string;
  form_name: string;
}

interface EvolutionPath {
  ancestors: EvolutionStep[];
  descendants: EvolutionStep[];
}

/**
 * Строит обратный индекс: (region:no:form целевой) → (region:no:form источника).
 * В модели эволюции не сливаются, поэтому у каждой формы максимум один родитель.
 */
function buildReverseEdges(aniimos: Aniimo[]): Map<string, string> {
  const reverse = new Map<string, string>();

  for (const a of aniimos) {
    for (const f of a.forms) {
      const fromRegion = f.region ?? a.region;
      const fromKey = `${fromRegion}:${a.no}:${f.form}`;

      for (const edge of f.evolves_to) {
        const toRegion = edge.to_region ?? a.region;
        const toKey = `${toRegion}:${edge.to_no}:${edge.to_form}`;

        if (!reverse.has(toKey)) reverse.set(toKey, fromKey);
      }
    }
  }

  return reverse;
}

function stepFromKey(
  key: string,
  aniimoByRegionNo: Map<string, Aniimo>,
  formById: Map<string, Form>,
): EvolutionStep | null {
  const [region, no, form] = key.split(':');
  const aniimo = aniimoByRegionNo.get(`${region}:${no}`);

  if (!aniimo) return null;

  return { region, no, form, name: aniimo.name, form_name: formById.get(form)?.name ?? form };
}

function buildEvolutionPath(
  currentKey: string,
  reverse: Map<string, string>,
  aniimoByRegionNo: Map<string, Aniimo>,
  formById: Map<string, Form>,
): EvolutionPath {
  const ancestors: EvolutionStep[] = [];

  let cursor: string | undefined = reverse.get(currentKey);

  const visited = new Set<string>([currentKey]);

  while (cursor && !visited.has(cursor)) {
    visited.add(cursor);

    const step = stepFromKey(cursor, aniimoByRegionNo, formById);

    if (step) ancestors.unshift(step); // вставляем в начало — от базовой к текущей

    cursor = reverse.get(cursor);
  }

  return { ancestors, descendants: [] };
}

/* ───────────── Страница ───────────── */

export function AniimoDetailPage() {
  const { region, slug } = useParams<{ region: string; slug: string }>();
  const navigate = useNavigate();

  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const abilities = useHomelandAbilitiesStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const recommendations = useRecommendationsStore((s) => s.data.forms);

  const [personality, setPersonality] = useState<Partial<Personality>>({});

  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const formById = useMemo(() => {
    const map = new Map<string, Form>();
    for (const f of forms) map.set(f.id, f);
    return map;
  }, [forms]);
  const abilityById = useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
  const familyById = useMemo(() => new Map(families.map((f) => [`${f.region}:${f.id}`, f])), [families]);

  // Правильная карта: ключ `region:no`
  const aniimoByRegionNo = useMemo(() => {
    const map = new Map<string, Aniimo>();
    for (const a of aniimos) map.set(`${a.region}:${a.no}`, a);
    return map;
  }, [aniimos]);

  const reverseEdges = useMemo(() => buildReverseEdges(aniimos), [aniimos]);

  const { no, form: formFromUrl } = useMemo(() => parseSlug(slug), [slug]);
  const aniimo = aniimoByRegionNo.get(`${region}:${no}`);

  const availableForms = useMemo(() => {
    if (!aniimo) return [];
    return aniimo.forms.filter((f) => (f.region ?? aniimo.region) === region);
  }, [aniimo, region]);

  const activeFormId = useMemo(() => {
    if (availableForms.length === 0) return '';
    const ids = new Set(availableForms.map((f) => f.form));
    if (formFromUrl && ids.has(formFromUrl)) return formFromUrl;
    return availableForms.find((f) => f.form === 'basic')?.form ?? availableForms[0].form;
  }, [availableForms, formFromUrl]);

  const handleTabChange = (id: string) => {
    if (aniimo) navigate(`/aniimos/${region}/${aniimo.no}-${id}`, { replace: true });
  };

  if (!aniimo) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-secondary">Анимо #{no} в регионе {region} не найден.</p>
        <Link to="/aniimos" className="text-brand-600 hover:underline">← к списку</Link>
      </div>
    );
  }

  const family = familyById.get(aniimo.family_id);
  const sortedForms = [...availableForms].sort((x, y) =>
    x.form === 'basic' ? -1 : y.form === 'basic' ? 1 : x.form.localeCompare(y.form),
  );

  const tabs: TabItem[] = sortedForms.map((form) => {
    const rec = recommendations[`${region}:${aniimo.no}:${form.form}`];
    const branches = rec ? rankBranches(personality, rec.evolution_branches) : [];
    const formName = formById.get(form.form)?.name ?? form.form;
    const colors = form.elements
      .map((el) => elementById.get(el.id)?.color)
      .filter((c): c is string => !!c);

    // Путь эволюции
    const currentKey = `${region}:${aniimo.no}:${form.form}`;
    const path = buildEvolutionPath(currentKey, reverseEdges, aniimoByRegionNo, formById);

    return {
      id: form.form,
      label: formName,
      badge: form.is_final ? 'финал' : undefined,
      content: (
        <Card className="relative overflow-hidden p-5 space-y-5">
          <div className="absolute -right-4 -top-6 text-8xl font-black text-secondary/5 pointer-events-none select-none uppercase">
            {aniimo.name}
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <AniimoAvatar name={aniimo.name} colors={colors} size="lg" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-2xl font-bold text-primary">{formName}</h2>
              {form.is_final && <Badge color="success">Финал</Badge>}
              {formById.get(form.form)?.is_rare && <Badge color="purple">Редкий</Badge>}
              {form.season !== undefined && <Badge color="warning">Сезон {form.season}</Badge>}
              {aniimo.stage && <Badge color="gray">{STAGE_LABELS[aniimo.stage]}</Badge>}
              {rec && rec.recommended_count > 0 && (
                <Badge color="brand">{rec.recommended_count} копий</Badge>
              )}
            </div>
          </div>

          {/* Путь эволюции */}
          {(path.ancestors.length > 0 || branches.length > 0) && (
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Путь эволюции</div>
              <div className="flex flex-wrap items-center gap-1.5 text-sm">
                {path.ancestors.map((step) => (
                  <span key={`${step.region}:${step.no}:${step.form}`} className="flex items-center gap-1.5">
                    <Link
                      to={`/aniimos/${step.region}/${step.no}-${step.form}`}
                      className="rounded border border-secondary bg-secondary/30 px-2 py-0.5 hover:bg-secondary/50"
                      title={`${step.form_name}`}
                    >
                      #{step.no} {step.name}
                    </Link>
                    <span className="text-tertiary">→</span>
                  </span>
                ))}
                <span className="rounded bg-brand-100 text-brand-800 px-2 py-0.5 font-semibold">
                  #{aniimo.no} {aniimo.name}
                  <span className="ml-1 font-normal text-brand-700/80">({formName})</span>
                </span>
                {branches.length > 0 && (
                  <>
                    <span className="text-tertiary">→</span>
                    {branches.map((b, i) => {
                      const targetKey = `${b.to_region ?? region}:${b.to_no}`;
                      const target = aniimoByRegionNo.get(targetKey);
                      const targetFormName = formById.get(b.to_form)?.name ?? b.to_form;
                      const locked = !b.available && !b.unknown;
                      return (
                        <span key={`${b.to_no}:${b.to_form}`} className="flex items-center gap-1.5">
                          {i > 0 && <span className="text-tertiary">/</span>}
                          <Link
                            to={`/aniimos/${b.to_region ?? region}/${b.to_no}-${b.to_form}`}
                            className={`rounded border px-2 py-0.5 ${
                              locked
                                ? 'border-secondary bg-secondary/20 text-tertiary'
                                : 'border-secondary bg-secondary/30 hover:bg-secondary/50'
                            }`}
                            title={targetFormName}
                          >
                            #{b.to_no} {target?.name ?? b.to_no}
                          </Link>
                        </span>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}

          <div className="relative z-10 grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Элементы</div>
              <div className="flex flex-wrap gap-2">
                {form.elements.map((el) => (
                  <ElementBadge
                    key={el.id}
                    size="md"
                    name={elementById.get(el.id)?.name ?? el.id}
                    color={elementById.get(el.id)?.color}
                    level={el.level}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Способности дома</div>
              <div className="flex flex-wrap gap-2">
                {form.home_abilities.map((ha) => (
                  <ElementBadge
                    key={ha.id}
                    size="md"
                    name={abilityById.get(ha.id)?.name ?? ha.id}
                    color={abilityById.get(ha.id)?.color}
                    level={ha.level}
                  />
                ))}
              </div>
            </div>
          </div>

          {rec?.fixed_personality && (
            <div className="relative z-10">
              <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Фиксированные черты</div>
              <TraitAxisPills fixed={rec.fixed_personality} fixedOnly />
            </div>
          )}

          <div className="relative z-10">
            <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Рекомендуемые черты</div>
            <TraitAxisPills traits={rec?.traits} fixed={rec?.fixed_personality} />
          </div>

          <div className="relative z-10">
            <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Строения</div>
            {rec && rec.facility_matches.length > 0 ? (
              <ul className="space-y-3">
                {rec.facility_matches.map((m) => (
                  <li
                    key={`${m.facility_id}:${m.mode_id}`}
                    className="flex flex-wrap items-center gap-2 text-sm text-secondary bg-secondary/20 p-2 rounded"
                  >
                    <span className="font-medium text-primary">{m.facility_name}</span>
                    {m.mode_name !== 'По умолчанию' && <Badge color="sky" size="sm">{m.mode_name}</Badge>}
                    <span className="text-xs text-tertiary">
                      ({m.copies} коп.
                      {m.estimated_aniimo_count > 0 && ` · нужно ${m.estimated_aniimo_count}`}
                      {' · ур.'}{m.required_ability_level})
                    </span>
                    {m.is_speed_capped && <Badge color="gray" size="sm">max</Badge>}
                    {m.preferred_personality && <PreferredPersonalityPills personality={m.preferred_personality} />}
                    <span className="text-tertiary">·</span>
                    {m.covered_ability_ids.map((id) => {
                      const ab = elementById.get(id as ElementId) || abilityById.get(id as HomelandAbilityId);
                      return <ElementBadge
                        key={id}
                        name={ab?.name ?? id}
                        color={ab?.color}
                        level={m.max_ability_level}
                      />;
                    })}
                  </li>
                ))}
              </ul>
            ) : <span className="text-tertiary text-sm">—</span>}
          </div>

          <div className="relative z-10">
            <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Эволюция</div>
            {branches.length === 0 ? (
              <span className="text-tertiary text-sm">финальная форма</span>
            ) : (
              <ul className="space-y-2">
                {branches.map((b) => {
                  const targetKey = `${b.to_region ?? region}:${b.to_no}`;
                  const target = aniimoByRegionNo.get(targetKey);
                  const targetFormName = formById.get(b.to_form)?.name ?? b.to_form;
                  const locked = !b.available && !b.unknown;

                  return (
                    <li
                      key={`${b.to_no}:${b.to_form}`}
                      className={`flex flex-wrap items-center gap-2 text-sm ${locked ? 'opacity-50' : ''} ${
                        b.recommended ? 'font-bold text-emerald-700' : 'text-secondary'
                      }`}
                    >
                      <span className="text-tertiary">{locked ? '🔒' : '→'}</span>
                      <Link
                        to={`/aniimos/${b.to_region ?? region}/${b.to_no}-${b.to_form}`}
                        className="hover:underline"
                      >
                        #{b.to_no} {target?.name ?? b.to_no}
                      </Link>
                      <span>({targetFormName})</span>
                      {b.requires_personality && <RequiredPersonalityPills personality={b.requires_personality} />}
                      {locked && <span className="text-xs text-red-600">не подходит характер</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="relative z-10">
            <div className="text-xs uppercase tracking-wide text-tertiary mb-2">Апгрейд (кто лучше по способностям)
            </div>
            {rec && rec.upgrade_suggestions.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {rec.upgrade_suggestions.map((u) => {
                  const ab = elementById.get(u.ability_id as ElementId) || abilityById.get(u.ability_id as HomelandAbilityId);
                  return (
                    <li key={u.ability_id} className="flex flex-wrap items-center gap-2">
                      <ElementBadge name={ab?.name ?? u.ability_id} color={ab?.color} level={u.current_level} />
                      <span className="text-tertiary">→ лучше:</span>
                      {u.better_forms.slice(0, 3).map((b, i) => {
                        const target = aniimoByRegionNo.get(`${b.region}:${b.no}`);
                        return (
                          <span key={`${b.region}:${b.no}:${b.form}`}>
                            {i > 0 && ', '}
                            <Link
                              to={`/aniimos/${b.region}/${b.no}-${b.form}`}
                              className="hover:underline text-brand-600"
                            >
                              #{b.no} {target?.name ?? b.no}
                            </Link>{' '}
                            <span className="text-tertiary">({b.level})</span>
                            {b.is_rare && <span className="text-purple-600"> ✦</span>}
                          </span>
                        );
                      })}
                      {u.better_forms.length > 3 && <span className="text-tertiary">+{u.better_forms.length - 3}</span>}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <span className="text-tertiary text-sm">уровни достаточны, скорость максимальна</span>
            )}
          </div>
        </Card>
      ),
    };
  });

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h1 className="text-3xl font-bold text-primary">
          #{aniimo.no} {aniimo.name}
          {family && <span className="ml-2 text-lg font-normal text-secondary">семья «{family.name}»</span>}
        </h1>
        <Link to="/aniimos" className="text-sm text-brand-600 hover:underline">← к списку</Link>
      </div>

      <PersonalityForm value={personality} onChange={setPersonality} />
      <SimpleTabs items={tabs} activeId={activeFormId} onChange={handleTabChange} />
    </div>
  );
}

function PersonalityForm({ value, onChange }: {
  value: Partial<Personality>;
  onChange: (v: Partial<Personality>) => void
}) {
  const axes: Array<[keyof Personality, string[]]> = [
    ['EI', ['E', 'I']],
    ['SN', ['S', 'N']],
    ['TF', ['T', 'F']],
    ['JP', ['J', 'P']],
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-secondary bg-secondary/30 p-3">
      <span className="text-sm text-tertiary">Характер анимо:</span>
      {axes.map(([axis, sides]) => (
        <div
          key={axis}
          className="inline-flex items-center gap-0.5 rounded-lg border border-secondary bg-primary p-0.5"
        >
          {sides.map((side) => (
            <button
              key={side}
              type="button"
              title={PERSONALITY_LABELS[side as PersonalitySide]}
              onClick={() => onChange({
                ...value,
                [axis]: value[axis] === side ? undefined : side,
              } as Partial<Personality>)}
              className={`inline-flex h-7 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
                value[axis] === side ? 'bg-brand-600 text-white' : 'text-secondary hover:bg-secondary/60'
              }`}
            >
              {side}
            </button>
          ))}
        </div>
      ))}
      {Object.keys(value).length > 0 && (
        <button type="button" onClick={() => onChange({})} className="ml-auto text-xs text-tertiary hover:text-primary">
          сбросить
        </button>
      )}
    </div>
  );
}
