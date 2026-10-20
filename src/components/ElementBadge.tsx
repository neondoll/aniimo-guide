import { getColorStyles } from '@/lib/colorStyles'
import { cx } from '@/utils/cx.ts'

interface ElementBadgeProps {
  className?: string;
  color?: string;
  level?: number;
  name: string;
  size?: 'sm' | 'md';
}

export function ElementBadge({ className = '', color = '#94a3b8', level, name, size = 'sm' }: ElementBadgeProps) {
  const styles = getColorStyles(color);

  return (
    <span
      className={cx(
        'inline-flex gap-1.5 items-center font-medium rounded-md border',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        className,
      )}
      style={styles}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {name}
      {level !== undefined && <span className="pl-1.5 ml-1 border-l border-current opacity-70">ур.{level}</span>}
    </span>
  );
}
