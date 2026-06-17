import { DiscordLogo } from '@/components/ui/icons';
import { ORGANISATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { HOME_SECTION_INNER } from '@/pages/home-v2/home-section';

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
        <a
          href={ORGANISATION.DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-brand-yellow px-8 py-4 text-[17px] font-bold text-brand-near-black transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(245,197,24,0.32)]"
        >
          <DiscordLogo className="size-[22px]!" aria-hidden />
          Join the VAIT Discord
        </a>
      </div>
    </section>
  );
}

export default HomeCtaBand;
