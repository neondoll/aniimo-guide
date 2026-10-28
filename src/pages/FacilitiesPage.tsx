import { useMemo } from 'react';

import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { useFacilitiesStore } from '@/store/facilities.store';
import { useFamiliesStore } from '@/store/families.store';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';

export function FacilitiesPage() {
  const facilities = useFacilitiesStore((s) => s.data);
  const abilities = useHomeAbilitiesStore((s) => s.data);
  const families = useFamiliesStore((s) => s.data);

  const abilityById = useMemo(() => new Map(abilities.map((a) => [a.id, a])), [abilities]);
  const familyById = useMemo(() => new Map(families.map((f) => [f.id, f])), [families]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Строения Родины</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {facilities.map((f) => (
          <Card key={f.id} className="p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-primary text-lg">{f.name}</div>
                {f.copies > 0 && <Badge color="gray" size="sm">{f.copies} коп.</Badge>}
              </div>
              {f.description && <div className="text-sm text-secondary mt-1">{f.description}</div>}

              {f.requires_abilities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {f.requires_abilities.map((id) => {
                    const ab = abilityById.get(id);
                    return <ElementBadge key={id} name={ab?.name ?? id} color={ab?.color} />;
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              {f.modes && f.modes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {f.modes.map((m) => (
                    <Badge key={m.id} color="sky" size="sm">
                      {m.name}: ур.{m.required_ability_level}
                    </Badge>
                  ))}
                </div>
              )}

              {f.requires_families.length > 0 && (
                <div className="flex flex-wrap gap-2 text-sm pt-2">
                  <span className="text-tertiary">Только семейства:</span>
                  {f.requires_families.map((famId) => (
                    <Badge key={famId} color="purple" size="sm">{familyById.get(famId)?.name ?? famId}</Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
