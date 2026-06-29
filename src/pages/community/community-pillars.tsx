import { Layers, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { PILLAR_CARDS, type PillarCard } from '@/lib/community-content';

const PILLAR_ICONS: Record<PillarCard['icon'], LucideIcon> = {
  grow: TrendingUp,
  connect: Users,
  build: Layers,
};

/**
 * Grow / Connect / Build pillars on a dark dot-grid band.
 */
function CommunityPillars() {
  return (
    <section className="relative overflow-hidden bg-brand-near-black px-5 py-20 md:px-12 md:py-[90px]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.045)_1px,transparent_1.5px)] bg-size-[24px_24px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1100px]">
        <div className="mb-14 max-w-[760px]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-yellow">Why we exist</p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
            A place for every Vietnamese-Australian tech professional, from students to seniors, to{' '}
            <span className="text-brand-yellow">grow, connect, and build</span>.
          </h2>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-brand-on-dark-muted">
            Three things VAIT exists to do. Every program, event and resource we put our energy behind serves at least one of them.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PILLAR_CARDS.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.icon];

            return (
              <article key={pillar.title} className="rounded-[18px] border border-white/10 bg-white/4 p-8 md:p-[34px]">
                <div className="mb-5 flex size-[52px] items-center justify-center rounded-[13px] bg-brand-yellow">
                  <Icon className="size-[26px] text-brand-near-black" strokeWidth={1.9} aria-hidden />
                </div>
                <h3 className="font-display text-[22px] font-bold tracking-[-0.01em] text-white">{pillar.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-brand-on-dark-muted">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CommunityPillars;
