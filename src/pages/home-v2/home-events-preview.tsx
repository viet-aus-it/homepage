import { Calendar, Clock, Mountain, Users } from 'lucide-react';

import { EVENT_PREVIEW_CARDS } from '@/lib/events-preview';
import HomeSection from '@/pages/home-v2/home-section';

/**
 * Featured and recurring event preview cards.
 */
function HomeEventsPreview() {
  const [featuredEvent, recurringEvent] = EVENT_PREVIEW_CARDS;

  return (
    <HomeSection id="events-preview" className="bg-white">
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow-shade">What&apos;s on</p>
        <h2 className="font-display text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-[1.07] tracking-[-0.025em]">Come hang out IRL.</h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {featuredEvent && (
          <article className="overflow-hidden rounded-[18px] border border-brand-border-warm bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(0,0,0,0.09)]">
            <div className="relative h-[230px]">
              {featuredEvent.imageSrc && (
                <img src={featuredEvent.imageSrc} alt={featuredEvent.imageAlt ?? featuredEvent.title} className="size-full object-cover" loading="lazy" />
              )}
              <span className="absolute top-4 left-4 rounded-full bg-brand-yellow px-3 py-1.5 font-display text-xs font-bold tracking-wide uppercase text-brand-near-black">
                {featuredEvent.badge}
              </span>
            </div>
            <div className="px-7 py-6">
              <div className="mb-2.5 flex items-center gap-2 text-[13.5px] font-semibold text-brand-yellow-shade">
                <Calendar className="size-4" aria-hidden />
                {featuredEvent.schedule}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.01em]">{featuredEvent.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-brand-gray-dark">{featuredEvent.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px] text-brand-gray">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4" aria-hidden /> {featuredEvent.interested} interested
                </span>
                <span>Hosted by {featuredEvent.host}</span>
              </div>
            </div>
          </article>
        )}

        {recurringEvent && (
          <article className="overflow-hidden rounded-[18px] border border-brand-border-warm bg-brand-near-black transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(0,0,0,0.16)]">
            <div className="relative flex h-[230px] items-center justify-center overflow-hidden bg-linear-to-br from-brand-surface-elevated to-brand-near-black">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(245,197,24,0.16)_1.5px,transparent_1.6px)] bg-size-[18px_18px]" aria-hidden />
              <Mountain className="relative size-[74px] text-brand-yellow" strokeWidth={1.4} aria-hidden />
              <span className="absolute top-4 left-4 rounded-full border border-brand-yellow/40 bg-brand-yellow/15 px-3 py-1.5 font-display text-xs font-bold tracking-wide uppercase text-brand-yellow">
                {recurringEvent.badge}
              </span>
            </div>
            <div className="px-7 py-6">
              <div className="mb-2.5 flex items-center gap-2 text-[13.5px] font-semibold text-brand-yellow">
                <Clock className="size-4" aria-hidden />
                {recurringEvent.schedule}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-white">{recurringEvent.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-brand-on-dark-muted">{recurringEvent.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px] text-brand-gray">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4" aria-hidden /> {recurringEvent.interested} interested
                </span>
                <span>Hosted by {recurringEvent.host}</span>
              </div>
            </div>
          </article>
        )}
      </div>
    </HomeSection>
  );
}

export default HomeEventsPreview;
