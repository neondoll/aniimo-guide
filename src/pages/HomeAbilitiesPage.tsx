import { Card } from '@/components/Card';
// import { Icon } from '@/components/Icon';
import { useHomeAbilitiesStore } from '@/store/home-abilities.store';

export function HomeAbilitiesPage() {
  const abilities = useHomeAbilitiesStore((s) => s.data);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-primary">Способности дома</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {abilities.map((ab) => (
          <Card className="flex gap-3 items-center p-4" key={ab.id}>
            {/* <Icon alt={ab.name} size={32} src={ab.icon} /> */}

            <div>
              <div className="font-semibold text-primary">{ab.name}</div>
              {ab.description && <div className="mt-0.5 text-xs text-secondary">{ab.description}</div>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
