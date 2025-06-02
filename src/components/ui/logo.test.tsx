import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo, { LOGO_COLOURS } from './logo';

describe('Logo', () => {
  it('renders the SVG with correct aria-label', () => {
    render(<Logo colour="colour" />);
    const svg = screen.getByLabelText('VAIT Logo');
    expect(svg).toBeInTheDocument();
    expect(svg.tagName).toBe('svg');
  });

  it('renders the coloured logo with correct fill values', () => {
    render(<Logo colour="colour" />);
    const paths = screen.getByLabelText('VAIT Logo').querySelectorAll('path');
    // First path is primary, second is secondary, third is primary
    expect(paths[0]).toHaveAttribute('fill', LOGO_COLOURS.PRIMARY);
    expect(paths[1]).toHaveAttribute('fill', LOGO_COLOURS.SECONDARY);
    expect(paths[2]).toHaveAttribute('fill', LOGO_COLOURS.PRIMARY);
  });

  it('renders the gray logo with correct fill values', () => {
    render(<Logo colour="gray" />);
    const paths = screen.getByLabelText('VAIT Logo').querySelectorAll('path');
    expect(paths[0]).toHaveAttribute('fill', LOGO_COLOURS.SECONDARY);
    expect(paths[1]).toHaveAttribute('fill', LOGO_COLOURS.SECONDARY);
    expect(paths[2]).toHaveAttribute('fill', LOGO_COLOURS.SECONDARY);
  });

  it('renders the dark-gray logo with correct fill values', () => {
    render(<Logo colour="dark-gray" />);
    const paths = screen.getByLabelText('VAIT Logo').querySelectorAll('path');
    expect(paths[0]).toHaveAttribute('fill', LOGO_COLOURS.DARK_GRAY);
    expect(paths[1]).toHaveAttribute('fill', LOGO_COLOURS.SECONDARY);
    expect(paths[2]).toHaveAttribute('fill', LOGO_COLOURS.DARK_GRAY);
  });

  it('passes additional SVG props through', () => {
    render(<Logo colour="colour" width={123} className="test-class" data-testid="logo-svg" />);
    const svg = screen.getByTestId('logo-svg');
    expect(svg).toHaveAttribute('width', '123');
    expect(svg).toHaveClass('test-class');
  });
});
