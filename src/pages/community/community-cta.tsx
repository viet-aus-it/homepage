import CtaBand from '@/components/marketing/cta-band';
import DiscordCtaLink from '@/components/ui/discord-cta-link';

/**
 * Closing Discord CTA — membership link omitted until /join ships.
 */
function CommunityCta() {
  return (
    <CtaBand innerClassName="max-w-[720px]" title="Want in on the next chapter?" description="Join free in thirty seconds. There's a seat for you.">
      <DiscordCtaLink variant="solid" size="lg">
        Join the community
      </DiscordCtaLink>
    </CtaBand>
  );
}

export default CommunityCta;
