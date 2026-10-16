import type { PartialPersonality } from '@/types/personality';
import { cx } from '@/utils/cx';

const AXES: Array<{ axis: keyof PartialPersonality; sides: [string, string] }> = [
  { axis: 'EI', sides: ['E', 'I'] },
  { axis: 'SN', sides: ['S', 'N'] },
  { axis: 'TF', sides: ['T', 'F'] },
  { axis: 'JP', sides: ['J', 'P'] },
];

export function FixedPersonalityBadges({ personality }: { personality: PartialPersonality }) {
  const groups = AXES.map(({ axis, sides }) => {
    const fixedSide = personality[axis];

    if (!fixedSide) return null;

    return (
      <span
        className="inline-flex gap-0.5 items-center p-0.5 bg-red-50 rounded-md border border-red-200"
        key={axis}
        title={`Черта «${fixedSide}» закреплена за этой формой и не может быть изменена`}
      >
        {sides.map((side) => <Pill key={side} side={side} fixed={side === fixedSide} />)}
      </span>
    );
  });

  const visible = groups.filter(Boolean);

  if (visible.length === 0) {
    return <span className="text-tertiary">—</span>;
  }

  return <div className="flex flex-wrap gap-2 items-center">{visible}</div>;
}

function Pill({ side, fixed }: { side: string; fixed: boolean }) {
  return (
    <span
      className={cx(
        'inline-flex justify-center items-center px-1.5 min-w-6 h-6 text-[11px] font-semibold leading-none rounded',
        fixed ? 'text-white bg-red-500' : 'text-red-300 line-through decoration-red-300',
      )}
    >
      {side}
    </span>
  );
}
