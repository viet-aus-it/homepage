import { MapPin } from 'lucide-react';

import DiscordCtaLink from '@/components/ui/discord-cta-link';
import { COMMUNITY_MEMBER_COUNT, MARKETING_IMAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HOME_SECTION_INNER, LANDING_NAV_CLEARANCE } from '@/pages/home-v2/home-section';

/**
 * Dark split-layout hero with community photo and member stat badge.
 */
function HomeHero() {
  return (
    <section className={cn('relative overflow-hidden bg-brand-near-black', LANDING_NAV_CLEARANCE)}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.045)_1px,transparent_1.5px)] bg-size-[24px_24px]"
        aria-hidden
      />

      <div className={cn(HOME_SECTION_INNER, 'relative grid items-center gap-9 pt-0 md:grid-cols-[1.05fr_0.95fr] md:gap-14')}>
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.11em] text-brand-yellow">
            <span className="inline-block size-1.5 rounded-full bg-brand-yellow" aria-hidden />
            Vietnamese Aussies in I.T. · since 2017
          </div>

          <h1 className="font-display text-[clamp(2.625rem,9vw,4.875rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
            Community.
            <br />
            Technology.
            <br />
            <span className="text-brand-yellow">Culture.</span>
          </h1>

          <p className="mt-6 max-w-[480px] text-[clamp(1rem,1.5vw,1.1875rem)] leading-relaxed text-brand-on-dark-muted">
            The Viet-Aussie tech group chat that grew up. {COMMUNITY_MEMBER_COUNT} of us shipping code, trading job leads, and arguing over the best trà sữa.
            Eight years deep, just getting started.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <DiscordCtaLink variant="solid" size="lg" className="justify-center">
              Join the community
            </DiscordCtaLink>
          </div>

          <div className="mt-8 inline-flex items-center gap-2.5">
            <span className="inline-block size-2.5 animate-vait-blink rounded-full bg-brand-discord-online" aria-hidden />
            <span className="text-sm text-brand-on-dark-subtle">
              <strong className="font-semibold text-brand-on-dark-emphasis">{COMMUNITY_MEMBER_COUNT} members</strong> · active in every state &amp; territory
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[18px] border border-white/10">
            <img
              src={MARKETING_IMAGES.bbqAlbertPark.src}
              alt={MARKETING_IMAGES.bbqAlbertPark.alt}
              className="block h-[300px] w-full object-cover md:h-[440px]"
              width={1280}
              height={960}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-near-black/55 via-transparent to-transparent" aria-hidden />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium text-white">
              <MapPin className="size-4 text-brand-yellow" aria-hidden />
              Winter Warm-Up BBQ · Albert Park, Naarm/Melbourne
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-[14px] bg-white p-4 shadow-[0_16px_34px_rgba(0,0,0,0.3)] md:absolute md:-bottom-5 md:-right-5 md:mt-0 md:px-5 md:py-4">
            <div className="font-display text-[28px] font-extrabold leading-none text-brand-near-black">{COMMUNITY_MEMBER_COUNT}</div>
            <div className="text-xs leading-snug text-brand-gray">
              members
              <br />
              &amp; counting
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
