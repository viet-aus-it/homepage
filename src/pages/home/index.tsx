import HomeCommunityReach from '@/pages/home/home-community-reach';
import HomeCtaBand from '@/pages/home/home-cta-band';
import HomeEventsPreview from '@/pages/home/home-events-preview';
import HomeFooter from '@/pages/home/home-footer';
import HomeHero from '@/pages/home/home-hero';
import HomeMarquee from '@/pages/home/home-marquee';
import HomeNav from '@/pages/home/home-nav';
import HomePillars from '@/pages/home/home-pillars';

/** Production homepage at `/`. */
function HomePage() {
  return (
    <div className="min-h-screen bg-white text-brand-near-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-brand-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-near-black"
      >
        Skip to content
      </a>
      <HomeNav />
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
      <HomeFooter />
    </div>
  );
}

export default HomePage;
