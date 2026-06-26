import MarketingSection from '@/components/marketing/marketing-section';
import SectionHeader from '@/components/marketing/section-header';
import { BELONGING_RINGS } from '@/lib/community-content';
import { cn } from '@/lib/utils';

/**
 * Three rings of belonging diagram with explanatory rows.
 */
function CommunityRings() {
  return (
    <MarketingSection className="border-y border-brand-border-warm bg-brand-surface-warm" innerClassName="max-w-[1100px]">
      <SectionHeader
        constrained
        className="mb-12"
        eyebrow="How it fits together"
        title="Three rings of belonging."
        description="Everyone's welcome for free. Paid members get a say in where VAIT goes. And the people running it are drawn from those members. No outside bosses, just us."
      />

      <div className="grid items-center gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <div className="relative mx-auto size-[min(100%,400px)] max-w-[400px]" aria-hidden>
          <div className="absolute inset-0 rounded-full border border-[#E3E0D6] bg-white" />
          <div className="absolute top-[60px] left-[120px] size-[280px] rounded-full border border-brand-yellow/60 bg-brand-yellow/24" />
          <div className="absolute top-[125px] left-[250px] size-[150px] rounded-full bg-brand-near-black" />
          <span className="absolute top-1/2 left-9 -translate-y-1/2 font-display text-[21px] font-extrabold text-brand-gray-dark">Free</span>
          <span className="absolute top-1/2 left-[150px] -translate-y-1/2 font-display text-[21px] font-extrabold text-brand-yellow-shade">Paid</span>
          <span className="absolute top-1/2 left-[325px] -translate-x-1/2 -translate-y-1/2 font-display text-[21px] font-extrabold text-brand-yellow">
            Team
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {BELONGING_RINGS.map((ring, index) => (
            <div key={ring.number} className={cn('grid grid-cols-[54px_1fr] gap-5 py-6', index < BELONGING_RINGS.length - 1 && 'border-b border-[#E7E4DA]')}>
              <div
                className={cn(
                  'font-display text-[30px] font-extrabold leading-none',
                  ring.accent === 'dark' ? 'text-brand-near-black' : 'text-brand-yellow-shade'
                )}
              >
                {ring.number}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">{ring.title}</h3>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-brand-gray-dark">
                  {ring.number === '02' ? (
                    <>
                      Everything above, plus a <strong className="text-brand-near-black">vote at the AGM</strong> and the right to{' '}
                      <strong className="text-brand-near-black">stand for the board</strong> or join the volunteer crew. Members shape where VAIT heads next.
                    </>
                  ) : (
                    ring.description
                  )}
                </p>
                {ring.link ? (
                  <a
                    href={ring.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 border-b-2 border-brand-yellow pb-0.5 text-[15px] font-bold text-brand-near-black"
                  >
                    {ring.link.label}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarketingSection>
  );
}

export default CommunityRings;
