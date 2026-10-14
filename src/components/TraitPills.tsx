import { type ReactNode } from 'react';

import { PRIORITY_CLASS, PRIORITY_TITLE } from '@/lib/traitStyles';
import type { FormTraitProfile, Priority } from '@/types/recommendations';
import { cx } from '@/utils/cx';

export function TraitPills({ traits }: { traits: FormTraitProfile }) {
  const axes: Array<keyof FormTraitProfile> = ['EI', 'SN', 'TF', 'JP'];
  const groups: ReactNode[] = [];

  for (const axis of axes) {
    const votes = traits[axis];

    if (!votes || votes.length === 0) continue;

    groups.push(
      <span
        className="inline-flex gap-0.5 items-center p-0.5 bg-secondary/40 rounded-md border border-secondary"
        key={axis}
      >
        {votes.map((v) => <TraitPill key={v.side} priority={v.priority} side={v.side} />)}
      </span>,
    );
  }

  if (groups.length === 0) {
    return <span className="text-tertiary">—</span>;
  }

  return <div className="flex flex-wrap items-center gap-1.5">{groups}</div>;
}

function TraitPill({ side, priority }: { side: string; priority: Priority }) {
  return (
    <span
      className={cx(
        'inline-flex justify-center items-center px-1.5 min-w-6 h-6 text-[11px] font-semibold leading-none rounded',
        PRIORITY_CLASS[priority],
      )}
      title={PRIORITY_TITLE[priority]}
    >
      {side}
    </span>
  );
}
