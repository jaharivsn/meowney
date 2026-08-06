import { describe, it, expect, beforeEach } from 'vitest';
import { useMeowneyStore, DEFAULT_STATE } from '../store';

describe('WebApp M3 Features & Calculations', () => {
  beforeEach(() => {
    useMeowneyStore.setState({
      ...DEFAULT_STATE,
      expenses: [],
      categories: [
        { id: 'salary', label: 'Salário', icon: 'payments', type: 'income' },
        { id: 'food', label: 'Comida', icon: 'restaurant', type: 'expense' },
      ],
      balance: 1000,
    });
  });

  it('should ignore income entries when calculating monthly expenses', () => {
    const store = useMeowneyStore.getState();

    const now = new Date().toISOString();
    store.addExpense({
      title: 'Salário de Teste',
      amount: 3000,
      category: 'Salário',
      type: 'income',
      date: now,
    });

    store.addExpense({
      title: 'Comida de Teste',
      amount: 150,
      category: 'Comida',
      type: 'expense',
      date: now,
    });

    const state = useMeowneyStore.getState();
    const currentMonthExpenses = state.expenses.filter((e) => {
      if (!e.date || e.type !== 'expense') return false;
      const d = new Date(e.date);
      const today = new Date();
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    });

    const totalMonthlyExpense = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    expect(totalMonthlyExpense).toBe(150); // Income 3000 excluded
  });

  it('should allow adding custom categories and loading them from store', () => {
    const store = useMeowneyStore.getState();
    store.addCategory({
      label: 'Brinquedo Felino',
      icon: 'toys',
      type: 'expense',
      isCustom: true,
    });

    const updatedState = useMeowneyStore.getState();
    const customCat = updatedState.categories.find((c) => c.label === 'Brinquedo Felino');
    expect(customCat).toBeDefined();
    expect(customCat?.isCustom).toBe(true);
    expect(customCat?.type).toBe('expense');
  });

  it('should update balance correctly when setBalance is invoked', () => {
    const store = useMeowneyStore.getState();
    store.setBalance(2500.50);

    const updatedState = useMeowneyStore.getState();
    expect(updatedState.balance).toBe(2500.50);
  });
});
