import { useState } from 'react';

import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';

export function HomeAbilitiesPage() {
  const abilities = useHomeAbilitiesStore((s) => s.data);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary">Способности дома</h1>
      <div className="space-y-3">
        {abilities.map((ab) => (
          <Card key={ab.id} className="p-4 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(openId === ab.id ? null : ab.id)}
              className="w-full flex flex-wrap items-center justify-between gap-3 text-left"
            >
              <div className="flex items-center gap-3">
                <ElementBadge name={ab.name} color={ab.color} size="md" />
                <span className="text-sm text-tertiary">{ab.id}</span>
              </div>
              <div className="flex gap-4 text-sm text-secondary">
                <span>Анимо: <strong className="text-primary">{ab.aniimo_count}</strong></span>
                <span>Строения: <strong className="text-primary">{ab.facility_count}</strong></span>
              </div>
            </button>

            {openId === ab.id && (
              <div className="mt-4 pt-4 border-t border-secondary grid gap-6 md:grid-cols-2 animate-fadeIn">
                <div>
                  <h3 className="text-xs font-bold text-tertiary uppercase mb-2">Анимо со способностью</h3>
                  {ab.aniimos.length === 0 ? (
                    <p className="text-sm text-tertiary">Нет</p>
                  ) : (
                    <ul className="space-y-1.5 text-sm text-secondary">
                      {ab.aniimos.map((a) => (
                        <li key={`${a.no}:${a.form_id}`} className="flex justify-between">
                          <a href={`#/aniimos/${a.no}-${a.form_id}`} className="hover:underline text-brand-600">
                            #{a.no} {a.name} ({a.form_id})
                          </a>
                          <span className="text-tertiary">ур.{a.level}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-tertiary uppercase mb-2">Требуется на строениях</h3>
                  {ab.facilities.length === 0 ? (
                    <p className="text-sm text-tertiary">Нет</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-secondary">
                      {ab.facilities.map((f) => (
                        <li key={f.facility_id}>
                          <div className="text-primary font-medium">{f.facility_name}
                            <span className="text-tertiary text-xs">({f.copies} коп.)</span></div>
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
