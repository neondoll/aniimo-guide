import { type ReactNode, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Badge, Tooltip } from '@/components/base';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { SimpleTabs } from '@/components/SimpleTabs'
import { PreferredPersonalityPills, RequiredPersonalityPills, TraitAxisPills } from '@/components/TraitAxisPills'
import type { FormId } from '@/enums/forms'
import { assetUrl } from '@/lib/assets';
import { rankBranches } from '@/lib/personalityScore';
import { useAniimosStore } from '@/store/aniimos.store';
import { useElementsStore } from '@/store/elements.store';
import { useFamiliesStore } from '@/store/families.store';
import { useFormsStore } from '@/store/forms.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';
import { useRecommendationsStore } from '@/store/recommendations.store';
import type { Personality } from '@/types/personality';
import { cx } from '@/utils/cx'

/** Разбирает «001» → { no: '001' }; «001-base» → { no: '001', formId: 'base' }. */
function parseSlug(slug: string | undefined): { no: string; formId?: string } {
  if (!slug) return { no: '' };

  const idx = slug.lastIndexOf('-');

  if (idx === -1) return { no: slug };

  return { no: slug.slice(0, idx), formId: slug.slice(idx + 1) };
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
  // const personalityComplete = Object.keys(personality).length === 4;

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

    return (
      aniimo.forms.find((f) => f.form_id === 'base')?.form_id ??
      aniimo.forms[0]?.form_id ??
      ''
    );
  }, [aniimo, formFromUrl]);

  const handleTabChange = (id: string) => {
    if (!aniimo) return;

    navigate(`/aniimos/${aniimo.no}-${id}`, { replace: true });
  };

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
          {family && <span className="ml-2 text-lg font-normal text-secondary">семейство «{family.name}»</span>}
        </h1>

        <Link className="text-sm text-brand-600 hover:underline" to="/aniimos">← к списку</Link>
      </div>

      {aniimo.forms.some((a) => !a.is_final) && (
        <PersonalityForm value={personality} onChange={setPersonality} />
      )}

      <SimpleTabs
        activeId={activeFormId}
        onChange={handleTabChange}
        items={sortedForms.map((form) => {
          const key = `${aniimo.no}:${form.form_id}`;
          const rec = recommendations[key];
          const branches = rec ? rankBranches(personality, rec.evolution_branches) : [];
          const formName = formById.get(form.form_id)?.name ?? form.form_id;
          const isRare = formById.get(form.form_id)?.is_rare;

          return {
            id: form.form_id,
            label: formName,
            // badge: form.is_final ? 'финал' : undefined,
            content: (
              <Card className="p-5 space-y-4">
                {/* Hero: картинка + название + бейджи + элементы + способности */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                  {form.image && (
                    <div className="aspect-2/3 flex shrink-0 justify-center items-center self-start p-2 mx-auto w-full max-w-35 bg-secondary/30 rounded-lg sm:mx-0">
                      <img alt="" className="object-contain max-w-full max-h-full" src={assetUrl(form.image)} />
                    </div>
                  )}

                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="flex flex-wrap gap-2 items-baseline">
                      <h3 className="text-xl font-semibold text-primary">{formName}</h3>

                      <div className="flex flex-wrap gap-1.5">
                        {form.is_final && <Badge color="success" size="sm">финал</Badge>}
                        {isRare && <Badge color="purple" size="sm">редкий</Badge>}
                        {form.season !== undefined && <Badge color="warning" size="sm">Сезон {form.season}</Badge>}
                      </div>
                    </div>

                    <div className="grid gap-2 text-sm">
                      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
                        <span className="shrink-0 text-tertiary">Элементы:</span>

                        {form.element_ids.map((id) => {
                          const el = elementById.get(id);

                          return el ? (
                            <Tooltip key={id} title={el.name}>
                              <span className="inline-flex gap-1 items-center px-1.5 py-0.5 bg-secondary/40 rounded-md border border-secondary">
                                <Icon alt={el.name} size={16} src={el.icon} />
                                {el.name}
                              </span>
                            </Tooltip>
                          ) : (
                            <span
                              className="px-1.5 py-0.5 bg-secondary/40 rounded-md border border-secondary"
                              key={id}
                            >{id}</span>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
                        <span className="shrink-0 text-tertiary">Способности:</span>

                        {form.home_abilities.map((ha) => {
                          const ab = homeAbilityById.get(ha.id);

                          return (
                            <Tooltip key={ha.id} title={`${ab?.name ?? ha.id} · уровень ${ha.level}`}>
                              <span className="inline-flex gap-1 items-center px-1.5 py-0.5 bg-secondary/40 rounded-md border border-secondary">
                                {ab?.icon && <Icon alt={ab.name} size={16} src={ab.icon} />}
                                <span>{ab?.name ?? ha.id}</span>

                                <span className="px-1 ml-0.5 text-[11px] font-semibold text-brand-700 bg-brand-100 rounded">
                                  ур.{ha.level}
                                </span>
                              </span>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {rec?.fixed_personality && (
                  <Field label="Фиксированные черты характера">
                    <TraitAxisPills fixed={rec.fixed_personality} fixedOnly />
                  </Field>
                )}

                <Field label="Рекомендуемые черты характера">
                  <TraitAxisPills traits={rec?.traits} fixed={rec?.fixed_personality} />
                </Field>

                <Field label="Строения">
                  {rec && rec.facility_matches.length > 0 ? (
                    <ul className="space-y-1.5">
                      {rec.facility_matches.map((m) => (
                        <li className="flex flex-wrap gap-2 items-center text-sm text-secondary" key={m.facility_id}>
                          <span className="font-medium text-primary">{m.facility_name}</span>

                          {m.covers.map((c) => {
                            const ab = homeAbilityById.get(c.ability_id);

                            return (
                              <Tooltip title={`${ab?.name ?? c.ability_id} · уровень ${c.level}`} key={c.ability_id}>
                                <span className="inline-flex gap-1 items-center">
                                  {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={14} />}
                                  {ab?.name ?? c.ability_id} ({c.level})
                                </span>
                              </Tooltip>
                            );
                          })}

                          {m.preferred_personality && (
                            <>
                              <span className="text-tertiary">·</span>
                              <PreferredPersonalityPills personality={m.preferred_personality} />
                            </>
                          )}
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
                    <ul className="space-y-1.5">
                      {branches.map((b) => {
                        const target = aniimoByNo.get(b.to_no);
                        const targetFormName = formById.get(b.to_form_id)?.name ?? b.to_form_id;
                        const locked = !b.available && !b.unknown;
                        const unknown = b.unknown;

                        return (
                          <li
                            className={cx(
                              'flex flex-wrap gap-2 items-center',
                              locked && 'opacity-50',
                              b.recommended && 'font-bold text-emerald-700',
                            )}
                            key={`${b.to_no}:${b.to_form_id}`}
                          >
                            <span className="text-tertiary">{locked ? '🔒' : '→'}</span>

                            <Link className="hover:underline" to={`/aniimos/${b.to_no}-${b.to_form_id}`}>
                              #{b.to_no} {target?.name ?? b.to_no}
                            </Link>

                            <span className="text-secondary">({targetFormName})</span>

                            {b.requires_personality && (
                              <RequiredPersonalityPills personality={b.requires_personality} />
                            )}

                            {b.available && b.score > 0 && (
                              <span className="text-xs text-tertiary">score {b.score}</span>
                            )}

                            {locked && <span className="text-xs text-red-600">характер не подходит</span>}
                            {unknown && <span className="text-xs text-amber-600">выберите больше черт</span>}
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
                                  <Link className="hover:underline" to={`/aniimos/${b.no}-${b.form_id}`}>
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
