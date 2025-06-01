import { ORGANISATION } from '@/lib/constants';

/**
 * Footer component for VAIT site.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 bg-brand-gray-dark text-brand-yellow text-center text-sm border-t border-brand-gray bg-brand-gray-dark">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <span>ABN: {ORGANISATION.ABN}</span>
        <span className="hidden md:inline">|</span>
        <span>Association No: {ORGANISATION.ASSOCIATION_NUMBER}</span>
      </div>
      <div className="mt-2 text-brand-gray">
        &copy; {currentYear} {ORGANISATION.NAME}
      </div>
    </footer>
  );
}

export default Footer;
