import { useEffect } from 'react';

import { ORGANISATION } from '@/lib/constants';
import HomeCommunityReach from '@/pages/home-v2/home-community-reach';
import HomeCtaBand from '@/pages/home-v2/home-cta-band';
import HomeEventsPreview from '@/pages/home-v2/home-events-preview';
import HomeHero from '@/pages/home-v2/home-hero';
import HomeMarquee from '@/pages/home-v2/home-marquee';
import HomePillars from '@/pages/home-v2/home-pillars';
import HomeV2Footer from '@/pages/home-v2/home-v2-footer';
import LandingNav from '@/pages/home-v2/landing-nav';

const PAGE_TITLE = `${ORGANISATION.SHORT_NAME} — Community. Technology. Culture.`;
const META_DESCRIPTION = 'The Viet-Aussie tech group chat that grew up. Community, technology, and culture for Vietnamese Australians in IT.';

/** Production landing page — promoted from `/v2` staging. */
function HomeV2Page() {
  useEffect(() => {
    document.title = PAGE_TITLE;

    let metaDescription = document.querySelector('meta[name="description"]');
    const createdDescription = !metaDescription;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', META_DESCRIPTION);

    return () => {
      if (createdDescription && metaDescription?.parentNode) {
        metaDescription.parentNode.removeChild(metaDescription);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-near-black">
      <div className="bg-brand-near-black">
        <LandingNav />
        <HomeHero />
      </div>
      <main>
        <HomeMarquee />
        <HomePillars />
        <HomeCommunityReach />
        <HomeEventsPreview />
        <HomeCtaBand />
      </main>
      <HomeV2Footer />
    </div>
  );
}

export default HomeV2Page;
