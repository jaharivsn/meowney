import { describe, it, expect } from 'vitest';
import {
  toCents,
  fromCents,
  formatBRL,
  parseBRLInputToCents,
  sumCents,
  calculateBalanceCents,
  formatCurrencyCompact,
} from '../money';

describe('money utilities', () => {
  it('converts float to cents and cents to float safely', () => {
    expect(toCents(10.5)).toBe(1050);
    expect(toCents(0.1 + 0.2)).toBe(30);
    expect(toCents(0)).toBe(0);
    expect(fromCents(1050)).toBe(10.5);
    expect(fromCents(30)).toBe(0.3);
  });

  it('formats BRL currency consistently', () => {
    const formatted = formatBRL(125050);
    // Replace non-breaking spaces for universal comparison
    expect(formatted.replace(/\u00a0/g, ' ')).toMatch(/R\$\s*1\.250,50/);
    expect(formatBRL(0).replace(/\u00a0/g, ' ')).toMatch(/R\$\s*0,00/);
  });

  it('parses various human BRL inputs into exact integer cents', () => {
    expect(parseBRLInputToCents('R$ 1.250,50')).toBe(125050);
    expect(parseBRLInputToCents('1250,50')).toBe(125050);
    expect(parseBRLInputToCents('50.25')).toBe(5025);
    expect(parseBRLInputToCents('10')).toBe(1000);
    expect(parseBRLInputToCents('')).toBe(0);
    expect(parseBRLInputToCents('invalid')).toBe(0);
    expect(parseBRLInputToCents('-R$ 10,50')).toBe(-1050);
  });

  it('sums cents without floating-point drift', () => {
    const values = [1000, 2050, 3025];
    expect(sumCents(values)).toBe(6075);
  });

  it('calculates balance correctly from transaction list', () => {
    const txs = [
      { type: 'income', amount: 50000 },
      { type: 'expense', amount: 15000 },
      { type: 'income', amount: 5000 },
    ];
    expect(calculateBalanceCents(txs)).toBe(40000);
  });

  it('formats compact currency for badges and summaries', () => {
    expect(formatCurrencyCompact(150000)).toMatch(/mil/);
    expect(formatCurrencyCompact(150000000)).toMatch(/mi/);
  });
});
