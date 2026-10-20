import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { RequiredPersonalityPills } from '@/components/TraitAxisPills';
import { PERSONALITY_LABELS, type PersonalityAxis, type PersonalitySide } from '@/constants/personality-labels';
import { rankBranches } from '@/lib/personalityScore';
import { useAniimosStore } from '@/store/aniimos.store';
import { useFormsStore } from '@/store/forms.store';
import { useRecommendationsStore } from '@/store/recommendations.store';
import type { Personality } from '@/types/personality';
import { cx } from '@/utils/cx'

export function EvolutionToolPage() {
  const aniimos = useAniimosStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const recommendations = useRecommendationsStore((s) => s.data.forms);

  const [selectedNo, setSelectedNo] = useState<string>('');
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [personality, setPersonality] = useState<Partial<Personality>>({});
  const personalityComplete = Object.keys(personality).length === 4;

  const formById = useMemo(() => new Map(forms.map((f) => [f.id, f])), [forms]);
  const selectedAniimo = aniimos.find((a) => a.no === selectedNo);

  const branches = useMemo(() => {
    if (!selectedAniimo || !selectedForm) return [];

    const rec = recommendations[`${selectedNo}:${selectedForm}`];

    if (!rec) return [];

    return rankBranches(personality, rec.evolution_branches);
  }, [selectedAniimo, selectedForm, personality, recommendations, selectedNo]);

  return (
    <div className="p-6 mx-auto space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary">Калькулятор эволюции</h1>

      <p className="text-secondary">
        Выберите анимо, его текущую форму и характер, чтобы узнать, куда его лучше эволюционировать.
      </p>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-primary">Анимо</span>

          <select
            className="block p-2 mt-1 w-full rounded-md border border-gray-300 shadow-sm"
            onChange={(e) => {
              setSelectedNo(e.target.value);
              setSelectedForm('');
            }}
            value={selectedNo}
          >
            <option value="">— выберите —</option>
            {aniimos.map((a) => <option key={a.no} value={a.no}>#{a.no} {a.name}</option>)}
          </select>
        </label>

        {selectedAniimo && (
          <label className="block">
            <span className="text-sm font-medium text-primary">Текущая форма</span>

            <select
              className="block p-2 mt-1 w-full rounded-md border border-gray-300 shadow-sm"
              onChange={(e) => setSelectedForm(e.target.value)}
              value={selectedForm}
            >
              <option value="">— выберите —</option>

              {selectedAniimo.forms.filter((f) => !f.is_final).map((f) => (
                <option key={f.form_id} value={f.form_id}>{formById.get(f.form_id)?.name ?? f.form_id}</option>
              ))}
            </select>
          </label>
        )}

        <div className="flex flex-wrap gap-3 items-center p-4 bg-secondary/30 rounded-lg border border-secondary">
          <span className="text-sm text-tertiary">Характер анимо:</span>

          {([['EI', ['E', 'I']], ['SN', ['S', 'N']], ['TF', ['T', 'F']], ['JP', ['J', 'P']]] as [PersonalityAxis, PersonalitySide[]][])
            .map(([axis, sides]) => (
              <div
                className="inline-flex gap-0.5 items-center p-0.5 bg-primary rounded-lg border border-secondary"
                key={axis}
              >
                {sides.map((side) => (
                  <button
                    className={cx(
                      'inline-flex justify-center items-center px-2 min-w-8 h-7 text-sm font-medium rounded-md transition-colors',
                      personality[axis] === side ? 'text-white bg-brand-600' : 'text-secondary hover:bg-secondary/60',
                    )}
                    key={side}
                    onClick={() => setPersonality({
                      ...personality,
                      [axis]: personality[axis] === side ? undefined : side,
                    } as Partial<Personality>)}
                    title={PERSONALITY_LABELS[side]}
                    type="button"
                  >
                    {side}
                  </button>
                ))}
              </div>
            ))}
        </div>

        {branches.length > 0 && (
          <Card className="p-5 space-y-3">
            <h2 className="text-lg font-semibold text-primary">Рекомендуемые эволюции</h2>

            <ul className="space-y-3">
              {branches.map((b) => (
                <li
                  className={cx(
                    'flex flex-wrap gap-2 items-center text-sm',
                    !b.available && !b.unknown ? 'opacity-50' : '',
                  )}
                  key={`${b.to_no}:${b.to_form_id}`}
                >
                  <span className="text-tertiary">{!b.available && !b.unknown ? '🔒' : '→'}</span>

                  <Link
                    className={cx(
                      'hover:underline',
                      b.recommended ? 'font-bold text-emerald-700' : 'text-secondary',
                    )}
                    to={`/aniimos/${b.to_no}-${b.to_form_id}`}
                  >
                    #{b.to_no} ({formById.get(b.to_form_id)?.name ?? b.to_form_id})
                  </Link>

                  {b.requires_personality && <RequiredPersonalityPills personality={b.requires_personality} />}
                  {b.recommended && <Badge color="success" size="sm">рекомендуется</Badge>}
                  {!b.available && !b.unknown && <span className="text-xs text-red-600">не подходит</span>}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {personalityComplete && branches.length === 0 && selectedForm && (
          <p className="text-tertiary text-sm">Нет доступных эволюций для выбранной формы.</p>
        )}
      </div>
    </div>
  );
}
