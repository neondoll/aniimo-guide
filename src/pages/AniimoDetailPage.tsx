import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { SimpleTabs, type TabItem } from '@/components/SimpleTabs';
import { TraitAxisPills, RequiredPersonalityPills, PreferredPersonalityPills } from '@/components/TraitAxisPills';
import { PERSONALITY_LABELS, type PersonalityAxis, type PersonalitySide } from '@/constants/personality-labels';
import type { FormId } from '@/enums/forms';
import { rankBranches } from '@/lib/personalityScore';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';
import { useRecommendationsStore } from '@/store/recommendations.store';
import type { Personality } from '@/types/personality';
import { cx } from '@/utils/cx'

function parseSlug(slug?: string) {
  if (!slug) return { no: '' };

  const idx = slug.lastIndexOf('-');

  return idx === -1 ? { no: slug } : { no: slug.slice(0, idx), formId: slug.slice(idx + 1) };
}

export function AniimoDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const homeAbilities = useHomeAbilitiesStore((s) => s.data);
  const recommendations = useRecommendationsStore((s) => s.data.forms);

  const [personality, setPersonality] = useState<Partial<Personality>>({});

  const aniimoByNo = useMemo(() => new Map(aniimos.map((a) => [a.no, a])), [aniimos]);
  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const familyById = useMemo(() => new Map(families.map((f) => [f.id, f])), [families]);
  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const homeAbilityById = useMemo(() => new Map(homeAbilities.map((a) => [a.id, a])), [homeAbilities]);

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

  if (!aniimo) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-secondary">Анимо #{no} не найден.</p>
        <Link to="/aniimos" className="text-brand-600 hover:underline">← к списку</Link>
      </div>
    );
  }

  const family = familyById.get(aniimo.family_id);
  const sortedForms = [...aniimo.forms].sort((x, y) => x.form_id === 'base' ? -1 : y.form_id === 'base' ? 1 : x.form_id.localeCompare(y.form_id));

  const tabs: TabItem[] = sortedForms.map((form) => {
    const rec = recommendations[`${aniimo.no}:${form.form_id}`];
    const branches = rec ? rankBranches(personality, rec.evolution_branches) : [];
    const formName = formById.get(form.form_id)?.name ?? form.form_id;

    return {
      id: form.form_id,
      label: formName,
      content: (
        <Card className="overflow-hidden relative p-5 space-y-5">
          <div className="absolute -top-6 -right-4 text-8xl font-black text-secondary/5 uppercase pointer-events-none select-none">
            {aniimo.name}
          </div>

          <div className="flex relative z-10 flex-wrap gap-2 items-baseline">
            <h2 className="text-2xl font-bold text-primary">{formName}</h2>
            {form.is_final && <Badge color="success">Финал</Badge>}
            {formById.get(form.form_id)?.is_rare && <Badge color="purple">Редкий</Badge>}
            {form.season !== undefined && <Badge color="warning">Сезон {form.season}</Badge>}
          </div>

          <div className="grid relative z-10 gap-4 text-sm md:grid-cols-2">
            <div>
              <div className="mb-2 text-xs tracking-wide text-tertiary uppercase">Элементы</div>

              <div className="flex flex-wrap gap-2">
                {form.element_ids.map((id) => {
                  const el = elementById.get(id);

                  return <ElementBadge color={el?.color} key={id} name={el?.name ?? id} size="md" />;
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs tracking-wide text-tertiary uppercase">Способности дома</div>

              <div className="flex flex-wrap gap-2">
                {form.home_abilities.map((haa) => {
                  const ha = homeAbilityById.get(haa.id);

                  return (
                    <ElementBadge
                      color={ha?.color}
                      key={haa.id}
                      level={haa.level}
                      name={ha?.name ?? haa.id}
                      size="md"
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {rec?.fixed_personality && (
            <div className="relative z-10">
              <div className="mb-2 text-xs tracking-wide text-tertiary uppercase">Фиксированные черты</div>
              <TraitAxisPills fixed={rec.fixed_personality} fixedOnly />
            </div>
          )}

          <div className="relative z-10">
            <div className="mb-2 text-xs tracking-wide text-tertiary uppercase">Рекомендуемые черты</div>
            <TraitAxisPills fixed={rec?.fixed_personality} traits={rec?.traits} />
          </div>

          <div className="relative z-10">
            <div className="mb-2 text-xs tracking-wide text-tertiary uppercase">Строения</div>

            {rec && rec.facility_matches.length > 0 ? (
              <ul className="space-y-2">
                {rec.facility_matches.map((m) => (
                  <li className="flex flex-wrap gap-2 items-center text-sm text-secondary" key={m.facility_id}>
                    <span className="font-medium text-primary">{m.facility_name}</span>
                    {m.preferred_personality && <PreferredPersonalityPills personality={m.preferred_personality} />}
                    <span className="text-tertiary">·</span>

                    {m.covers.map((c) => {
                      const ha = homeAbilityById.get(c.ability_id);

                      return (
                        <ElementBadge
                          color={ha?.color}
                          key={c.ability_id}
                          level={c.level}
                          name={ha?.name ?? c.ability_id}
                        />
                      );
                    })}
                  </li>
                ))}
              </ul>
            ) : <span className="text-sm text-tertiary">—</span>}
          </div>

          <div className="relative z-10">
            <div className="mb-2 text-xs tracking-wide text-tertiary uppercase">Эволюция</div>

            {branches.length === 0 ? (
              <span className="text-sm text-tertiary">финальная форма</span>
            ) : (
              <ul className="space-y-2">
                {branches.map((b) => {
                  const target = aniimoByNo.get(b.to_no);
                  const targetFormName = formById.get(b.to_form_id)?.name ?? b.to_form_id;
                  const locked = !b.available && !b.unknown;

                  return (
                    <li
                      className={cx(
                        'flex flex-wrap gap-2 items-center text-sm',
                        locked ? 'opacity-50' : '',
                        b.recommended ? 'font-bold text-emerald-700' : 'text-secondary',
                      )}
                      key={`${b.to_no}:${b.to_form_id}`}
                    >
                      <span className="text-tertiary">{locked ? '🔒' : '→'}</span>

                      <Link className="hover:underline" to={`/aniimos/${b.to_no}-${b.to_form_id}`}>
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
        </Card>
      ),
    };
  });

  return (
    <div className="p-6 mx-auto space-y-6 max-w-4xl">
      <div className="flex flex-wrap gap-2 justify-between items-baseline">
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

function PersonalityForm({ onChange, value }: {
  onChange: (v: Partial<Personality>) => void;
  value: Partial<Personality>
}) {
  const axes: Array<[PersonalityAxis, PersonalitySide[]]> = [['EI', ['E', 'I']], ['SN', ['S', 'N']], ['TF', ['T', 'F']], ['JP', ['J', 'P']]];

  return (
    <div className="flex flex-wrap gap-3 items-center p-3 bg-secondary/30 rounded-lg border border-secondary">
      <span className="text-sm text-tertiary">Характер анимо:</span>

      {axes.map(([axis, sides]) => (
        <div
          className="inline-flex gap-0.5 items-center p-0.5 bg-primary rounded-lg border border-secondary"
          key={axis}
        >
          {sides.map((side) => (
            <button
              className={cx(
                'inline-flex justify-center items-center px-2 min-w-8 h-7 text-sm font-medium rounded-md transition-colors',
                value[axis] === side ? 'text-white bg-brand-600' : 'text-secondary hover:bg-secondary/60',
              )}
              key={side}
              onClick={() => onChange({
                ...value,
                [axis]: value[axis] === side ? undefined : side,
              } as Partial<Personality>)}
              title={PERSONALITY_LABELS[side]}
              type="button"
            >
              {side}
            </button>
          ))}
        </div>
      ))}

      {Object.keys(value).length > 0 && (
        <button className="ml-auto text-xs text-tertiary hover:text-primary" onClick={() => onChange({})} type="button">
          сбросить
        </button>
      )}
    </div>
  );
}
