import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Shared horizontal + vertical padding for marketing page sections (inner container only). */
export const MARKETING_SECTION_INNER = 'mx-auto w-full max-w-7xl px-5 py-16 md:px-12 md:py-24';

/** Top padding for sections whose content starts below the fixed landing nav. */
export const MARKETING_NAV_CLEARANCE = 'pt-home-nav';

interface MarketingSectionProps {
  id?: string;
  /** Background, borders, overflow — no spacing. */
  className?: string;
  /** Extra classes on the inner container. */
  innerClassName?: string;
  children: ReactNode;
  /** Skip inner container (full-bleed sections like marquee). */
  fullBleed?: boolean;
}

/**
 * Marketing section shell: outer `section` owns surface styles; inner container owns spacing.
 */
function MarketingSection({ id, className, innerClassName, children, fullBleed = false }: MarketingSectionProps) {
  if (fullBleed) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={className}>
      <div className={cn(MARKETING_SECTION_INNER, innerClassName)}>{children}</div>
    </section>
  );
}

export default MarketingSection;
