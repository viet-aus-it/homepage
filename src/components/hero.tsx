import JoinCommunityCTAButton from './ui/join-community-cta-button';

/**
 * Hero is the visual and messaging focal point of the homepage, designed to immediately communicate the organisation's identity and value proposition.
 *
 * Use this component to:
 * - Create a strong first impression and set the tone for the site
 * - Clearly state the main message and supporting context
 * - Drive users toward the primary call to action (CTA)
 *
 * The layout and styling are optimised for maximum impact and clarity, ensuring accessibility and responsiveness.
 */
export interface HeroProps {
  /**
   * Delivers the core message and establishes the site's purpose at a glance.
   */
  title: string;
  /**
   * Provides supporting context to reinforce the headline and encourage engagement.
   */
  subtitle: string;
}

/**
 * Hero section for the homepage.
 */
function Hero({ title, subtitle }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden">
      <div className="relative z-[1] text-center max-w-screen-md">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold !leading-[1.2] tracking-tight">{title}</h1>
        <h2 className="mt-6 text-3xl md:text-4xl tracking-tight text-brand-dark-gray">{subtitle}</h2>
        <JoinCommunityCTAButton />
      </div>
    </section>
  );
}

export default Hero;
