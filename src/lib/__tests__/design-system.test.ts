import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Design System Tokens (M1)', () => {
  const globalsCssPath = path.resolve(__dirname, '../../app/globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf8');

  it('should not contain legacy #864e5a color in globals.css', () => {
    expect(cssContent).not.toContain('864e5a');
  });

  it('should define Stitch design system color variables', () => {
    expect(cssContent).toContain('--color-sakura-pink: #FFB7C5;');
    expect(cssContent).toContain('--color-cream-milk: #FFFDD0;');
    expect(cssContent).toContain('--color-mint-fresh: #A3E4D7;');
    expect(cssContent).toContain('--color-soft-charcoal: #2B2B2B;');
  });

  it('should map typography variables correctly', () => {
    expect(cssContent).toContain('--font-heading: "Nunito Sans", sans-serif;');
    expect(cssContent).toContain('--font-sans: "Plus Jakarta Sans", sans-serif;');
    expect(cssContent).not.toContain('"Plus Jakarta Sans", monospace;');
  });

  it('should define @utility shadow-squishy', () => {
    expect(cssContent).toContain('@utility shadow-squishy');
    expect(cssContent).toContain('box-shadow: 0 8px 0 0 #2B2B2B;');
  });

  it('should define 32px card radius and 16px button radius tokens', () => {
    expect(cssContent).toContain('--radius-3xl: 32px;');
    expect(cssContent).toContain('--radius-2xl: 16px;');
  });
});
