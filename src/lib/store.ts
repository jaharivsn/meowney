import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useState, useEffect } from 'react';
import { Expense, Goal, Category, MeowneyState, MeowneyStateSchema } from './schemas';

export const DEFAULT_STATE: MeowneyState = {
  balance: 1000,
  expenses: [],
  goals: [],
  categories: [
    { id: 'salary', label: 'Salário', icon: 'payments', type: 'income' },
    { id: 'gift_inc', label: 'Presente', icon: 'redeem', type: 'income' },
    { id: 'food', label: 'Comida', icon: 'restaurant', type: 'expense' },
    { id: 'health', label: 'Saúde', icon: 'medical_services', type: 'expense' },
    { id: 'play', label: 'Lazer', icon: 'sports_esports', type: 'expense' },
    { id: 'home', label: 'Casa', icon: 'home', type: 'expense' },
  ],
  hasSeenTutorial: false,
};

export type ExpenseInput = Omit<Expense, 'id'> & { id?: string };
export type GoalInput = Omit<Goal, 'id'> & { id?: string };
export type CategoryInput = Omit<Category, 'id'> & { id?: string };

export interface MeowneyStoreState extends MeowneyState {
  isHydrated: boolean;
  setBalance: (val: number) => void;
  addExpense: (expense: ExpenseInput) => void;
  deleteExpense: (id: string) => void;
  addGoal: (goal: GoalInput) => void;
  updateGoalProgress: (id: string, amountToAdd: number) => void;
  deleteGoal: (id: string) => void;
  addCategory: (category: CategoryInput) => void;
  deleteCategory: (id: string) => void;
  setHasSeenTutorial: (seen: boolean) => void;
  resetTutorial: () => void;
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'id_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useMeowneyStore = create<MeowneyStoreState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      isHydrated: false,

      setBalance: (val) => set(() => ({ balance: val })),

      addExpense: (expenseData) =>
        set((state) => {
          const id = expenseData.id || generateId();
          const newExpense: Expense = {
            ...expenseData,
            id,
          };
          const amountChange = expenseData.type === 'income' ? expenseData.amount : -expenseData.amount;
          return {
            expenses: [...state.expenses, newExpense],
            balance: state.balance + amountChange,
          };
        }),

      deleteExpense: (id) =>
        set((state) => {
          const expenseToDelete = state.expenses.find((e) => e.id === id);
          if (!expenseToDelete) return state;
          const amountChange = expenseToDelete.type === 'income' ? -expenseToDelete.amount : expenseToDelete.amount;
          return {
            expenses: state.expenses.filter((e) => e.id !== id),
            balance: state.balance + amountChange,
          };
        }),

      addGoal: (goalData) =>
        set((state) => {
          const id = goalData.id || generateId();
          const newGoal: Goal = {
            ...goalData,
            id,
          };
          return {
            goals: [...state.goals, newGoal],
          };
        }),

      updateGoalProgress: (id, amountToAdd) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, currentAmount: g.currentAmount + amountToAdd } : g
          ),
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),

      addCategory: (categoryData) =>
        set((state) => {
          const id = categoryData.id || generateId();
          return {
            categories: [...state.categories, { ...categoryData, id }],
          };
        }),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id || !c.isCustom),
        })),

      setHasSeenTutorial: (seen) =>
        set(() => ({
          hasSeenTutorial: seen,
        })),

      resetTutorial: () =>
        set(() => ({
          hasSeenTutorial: false,
        })),
    }),
    {
      name: 'meowney-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : dummyStorage
      ),
      partialize: (state) => ({
        balance: state.balance,
        expenses: state.expenses,
        goals: state.goals,
        categories: state.categories,
        hasSeenTutorial: state.hasSeenTutorial,
      }),
      merge: (persistedState: unknown, currentState: MeowneyStoreState): MeowneyStoreState => {
        const candidate =
          persistedState && typeof persistedState === 'object' && 'state' in persistedState
            ? (persistedState as Record<string, unknown>).state
            : persistedState;

        const parseResult = MeowneyStateSchema.safeParse(candidate);

        if (parseResult.success) {
          return {
            ...currentState,
            ...parseResult.data,
          };
        }

        return {
          ...currentState,
          ...DEFAULT_STATE,
        };
      },
      onRehydrateStorage: () => () => {
        useMeowneyStore.setState({ isHydrated: true });
      },
    }
  )
);

export function useHydratedStore<T>(selector: (state: MeowneyStoreState) => T, fallback: T): T {
  const state = useMeowneyStore(selector);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback;
  }

  return state;
}
