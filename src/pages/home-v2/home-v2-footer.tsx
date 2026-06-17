import { DiscordLogo } from '@/components/ui/icons';
import Logo from '@/components/ui/logo';
import { ORGANISATION } from '@/lib/constants';
import { FOOTER_EXPLORE, FOOTER_FOLLOW, FOOTER_GET_INVOLVED, getEnabledNavLinks, HOME_PATH } from '@/lib/site-nav';

interface FooterLinkColumnProps {
  title: string;
  items: ReturnType<typeof getEnabledNavLinks>;
}

function FooterLinkColumn({ title, items }: FooterLinkColumnProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="mb-4 font-display text-[13px] font-bold tracking-[0.06em] uppercase text-white">{title}</p>
      <ul className="flex flex-col gap-2.5 text-[14.5px]">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[#9a9a9a] transition-colors hover:text-brand-yellow"
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.label}
            </a>
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
  const exploreLinks = getEnabledNavLinks(FOOTER_EXPLORE, HOME_PATH);
  const involvedLinks = getEnabledNavLinks(FOOTER_GET_INVOLVED, HOME_PATH);
  const followLinks = getEnabledNavLinks(FOOTER_FOLLOW, HOME_PATH);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-footer-dark px-5 py-14 text-[#9a9a9a] md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-[#2a2a2a] pb-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Logo className="h-[30px] w-auto" colour="colour" aria-hidden />
              <span className="font-display text-[19px] font-extrabold tracking-tight text-white">VAIT</span>
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

          <FooterLinkColumn title="Explore" items={exploreLinks} />
          <FooterLinkColumn title="Get involved" items={involvedLinks} />
          <FooterLinkColumn title="Follow" items={followLinks} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[12.5px] text-[#6a6a6a]">
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
