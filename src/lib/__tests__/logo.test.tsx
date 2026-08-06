import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MeowneyLogo } from '../../components/brand/MeowneyLogo';

describe('MeowneyLogo Component (M1)', () => {
  it('renders logo with default props', () => {
    render(<MeowneyLogo />);
    const logoContainer = screen.getByTestId('meowney-logo');
    expect(logoContainer).toBeDefined();
    expect(screen.getByText('Meowney')).toBeDefined();
  });

  it('hides wordmark when showWordmark is false', () => {
    render(<MeowneyLogo showWordmark={false} />);
    expect(screen.queryByText('Meowney')).toBeNull();
  });

  it('applies custom size and variants', () => {
    const { rerender } = render(<MeowneyLogo size="lg" variant="sakura" />);
    expect(screen.getByText('Meowney')).toBeDefined();

    rerender(<MeowneyLogo size={40} variant="light" />);
    expect(screen.getByTestId('meowney-logo')).toBeDefined();
  });
});
