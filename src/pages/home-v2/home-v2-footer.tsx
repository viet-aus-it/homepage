import { DiscordLogo } from '@/components/ui/icons';
import Logo from '@/components/ui/logo';
import { ORGANISATION } from '@/lib/constants';
import type { SiteNavItem } from '@/lib/site-nav';
import { FOOTER_EXPLORE, FOOTER_FOLLOW, FOOTER_GET_INVOLVED, getEnabledNavLinks, HOME_PATH, resolveNavHref } from '@/lib/site-nav';
import { HOME_SECTION_INNER } from '@/pages/home-v2/home-section';

interface FooterLinkColumnProps {
  title: string;
  items: readonly SiteNavItem[];
}

function FooterLinkColumn({ title, items }: FooterLinkColumnProps) {
  const links = getEnabledNavLinks(items, HOME_PATH);
  const pendingLabels = items.filter((item) => item.enabled && !resolveNavHref(item, HOME_PATH)).map((item) => item.label);
  const upcomingLabels = items.filter((item) => !item.enabled).map((item) => item.label);

  if (links.length === 0 && pendingLabels.length === 0 && upcomingLabels.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="mb-4 font-display text-[13px] font-bold tracking-[0.06em] uppercase text-white">{title}</p>
      <ul className="flex flex-col gap-2.5 text-[14.5px]">
        {links.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-brand-on-dark-subtle transition-colors hover:text-brand-yellow"
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.label}
            </a>
          </li>
        ))}
        {pendingLabels.map((label) => (
          <li key={label} className="text-brand-footer-dim">
            {label}
          </li>
        ))}
        {upcomingLabels.map((label) => (
          <li key={label} className="text-brand-footer-dim">
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Four-column redesign footer for the v2 landing page.
 */
function HomeV2Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-footer-dark text-brand-on-dark-subtle">
      <div className={HOME_SECTION_INNER}>
        <div className="flex flex-col gap-10 border-b border-brand-footer pb-12 lg:flex-row lg:items-start">
          <div className="lg:max-w-sm lg:flex-1">
            <div className="mb-4 flex items-center gap-2.5">
              <Logo className="h-[30px] w-auto" colour="colour" aria-hidden />
              <span className="font-display text-[19px] font-semibold tracking-tight text-white">VAIT</span>
            </div>
            <p className="mb-4 max-w-[280px] text-[14.5px] leading-relaxed">Vietnamese Aussies in I.T. Community. Technology. Culture. Going since 2017.</p>
            <a
              href={ORGANISATION.DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/12 px-4 py-2 text-sm font-semibold text-brand-yellow"
            >
              <DiscordLogo className="size-4!" aria-hidden />
              Join our Discord
            </a>
          </div>

          <FooterLinkColumn title="Get involved" items={FOOTER_GET_INVOLVED} />

          <div className="flex gap-12 lg:ml-auto">
            <FooterLinkColumn title="Explore" items={FOOTER_EXPLORE} />
            <FooterLinkColumn title="Follow" items={FOOTER_FOLLOW} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[12.5px] text-brand-footer-dim">
          <p>
            © {currentYear} {ORGANISATION.NAME} · ABN {ORGANISATION.ABN} · Assoc. No. (VIC) {ORGANISATION.ASSOCIATION_NUMBER}
          </p>
          <p>Made with trà sữa and questionable amounts of coffee.</p>
        </div>
      </div>
    </footer>
  );
}

export default HomeV2Footer;
