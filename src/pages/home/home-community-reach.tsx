import MarketingSection from '@/components/marketing/marketing-section';
import SectionHeader from '@/components/marketing/section-header';
import StatCard from '@/components/marketing/stat-card';
import { COMMUNITY_STATS } from '@/lib/constants';

/**
 * State and territory member statistics.
 */
function HomeCommunityReach() {
  return (
    <MarketingSection id="community-reach" className="border-y border-brand-border-warm bg-brand-surface-warm">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeader
          constrained
          eyebrow="Where we're based"
          title="In every state and territory."
          description="No matter where you're from, there's a VAIT crew nearby. We're in every state and territory — and a fair few of us overseas, too."
        />

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
          {COMMUNITY_STATS.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} variant={stat.variant} />
          ))}
        </div>
      </div>
    </MarketingSection>
  );
}

export default HomeCommunityReach;
