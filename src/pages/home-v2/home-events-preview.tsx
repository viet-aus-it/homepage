import { Calendar, Clock, Mountain, Users } from 'lucide-react';

import HomeSection from '@/pages/home-v2/home-section';

/**
 * Featured and recurring event preview cards.
 */
function HomeEventsPreview() {
  return (
    <HomeSection id="events-preview" className="bg-white">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow-shade">What&apos;s on</p>
        <h2 className="font-display text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-[1.07] tracking-[-0.025em]">Come hang out IRL.</h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="overflow-hidden rounded-[18px] border border-brand-border-warm bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(0,0,0,0.09)]">
          <div className="relative h-[230px]">
            <img src="/images/bbq-albert-park.png" alt="VAIT Winter Warm-Up BBQ" className="size-full object-cover" loading="lazy" />
            <span className="absolute top-4 left-4 rounded-full bg-brand-yellow px-3 py-1.5 font-display text-xs font-bold tracking-wide uppercase text-brand-near-black">
              Next up
            </span>
          </div>
          <div className="px-7 py-6">
            <div className="mb-2.5 flex items-center gap-2 text-[13.5px] font-semibold text-brand-yellow-shade">
              <Calendar className="size-4" aria-hidden />
              Sat 20 Jun · 11am to 4pm · Albert Park
            </div>
            <h3 className="font-display text-2xl font-bold tracking-[-0.01em]">VAIT Winter Warm-Up BBQ</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-brand-gray-dark">
              Warming up winter the only sensible way: lighting a fire and grilling everything in sight. Bring an appetite, leave with new mates.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px] text-brand-gray">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" aria-hidden /> 13 interested
              </span>
              <span>Hosted by Jing Vu</span>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-[18px] border border-brand-border-warm bg-brand-near-black transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(0,0,0,0.16)]">
          <div className="relative flex h-[230px] items-center justify-center overflow-hidden bg-linear-to-br from-[#2a2a2a] to-brand-near-black">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(245,197,24,0.16)_1.5px,transparent_1.6px)] bg-size-[18px_18px]" aria-hidden />
            <Mountain className="relative size-[74px] text-brand-yellow" strokeWidth={1.4} aria-hidden />
            <span className="absolute top-4 left-4 rounded-full border border-brand-yellow/40 bg-brand-yellow/15 px-3 py-1.5 font-display text-xs font-bold tracking-wide uppercase text-brand-yellow">
              Weekly · Fridays
            </span>
          </div>
          <div className="px-7 py-6">
            <div className="mb-2.5 flex items-center gap-2 text-[13.5px] font-semibold text-brand-yellow">
              <Clock className="size-4" aria-hidden />
              Fridays · 6:30 to 9:30pm · Brunswick
            </div>
            <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-white">[VIC] Northern Climbing Squad</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[#b9b9b9]">
              Chalk up every week with the North-side crew. Top rope, bouldering, then trà sữa on the way home. Never climbed? Doesn&apos;t matter, and you can
              hire shoes there.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px] text-brand-gray">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" aria-hidden /> 6 interested
              </span>
              <span>Hosted by Luann</span>
            </div>
          </div>
        </article>
      </div>
    </HomeSection>
  );
}

export default HomeEventsPreview;
