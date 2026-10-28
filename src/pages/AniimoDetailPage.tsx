import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { SimpleTabs, type TabItem } from '@/components/SimpleTabs';
import { TraitAxisPills, RequiredPersonalityPills, PreferredPersonalityPills } from '@/components/TraitAxisPills';
import { PERSONALITY_LABELS, type PersonalitySide } from '@/constants/personality-labels';
import type { FormId } from '@/enums/forms';
import { STAGE_LABELS } from '@/enums/stages';
import { rankBranches } from '@/lib/personalityScore';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';
import { useRecommendationsStore } from '@/store/recommendations.store';
import type { Personality } from '@/types/personality';

function parseSlug(slug?: string) {
  if (!slug) return { no: '' };
  const idx = slug.lastIndexOf('-');
  return idx === -1 ? { no: slug } : { no: slug.slice(0, idx), formId: slug.slice(idx + 1) };
}

export function AniimoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const abilities = useHomeAbilitiesStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const recommendations = useRecommendationsStore((s) => s.data.forms);

  const [personality, setPersonality] = useState<Partial<Personality>>({});

  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const abilityById = useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
  const familyById = useMemo(() => new Map(families.map((f) => [f.id, f])), [families]);
  const aniimoByNo = useMemo(() => new Map(aniimos.map((a) => [a.no, a])), [aniimos]);

  const { no, formId: formFromUrl } = useMemo(() => parseSlug(slug), [slug]);
  const aniimo = useMemo(() => aniimos.find((a) => a.no === no), [aniimos, no]);

  const activeFormId = useMemo(() => {
    if (!aniimo) return '';
    const ids = new Set(aniimo.forms.map((f) => f.form_id));
    if (formFromUrl && ids.has(formFromUrl as FormId)) return formFromUrl;
    return aniimo.forms.find((f) => f.form_id === 'base')?.form_id ?? aniimo.forms[0]?.form_id ?? '';
  }, [aniimo, formFromUrl]);

  const handleTabChange = (id: string) => {
    if (aniimo) navigate(`/aniimos/${aniimo.no}-${id}`, { replace: true });
  };

  if (!aniimo) return <div className="p-6 text-center"><p className="text-lg text-secondary">Анимо #{no} не найден.</p>
    <Link to="/aniimos" className="text-brand-600 hover:underline">← к списку</Link></div>;

  const family = familyById.get(aniimo.family_id);
  const sortedForms = [...aniimo.forms].sort((x, y) => x.form_id === 'base' ? -1 : y.form_id === 'base' ? 1 : x.form_id.localeCompare(y.form_id));

  const tabs: TabItem[] = sortedForms.map((form) => {
    const rec = recommendations[`${aniimo.no}:${form.form_id}`];
    const branches = rec ? rankBranches(personality, rec.evolution_branches) : [];
    const formName = formById.get(form.form_id)?.name ?? form.form_id;

    return {
      id: form.form_id,
      label: formName,
      badge: form.is_final ? 'финал' : undefined,
      content: (
        <Card className="relative overflow-hidden p-5 space-y-5">
          <div className="absolute -right-4 -top-6 text-8xl font-black text-secondary/5 pointer-events-none select-none uppercase">
            {aniimo.name}
          </div>

          <div className="relative z-10 flex flex-wrap items-baseline gap-2">
            <h2 className="text-2xl font-bold text-primary">{formName}</h2>
            {form.is_final && <Badge color="success">Финал</Badge>}
            {formById.get(form.form_id)?.is_rare && <Badge color="purple">Редкий</Badge>}
            {form.season !== undefined && <Badge color="warning">Сезон {form.season}</Badge>}
            {form.stage && <Badge color="gray">{STAGE_LABELS[form.stage]}</Badge>}
          </div>

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
                    <span className="text-xs text-tertiary">({m.copies} коп. · ур.{m.required_ability_level})</span>
                    {m.is_speed_capped && <Badge color="gray" size="sm">max</Badge>}
                    {m.preferred_personality && <PreferredPersonalityPills personality={m.preferred_personality} />}
                    <span className="text-tertiary">·</span>
                    {m.covered_ability_ids.map((id) => {
                      const ab = abilityById.get(id);
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
                  const target = aniimoByNo.get(b.to_no);
                  const targetFormName = formById.get(b.to_form_id)?.name ?? b.to_form_id;
                  const locked = !b.available && !b.unknown;

                  return (
                    <li
                      key={`${b.to_no}:${b.to_form_id}`}
                      className={`flex flex-wrap items-center gap-2 text-sm ${locked ? 'opacity-50' : ''} ${b.recommended ? 'font-bold text-emerald-700' : 'text-secondary'}`}
                    >
                      <span className="text-tertiary">{locked ? '🔒' : '→'}</span>
                      <Link to={`/aniimos/${b.to_no}-${b.to_form_id}`} className="hover:underline">
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
                  const ab = abilityById.get(u.ability_id);
                  return (
                    <li key={u.ability_id} className="flex flex-wrap items-center gap-2">
                      <ElementBadge name={ab?.name ?? u.ability_id} color={ab?.color} level={u.current_level} />
                      <span className="text-tertiary">→ лучше:</span>
                      {u.better_forms.slice(0, 3).map((b, i) => (
                        <span key={`${b.no}:${b.form_id}`}>
                          {i > 0 && ', '}
                          <Link to={`/aniimos/${b.no}-${b.form_id}`} className="hover:underline text-brand-600">
                            #{b.no} {b.name}
                          </Link>{' '}
                          <span className="text-tertiary">({b.level})</span>
                          {b.is_rare && <span className="text-purple-600"> ✦</span>}
                        </span>
                      ))}
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
  onChange: (v: Partial<Personality>) => void;
}) {
  const axes: Array<[keyof Personality, string[]]> = [['EI', ['E', 'I']], ['SN', ['S', 'N']], ['TF', ['T', 'F']], ['JP', ['J', 'P']]];
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
              className={`inline-flex h-7 min-w-[32px] items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${value[axis] === side ? 'bg-brand-600 text-white' : 'text-secondary hover:bg-secondary/60'}`}
            >
              {side}
            </button>
          ))}
        </div>
      ))}
      {Object.keys(value).length > 0 && <button
        type="button"
        onClick={() => onChange({})}
        className="ml-auto text-xs text-tertiary hover:text-primary"
      >сбросить</button>}
    </div>
  );
}
