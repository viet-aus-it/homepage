import React from 'react';

/**
 * Footer component for VAIT site.
 * @param {Object} props
 * @param {number} [props.year] - The year to display (defaults to current year)
 * @param {string} [props.abn] - The ABN number
 * @param {string} [props.associationNo] - The Association number
 */
function Footer({
  year = new Date().getFullYear(),
  abn = '12 345 678 901',
  associationNo = 'A0123456B',
}: {
  year?: number;
  abn?: string;
  associationNo?: string;
}) {
  return (
    <footer className="w-full py-6 px-4 bg-brand-dark-gray text-brand-yellow text-center text-sm border-t border-brand-gray">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <span>ABN: {abn}</span>
        <span className="hidden md:inline">|</span>
        <span>Association No: {associationNo}</span>
      </div>
      <div className="mt-2 text-brand-gray">&copy; {year} Vietnamese Australians in Information Technology Inc.</div>
    </footer>
  );
}

export default Footer;
