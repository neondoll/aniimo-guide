import type { PartialPersonality } from '@/types/personality';
import type { Priority, FormTraitProfile } from '@/types/recommendations';
import { cx } from '@/utils/cx';

export type CellState = Priority | 'none' | 'fixed' | 'impossible' | 'required' | 'preferred' | 'other';

interface AxisCell {
  side: string;
  state: CellState;
}

interface AxisRow {
  axis: string;
  cells: AxisCell[];
}

const AXIS_SIDES: Array<{ axis: string; sides: [string, string] }> = [
  { axis: 'EI', sides: ['E', 'I'] },
  { axis: 'SN', sides: ['S', 'N'] },
  { axis: 'TF', sides: ['T', 'F'] },
  { axis: 'JP', sides: ['J', 'P'] },
];

/** Собирает строки осей из traits и опциональных фиксированных черт. */
function buildRows(traits: FormTraitProfile, fixed?: PartialPersonality): AxisRow[] {
  return AXIS_SIDES.map(({ axis, sides }) => {
    const fixedSide = fixed?.[axis as keyof PartialPersonality];
    const votes = traits[axis as keyof FormTraitProfile] ?? [];
    const voteMap = new Map(votes.map((v) => [v.side, v.priority]));

    const cells: AxisCell[] = sides.map((side) => {
      if (fixedSide === side) return { side, state: 'fixed' };

      if (fixedSide) return { side, state: 'impossible' };

      const priority = voteMap.get(side);

      if (!priority) return { side, state: 'none' };

      return { side, state: priority };
    });

    return { axis, cells };
  });
}

interface TraitAxisPillsProps {
  traits?: FormTraitProfile;
  fixed?: PartialPersonality;
  /** Показывать только оси, где есть фиксированная черта. */
  fixedOnly?: boolean;
}

export function TraitAxisPills({ traits = {}, fixed, fixedOnly = false }: TraitAxisPillsProps) {
  let rows = buildRows(traits, fixed);

  if (fixedOnly) {
    rows = rows.filter((r) => r.cells.some((c) => c.state === 'fixed'));
  }

  const hasContent = rows.some((r) =>
    r.cells.some((c) => c.state !== 'none' && c.state !== 'impossible'),
  );

  if (!hasContent) return <span className="text-tertiary">—</span>;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {rows.map((row) => <AxisPill key={row.axis} cells={row.cells} />)}
    </div>
  );
}

/** Отдельный компонент для требований эволюции. */
export function RequiredPersonalityPills({ personality }: { personality: PartialPersonality }) {
  const rows: AxisRow[] = AXIS_SIDES
    .map(({ axis, sides }) => {
      const required = personality[axis as keyof PartialPersonality];

      if (!required) return null;

      return {
        axis,
        cells: sides.map((side) => ({
          side,
          state: (side === required ? 'required' : 'other') as CellState,
        })),
      };
    })
    .filter((r): r is AxisRow => r !== null);

  if (rows.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {rows.map((row) => <AxisPill key={row.axis} cells={row.cells} />)}
    </div>
  );
}

/** Компактный рендер одного предпочтения строения. */
export function PreferredPersonalityPills({ personality }: { personality: PartialPersonality }) {
  const rows: AxisRow[] = AXIS_SIDES
    .map(({ axis, sides }) => {
      const preferred = personality[axis as keyof PartialPersonality];

      if (!preferred) return null;

      return {
        axis,
        cells: sides.map((side) => ({
          side,
          state: (side === preferred ? 'preferred' : 'other') as CellState,
        })),
      };
    })
    .filter((r): r is AxisRow => r !== null);

  if (rows.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {rows.map((row) => <AxisPill key={row.axis} cells={row.cells} />)}
    </div>
  );
}

function AxisPill({ cells }: { cells: AxisCell[] }) {
  return (
    <span className="inline-flex gap-0.5 items-center p-0.5 bg-secondary/40 rounded-md border border-secondary">
      {cells.map((c) => <Cell key={c.side} {...c} />)}
    </span>
  );
}

function Cell({ side, state }: AxisCell) {
  return (
    <span
      className={cx(
        'inline-flex justify-center items-center px-1.5 min-w-6 h-6 text-[11px] font-semibold leading-none rounded transition-colors',
        state === 'high' && 'text-white bg-emerald-500',
        state === 'medium' && 'text-white bg-amber-500',
        state === 'low' && 'text-slate-500 bg-slate-200',
        state === 'none' && 'text-slate-300 bg-slate-50',
        state === 'fixed' && 'text-white bg-red-500',
        state === 'impossible' && 'text-slate-300 line-through bg-slate-50',
        state === 'required' && 'text-white bg-brand-500',
        state === 'preferred' && 'text-white bg-emerald-500',
        state === 'other' && 'text-slate-300 bg-slate-50',
      )}
      title={titleFor(state)}
    >
      {side}
    </span>
  );
}

function titleFor(state: CellState): string {
  switch (state) {
    case 'high':
      return 'Высокий приоритет';
    case 'medium':
      return 'Средний приоритет';
    case 'low':
      return 'Низкий приоритет';
    case 'none':
      return 'Не рекомендуется';
    case 'fixed':
      return 'Зафиксировано — изменить нельзя';
    case 'impossible':
      return 'Недостижимо на этой форме';
    case 'required':
      return 'Требуется для эволюции';
    case 'preferred':
      return 'Ускоряет работу';
    case 'other':
      return 'Не требуется';
  }
}
