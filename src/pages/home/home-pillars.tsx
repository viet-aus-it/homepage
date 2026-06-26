import { Activity, CalendarCheck, MessagesSquare } from 'lucide-react';

import MarketingSection from '@/components/marketing/marketing-section';
import SectionHeader from '@/components/marketing/section-header';

const PILLARS = [
  {
    icon: MessagesSquare,
    title: 'Knowledge sharing',
    description:
      "Stuck on a bug at 1am? Someone's usually awake. Ask anything across #programming, #python, #data-ai-ml and dozens of other channels. No question is too junior in here.",
  },
  {
    icon: CalendarCheck,
    title: 'Events & meetups',
    description: 'BBQs, bouldering nights, workshops and socials, both in person and online. The kind of thing that turns a contact into a mate.',
  },
  {
    icon: Activity,
    title: 'Mentorship & growth',
    description:
      "Get referrals, resume reads and straight advice from people a few steps ahead of you, whether you're after a first internship or a first lead role.",
  },
] as const;

/**
 * Three pillar cards describing what members get from VAIT.
 */
function HomePillars() {
  return (
    <MarketingSection className="bg-white">
      <SectionHeader eyebrow="What you get" title="Help when you're stuck. Mates when you're not." className="max-w-[620px]" />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="rounded-[18px] border border-brand-border-warm bg-brand-surface-warm p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)] md:p-8"
          >
            <div className="mb-5 flex size-[52px] items-center justify-center rounded-[13px] bg-brand-near-black">
              <Icon className="size-[26px] text-brand-yellow" strokeWidth={1.8} aria-hidden />
            </div>
            <h3 className="font-display text-[22px] font-bold tracking-[-0.01em]">{title}</h3>
            <p className="mt-2.5 text-[15.5px] leading-relaxed text-brand-gray-dark">{description}</p>
          </article>
        ))}
      </div>
    </MarketingSection>
  );
}

export default HomePillars;
