import { COMMUNITY_STATS } from '@/lib/community-stats';
import { cn } from '@/lib/utils';
import HomeSection from '@/pages/home-v2/home-section';

function statCardClasses(variant: (typeof COMMUNITY_STATS)[number]['variant']) {
  switch (variant) {
    case 'dark':
      return 'bg-brand-near-black text-white';
    case 'yellow':
      return 'bg-brand-yellow text-brand-near-black';
    default:
      return 'border border-brand-border-warm bg-white';
  }
}

function statLabelClasses(variant: (typeof COMMUNITY_STATS)[number]['variant']) {
  switch (variant) {
    case 'dark':
      return 'text-brand-on-dark-subtle';
    case 'yellow':
      return 'font-semibold text-brand-yellow-emphasis';
    default:
      return 'text-brand-gray';
  }
}

function statValueClasses(variant: (typeof COMMUNITY_STATS)[number]['variant']) {
  return cn('font-display text-[30px] font-extrabold leading-none', variant === 'dark' && 'text-brand-yellow');
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
          {COMMUNITY_STATS.map((stat) => (
            <div key={stat.label} className={cn('rounded-[14px] p-5', statCardClasses(stat.variant))}>
              <div className={statValueClasses(stat.variant)}>{stat.value}</div>
              <div className={cn('mt-1.5 text-[13px]', statLabelClasses(stat.variant))}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}

export default HomeCommunityReach;
