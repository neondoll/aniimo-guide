import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';

export function HomeAbilitiesPage() {
  const homeAbilities = useHomeAbilitiesStore((s) => s.data);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-primary">Способности дома</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {homeAbilities.map((ha) => (
          <Card className="flex flex-col gap-2 p-4" key={ha.id}>
            <ElementBadge color={ha.color} name={ha.name} size="md" />
            <div className="text-xs text-tertiary">{ha.id}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
