import PageSection from '@/components/site/page-section';
import SectionHeader from '@/components/site/section-header';
import { VALUE_PRINCIPLES } from '@/lib/community-content';

/**
 * Numbered operating principles list.
 */
function CommunityValues() {
  return (
    <PageSection className="border-t border-brand-border-warm bg-brand-surface-warm" innerClassName="max-w-[1000px]">
      <SectionHeader
        constrained
        className="mb-12"
        eyebrow="How we operate"
        title="Hold us to it."
        description="Five principles guide how the committee runs VAIT. They're public on purpose, so you can hold us to them."
      />

      <div className="flex flex-col">
        {VALUE_PRINCIPLES.map((principle, index) => (
          <div
            key={principle.number}
            className={`grid grid-cols-[60px_1fr] gap-7 border-[#E7E4DA] py-7 ${index === 0 ? 'border-t' : ''} ${index === VALUE_PRINCIPLES.length - 1 ? 'border-b' : 'border-t'}`}
          >
            <div className="font-display text-[30px] font-extrabold leading-none text-brand-yellow-shade">{principle.number}</div>
            <div>
              <h3 className="font-display text-[21px] font-bold">{principle.title}</h3>
              <p className="mt-2 max-w-[640px] text-[15.5px] leading-[1.65] text-brand-gray-dark">{principle.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

export default CommunityValues;
