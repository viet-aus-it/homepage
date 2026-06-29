import { Globe } from 'lucide-react';

import PageSection from '@/components/site/page-section';
import SectionHeader from '@/components/site/section-header';
import { REACH_BAR_ROWS, REACH_HEAT_CLASS, REACH_OVERSEAS_COUNT, reachBarWidthPercent, type ReachHeat } from '@/lib/community-content';
import { COMMUNITY_MEMBER_COUNT } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CartogramTileProps {
  value: number;
  label: string;
  heat: ReachHeat;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

function CartogramTile({ value, label, heat, className, valueClassName, labelClassName }: CartogramTileProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-[18px] border border-[#E3E0D6] bg-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      <div className={cn('absolute inset-0', REACH_HEAT_CLASS[heat])} aria-hidden />
      <div className="relative text-center">
        <div className={cn('font-display font-extrabold leading-none text-brand-near-black', valueClassName)}>{value}</div>
        <div className={cn('mt-1 font-display font-bold tracking-[0.07em] text-brand-near-black', labelClassName)}>{label}</div>
      </div>
    </div>
  );
}

/**
 * Member reach cartogram and ranked bar chart.
 */
function CommunityReach() {
  return (
    <PageSection className="relative overflow-hidden border-b border-brand-border-warm bg-brand-surface-warm">
      <div
        className="pointer-events-none absolute -top-8 -right-8 size-60 bg-[radial-gradient(#F5C518_2px,transparent_2.2px)] bg-size-[15px_15px] opacity-40"
        aria-hidden
      />

      <div className="relative">
        <SectionHeader
          constrained
          className="max-w-[760px]"
          eyebrow="The community"
          title={`${COMMUNITY_MEMBER_COUNT} of us, in every Australian state and territory.`}
          description="We're in every Australian state and territory, and a fair few of us overseas. Here's where the crew's at, with plenty of room for more."
        />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-4 font-display text-[15px] font-bold">Australia, roughly</p>
            <div className="flex items-start gap-3.5 py-1.5">
              <CartogramTile
                value={23}
                label="WA"
                heat="light"
                className="mt-[84px] h-[114px] w-[120px]"
                valueClassName="text-[26px]"
                labelClassName="text-[11px]"
              />
              <div className="flex flex-col gap-3.5">
                <CartogramTile value={9} label="NT" heat="light" className="h-[144px] w-[114px]" valueClassName="text-[26px]" labelClassName="text-[11px]" />
                <CartogramTile value={85} label="SA" heat="medium" className="h-[126px] w-[114px]" valueClassName="text-[26px]" labelClassName="text-[11px]" />
              </div>
              <div className="mt-7 flex flex-col gap-3.5">
                <CartogramTile value={127} label="QLD" heat="strong" className="h-[120px] w-[207px]" valueClassName="text-[28px]" labelClassName="text-xs" />
                <div className="flex items-start gap-3.5">
                  <div className="flex flex-col items-center gap-2.5">
                    <CartogramTile
                      value={9}
                      label="ACT"
                      heat="light"
                      className="h-14 w-[74px] rounded-[13px]"
                      valueClassName="text-[17px]"
                      labelClassName="text-[9px]"
                    />
                    <CartogramTile
                      value={388}
                      label="VIC"
                      heat="max"
                      className="h-[66px] w-[82px] rounded-[14px]"
                      valueClassName="text-[19px]"
                      labelClassName="text-[10px]"
                    />
                    <CartogramTile
                      value={12}
                      label="TAS"
                      heat="light"
                      className="h-[38px] w-[52px] rounded-[10px]"
                      valueClassName="text-[13px]"
                      labelClassName="text-[8px]"
                    />
                  </div>
                  <CartogramTile value={353} label="NSW" heat="max" className="h-[126px] w-[135px]" valueClassName="text-[28px]" labelClassName="text-xs" />
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between rounded-[14px] border border-dashed border-[#D8D6CD] px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <Globe className="size-5 text-brand-gray" strokeWidth={1.6} aria-hidden />
                <span className="font-display text-[13px] font-bold tracking-[0.06em] text-brand-gray-dark">OVERSEAS</span>
              </div>
              <span className="font-display text-xl font-extrabold">{REACH_OVERSEAS_COUNT}</span>
            </div>

            <div className="mt-3.5 flex items-center gap-2.5 font-display text-[11px] font-bold tracking-[0.06em] text-brand-gray">
              <span>FEWER</span>
              <span className="flex gap-1">
                <span className="h-3 w-6 rounded-sm border border-[#E3E0D6] bg-[#FDF3C0]" />
                <span className="h-3 w-6 rounded-sm bg-[#FAE488]" />
                <span className="h-3 w-6 rounded-sm bg-[#F8D450]" />
                <span className="h-3 w-6 rounded-sm bg-brand-yellow" />
              </span>
              <span>MORE</span>
            </div>
          </div>

          <div>
            <p className="mb-4 font-display text-[15px] font-bold">Ranked, by the numbers</p>
            <div className="flex flex-col gap-4">
              {REACH_BAR_ROWS.map((row) => (
                <div key={row.label} className="grid grid-cols-[60px_1fr_46px] items-center gap-3.5">
                  <span className={cn('font-display text-[13px] font-bold', row.abroad && 'text-brand-yellow-shade')}>{row.label}</span>
                  <span className="block h-3.5 overflow-hidden rounded-full bg-[#F0EFE9]">
                    <span
                      className={cn('block h-full rounded-full', row.label === 'VIC' ? 'bg-brand-yellow' : 'bg-brand-near-black')}
                      style={{ width: reachBarWidthPercent(row.value) }}
                    />
                  </span>
                  <span className="text-right font-display text-sm font-bold">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-[#F0EFE9] pt-4 text-[13px] leading-relaxed text-brand-gray">VAIT members by state · June 2026.</p>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

export default CommunityReach;
