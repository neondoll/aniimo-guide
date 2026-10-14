import { useMemo, useState, type ReactNode } from "react";

import { rankBranches, type BranchScore } from "../lib/personalityScore";
import { PRIORITY_CLASS, PRIORITY_TITLE } from "../lib/traitStyles";
import { useFormsStore } from "../store/forms.store";
import { useHomeAbilitiesStore } from "../store/home-abilities.store";
import { useRecommendationsStore } from "../store/recommendations.store";
import type { Personality } from "../types/personality";
import type { FormTraitProfile } from "../types/recommendations";

export function RecommendationsPage() {
  const forms = useRecommendationsStore((s) => s.data.forms);
  const formsCatalog = useFormsStore((s) => s.data);
  const abilities = useHomeAbilitiesStore((s) => s.data);
  const [personality, setPersonality] = useState<Partial<Personality>>({});

  const formName = useMemo(
    () => new Map(formsCatalog.map((f) => [f.id, f.name])),
    [formsCatalog],
  );
  const abilityName = useMemo(
    () => new Map(abilities.map((a) => [a.id, a.name])),
    [abilities],
  );

  const list = useMemo(
    () =>
      Object.values(forms).sort(
        (a, b) => a.no.localeCompare(b.no) || a.form_id.localeCompare(b.form_id),
      ),
    [forms],
  );

  const personalityComplete = Object.keys(personality).length === 4;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Рекомендации</h1>

      <PersonalityForm value={personality} onChange={setPersonality} />

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b bg-slate-50">
              <th className="p-2">Аниимо (форма)</th>
              <th className="p-2">Статус</th>
              <th className="p-2">Характер</th>
              <th className="p-2">Строения</th>
              <th className="p-2">Эволюция</th>
              <th className="p-2">Апгрейд</th>
            </tr>
          </thead>

          <tbody>
            {list.map((rec) => {
              const branches: BranchScore[] = personalityComplete
                ? rankBranches(personality, rec.evolution_branches)
                : rec.evolution_branches.map((b) => ({
                  to_no: b.to_no,
                  to_form_id: b.to_form_id,
                  score: 0,
                  recommended: false,
                }));

              return (
                <tr key={`${rec.no}:${rec.form_id}`} className="border-b align-top">
                  <td className="p-2 whitespace-nowrap">
                    #{rec.no} {rec.name}
                    <div className="text-xs text-slate-500">
                      {formName.get(rec.form_id) ?? rec.form_id}
                    </div>
                  </td>

                  <td className="p-2 space-x-1 whitespace-nowrap">
                    {rec.is_final && <Badge color="emerald">финал</Badge>}
                    {rec.is_rare && <Badge color="violet">редкий</Badge>}
                  </td>

                  <td className="p-2">
                    <TraitsCell traits={rec.traits} />
                  </td>

                  <td className="p-2">
                    {rec.facility_matches.length === 0 ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      rec.facility_matches.map((m) => (
                        <div key={m.facility_id} className="text-xs">
                          <span className="font-medium">{m.facility_name}:</span>{" "}
                          {m.covers
                            .map((c) => `${abilityName.get(c.ability_id) ?? c.ability_id}(${c.level})`)
                            .join(", ")}
                        </div>
                      ))
                    )}
                  </td>

                  <td className="p-2 text-xs">
                    {branches.length === 0 ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      branches.map((b) => (
                        <div
                          key={`${b.to_no}:${b.to_form_id}`}
                          className={b.recommended ? "font-bold text-emerald-700" : ""}
                        >
                          → #{b.to_no}:{formName.get(b.to_form_id) ?? b.to_form_id}
                          {personalityComplete && ` (${b.score})`}
                        </div>
                      ))
                    )}
                  </td>

                  <td className="p-2 text-xs">
                    {rec.upgrade_suggestions.length === 0 ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      rec.upgrade_suggestions.map((u) => (
                        <div key={u.ability_id}>
                          <span className="font-medium">
                            {abilityName.get(u.ability_id) ?? u.ability_id}
                          </span>
                          : {u.current_level} → лучшие:{" "}
                          {u.better_forms
                            .slice(0, 3)
                            .map((b) => `#${b.no}:${b.form_id}(${b.level})`)
                            .join(", ")}
                          {u.better_forms.length > 3 && ` +${u.better_forms.length - 3}`}
                        </div>
                      ))
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
      <span key={axis} className="inline-flex items-center gap-1 whitespace-nowrap">
        <span className="text-slate-500 text-xs">{axis}:</span>
        {votes.map((v) => (
          <span
            key={v.side}
            className={PRIORITY_CLASS[v.priority]}
            title={PRIORITY_TITLE[v.priority]}
          >
            {v.side}
          </span>
        ))}
      </span>,
    );
  }

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {parts.length === 0 ? <span className="text-slate-400">—</span> : parts}
    </div>
  );
}

function PersonalityForm({
                           value,
                           onChange,
                         }: {
  value: Partial<Personality>;
  onChange: (v: Partial<Personality>) => void;
}) {
  const axes: Array<[keyof Personality, string[]]> = [
    ["EI", ["E", "I"]],
    ["SN", ["S", "N"]],
    ["TF", ["T", "F"]],
    ["JP", ["J", "P"]],
  ];

  return (
    <div className="flex flex-wrap gap-4 p-3 border rounded bg-slate-50">
      {axes.map(([axis, sides]) => (
        <div key={axis} className="flex gap-1 items-center">
          <span className="font-semibold">{axis}:</span>
          {sides.map((side) => (
            <button
              key={side}
              type="button"
              onClick={() =>
                onChange({
                  ...value,
                  [axis]: value[axis] === side ? undefined : side,
                } as Partial<Personality>)
              }
              className={
                value[axis] === side
                  ? "bg-blue-500 text-white px-2 py-0.5 rounded"
                  : "px-2 py-0.5 rounded border bg-white"
              }
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
  const cls =
    color === "emerald"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-violet-100 text-violet-700";
  return <span className={`text-xs px-1.5 py-0.5 rounded ${cls}`}>{children}</span>;
}
