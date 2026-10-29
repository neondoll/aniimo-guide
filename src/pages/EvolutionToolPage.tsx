import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { Badge } from '@/components/base/badges/badges';
import { RequiredPersonalityPills } from '@/components/TraitAxisPills';
import { PERSONALITY_LABELS, type PersonalitySide } from '@/constants/personality-labels';
import { rankBranches } from '@/lib/personalityScore';
import { useAniimosStore } from '@/store/aniimos.store';
import { useFormsStore } from '@/store/forms.store';
import { useRecommendationsStore } from '@/store/recommendations.store';
import { useRegionsStore } from '@/store/regions.store';
import type { Personality } from '@/types/personality';
import type { Form } from '@/types/form';

export function EvolutionToolPage() {
  const aniimos = useAniimosStore((s) => s.data);
  const forms = useFormsStore((s) => s.data);
  const recommendations = useRecommendationsStore((s) => s.data.forms);
  const regions = useRegionsStore((s) => s.data);

  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedNo, setSelectedNo] = useState<string>('');
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [personality, setPersonality] = useState<Partial<Personality>>({});
  const personalityComplete = Object.keys(personality).length === 4;

  // Ключ — просто string, чтобы не плясать с cast'ами
  const formById = useMemo(() => {
    const map = new Map<string, Form>();
    for (const f of forms) map.set(f.id, f);
    return map;
  }, [forms]);

  const aniimosInRegion = useMemo(() => {
    if (!selectedRegion) return [];
    return aniimos.filter((a) =>
      a.forms.some((f) => (f.region ?? a.region) === selectedRegion),
    );
  }, [aniimos, selectedRegion]);

  const selectedAniimo = aniimosInRegion.find((a) => a.no === selectedNo);

  const formsInRegion = useMemo(() => {
    if (!selectedAniimo) return [];
    return selectedAniimo.forms.filter(
      (f) => (f.region ?? selectedAniimo.region) === selectedRegion,
    );
  }, [selectedAniimo, selectedRegion]);

  const branches = useMemo(() => {
    if (!selectedNo || !selectedForm || !selectedRegion) return [];
    const rec = recommendations[`${selectedRegion}:${selectedNo}:${selectedForm}`];
    if (!rec) return [];
    return rankBranches(personality, rec.evolution_branches);
  }, [personality, recommendations, selectedNo, selectedForm, selectedRegion]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary">Калькулятор эволюции</h1>
      <p className="text-secondary">
        Выберите регион, анимо, его текущую форму и характер, чтобы узнать, куда его лучше эволюционировать.
      </p>

      <div className="space-y-4">
        {/* Регион */}
        <label className="block">
          <span className="text-sm font-medium text-primary">Регион</span>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedNo('');
              setSelectedForm('');
            }}
          >
            <option value="">— выберите —</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </label>

        {/* Анимо */}
        {selectedRegion && (
          <label className="block">
            <span className="text-sm font-medium text-primary">Анимо</span>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={selectedNo}
              onChange={(e) => {
                setSelectedNo(e.target.value);
                setSelectedForm('');
              }}
            >
              <option value="">— выберите —</option>
              {aniimosInRegion.map((a) => (
                <option key={a.no} value={a.no}>#{a.no} {a.name}</option>
              ))}
            </select>
          </label>
        )}

        {/* Форма */}
        {selectedAniimo && (
          <label className="block">
            <span className="text-sm font-medium text-primary">Текущая форма</span>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
            >
              <option value="">— выберите —</option>
              {formsInRegion
                .filter((f) => !f.is_final)
                .map((f) => (
                  <option key={f.form} value={f.form}>
                    {formById.get(f.form)?.name ?? f.form}
                  </option>
                ))}
            </select>
          </label>
        )}

        {/* Характер */}
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-secondary bg-secondary/30 p-4">
          <span className="text-sm text-tertiary">Характер анимо:</span>
          {(
            [
              ['EI', ['E', 'I']],
              ['SN', ['S', 'N']],
              ['TF', ['T', 'F']],
              ['JP', ['J', 'P']],
            ] as const
          ).map(([axis, sides]) => (
            <div
              key={axis}
              className="inline-flex items-center gap-0.5 rounded-lg border border-secondary bg-primary p-0.5"
            >
              {sides.map((side) => (
                <button
                  key={side}
                  type="button"
                  title={PERSONALITY_LABELS[side as PersonalitySide]}
                  onClick={() =>
                    setPersonality({
                      ...personality,
                      [axis]: personality[axis] === side ? undefined : side,
                    } as Partial<Personality>)
                  }
                  className={`inline-flex h-7 min-w-[32px] items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
                    personality[axis] === side
                      ? 'bg-brand-600 text-white'
                      : 'text-secondary hover:bg-secondary/60'
                  }`}
                >
                  {side}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Результаты */}
        {branches.length > 0 && (
          <Card className="p-5 space-y-3">
            <h2 className="font-semibold text-primary text-lg">Рекомендуемые эволюции</h2>
            <ul className="space-y-3">
              {branches.map((b) => (
                <li
                  key={`${b.to_no}:${b.to_form}`}
                  className={`flex flex-wrap items-center gap-2 text-sm ${
                    !b.available && !b.unknown ? 'opacity-50' : ''
                  }`}
                >
                  <span className="text-tertiary">{!b.available && !b.unknown ? '🔒' : '→'}</span>
                  <Link
                    to={`/aniimos/${b.to_region ?? selectedRegion}/${b.to_no}-${b.to_form}`}
                    className={`hover:underline ${
                      b.recommended ? 'font-bold text-emerald-700' : 'text-secondary'
                    }`}
                  >
                    #{b.to_no} ({formById.get(b.to_form)?.name ?? b.to_form})
                  </Link>
                  {b.requires_personality && (
                    <RequiredPersonalityPills personality={b.requires_personality} />
                  )}
                  {b.recommended && <Badge color="success" size="sm">рекомендуется</Badge>}
                  {!b.available && !b.unknown && (
                    <span className="text-xs text-red-600">не подходит</span>
                  )}
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

