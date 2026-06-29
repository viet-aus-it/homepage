import { useEffect } from 'react';

import SiteFooter from '@/components/site/site-footer';
import SiteNav from '@/components/site/site-nav';
import { COMMUNITY_PAGE_META, COMMUNITY_PATH } from '@/lib/community-content';
import CommunityCta from '@/pages/community/community-cta';
import CommunityExperience from '@/pages/community/community-experience';
import CommunityHero from '@/pages/community/community-hero';
import CommunityPillars from '@/pages/community/community-pillars';
import CommunityReach from '@/pages/community/community-reach';
import CommunityRings from '@/pages/community/community-rings';
import CommunityTeam from '@/pages/community/community-team';
import CommunityTimeline from '@/pages/community/community-timeline';
import CommunityValues from '@/pages/community/community-values';

/** Merged About & Community marketing page. */
function CommunityPage() {
  useEffect(() => {
    const previousTitle = document.title;
    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }

    const previousDescription = meta.getAttribute('content') ?? '';

    document.title = COMMUNITY_PAGE_META.title;
    meta.setAttribute('content', COMMUNITY_PAGE_META.description);

    return () => {
      document.title = previousTitle;
      meta?.setAttribute('content', previousDescription);
      if (createdMeta) {
        meta?.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-near-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-brand-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-near-black"
      >
        Skip to content
      </a>
      <SiteNav variant="inner" activePath={COMMUNITY_PATH} />
      <main id="main-content">
        <CommunityHero />
        <CommunityExperience />
        <CommunityReach />
        <CommunityTimeline />
        <CommunityRings />
        <CommunityTeam />
        <CommunityPillars />
        <CommunityValues />
        <CommunityCta />
      </main>
      <SiteFooter />
    </div>
  );
}

export default CommunityPage;
