import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ORGANISATION } from '@/lib/constants';
import IndexPage from './index';

describe('Index Page', () => {
  it('should show the ABN and Association Number', () => {
    render(<IndexPage />);
    const abnText = screen.getByText(`ABN: ${ORGANISATION.ABN}`);
    const associationNumberText = screen.getByText(`Association No: (VIC) ${ORGANISATION.ASSOCIATION_NUMBER}`);
    expect(abnText).toBeInTheDocument();
    expect(associationNumberText).toBeInTheDocument();
  });

  it('should have the correct title metadata', () => {
    render(<IndexPage />);
    const title = document.title;
    expect(title).toBe(`${ORGANISATION.SHORT_NAME} - ${ORGANISATION.NAME}`);
  });
});
