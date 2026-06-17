import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { DiscordLogo } from '@/components/ui/icons';
import { ORGANISATION } from '@/lib/constants';
import { cn } from '@/lib/utils';

const SOLID_HOVER_SHADOW = 'hover:shadow-[0_8px_20px_rgba(245,197,24,0.3)]';
const OUTLINED_HOVER_SHADOW = 'hover:shadow-[0_8px_20px_rgba(245,197,24,0.25)]';

const discordCtaLinkVariants = cva(
  'inline-flex items-center rounded-full transition motion-reduce:transition-none motion-reduce:hover:translate-y-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  {
    variants: {
      variant: {
        solid: cn('bg-brand-yellow font-bold text-brand-near-black', SOLID_HOVER_SHADOW),
        outlined: cn(
          'border border-brand-yellow/30 bg-brand-yellow/12 font-semibold text-brand-yellow hover:border-brand-yellow/50 hover:bg-brand-yellow/20',
          OUTLINED_HOVER_SHADOW
        ),
      },
      size: {
        sm: 'gap-2 px-4 py-[9px] text-sm [&_svg]:size-4!',
        md: 'gap-2 px-5 py-2.5 text-[15px] font-bold [&_svg]:size-[18px]!',
        lg: 'gap-2.5 px-7 py-4 text-base [&_svg]:size-5!',
        xl: 'gap-2.5 px-8 py-4 text-[17px] [&_svg]:size-[22px]!',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  }
);

/** Props for {@link DiscordCtaLink}. */
export interface DiscordCtaLinkProps extends VariantProps<typeof discordCtaLinkVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * External Discord CTA link — solid yellow (nav/hero) or outlined ghost (footer on dark).
 */
function DiscordCtaLink({ children, variant, size, className, onClick }: DiscordCtaLinkProps) {
  return (
    <a
      href={ORGANISATION.DISCORD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(discordCtaLinkVariants({ variant, size }), className)}
      onClick={onClick}
    >
      <DiscordLogo aria-hidden />
      {children}
    </a>
  );
}

export default DiscordCtaLink;
