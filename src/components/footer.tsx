import { ORGANISATION } from '@/lib/constants';

/**
 * Footer provides persistent legal and organisational context, reinforcing trust and compliance for all site visitors.
 *
 * Use this component to:
 * - Display essential organisational details (ABN, Association Number, copyright)
 * - Ensure users can always verify the legitimacy of the organisation
 * - Maintain a consistent, accessible, and branded site footer across all pages
 *
 * The layout is optimised for clarity and responsiveness, supporting both desktop and mobile users.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-1 w-full py-6 px-4 bg-brand-gray-dark text-brand-yellow text-center text-sm border-t border-brand-gray bg-brand-gray-dark">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <span>ABN: {ORGANISATION.ABN}</span>
        <span className="hidden md:inline">|</span>
        <span>Association No: (VIC) {ORGANISATION.ASSOCIATION_NUMBER}</span>
      </div>
      <div className="mt-2 text-brand-gray">
        &copy; {currentYear} {ORGANISATION.NAME}
      </div>
    </footer>
  );
}

export default Footer;
