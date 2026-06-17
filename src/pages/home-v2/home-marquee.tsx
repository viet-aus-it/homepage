import { DISCORD_CHANNEL_TAGS } from '@/lib/discord-channels';

function MarqueeTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 pr-8 font-display text-base font-bold whitespace-nowrap text-brand-near-black"
      aria-hidden={ariaHidden || undefined}
    >
      {DISCORD_CHANNEL_TAGS.map((tag, index) => (
        <span key={`${tag}-${index}`} className="flex items-center gap-8">
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
        <MarqueeTrack ariaHidden />
      </div>
    </section>
  );
}

export default HomeMarquee;
