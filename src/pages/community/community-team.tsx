import PageSection from '@/components/site/page-section';
import SectionHeader from '@/components/site/section-header';
import StatCard from '@/components/site/stat-card';
import { BOARD_MEMBERS, CONTRIBUTOR_MEMBERS, CREDIBILITY_STATS, teamPlaceholderSrc } from '@/lib/community-content';
import { cn } from '@/lib/utils';

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-display text-[12.5px] font-bold tracking-[0.08em] text-brand-gray uppercase">
      {label}
      <span className="h-px flex-1 bg-brand-border-warm" />
    </div>
  );
}

/**
 * Board, contributors, and credibility stat strip.
 */
function CommunityTeam() {
  return (
    <PageSection id="team" className="bg-white">
      <SectionHeader
        constrained
        className="mb-12"
        eyebrow="Who runs it"
        title="The board & the crew."
        description="Elected from our paid members, day-jobs and all. No paid staff, just people who give their evenings to keep our community running."
      />

      <SectionDivider label="The board" />
      <div className="mb-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {BOARD_MEMBERS.map((member) => (
          <article
            key={member.name}
            className="overflow-hidden rounded-[18px] border border-brand-border-warm transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
          >
            <img
              src={teamPlaceholderSrc(member.initials)}
              alt={member.name}
              className="aspect-square w-full object-cover"
              width={440}
              height={440}
              loading="lazy"
            />
            <div className="px-[18px] pt-[18px] pb-5">
              <h3 className="font-display text-[17px] font-bold">{member.name}</h3>
              <p className="mt-1 font-display text-[13px] font-bold text-brand-yellow-shade">{member.role}</p>
              <p className="mt-2 text-[13px] leading-snug text-brand-gray-dark">{member.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <SectionDivider label="Contributors" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {CONTRIBUTOR_MEMBERS.map((member) => (
          <article key={member.name} className="flex items-center gap-4 rounded-2xl border border-brand-border-warm bg-brand-surface-warm p-5">
            <img
              src={teamPlaceholderSrc(member.initials, 200)}
              alt={member.name}
              className="size-[58px] shrink-0 rounded-full object-cover"
              width={200}
              height={200}
              loading="lazy"
            />
            <div>
              <h3 className="font-display text-base font-bold">{member.name}</h3>
              <p className="text-[13.5px] leading-snug text-brand-gray-dark">{member.role}</p>
              {member.subtitle ? <p className="mt-0.5 text-[12.5px] leading-snug text-brand-gray">{member.subtitle}</p> : null}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3.5">
        {CREDIBILITY_STATS.map((stat) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            variant={stat.variant}
            className={cn('min-w-[180px] flex-1', stat.variant === 'default' && 'border border-brand-border-warm bg-brand-surface-warm')}
          />
        ))}
      </div>
    </PageSection>
  );
}

export default CommunityTeam;
