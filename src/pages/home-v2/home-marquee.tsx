import { DISCORD_CHANNEL_TAGS } from '@/lib/discord-channels';
import { cn } from '@/lib/utils';

function MarqueeTrack({ ariaHidden = false, className }: { ariaHidden?: boolean; className?: string }) {
  return (
    <div
      className={cn('flex shrink-0 items-center gap-8 pr-8 font-display text-base font-bold whitespace-nowrap text-brand-near-black', className)}
      aria-hidden={ariaHidden || undefined}
    >
      {DISCORD_CHANNEL_TAGS.map((tag) => (
        <span key={tag} className="flex items-center gap-8">
          <span>{tag}</span>
          <span aria-hidden>✦</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Yellow infinite-scroll band of Discord channel hashtags.
 */
function HomeMarquee() {
  return (
    <section aria-label="Discord channels" className="overflow-hidden border-y-2 border-brand-near-black bg-brand-yellow py-4">
      <div className="flex w-max animate-vait-marquee motion-reduce:animate-none">
        <MarqueeTrack />
        <MarqueeTrack ariaHidden className="motion-reduce:hidden" />
      </div>
    </section>
  );
}

export default HomeMarquee;
