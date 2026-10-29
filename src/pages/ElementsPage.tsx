import { useState } from 'react';

import { AniimoAvatar } from '@/components/AniimoAvatar';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { useElementsStore } from '@/store/elements.store';

export function ElementsPage() {
  const elements = useElementsStore((s) => s.data);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="p-6 mx-auto space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary">Элементы</h1>

      <div className="space-y-3">
        {elements.map((el) => (
          <Card className="overflow-hidden p-4" key={el.id}>
            <button
              className="flex flex-wrap gap-3 justify-between items-center w-full text-left"
              onClick={() => setOpenId(openId === el.id ? null : el.id)}
              type="button"
            >
              <div className="flex gap-3 items-center">
                <ElementBadge color={el.color} name={el.name} size="md" />
                <span className="text-sm text-tertiary">{el.id}</span>
              </div>

              <div className="flex gap-4 text-sm text-secondary">
                <span>Анимо: <strong className="text-primary">{el.aniimo_count}</strong></span>
                <span>Строения: <strong className="text-primary">{el.facility_count}</strong></span>
              </div>
            </button>

            {openId === el.id && (
              <div className="grid gap-6 pt-4 mt-4 border-t border-secondary md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xs font-bold text-tertiary uppercase">Анимо с этим элементом</h3>

                  {el.aniimos.length === 0 ? (
                    <p className="text-sm text-tertiary">Нет</p>
                  ) : (
                    <ul className="space-y-1.5 text-sm text-secondary">
                      {el.aniimos.map((a) => (
                        <li className="flex gap-2 justify-between items-center" key={`${a.no}:${a.form_id}`}>
                          <div className="flex gap-2 items-center min-w-0">
                            <AniimoAvatar colors={a.element_colors} name={a.name} size="sm" />

                            <a
                              className="text-brand-600 truncate hover:underline"
                              href={`#/aniimos/${a.no}-${a.form_id}`}
                            >
                              #{a.no} {a.name} ({a.form_id})
                            </a>
                          </div>

                          <span className="shrink-0 text-tertiary">ур.{a.level}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-bold text-tertiary uppercase">Требуется на строениях</h3>

                  {el.facilities.length === 0 ? (
                    <p className="text-sm text-tertiary">Нет</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-secondary">
                      {el.facilities.map((f) => (
                        <li key={f.facility_id}>
                          <div className="font-medium text-primary">
                            {f.facility_name} <span className="text-xs text-tertiary">({f.copies} коп.)</span>
                          </div>

                          <div className="text-xs text-tertiary">
                            {f.modes.map((m) => `${m.mode_name}: ур.${m.required_ability_level}`).join(' · ')}
                          </div>
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
