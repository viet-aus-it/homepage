import { COMMUNITY_STATS } from '@/lib/community-stats';
import { HOME_PATH } from '@/lib/site-nav';

function statCardClasses(variant: (typeof COMMUNITY_STATS)[number]['variant']) {
  switch (variant) {
    case 'dark':
      return 'bg-brand-near-black text-white';
    case 'yellow':
      return 'bg-brand-yellow text-brand-near-black';
    case 'highlight':
      return 'bg-brand-yellow text-brand-near-black';
    default:
      return 'border border-brand-border-warm bg-white';
  }
}

function statLabelClasses(variant: (typeof COMMUNITY_STATS)[number]['variant']) {
  switch (variant) {
    case 'dark':
      return 'text-[#9a9a9a]';
    case 'yellow':
      return 'text-[#7a6406] font-semibold';
    default:
      return 'text-brand-gray';
  }
}

/**
 * State and territory member statistics with in-page map CTA.
 */
function HomeCommunityReach() {
  const mapHref = `${HOME_PATH}#community-reach`;

  return (
    <section id="community-reach" className="border-t border-brand-border-warm bg-brand-surface-warm px-5 py-14 md:px-12 md:py-[90px]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow-shade">Where we&apos;re based</p>
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em]">In every state and territory.</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-brand-gray-dark">
            No matter where you&apos;re from, there&apos;s a VAIT crew nearby. We&apos;re in every state and territory — and a fair few of us overseas, too.
          </p>
          <a href={mapHref} className="mt-7 inline-flex items-center gap-2 border-b-2 border-brand-yellow pb-1 text-base font-bold text-brand-near-black">
            See the whole map →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
          {COMMUNITY_STATS.map((stat) => (
            <div key={stat.label} className={`rounded-[14px] p-5 ${statCardClasses(stat.variant)}`}>
              <div className={`font-display text-[30px] font-extrabold leading-none ${stat.variant === 'dark' ? 'text-brand-yellow' : ''}`}>{stat.value}</div>
              <div className={`mt-1.5 text-[13px] ${statLabelClasses(stat.variant)}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeCommunityReach;
