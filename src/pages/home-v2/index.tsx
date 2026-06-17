import { useEffect } from 'react';

import HomeCommunityReach from '@/pages/home-v2/home-community-reach';
import HomeCtaBand from '@/pages/home-v2/home-cta-band';
import HomeEventsPreview from '@/pages/home-v2/home-events-preview';
import HomeHero from '@/pages/home-v2/home-hero';
import HomeMarquee from '@/pages/home-v2/home-marquee';
import HomePillars from '@/pages/home-v2/home-pillars';
import HomeV2Footer from '@/pages/home-v2/home-v2-footer';
import LandingNav from '@/pages/home-v2/landing-nav';

const V2_PAGE_TITLE = 'VAIT — Community. Technology. Culture.';
const V2_META_DESCRIPTION = 'The Viet-Aussie tech group chat that grew up. Community, technology, and culture for Vietnamese Australians in IT.';

/**
 * Staging landing page at `/v2` — full redesign pending promotion to `/`.
 */
function HomeV2Page() {
  useEffect(() => {
    document.title = V2_PAGE_TITLE;

    let metaDescription = document.querySelector('meta[name="description"]');
    const createdDescription = !metaDescription;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', V2_META_DESCRIPTION);

    let robotsMeta = document.querySelector('meta[name="robots"]');
    const createdRobots = !robotsMeta;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (createdDescription && metaDescription?.parentNode) {
        metaDescription.parentNode.removeChild(metaDescription);
      }
      if (createdRobots && robotsMeta?.parentNode) {
        robotsMeta.parentNode.removeChild(robotsMeta);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-near-black">
      <LandingNav />
      <div className="bg-brand-near-black">
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
