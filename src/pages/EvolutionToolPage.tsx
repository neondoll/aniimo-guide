import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/base'
import { Card } from '@/components/Card';
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
    if (!selectedAniimo || !selectedForm || !personalityComplete) return [];

    const key = `${selectedNo}:${selectedForm}`;
    const rec = recommendations[key];

    if (!rec) return [];

    return rankBranches(personality, rec.evolution_branches);
  }, [selectedAniimo, selectedForm, personality, personalityComplete, recommendations, selectedNo]);

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

        <PersonalityPicker value={personality} onChange={setPersonality} />

        {branches.length > 0 && (
          <Card className="p-4 space-y-2">
            <h2 className="font-semibold text-primary">Рекомендуемые эволюции</h2>

            <ul className="space-y-1">
              {branches.map((b) => (
                <li key={`${b.to_no}:${b.to_form_id}`}>
                  <Link
                    className={`hover:underline ${
                      b.recommended ? 'font-bold text-brand-700' : 'text-secondary'
                    }`}
                    to={`/aniimos/${b.to_no}`}
                  >
                    #{b.to_no} ({formById.get(b.to_form_id)?.name ?? b.to_form_id}) — score {b.score}
                  </Link>

                  {b.recommended && <Badge className="ml-2" color="success" size="sm">рекомендуется</Badge>}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {personalityComplete && branches.length === 0 && selectedForm && (
          <p className="text-tertiary">Нет доступных эволюций для выбранной формы.</p>
        )}
      </div>
    </div>
  );
}

function PersonalityPicker({ value, onChange }: {
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
    <div className="flex flex-wrap gap-3 items-center p-4 bg-secondary/30 rounded-lg border border-secondary">
      <span className="text-sm text-tertiary">Характер анимо:</span>

      {axes.map(([axis, sides]) => (
        <div
          className="inline-flex gap-0.5 items-center p-0.5 bg-primary rounded-lg border border-secondary"
          key={axis}
        >
          {sides.map((side) => (
            <button
              key={side}
              onClick={() =>
                onChange({ ...value, [axis]: value[axis] === side ? undefined : side } as Partial<Personality>)
              }
              type="button"
              className={cx(
                'inline-flex justify-center items-center px-2 min-w-8 h-7 text-sm font-medium rounded-md transition-colors',
                value[axis] === side ? 'text-white bg-brand-600' : 'text-secondary hover:bg-secondary/60',
              )}
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
