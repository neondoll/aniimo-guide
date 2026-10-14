import { type ReactNode, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Badge, Tooltip } from '@/components/base';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { SimpleTabs } from '@/components/SimpleTabs'
import { TraitPills } from '@/components/TraitPills';
import { assetUrl } from '@/lib/assets';
import { rankBranches, type BranchScore } from '@/lib/personalityScore';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';
import { useRecommendationsStore } from '@/store/recommendations.store';
import type { Personality } from '@/types/personality';
import { cx } from '@/utils/cx'

export function AniimoDetailPage() {
  const { no } = useParams<{ no: string }>();

  const aniimos = useAniimosStore((s) => s.data);
  const elements = useElementsStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const homeAbilities = useHomeAbilitiesStore((s) => s.data);
  const recommendations = useRecommendationsStore((s) => s.data.forms);

  const [personality, setPersonality] = useState<Partial<Personality>>({});
  const personalityComplete = Object.keys(personality).length === 4;

  const aniimoByNo = useMemo(() => new Map(aniimos.map((a) => [a.no, a])), [aniimos]);
  const elementById = useMemo(() => new Map(elements.map((e) => [e.id, e])), [elements]);
  const familyById = useMemo(() => new Map(families.map((f) => [f.id, f])), [families]);
  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const homeAbilityById = useMemo(() => new Map(homeAbilities.map((a) => [a.id, a])), [homeAbilities]);

  const aniimo = useMemo(() => aniimos.find((a) => a.no === no), [aniimos, no]);

  if (!aniimo) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-secondary">Анимо #{no} не найден.</p>
        <Link className="inline-block mt-2 text-brand-600 hover:underline" to="/aniimos">← к списку</Link>
      </div>
    );
  }

  const family = familyById.get(aniimo.family_id);
  const sortedForms = [...aniimo.forms].sort((x, y) => {
    if (x.form_id === 'base') return -1;

    if (y.form_id === 'base') return 1;

    return x.form_id.localeCompare(y.form_id);
  });

  return (
    <div className="p-6 mx-auto space-y-6 max-w-4xl">
      <div className="flex flex-wrap gap-2 justify-between items-baseline">
        <h1 className="text-3xl font-bold text-primary">
          #{aniimo.no} {aniimo.name}
          {family && <span className="ml-2 text-lg font-normal text-secondary">семья «{family.name}»</span>}
        </h1>

        <Link className="text-sm text-brand-600 hover:underline" to="/aniimos">← к списку</Link>
      </div>

      <PersonalityForm value={personality} onChange={setPersonality} />

      <SimpleTabs
        initialId={sortedForms[0]?.form_id}
        items={sortedForms.map((form) => {
          const key = `${aniimo.no}:${form.form_id}`;
          const rec = recommendations[key];
          const branches: BranchScore[] = rec && personalityComplete
            ? rankBranches(personality, rec.evolution_branches)
            : (rec?.evolution_branches ?? []).map((b) => ({
              to_no: b.to_no,
              to_form_id: b.to_form_id,
              score: 0,
              recommended: false,
            }));

          return {
            id: form.form_id,
            label: formById.get(form.form_id)?.name ?? form.form_id,
            // badge: form.is_final ? 'финал' : undefined,
            content: (
              <Card className="p-5 space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  {form.image && <img alt="" className="object-contain w-24 h-24" src={assetUrl(form.image)} />}

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {form.is_final && <Badge color="success">финал</Badge>}
                      {formById.get(form.form_id)?.is_rare && <Badge color="purple">редкий</Badge>}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Элементы">
                    {form.element_ids.map((id) => {
                      const el = elementById.get(id);

                      return el ? (
                        <Tooltip key={id} title={el.name}>
                          <span className="inline-flex gap-1 items-center mr-3">
                            <Icon src={el.icon} alt={el.name} size={18} />
                            {el.name}
                          </span>
                        </Tooltip>
                      ) : (
                        <span key={id} className="mr-3">{id}</span>
                      );
                    })}
                  </Field>

                  <Field label="Способности дома">
                    {form.home_abilities.map((ha) => {
                      const ab = homeAbilityById.get(ha.id);

                      return (
                        <Tooltip key={ha.id} title={`${ab?.name ?? ha.id} · уровень ${ha.level}`}>
                          <span className="inline-flex gap-1 items-center mr-3">
                            {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={18} />}
                            {ab?.name ?? ha.id} ур.{ha.level}
                          </span>
                        </Tooltip>
                      );
                    })}
                  </Field>
                </div>

                <Field label="Рекомендуемые черты характера">
                  {rec ? <TraitPills traits={rec.traits} /> : <span className="text-tertiary">—</span>}
                </Field>

                <Field label="Строения">
                  {rec && rec.facility_matches.length > 0 ? (
                    <ul className="space-y-1">
                      {rec.facility_matches.map((m) => (
                        <li key={m.facility_id} className="text-sm text-secondary">
                          <span className="font-medium text-primary">{m.facility_name}</span>:{' '}

                          {m.covers.map((c) => {
                            const ab = homeAbilityById.get(c.ability_id);

                            return (
                              <Tooltip key={c.ability_id} title={`${ab?.name ?? c.ability_id} · уровень ${c.level}`}>
                                <span className="inline-flex gap-1 items-center mr-2">
                                  {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={14} />}
                                  {ab?.name ?? c.ability_id} ({c.level})
                                </span>
                              </Tooltip>
                            );
                          })}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-tertiary">—</span>
                  )}
                </Field>

                <Field label="Эволюция">
                  {branches.length === 0 ? (
                    <span className="text-tertiary">финальная форма</span>
                  ) : (
                    <ul className="space-y-1">
                      {branches.map((b) => {
                        const target = aniimoByNo.get(b.to_no);
                        const targetFormName = formById.get(b.to_form_id)?.name ?? b.to_form_id;

                        return (
                          <li
                            className={b.recommended ? 'font-bold text-brand-700' : 'text-secondary'}
                            key={`${b.to_no}:${b.to_form_id}`}
                          >
                            →{' '}
                            <Link className="hover:underline" to={`/aniimos/${b.to_no}`}>
                              #{b.to_no} {target?.name ?? b.to_no}
                            </Link>{' '}
                            ({targetFormName})
                            {personalityComplete && <> · score {b.score}</>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Field>

                <Field label="Апгрейд (кто лучше по способностям)">
                  {rec && rec.upgrade_suggestions.length > 0 ? (
                    <ul className="space-y-1">
                      {rec.upgrade_suggestions.map((u) => {
                        const ab = homeAbilityById.get(u.ability_id);

                        return (
                          <li className="text-sm text-secondary" key={u.ability_id}>
                            <Tooltip title={`${ab?.name ?? u.ability_id} · уровень ${u.current_level}`}>
                              <span className="inline-flex gap-1 items-center font-medium text-primary">
                                {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={14} />}
                                {ab?.name ?? u.ability_id}
                              </span>
                            </Tooltip>
                            : {u.current_level} →{' '}
                            {u.better_forms.slice(0, 5).map((b, i) => {
                              const target = aniimoByNo.get(b.no);
                              const targetFormName = formById.get(b.form_id)?.name ?? b.form_id;

                              return (
                                <span key={`${b.no}:${b.form_id}`}>
                                  {i > 0 && ', '}
                                  <Link className="hover:underline" to={`/aniimos/${b.no}`}>
                                    #{b.no} {target?.name ?? b.no}
                                  </Link>{' '}
                                  ({targetFormName}, {b.level})
                                  {b.is_rare && <span className="text-purple-600"> ✦</span>}
                                </span>
                              );
                            })}
                            {u.better_forms.length > 5 && ` +${u.better_forms.length - 5}`}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <span className="text-tertiary">—</span>
                  )}
                </Field>
              </Card>
            ),
          };
        })}
      />
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-tertiary mb-1">{label}</div>
      <div className="text-secondary">{children}</div>
    </div>
  );
}

function PersonalityForm({ value, onChange }: {
  value: Partial<Personality>;
  onChange: (v: Partial<Personality>) => void;
}) {
  const axes: Array<[keyof Personality, string[]]> = [
    ['EI', ['E', 'I']],
    ['SN', ['S', 'N']],
    ['TF', ['T', 'F']],
    ['JP', ['J', 'P']],
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center p-3 bg-secondary/30 rounded-lg border border-secondary">
      <span className="text-sm text-tertiary">Характер анимо (для рекомендации эволюции):</span>

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
              onClick={() =>
                onChange({ ...value, [axis]: value[axis] === side ? undefined : side } as Partial<Personality>)
              }
              key={side}
              type="button"
            >
              {side}
            </button>
          ))}
        </div>
      ))}

      {Object.keys(value).length > 0 && (
        <button
          className="ml-auto text-xs text-tertiary hover:text-primary"
          onClick={() => onChange({})}
          type="button"
        >
          сбросить
        </button>
      )}
    </div>
  );
}
