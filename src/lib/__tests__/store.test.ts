import { describe, it, expect, beforeEach } from 'vitest';
import { useMeowneyStore, DEFAULT_STATE } from '../store';

describe('useMeowneyStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useMeowneyStore.setState({ ...DEFAULT_STATE, expenses: [], balance: 1000 });
  });

  it('should initialize with default state', () => {
    const state = useMeowneyStore.getState();
    expect(state.balance).toBe(1000);
    expect(state.expenses).toEqual([]);
    expect(state.goals).toBeDefined();
  });

  it('should subtract from balance when adding an expense', () => {
    const store = useMeowneyStore.getState();
    store.addExpense({
      title: 'Comida de Gato',
      amount: 150,
      category: 'Pet',
      type: 'expense',
      date: new Date().toISOString()
    });

    const newState = useMeowneyStore.getState();
    expect(newState.balance).toBe(850); // 1000 - 150
    expect(newState.expenses.length).toBe(1);
    expect(newState.expenses[0].title).toBe('Comida de Gato');
    expect(newState.expenses[0].type).toBe('expense');
  });

  it('should add to balance when adding an income', () => {
    const store = useMeowneyStore.getState();
    store.addExpense({
      title: 'Salário',
      amount: 2000,
      category: 'Renda',
      type: 'income',
      date: new Date().toISOString()
    });

    const newState = useMeowneyStore.getState();
    expect(newState.balance).toBe(3000); // 1000 + 2000
    expect(newState.expenses.length).toBe(1);
    expect(newState.expenses[0].type).toBe('income');
  });

  it('should delete a transaction and restore balance', () => {
    const store = useMeowneyStore.getState();
    
    // Setup transaction
    store.addExpense({
      title: 'Ração',
      amount: 100,
      category: 'Pet',
      type: 'expense',
      date: new Date().toISOString()
    });

    let state = useMeowneyStore.getState();
    expect(state.balance).toBe(900);
    const txId = state.expenses[0].id;

    // Delete transaction
    state.deleteExpense(txId);
    
    state = useMeowneyStore.getState();
    expect(state.balance).toBe(1000); // Restored
    expect(state.expenses.length).toBe(0);
  });

  it('should debit balance when contributing to a goal and refund on delete', () => {
    const store = useMeowneyStore.getState();
    store.addGoal({ title: 'Ração', targetAmount: 200, currentAmount: 0, category: 'Comida' });
    const id = useMeowneyStore.getState().goals[0].id;
    const result = useMeowneyStore.getState().updateGoalProgress(id, 50);
    expect(result.ok).toBe(true);
    expect(useMeowneyStore.getState().balance).toBe(950);
    expect(useMeowneyStore.getState().goals[0].currentAmount).toBe(50);
    useMeowneyStore.getState().deleteGoal(id);
    expect(useMeowneyStore.getState().balance).toBe(1000);
    expect(useMeowneyStore.getState().goals.length).toBe(0);
  });

  it('should refuse contribution when balance is insufficient', () => {
    useMeowneyStore.setState({ balance: 20 });
    const store = useMeowneyStore.getState();
    store.addGoal({ title: 'Arranhador', targetAmount: 300, currentAmount: 0, category: 'Acessórios' });
    const id = useMeowneyStore.getState().goals[0].id;
    const result = useMeowneyStore.getState().updateGoalProgress(id, 50);
    expect(result.ok).toBe(false);
    expect(useMeowneyStore.getState().balance).toBe(20);
  });
});
