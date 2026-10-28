import { useState } from "react";

import { Card } from "@/components/Card";
import { ElementBadge } from "@/components/ElementBadge";
import { useElementsStore } from "@/store/elements.store";

export function ElementsPage() {
  const elements = useElementsStore((s) => s.data);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="p-6 mx-auto space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary">Элементы</h1>

      <div className="space-y-3">
        {elements.map((el) => (
          <Card className="p-4" key={el.id}>
            <button
              className="flex gap-3 justify-between items-center w-full text-left"
              onClick={() => setOpen(open === el.id ? null : el.id)}
              type="button"
            >
              <div className="flex gap-3 items-center">
                <ElementBadge color={el.color} name={el.name} size="md" />
                <span className="text-sm text-tertiary">{el.id}</span>
              </div>

              <div className="flex gap-3 text-sm text-secondary">
                <span>Анимо: <strong className="text-primary">{el.aniimo_count}</strong></span>
                <span>Строения: <strong className="text-primary">{el.facility_count}</strong></span>
              </div>
            </button>

            {open === el.id && (
              <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-primary uppercase">Анимо</h3>
                  {el.aniimos.length === 0 ? (
                    <p className="text-sm text-tertiary">Нет</p>
                  ) : (
                    <ul className="space-y-1 text-sm text-secondary">
                      {el.aniimos.map((a) => (
                        <li key={`${a.no}:${a.form_id}`}>
                          <a className="hover:underline" href={`#/aniimos/${a.no}-${a.form_id}`}>
                            #{a.no} {a.name} ({a.form_id})
                          </a>
                          {" "}
                          <span className="text-tertiary">ур.{a.level}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-semibold text-primary uppercase">Строения</h3>
                  {el.facilities.length === 0 ? (
                    <p className="text-tertiary text-sm">Нет</p>
                  ) : (
                    <ul className="space-y-1 text-sm text-secondary">
                      {el.facilities.map((f) => (
                        <li key={f.facility_id}>
                          <span className="text-primary">{f.facility_name}</span>
                          <span className="text-tertiary"> · {f.copies} коп.</span>
                          {" "}
                          {f.modes.map((m) => (
                            <span className="text-tertiary" key={m.mode_id}>
                              {m.mode_name} (ур.{m.required_ability_level})
                            </span>
                          ))}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

