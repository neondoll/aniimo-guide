import { useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";

import { Icon } from "../components/Icon";
import type { FamilyId } from "../enums/families";
import { useAniimosStore } from "../store/aniimos.store";
import { useElementsStore } from "../store/elements.store";
import { useFamiliesStore } from "../store/families.store";
import { useFormsStore } from "../store/forms.store";
import { useHomeAbilitiesStore } from "../store/home-abilities.store";

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
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Аниимо</h1>

      {byFamily.map(([familyId, members]) => {
        const family = familyById.get(familyId);

        return (
          <section key={familyId}>
            <h2 className="text-xl font-semibold">
              {family?.name ?? familyId}
              <span className="ml-2 text-sm text-slate-500">#{familyId} · {members.length} вид(ов)</span>
            </h2>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {members.map((a) => (
                <article key={a.no} className="border rounded p-4">
                  <header className="flex items-baseline justify-between">
                    <h3 className="font-semibold">
                      <Link to={`/aniimos/${a.no}`} className="hover:underline">#{a.no} {a.name}</Link>
                    </h3>

                    <span className="text-xs text-slate-500">форм: {a.forms.length}</span>
                  </header>

                  <ul className="mt-3 space-y-3">
                    {a.forms.map((f) => {
                      const formInfo = formById.get(f.form_id);

                      return (
                        <li key={f.form_id} className="border-l-2 border-slate-200 pl-3 flex gap-3">
                          {f.image && (
                            <img
                              src={`${import.meta.env.BASE_URL}${f.image}`}
                              alt=""
                              className="w-16 h-16 object-contain shrink-0"
                            />
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium">{formInfo?.name ?? f.form_id}</span>
                              {f.is_final && <Badge color="emerald">финал</Badge>}
                              {formInfo?.is_rare && <Badge color="violet">редкий</Badge>}
                            </div>

                            <div className="text-sm text-slate-600 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="text-slate-400">Элементы:</span>

                              {f.element_ids.map((id) => {
                                const el = elementById.get(id);

                                return el ? (
                                  <span key={id} className="inline-flex items-center gap-1">
                                    <Icon src={el.icon} alt={el.name} size={16} />
                                    {el.name}
                                  </span>
                                ) : (
                                  <span key={id}>{id}</span>
                                );
                              })}
                            </div>

                            <div className="text-sm text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="text-slate-400">Способности:</span>
                              {f.home_abilities.map((ha) => {
                                const ab = homeAbilityById.get(ha.id);

                                return ab ? (
                                  <span key={ha.id} className="inline-flex items-center gap-1">
                                    <Icon src={ab.icon} alt={ab.name} size={16} />
                                    {ab.name} ур.{ha.level}
                                  </span>
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
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Badge({ color, children }: { color: "emerald" | "violet"; children: ReactNode }) {
  const cls = color === "emerald"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-violet-100 text-violet-700";

  return <span className={`text-xs px-1.5 py-0.5 rounded ${cls}`}>{children}</span>;
}
