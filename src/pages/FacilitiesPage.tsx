import { useMemo } from 'react';

import { Badge } from '@/components/base/badges/badges';
import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
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
          <Card className="p-5 space-y-3" key={f.id}>
            <div className="text-lg font-semibold text-primary">{f.name}</div>
            {f.description && <div className="text-sm text-secondary">{f.description}</div>}

            {f.requires_abilities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {f.requires_abilities.map((id) => {
                  const ha = homeAbilityById.get(id);

                  return <ElementBadge color={ha?.color} key={id} name={ha?.name ?? id} />;
                })}
              </div>
            )}

            {f.requires_families.length > 0 && (
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="text-tertiary">Только семейства:</span>

                {f.requires_families.map((famId) => (
                  <Badge color="purple" key={famId} size="sm">{familyById.get(famId)?.name ?? famId}</Badge>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
