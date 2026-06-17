import { Activity, CalendarCheck, MessagesSquare } from 'lucide-react';

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
    <section className="bg-white px-5 py-14 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-[620px]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow-shade">What you get</p>
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.625rem)] font-extrabold leading-[1.07] tracking-[-0.025em]">
            Help when you&apos;re stuck. Mates when you&apos;re not.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}

export default HomePillars;
