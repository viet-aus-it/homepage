import { Link } from '@tanstack/react-router';

import PageSection from '@/components/site/page-section';
import SectionHeader from '@/components/site/section-header';
import StatCard from '@/components/site/stat-card';
import { COMMUNITY_PATH } from '@/lib/community-content';
import { COMMUNITY_STATS } from '@/lib/constants';

/**
 * State and territory member statistics.
 */
function HomeCommunityReach() {
  return (
    <PageSection id="community-reach" className="border-y border-brand-border-warm bg-brand-surface-warm">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeader
            constrained
            eyebrow="Where we're based"
            title="In every state and territory."
            description="No matter where you're from, there's a VAIT crew nearby. We're in every state and territory — and a fair few of us overseas, too."
          />
          <Link
            to={COMMUNITY_PATH}
            className="mt-6 inline-flex items-center gap-1.5 border-b-2 border-brand-yellow pb-0.5 text-[15px] font-bold text-brand-near-black transition-colors hover:text-brand-gray-dark"
          >
            See the whole map →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
          {COMMUNITY_STATS.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} variant={stat.variant} />
          ))}
        </div>
      </div>
    </PageSection>
  );
}

export default HomeCommunityReach;
