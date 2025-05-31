import { Button } from '@/components/ui/button';

const DISCORD_INVITE = 'https://chat.vietausit.com/';

/**
 * Join Community CTA button for the homepage.
 * @param {Object} props
 * @param {string} [props.ctaText] - The CTA button text
 */
function JoinCommunityCTAButton({ ctaText = 'Join our Discord Community' }: { ctaText?: string }) {
  return (
    <section className="w-full flex flex-col items-center justify-center my-16">
      <Button
        asChild
        size="lg"
        className="bg-brand-yellow text-brand-dark-gray hover:bg-brand-gray hover:text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-colors duration-200"
      >
        <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" aria-label="Join our Discord server">
          {ctaText}
        </a>
      </Button>
    </section>
  );
}

export default JoinCommunityCTAButton;
