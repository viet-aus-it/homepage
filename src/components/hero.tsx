import JoinCommunityCTAButton from '@/components/ui/join-community-cta-button';

/**
 * Hero section for the homepage.
 * @param {Object} props
 * @param {string} props.title - Main headline
 * @param {string} props.subtitle - Supporting subtitle
 */
function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden">
      <div className="relative z-[1] text-center max-w-screen-lg">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold !leading-[1.2] tracking-tight">{title}</h1>
        <h2 className="mt-6 text-3xl md:text-4xl tracking-tight text-brand-dark-gray">{subtitle}</h2>
        <JoinCommunityCTAButton />
      </div>
    </section>
  );
}

export default Hero;
