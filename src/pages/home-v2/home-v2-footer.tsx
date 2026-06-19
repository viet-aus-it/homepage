import DiscordCtaLink from '@/components/ui/discord-cta-link';
import Logo from '@/components/ui/logo';
import { ACNC, ORGANISATION } from '@/lib/constants';
import type { SiteNavItem } from '@/lib/site-nav';
import { FOOTER_EXPLORE, FOOTER_FOLLOW, getEnabledNavLinks, HOME_PATH, resolveNavHref } from '@/lib/site-nav';

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
 * Redesign footer for the v2 landing page.
 */
function HomeV2Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-footer-dark text-brand-on-dark-subtle">
      <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-9 md:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-brand-footer pb-12 lg:grid-cols-[4fr_1fr_1fr] lg:gap-10">
          <div>
            <div className="mb-[18px] flex items-center gap-[11px]">
              <Logo className="h-[30px] w-auto" colour="colour" aria-hidden />
              <span className="font-display text-[19px] font-extrabold tracking-[-0.02em] text-white">VAIT</span>
            </div>
            <p className="mb-[18px] max-w-[280px] text-[14.5px] leading-[1.6]">Vietnamese Aussies in I.T. Community. Technology. Culture. Going since 2017.</p>
            <DiscordCtaLink variant="outlined" size="sm">
              Join our Discord
            </DiscordCtaLink>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16 lg:contents">
            <FooterLinkColumn title="Explore" items={FOOTER_EXPLORE} />
            <FooterLinkColumn title="Follow" items={FOOTER_FOLLOW} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
          <div className="flex flex-col gap-1.5 text-[12.5px] text-brand-footer-dim">
            <p>
              © {currentYear} {ORGANISATION.NAME} · ABN {ORGANISATION.ABN} · Assoc. No. (VIC) {ORGANISATION.ASSOCIATION_NUMBER}
            </p>
            <p>Made with trà sữa and questionable amounts of coffee.</p>
          </div>
          <a
            href={ACNC.CHARITY_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={ACNC.LOGO_TITLE}
            className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
          >
            <img src={ACNC.LOGO_SRC} alt={ACNC.LOGO_ALT} className="block h-[76px] w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default HomeV2Footer;
