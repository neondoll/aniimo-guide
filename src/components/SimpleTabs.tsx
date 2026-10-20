import type { ReactNode } from 'react';

import { cx } from '@/utils/cx';

export interface TabItem {
  id: string;
  label: ReactNode;
  badge?: string;
  content: ReactNode;
}

export function SimpleTabs({ activeId, items, onChange }: {
  activeId: TabItem['id'];
  items: TabItem[];
  onChange: (id: TabItem['id']) => void
}) {
  return (
    <div>
      <div className="flex overflow-x-auto relative gap-1 after:absolute after:inset-0 after:bottom-0 after:-z-1 after:self-end after:h-px after:bg-border-secondary" role="tablist">
        {items.map((item) => {
          const active = item.id === activeId;

          return (
            <button
              aria-selected={active}
              className={cx(
                'px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                active ? 'text-brand-700 border-brand-600' : 'text-tertiary border-transparent hover:text-secondary',
              )}
              key={item.id}
              onClick={() => onChange(item.id)}
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
