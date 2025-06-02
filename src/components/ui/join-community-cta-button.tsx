import { Button } from '@/components/ui/button';
import { ORGANISATION } from '@/lib/constants';
import { DiscordLogo } from './icons';

/**
 * Props for JoinCommunityCTAButton component.
 */
export interface JoinCommunityCTAButtonProps {
  /** The CTA button text */
  ctaText?: string;
}

/**
 * Join Community CTA button for the homepage.
 */
function JoinCommunityCTAButton({ ctaText = 'Join our Community' }: JoinCommunityCTAButtonProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center my-16">
      <Button
        asChild
        size="lg"
        className="bg-brand-yellow text-brand-dark-gray hover:bg-brand-gray hover:text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-colors duration-200"
      >
        <a href={ORGANISATION.DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="Join our Community">
          {ctaText} <DiscordLogo className="h-5! w-5!" />
        </a>
      </Button>
    </section>
  );
}

export default JoinCommunityCTAButton;
