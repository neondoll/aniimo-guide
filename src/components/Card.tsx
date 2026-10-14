// src/components/Card.tsx
import type { ReactNode } from 'react';

import { cx } from '@/utils/cx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cx('bg-primary rounded-xl border border-secondary shadow-xs', className)}>
      {children}
    </div>
  );
}
