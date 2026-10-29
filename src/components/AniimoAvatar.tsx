import { cx } from '@/utils/cx';

interface AniimoAvatarProps {
  className?: string;
  colors: string[];
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: 'w-8 h-8 text-xs rounded-md',
  md: 'w-10 h-10 text-sm rounded-lg',
  lg: 'w-16 h-16 text-2xl rounded-xl',
} as const;

function getInitials(name: string): string {
  const trimmed = name.trim();

  if (!trimmed) return '?';

  return trimmed.slice(0, 2).toUpperCase();
}

function buildBackground(colors: string[]): string {
  if (colors.length === 0) return '#94a3b8'; // slate-400

  if (colors.length === 1) return colors[0];

  return `linear-gradient(135deg, ${colors.slice(0, 2).join(', ')})`;
}

export function AniimoAvatar({ className, colors, name, size = 'md' }: AniimoAvatarProps) {
  const background = buildBackground(colors);
  const initials = getInitials(name);

  return (
    <div
      aria-hidden="true"
      className={cx(
        'inline-flex shrink-0 justify-center items-center font-bold shadow-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]',
        SIZE_MAP[size],
        className,
      )}
      style={{ background }}
      title={name}
    >
      {initials}
    </div>
  );
}
