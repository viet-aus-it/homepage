import { COMMUNITY_STATS, type CommunityStat } from '@/lib/constants';
import { cn } from '@/lib/utils';
import HomeSection from '@/pages/home-v2/home-section';

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

/**
 * State and territory member statistics.
 */
function HomeCommunityReach() {
  return (
    <HomeSection id="community-reach" className="border-y border-brand-border-warm bg-brand-surface-warm">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow-shade">Where we&apos;re based</p>
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em]">In every state and territory.</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-brand-gray-dark">
            No matter where you&apos;re from, there&apos;s a VAIT crew nearby. We&apos;re in every state and territory — and a fair few of us overseas, too.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
          {COMMUNITY_STATS.map((stat) => {
            const styles = statVariantStyles(stat.variant);

            return (
              <div key={stat.label} className={cn('rounded-[14px] p-5', styles.card)}>
                <div className={cn('font-display text-[30px] font-extrabold leading-none', styles.valueAccent && 'text-brand-yellow')}>{stat.value}</div>
                <div className={cn('mt-1.5 text-[13px]', styles.label)}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </HomeSection>
  );
}

export default HomeCommunityReach;
