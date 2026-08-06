import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Design System Tokens (Stitch original)', () => {
  const globalsCssPath = path.resolve(__dirname, '../../app/globals.css');
  const cssContent = fs.readFileSync(globalsCssPath, 'utf8');

  it('should use Stitch Material primary #864e5a', () => {
    expect(cssContent).toContain('--color-primary: #864e5a;');
    expect(cssContent).toContain('--color-surface-tint: #864e5a;');
  });

  it('should define Stitch brand accent color variables', () => {
    expect(cssContent).toContain('--color-sakura-pink: #FFB7C5;');
    expect(cssContent).toContain('--color-cream-milk: #FFFDD0;');
    expect(cssContent).toContain('--color-mint-fresh: #A3E4D7;');
    expect(cssContent).toContain('--color-soft-charcoal: #2B2B2B;');
    expect(cssContent).toContain('--color-lavender: #D7BDE2;');
    expect(cssContent).toContain('--color-surface-off-white: #FAF9F6;');
  });

  it('should use Stitch surface/background #fcf9f8 (not cream as page bg)', () => {
    expect(cssContent).toContain('--color-background: #fcf9f8;');
    expect(cssContent).toContain('--color-surface: #fcf9f8;');
    expect(cssContent).toContain('--color-on-surface: #1b1c1c;');
    expect(cssContent).toContain('--color-on-surface-variant: #514345;');
    expect(cssContent).toContain('--color-outline: #837375;');
  });

  it('should map typography variables correctly', () => {
    expect(cssContent).toContain('--font-heading: "Nunito Sans", sans-serif;');
    expect(cssContent).toContain('--font-sans: "Plus Jakarta Sans", sans-serif;');
    expect(cssContent).not.toContain('"Plus Jakarta Sans", monospace;');
  });

  it('should not define removed shadow-squishy utility', () => {
    expect(cssContent).not.toContain('@utility shadow-squishy');
  });

  it('should define 32px card radius and 16px button radius tokens', () => {
    expect(cssContent).toContain('--radius-3xl: 32px;');
    expect(cssContent).toContain('--radius-2xl: 16px;');
  });
});
