import { describe, it, expect } from 'vitest';
import { buildWeeklyInsight, localChatReply } from '../insights';
import type { Expense, Goal } from '../schemas';

const expense = (partial: Partial<Expense> & Pick<Expense, 'title' | 'amount' | 'category'>): Expense => ({
  id: partial.id || 'e1',
  type: 'expense',
  date: partial.date || new Date().toISOString(),
  ...partial,
});

describe('insights engine', () => {
  it('asks for a first expense when ledger is empty', () => {
    const insight = buildWeeklyInsight([], [], [], 'cheerleader');
    expect(insight.actionHref).toBe('/app/add');
    expect(insight.sentence.toLowerCase()).toContain('nenhum');
  });

  it('names the top category of the week', () => {
    const expenses: Expense[] = [
      expense({ id: 'a', title: 'Petshop', amount: 186, category: 'Saúde' }),
      expense({ id: 'b', title: 'Café', amount: 20, category: 'Lazer' }),
    ];
    const goals: Goal[] = [
      { id: 'g1', title: 'Ração da Mimi', targetAmount: 200, currentAmount: 50, category: 'Comida' },
    ];
    const insight = buildWeeklyInsight(expenses, goals, [], 'cheerleader');
    expect(insight.sentence.toLowerCase()).toContain('saúde');
    expect(insight.sentence).toMatch(/R\$/);
  });

  it('answers local chat without an API', () => {
    const reply = localChatReply('como foi a semana?', [], [], 1000, 'zen');
    expect(reply.length).toBeGreaterThan(10);
  });
});
