import CtaBand from '@/components/marketing/cta-band';
import DiscordCtaLink from '@/components/ui/discord-cta-link';

/**
 * Dark centred Discord call-to-action band on the homepage.
 */
function HomeCtaBand() {
  return (
    <CtaBand
      title={
        <>
          Your people are
          <br />
          already in the chat.
        </>
      }
      description={
        <>
          Free to join, always has been. Say hi in <span className="whitespace-nowrap">#introduce-yourself</span> (we don&apos;t bite, much).
        </>
      }
    >
      <DiscordCtaLink variant="solid" size="xl">
        Join the VAIT Discord
      </DiscordCtaLink>
    </CtaBand>
  );
}

export default HomeCtaBand;
