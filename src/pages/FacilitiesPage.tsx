import { useMemo } from 'react';

import { Badge } from '@/components/base';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { useFacilitiesStore } from '@/store/facilities.store';
import { useFamiliesStore } from '@/store/families.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';

export function FacilitiesPage() {
  const facilities = useFacilitiesStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);
  const homeAbilities = useHomeAbilitiesStore((s) => s.data);

  const familyById = useMemo(() => new Map(families.map((f) => [f.id, f])), [families]);
  const homeAbilityById = useMemo(() => new Map(homeAbilities.map((a) => [a.id, a])), [homeAbilities]);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-primary">Строения Родины</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {facilities.map((f) => (
          <Card className="p-4 space-y-2" key={f.id}>
            <div className="font-semibold text-primary">{f.name}</div>
            {f.description && <div className="text-sm text-secondary">{f.description}</div>}

            {f.requires_abilities.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center text-sm text-secondary">
                <span className="shrink-0 text-tertiary">Требуемые способности:</span>

                <div className="flex flex-wrap gap-2 items-center">
                  {f.requires_abilities.map((id) => {
                    const ab = homeAbilityById.get(id);

                    return (
                      <span key={id} className="inline-flex gap-1 items-center">
                      {ab?.icon && <Icon src={ab.icon} alt={ab.name} size={16} />}
                        {ab?.name ?? id}
                    </span>
                    );
                  })}
                </div>
              </div>
            )}

            {f.requires_families.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center text-sm text-secondary">
                <span className="shrink-0 text-tertiary">Только семейства:</span>

                <div className="flex flex-wrap gap-1 items-center">
                  {f.requires_families.map((famId) => (
                    <Badge color="purple" key={famId} size="sm">{familyById.get(famId)?.name ?? famId}</Badge>
                  ))}
                </div>
              </div>
            )}

            {f.preferred_personality && (
              <div className="flex flex-wrap gap-2 items-center text-sm text-secondary">
                <span className="shrink-0 text-tertiary">Предпочтение:</span>

                <div className="flex flex-wrap gap-1.5 items-center">
                  {(['EI', 'SN', 'TF', 'JP'] as const).map((axis) => {
                    const side = f.preferred_personality?.[axis];

                    if (!side) return null;

                    return (
                      <span
                        className="inline-flex justify-center items-center px-1.5 min-w-6 h-6 text-[11px] font-semibold text-primary bg-secondary/40 rounded border border-secondary"
                        key={axis}
                      >
                        {side}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
