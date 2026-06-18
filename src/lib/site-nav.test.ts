import { describe, expect, it, vi } from 'vitest';

import { getEnabledNavLinks, PRIMARY_NAV, resolveNavHref } from '@/lib/site-nav';

describe('resolveNavHref', () => {
  it('returns external url when non-empty', () => {
    expect(resolveNavHref({ label: 'Discord', external: 'https://chat.vait.au', enabled: true }, '/v2')).toBe('https://chat.vait.au');
  });

  it('returns undefined when external is empty string', () => {
    expect(resolveNavHref({ label: 'LinkedIn', external: '', enabled: true }, '/v2')).toBeUndefined();
  });

  it('returns to path directly', () => {
    expect(resolveNavHref({ label: 'About', to: '/about', enabled: true }, '/v2')).toBe('/about');
  });

  it('prefixes hash with homePath', () => {
    expect(resolveNavHref({ label: 'Events', hash: '#events-preview', enabled: true }, '/v2')).toBe('/v2#events-preview');
  });

  it('returns undefined when no destination is configured', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(resolveNavHref({ label: 'Broken', enabled: true }, '/v2')).toBeUndefined();
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
      '/v2'
    );
    expect(links.map((item) => item.label)).toEqual(['On']);
  });

  it('skips items that resolve to undefined href', () => {
    const links = getEnabledNavLinks([{ label: 'LinkedIn', external: '', enabled: true }], '/v2');
    expect(links).toEqual([]);
  });

  it('resolves hash links against homePath="/v2"', () => {
    const links = getEnabledNavLinks(PRIMARY_NAV, '/v2');
    expect(links.find((item) => item.label === 'Community')?.href).toBe('/v2#community-reach');
  });

  it('resolves hash links against homePath="/" after promotion', () => {
    const links = getEnabledNavLinks([{ label: 'Community', hash: '#community-reach', enabled: true }], '/');
    expect(links[0]?.href).toBe('/#community-reach');
  });
});
