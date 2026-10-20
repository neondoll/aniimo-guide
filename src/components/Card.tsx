import type { ReactNode } from 'react';

import { cx } from '@/utils/cx';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('bg-primary rounded-xl border border-secondary shadow-xs', className)}>
      {children}
    </div>
  );
}

