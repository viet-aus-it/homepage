import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  /** Constrain intro copy width for section leads. */
  constrained?: boolean;
}

/**
 * Reusable eyebrow + heading + optional lede block for site page sections.
 */
function SectionHeader({ eyebrow, title, description, className, constrained = false }: SectionHeaderProps) {
  return (
    <div className={cn(constrained && 'max-w-[640px]', className)}>
      {eyebrow ? <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow-shade">{eyebrow}</p> : null}
      <h2 className="font-display text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-[1.07] tracking-[-0.025em]">{title}</h2>
      {description ? <div className="mt-4 text-[17px] leading-relaxed text-brand-gray-dark">{description}</div> : null}
    </div>
  );
}

export default SectionHeader;
