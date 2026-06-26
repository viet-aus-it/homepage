import type { CommunityStat } from '@/lib/constants';
import { cn } from '@/lib/utils';

type StatVariant = NonNullable<CommunityStat['variant']> | 'default';

const STAT_VARIANT_STYLES: Record<StatVariant, { card: string; label: string; valueAccent: boolean }> = {
  default: {
    card: 'border border-brand-border-warm bg-white',
    label: 'text-brand-gray',
    valueAccent: false,
  },
  dark: {
    card: 'bg-brand-near-black text-white',
    label: 'text-brand-on-dark-subtle',
    valueAccent: true,
  },
  yellow: {
    card: 'bg-brand-yellow text-brand-near-black',
    label: 'font-semibold text-brand-yellow-emphasis',
    valueAccent: false,
  },
};

function statVariantStyles(variant?: CommunityStat['variant']) {
  return STAT_VARIANT_STYLES[variant ?? 'default'];
}

interface StatCardProps {
  value: string;
  label: string;
  variant?: CommunityStat['variant'];
  className?: string;
}

/**
 * Member or credibility stat tile shared across home and community pages.
 */
function StatCard({ value, label, variant, className }: StatCardProps) {
  const styles = statVariantStyles(variant);

  return (
    <div className={cn('rounded-[14px] p-5', styles.card, className)}>
      <div className={cn('font-display text-[30px] font-extrabold leading-none', styles.valueAccent && 'text-brand-yellow')}>{value}</div>
      <div className={cn('mt-1.5 text-[13px]', styles.label)}>{label}</div>
    </div>
  );
}

export default StatCard;
