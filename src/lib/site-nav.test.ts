import { describe, expect, it, vi } from 'vitest';

import { getEnabledNavLinks, PRIMARY_NAV, resolveNavHref } from '@/lib/site-nav';

describe('resolveNavHref', () => {
  it('returns external url when non-empty', () => {
    expect(resolveNavHref({ label: 'Discord', external: 'https://chat.vait.au', enabled: true }, '/')).toBe('https://chat.vait.au');
  });

  it('returns undefined when external is empty string', () => {
    expect(resolveNavHref({ label: 'LinkedIn', external: '', enabled: true }, '/')).toBeUndefined();
  });

  it('returns to path directly', () => {
    expect(resolveNavHref({ label: 'About', to: '/about', enabled: true }, '/')).toBe('/about');
  });

  it('prefixes hash with homePath', () => {
    expect(resolveNavHref({ label: 'Events', hash: '#events-preview', enabled: true }, '/')).toBe('/#events-preview');
  });

  it('returns undefined when no destination is configured', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(resolveNavHref({ label: 'Broken', enabled: true }, '/')).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledOnce();
    warnSpy.mockRestore();
  });
});

describe('getEnabledNavLinks', () => {
  it('filters disabled items', () => {
    const links = getEnabledNavLinks(
      [
        { label: 'On', hash: '#events-preview', enabled: true },
        { label: 'Off', hash: '#community-reach', enabled: false },
      ],
      '/'
    );
    expect(links.map((item) => item.label)).toEqual(['On']);
  });

  it('skips items that resolve to undefined href', () => {
    const links = getEnabledNavLinks([{ label: 'LinkedIn', external: '', enabled: true }], '/');
    expect(links).toEqual([]);
  });

  it('resolves hash links against homePath="/"', () => {
    const links = getEnabledNavLinks(PRIMARY_NAV, '/');
    expect(links.find((item) => item.label === 'Community')?.href).toBe('/#community-reach');
  });
});
