import { useMemo, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

import { Icon } from "../components/Icon";
import { assetUrl } from "../lib/assets";
import { rankBranches, type BranchScore } from "../lib/personalityScore";
import { PRIORITY_CLASS, PRIORITY_TITLE } from "../lib/traitStyles";
import { useAniimosStore } from "../store/aniimos.store";
import { useElementsStore } from "../store/elements.store";
import { useFamiliesStore } from "../store/families.store";
import { useFormsStore } from "../store/forms.store";
import { useHomeAbilitiesStore } from "../store/home-abilities.store";
import { useRecommendationsStore } from "../store/recommendations.store";
import type { Personality } from "../types/personality";
import type { FormTraitProfile, FormRecommendation } from "../types/recommendations";

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
      <div className="p-6">
        <p>Анимо #{no} не найден.</p>
        <Link to="/aniimos" className="text-blue-600 hover:underline">← к списку</Link>
      </div>
    );
  }

  const family = familyById.get(aniimo.family_id);

  // Сортируем формы: Base, потом финалы, потом остальные — по алфавиту
  const sortedForms = [...aniimo.forms].sort((x, y) => {
    if (x.form_id === "base") return -1;

    if (y.form_id === "base") return 1;

    return x.form_id.localeCompare(y.form_id);
  });

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold">
          #{aniimo.no} {aniimo.name}
          {family && <span className="ml-2 text-base font-normal text-slate-500">семья «{family.name}»</span>}
        </h1>

        <Link to="/aniimos" className="text-sm text-blue-600 hover:underline">← к списку</Link>
      </div>

      <PersonalityForm value={personality} onChange={setPersonality} />

      {sortedForms.map((form) => {
        const key = `${aniimo.no}:${form.form_id}`;
        const rec = recommendations[key];

        return (
          <FormCard
            aniimoByNo={aniimoByNo}
            elementById={elementById}
            form={form}
            formById={formById}
            formName={formById.get(form.form_id)?.name ?? form.form_id}
            homeAbilityById={homeAbilityById}
            isRare={formById.get(form.form_id)?.is_rare ?? false}
            key={form.form_id}
            personality={personality}
            personalityComplete={personalityComplete}
            rec={rec}
          />
        );
      })}
    </div>
  );
}

interface FormCardProps {
  aniimoByNo: Map<string, import("../types/aniimo").Aniimo>;
  elementById: Map<string, import("../types/element").Element>;
  form: import("../types/aniimo").AniimoForm;
  formById: Map<string, import("../types/form").Form>;
  formName: string;
  homeAbilityById: Map<string, import("../types/home-ability").HomeAbility>;
  isRare: boolean;
  personality: Partial<Personality>;
  personalityComplete: boolean;
  rec: FormRecommendation | undefined;
}

