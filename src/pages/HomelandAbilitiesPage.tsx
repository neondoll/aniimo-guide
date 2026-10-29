import { useState } from 'react';

import { AniimoAvatar } from '@/components/AniimoAvatar';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { useHomelandAbilitiesStore } from '@/store/homeland-abilities.store';

export function HomelandAbilitiesPage() {
  const abilities = useHomelandAbilitiesStore((s) => s.data);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="p-6 mx-auto space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary">Способности дома</h1>

      <div className="space-y-3">
        {abilities.map((ab) => (
          <Card className="overflow-hidden p-4" key={ab.id}>
            <button
              className="flex flex-wrap gap-3 justify-between items-center w-full text-left"
              onClick={() => setOpenId(openId === ab.id ? null : ab.id)}
              type="button"
            >
              <div className="flex gap-3 items-center">
                <ElementBadge color={ab.color} name={ab.name} size="md" />
                <span className="text-sm text-tertiary">{ab.id}</span>
              </div>

              <div className="flex gap-4 text-sm text-secondary">
                <span>Анимо: <strong className="text-primary">{ab.aniimo_count}</strong></span>
                <span>Строения: <strong className="text-primary">{ab.facility_count}</strong></span>
              </div>
            </button>

            {openId === ab.id && (
              <div className="grid gap-6 pt-4 mt-4 border-t border-secondary md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xs font-bold text-tertiary uppercase">Анимо со способностью</h3>

                  {ab.aniimos.length === 0 ? (
                    <p className="text-sm text-tertiary">Нет</p>
                  ) : (
                    <ul className="space-y-1.5 text-sm text-secondary">
                      {ab.aniimos.map((a) => (
                        <li className="flex gap-2 justify-between items-center" key={`${a.region}:${a.no}:${a.form}`}>
                          <div className="flex gap-2 items-center min-w-0">
                            <AniimoAvatar colors={a.element_colors} name={a.name} size="sm" />

                            <a
                              className="text-brand-600 truncate hover:underline"
                              href={`#/aniimos/${a.region}/${a.no}-${a.form}`}
                            >
                              #{a.no} {a.name} ({a.form})
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

                  {ab.facilities.length === 0 ? (
                    <p className="text-sm text-tertiary">Нет</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-secondary">
                      {ab.facilities.map((f) => (
                        <li key={f.facility_id}>
                          <div className="text-primary font-medium">
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
