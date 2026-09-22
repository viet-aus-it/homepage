import PageSection from '@/components/site/page-section';
import SectionHeader from '@/components/site/section-header';
import { TIMELINE_MILESTONES } from '@/lib/community-content';
import { cn } from '@/lib/utils';

/**
 * Vertical timeline from 2017 to 2025.
 */
function CommunityTimeline() {
  return (
    <PageSection className="bg-white" innerClassName="max-w-[1000px]">
      <SectionHeader
        constrained
        className="mb-12"
        eyebrow="The short version"
        title="Group chat to grassroots org."
        description="Breaking into tech is hard. Doing it as a young Vietnamese-Australian is harder. VAIT exists so nobody has to figure it out alone, and we do it without losing the trà sữa runs and the Lunar New Year catch-ups that brought us together."
      />

      <div className="flex flex-col">
        {TIMELINE_MILESTONES.map((milestone, index) => {
          const isLast = index === TIMELINE_MILESTONES.length - 1;

          return (
            <div
              key={milestone.year}
              className={cn(
                'relative grid grid-cols-1 gap-4 border-l-2 border-brand-border-warm pb-8 pl-8 sm:grid-cols-[120px_1fr] sm:gap-7 sm:pl-[34px]',
                isLast && 'border-transparent pb-0'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 -left-[9px] size-4 rounded-full border-[3px] border-white',
                  milestone.current ? 'bg-brand-near-black' : 'bg-brand-yellow'
                )}
                aria-hidden
              />
              <div className="font-display text-2xl font-extrabold text-brand-near-black">{milestone.year}</div>
              <div>
                <h3 className="font-display text-[19px] font-bold">{milestone.title}</h3>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-brand-gray-dark">{milestone.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}

export default CommunityTimeline;