function FormCard({
                    aniimoByNo, elementById, form, formById, formName, homeAbilityById, isRare, personality,
                    personalityComplete, rec,
                  }: FormCardProps) {
  const branches: BranchScore[] = rec && personalityComplete
    ? rankBranches(personality, rec.evolution_branches)
    : (rec?.evolution_branches ?? []).map((b) => ({
      to_no: b.to_no, to_form_id: b.to_form_id, score: 0, recommended: false,
    }));

  return (
    <section className="border rounded-lg p-4 space-y-3">
      <header className="flex items-center gap-3 flex-wrap">
        {form.image && <img src={assetUrl(form.image)} alt="" className="w-20 h-20 object-contain" />}

        <div>
          <h2 className="text-lg font-semibold">{formName}</h2>

          <div className="flex gap-1 mt-1">
            {form.is_final && <Badge color="emerald">финал</Badge>}
            {isRare && <Badge color="violet">редкий</Badge>}
          </div>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-2 text-sm">
        <Field label="Элементы">
          {form.element_ids.map((id) => {
            const el = elementById.get(id);

            return el ? (
              <span key={id} className="inline-flex items-center gap-1 mr-2">
                <Icon src={el.icon} alt={el.name} size={18} />
                {el.name}
              </span>
            ) : <span key={id} className="mr-2">{id}</span>;
          })}
        </Field>

        <Field label="Способности дома">
          {form.home_abilities.map((ha) => {
            const ab = homeAbilityById.get(ha.id);

            return (
              <span key={ha.id} className="inline-flex items-center gap-1 mr-2">
                {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={18} />}
                {ab?.name ?? ha.id} ур.{ha.level}
              </span>
            );
          })}
        </Field>
      </div>

      <Field label="Рекомендуемые черты характера">
        {rec ? <TraitsCell traits={rec.traits} /> : <span className="text-slate-400">—</span>}
      </Field>

      <Field label="Строения">
        {rec && rec.facility_matches.length > 0 ? (
          <ul className="space-y-1">
            {rec.facility_matches.map((m) => (
              <li key={m.facility_id}>
                <span className="font-medium">{m.facility_name}</span>:{" "}

                {m.covers.map((c) => {
                  const ab = homeAbilityById.get(c.ability_id);

                  return (
                    <span key={c.ability_id} className="inline-flex items-center gap-1 mr-2">
                      {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={14} />}
                      {ab?.name ?? c.ability_id} ({c.level})
                    </span>
                  );
                })}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </Field>

      <Field label="Эволюция">
        {branches.length === 0 ? (
          <span className="text-slate-400">финальная форма</span>
        ) : (
          <ul className="space-y-1">
            {branches.map((b) => {
              const target = aniimoByNo.get(b.to_no);
              const targetFormName = formById.get(b.to_form_id)?.name ?? b.to_form_id;

              return (
                <li
                  key={`${b.to_no}:${b.to_form_id}`}
                  className={b.recommended ? "font-bold text-emerald-700" : ""}
                >
                  → <Link to={`/aniimos/${b.to_no}`} className="hover:underline">
                  #{b.to_no} {target?.name ?? b.to_no}
                </Link>{" "}
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
                <li key={u.ability_id}>
                  <span className="inline-flex items-center gap-1 font-medium">
                    {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={14} />}
                    {ab?.name ?? u.ability_id}
                  </span>
                  : {u.current_level} →{" "}
                  {u.better_forms.slice(0, 5).map((b, i) => {
                    const target = aniimoByNo.get(b.no);
                    const targetFormName = formById.get(b.form_id)?.name ?? b.form_id;

                    return (
                      <span key={`${b.no}:${b.form_id}`}>
                        {i > 0 && ", "}
                        <Link to={`/aniimos/${b.no}`} className="hover:underline">
                          #{b.no} {target?.name ?? b.no}
                        </Link>{" "}
                        ({targetFormName}, {b.level})
                        {b.is_rare && <span className="text-violet-600"> ✦</span>}
                      </span>
                    );
                  })}
                  {u.better_forms.length > 5 && ` +${u.better_forms.length - 5}`}
                </li>
              );
            })}
          </ul>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </Field>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-slate-700">{children}</div>
    </div>
  );
}

function TraitsCell({ traits }: { traits: FormTraitProfile }) {
  const axes: Array<keyof FormTraitProfile> = ["EI", "SN", "TF", "JP"];
  const parts: ReactNode[] = [];
  for (const axis of axes) {
    const votes = traits[axis];
    if (!votes) continue;
    parts.push(
      <span key={axis} className="inline-flex items-center gap-1 mr-3">
        <span className="text-slate-500 text-xs">{axis}:</span>
        {votes.map((v) => (
          <span key={v.side} className={PRIORITY_CLASS[v.priority]} title={PRIORITY_TITLE[v.priority]}>
            {v.side}
          </span>
        ))}
      </span>,
    );
  }
  return <>{parts.length === 0 ? <span className="text-slate-400">—</span> : parts}</>;
}

function PersonalityForm({
                           value, onChange,
                         }: { value: Partial<Personality>; onChange: (v: Partial<Personality>) => void }) {
  const axes: Array<[keyof Personality, string[]]> = [
    ["EI", ["E", "I"]], ["SN", ["S", "N"]], ["TF", ["T", "F"]], ["JP", ["J", "P"]],
  ];
  return (
    <div className="flex flex-wrap gap-4 p-3 border rounded bg-slate-50">
      <span className="text-sm text-slate-500">Выберите характер анимо, чтобы увидеть рекомендуемый путь эволюции:</span>
      {axes.map(([axis, sides]) => (
        <div key={axis} className="flex gap-1 items-center">
          <span className="font-semibold">{axis}:</span>
          {sides.map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => onChange({
                ...value,
                [axis]: value[axis] === side ? undefined : side,
              } as Partial<Personality>)}
              className={value[axis] === side
                ? "bg-blue-500 text-white px-2 py-0.5 rounded"
                : "px-2 py-0.5 rounded border bg-white"}
            >
              {side}
            </button>
          ))}
        </div>
      ))}
      {Object.keys(value).length > 0 && (
        <button
          type="button"
          onClick={() => onChange({})}
          className="ml-auto text-xs text-slate-500 hover:text-slate-800"
        >
          сбросить
        </button>
      )}
    </div>
  );
}

function Badge({ color, children }: { color: "emerald" | "violet"; children: ReactNode }) {
  const cls = color === "emerald"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-violet-100 text-violet-700";
  return <span className={`text-xs px-1.5 py-0.5 rounded ${cls}`}>{children}</span>;
}