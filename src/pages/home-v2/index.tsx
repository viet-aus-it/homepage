import HomeCommunityReach from '@/pages/home-v2/home-community-reach';
import HomeCtaBand from '@/pages/home-v2/home-cta-band';
import HomeEventsPreview from '@/pages/home-v2/home-events-preview';
import HomeHero from '@/pages/home-v2/home-hero';
import HomeMarquee from '@/pages/home-v2/home-marquee';
import HomePillars from '@/pages/home-v2/home-pillars';
import HomeV2Footer from '@/pages/home-v2/home-v2-footer';
import LandingNav from '@/pages/home-v2/landing-nav';

/** Production homepage at `/`. */
function HomeV2Page() {
  return (
    <div className="min-h-screen bg-white text-brand-near-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-brand-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-near-black"
      >
        Skip to content
      </a>
      <LandingNav />
      <div className="bg-brand-near-black">
        <HomeHero />
      </div>
      <main id="main-content">
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
