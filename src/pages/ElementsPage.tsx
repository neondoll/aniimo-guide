import { Card } from '@/components/Card';
// import { Icon } from '@/components/Icon';
import { useElementsStore } from '@/store/elements.store';

export function ElementsPage() {
  const elements = useElementsStore((s) => s.data);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-primary">Элементы</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {elements.map((el) => (
          <Card className="flex gap-3 items-center p-4" key={el.id}>
            {/* <Icon alt={el.name} size={32} src={el.icon} /> */}

            <div>
              <div className="font-semibold text-primary">{el.name}</div>
              <div className="text-xs text-tertiary">{el.id}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
