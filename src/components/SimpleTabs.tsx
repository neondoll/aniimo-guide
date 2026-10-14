import { useState, type ReactNode } from 'react';

import { cx } from '@/utils/cx';

interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  badge?: string;
}

interface SimpleTabsProps {
  items: TabItem[];
  initialId?: string;
}

export function SimpleTabs({ items, initialId }: SimpleTabsProps) {
  const [activeId, setActiveId] = useState(initialId ?? items[0]?.id ?? '');

  return (
    <div>
      <div className="flex overflow-x-auto gap-1 border-b border-secondary" role="tablist">
        {items.map((item) => {
          const active = item.id === activeId;

          return (
            <button
              aria-selected={active}
              className={cx(
                'px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                active
                  ? 'text-brand-700 border-brand-600'
                  : 'text-tertiary border-transparent hover:text-secondary',
              )}
              key={item.id}
              onClick={() => setActiveId(item.id)}
              role="tab"
              type="button"
            >
              {item.label}
              {item.badge && <span className="ml-2 text-xs text-tertiary">{item.badge}</span>}
            </button>
          );
        })}
      </div>

      <div className="pt-4">{items.find((i) => i.id === activeId)?.content}</div>
    </div>
  );
}
