import { Users } from 'lucide-react';

import type { EventPreviewCard } from '@/lib/events-preview';
import { EVENT_PREVIEW_CARDS } from '@/lib/events-preview';
import { cn } from '@/lib/utils';
import HomeSection from '@/pages/home/home-section';

interface EventPreviewCardArticleProps {
  event: EventPreviewCard;
}

function EventPreviewCardArticle({ event }: EventPreviewCardArticleProps) {
  const isRecurring = event.variant === 'recurring';

  return (
    <article
      className={cn(
        'overflow-hidden rounded-[18px] border border-brand-border-warm transition hover:-translate-y-1',
        isRecurring ? 'bg-brand-surface-elevated hover:shadow-[0_20px_44px_rgba(0,0,0,0.16)]' : 'bg-white hover:shadow-[0_20px_44px_rgba(0,0,0,0.09)]'
      )}
    >
      <div className="relative h-[230px]">
        {event.imageSrc ? (
          <img src={event.imageSrc} alt={event.imageAlt ?? event.title} className="size-full object-cover" width={800} height={800} loading="lazy" />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-brand-surface-elevated to-brand-near-black">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(245,197,24,0.16)_1.5px,transparent_1.6px)] bg-size-[18px_18px]" aria-hidden />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 bg-brand-near-black px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-5">
        <p className="inline-flex items-center gap-2 font-display text-xs font-bold tracking-[0.08em] uppercase text-brand-yellow">
          <span className="size-1.5 shrink-0 rounded-full bg-brand-yellow" aria-hidden />
          {event.badge}
        </p>
        <p className="text-[13px] text-white/85 sm:text-right">{event.schedule}</p>
      </div>

      <div className={cn('px-7 py-6', isRecurring && 'text-brand-on-dark-muted')}>
        <h3 className={cn('font-display text-2xl font-bold tracking-[-0.01em]', isRecurring && 'text-white')}>{event.title}</h3>
        <p className={cn('mt-2.5 text-[15px] leading-relaxed', !isRecurring && 'text-brand-gray-dark')}>{event.description}</p>
        <div className={cn('mt-4 flex flex-wrap items-center gap-4 text-[13.5px]', isRecurring ? 'text-brand-on-dark-subtle' : 'text-brand-gray')}>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4" aria-hidden /> {event.interested} interested
          </span>
          <span>Hosted by {event.host}</span>
        </div>
      </div>
    </article>
  );
}

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
        {featuredEvent && <EventPreviewCardArticle event={featuredEvent} />}
        {recurringEvent && <EventPreviewCardArticle event={recurringEvent} />}
      </div>
    </HomeSection>
  );
}

export default HomeEventsPreview;
