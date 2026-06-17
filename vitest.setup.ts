import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn();

afterEach(() => {
  cleanup();
});
