import type { ReactNode } from 'react';

import { PAGE_SECTION_INNER } from '@/components/site/page-section';
import { cn } from '@/lib/utils';

interface CtaBandProps {
  variant?: 'dark';
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/**
 * Full-width call-to-action band with dot-grid texture on dark surfaces.
 */
function CtaBand({ variant = 'dark', title, description, children, className, innerClassName }: CtaBandProps) {
  return (
    <section className={cn('relative overflow-hidden', variant === 'dark' && 'bg-brand-near-black', className)}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1.5px)] bg-size-[24px_24px]"
        aria-hidden
      />
      <div className={cn(PAGE_SECTION_INNER, 'relative max-w-3xl text-center', innerClassName)}>
        <h2 className="font-display text-[clamp(2.125rem,7vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white">{title}</h2>
        {description ? (
          <div className="mx-auto mt-5 max-w-[520px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-brand-on-dark-muted">{description}</div>
        ) : null}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">{children}</div>
      </div>
    </section>
  );
}

export default CtaBand;
