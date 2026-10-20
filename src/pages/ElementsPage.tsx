import { Card } from '@/components/Card';
import { ElementBadge } from '@/components/ElementBadge';
import { useElementsStore } from '@/store/elements.store';

export function ElementsPage() {
  const elements = useElementsStore((s) => s.data);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-primary">Элементы</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {elements.map((el) => (
          <Card className="flex flex-col gap-2 p-4" key={el.id}>
            <ElementBadge color={el.color} name={el.name} size="md" />
            <div className="text-xs text-tertiary">{el.id}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
