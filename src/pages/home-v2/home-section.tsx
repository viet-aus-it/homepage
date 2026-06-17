import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Shared horizontal + vertical padding for landing sections (inner container only). */
export const HOME_SECTION_INNER = 'mx-auto w-full max-w-7xl px-5 py-16 md:px-12 md:py-24';

interface HomeSectionProps {
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
 * Landing section shell: outer `section` owns surface styles; inner container owns spacing.
 */
function HomeSection({ id, className, innerClassName, children, fullBleed = false }: HomeSectionProps) {
  if (fullBleed) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={className}>
      <div className={cn(HOME_SECTION_INNER, innerClassName)}>{children}</div>
    </section>
  );
}

export default HomeSection;
