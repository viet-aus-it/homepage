import { Briefcase, Code2, Coffee, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import PageSection from '@/components/site/page-section';
import SectionHeader from '@/components/site/section-header';
import { EXPERIENCE_CARDS, type ExperienceCard } from '@/lib/community-content';
import { MARKETING_IMAGES } from '@/lib/constants';

const EXPERIENCE_ICONS: Record<ExperienceCard['icon'], LucideIcon> = {
  briefcase: Briefcase,
  code: Code2,
  users: Users,
  coffee: Coffee,
};

/**
 * Four experience cards with community photo column.
 */
function CommunityExperience() {
  return (
    <PageSection className="bg-white">
      <SectionHeader
        constrained
        className="mb-10 max-w-[680px]"
        eyebrow="What you'll experience"
        title="More than a group chat. Here's what actually happens."
        description="Join and you plug into a lot of going-on: career help that lands real jobs, hands-on learning, mates to meet up with, and somewhere to switch off. A taste:"
      />

      <div className="grid items-stretch gap-7 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {EXPERIENCE_CARDS.map((card) => {
            const Icon = EXPERIENCE_ICONS[card.icon];

            return (
              <article key={card.title} className="rounded-[18px] border border-brand-border-warm p-6 md:p-[26px]">
                <div className="mb-4 flex size-[42px] items-center justify-center rounded-xl bg-brand-yellow/18">
                  <Icon className="size-[22px] text-brand-near-black" strokeWidth={1.7} aria-hidden />
                </div>
                <h3 className="font-display text-lg font-bold">{card.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-brand-gray-dark">{card.description}</p>
              </article>
            );
          })}
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[18px] bg-brand-surface-warm">
          <img
            src={MARKETING_IMAGES.bbqAlbertPark.src}
            alt={MARKETING_IMAGES.bbqAlbertPark.alt}
            className="absolute inset-0 size-full object-cover"
            width={1280}
            height={960}
            loading="lazy"
          />
        </div>
      </div>
    </PageSection>
  );
}

export default CommunityExperience;
