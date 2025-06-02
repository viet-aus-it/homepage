import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import IndexPage from '../pages/index-page';

describe('Index Route', () => {
  it('should render the IndexPage component', () => {
    const { container } = render(<IndexPage />);
    expect(container.textContent).toContain('Empowering Vietnamese Australians IT Professionals');
  });
});
