import DiscordCtaLink from '@/components/ui/discord-cta-link';
import { cn } from '@/lib/utils';
import { HOME_SECTION_INNER } from '@/pages/home/home-section';

/**
 * Dark centred Discord call-to-action band.
 */
function HomeCtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand-near-black">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1.5px)] bg-size-[24px_24px]"
        aria-hidden
      />
      <div className={cn(HOME_SECTION_INNER, 'relative max-w-3xl text-center')}>
        <h2 className="font-display text-[clamp(2.125rem,7vw,3.5rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-white">
          Your people are
          <br />
          already in the chat.
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[clamp(1rem,1.6vw,1.1875rem)] leading-relaxed text-brand-on-dark-muted">
          Free to join, always has been. Say hi in <span className="whitespace-nowrap">#introduce-yourself</span> (we don&apos;t bite, much).
        </p>
        <DiscordCtaLink variant="solid" size="xl" className="mt-9">
          Join the VAIT Discord
        </DiscordCtaLink>
      </div>
    </section>
  );
}

export default HomeCtaBand;
