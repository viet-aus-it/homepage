import { useEffect } from 'react';

import HomeHero from '@/pages/home-v2/home-hero';
import LandingNav from '@/pages/home-v2/landing-nav';

const V2_PAGE_TITLE = 'VAIT — Community. Technology. Culture.';

function HomeV2Page() {
  useEffect(() => {
    document.title = V2_PAGE_TITLE;
    let robotsMeta = document.querySelector('meta[name="robots"]');
    const createdRobots = !robotsMeta;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');
    return () => {
      if (createdRobots && robotsMeta?.parentNode) robotsMeta.parentNode.removeChild(robotsMeta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-near-black">
      <div className="bg-brand-near-black">
        <LandingNav />
        <HomeHero />
      </div>
    </div>
  );
}

export default HomeV2Page;
