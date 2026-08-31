import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useSyncExternalStore } from 'react';
import {
  Expense,
  Goal,
  Category,
  MeowneyState,
  MeowneyStateSchema,
  PersonalityId,
} from './schemas';

export const DEFAULT_STATE: MeowneyState = {
  balance: 1000,
  expenses: [],
  goals: [],
  categories: [
    { id: 'salary', label: 'Salário', icon: 'payments', type: 'income', color: '#A3E4D7' },
    { id: 'gift_inc', label: 'Presente', icon: 'redeem', type: 'income', color: '#D7BDE2' },
    { id: 'food', label: 'Comida', icon: 'restaurant', type: 'expense', color: '#FFB7C5', monthlyLimit: 500 },
    { id: 'health', label: 'Saúde', icon: 'medical_services', type: 'expense', color: '#A3E4D7', monthlyLimit: 200 },
    { id: 'play', label: 'Lazer', icon: 'sports_esports', type: 'expense', color: '#D7BDE2', monthlyLimit: 300 },
    { id: 'home', label: 'Casa', icon: 'home', type: 'expense', color: '#FFFDD0', monthlyLimit: 800 },
  ],
  hasSeenTutorial: false,
  personality: null,
  aiOptIn: false,
  roundUpGoalId: null,
  notificationsEnabled: false,
};

export type ExpenseInput = Omit<Expense, 'id'> & { id?: string };
export type GoalInput = Omit<Goal, 'id'> & { id?: string };
export type CategoryInput = Omit<Category, 'id'> & { id?: string };

export interface MeowneyStoreState extends MeowneyState {
  isHydrated: boolean;
  setBalance: (val: number) => void;
  addExpense: (expense: ExpenseInput) => void;
  updateExpense: (id: string, patch: Partial<Omit<Expense, 'id'>>) => void;
  deleteExpense: (id: string) => void;
  addGoal: (goal: GoalInput) => void;
  updateGoalProgress: (id: string, amountToAdd: number) => { ok: boolean; reason?: string };
  deleteGoal: (id: string) => void;
  addCategory: (category: CategoryInput) => void;
  updateCategory: (id: string, patch: Partial<Omit<Category, 'id'>>) => void;
  deleteCategory: (id: string) => void;
  setHasSeenTutorial: (seen: boolean) => void;
  resetTutorial: () => void;
  setPersonality: (id: PersonalityId) => void;
  setAiOptIn: (val: boolean) => void;
  setRoundUpGoalId: (id: string | null) => void;
  setNotificationsEnabled: (val: boolean) => void;
  importExpenses: (expenses: Expense[]) => void;
  processDueRecurrences: () => Expense[];
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'id_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

function advanceRecurrenceDate(iso: string, every: 'week' | 'month'): string {
  const d = new Date(iso);
  if (every === 'week') d.setDate(d.getDate() + 7);
  else d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useMeowneyStore = create<MeowneyStoreState>()(
  persist(
    (set, get) => ({
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
          let balance = state.balance;
          const amountChange =
            expenseData.type === 'income' ? expenseData.amount : -expenseData.amount;
          balance += amountChange;

          let goals = state.goals;
          const roundUpId = state.roundUpGoalId;
          if (
            roundUpId &&
            expenseData.type === 'expense' &&
            expenseData.amount > 0
          ) {
            const cents = Math.round(expenseData.amount * 100);
            const roundUpCents = (100 - (cents % 100)) % 100;
            const roundUp = roundUpCents / 100;
            if (roundUp > 0 && balance >= roundUp) {
              goals = goals.map((g) =>
                g.id === roundUpId
                  ? { ...g, currentAmount: g.currentAmount + roundUp }
                  : g
              );
              balance -= roundUp;
            }
          }

          return {
            expenses: [...state.expenses, newExpense],
            balance,
            goals,
          };
        }),

      updateExpense: (id, patch) =>
        set((state) => {
          const existing = state.expenses.find((e) => e.id === id);
          if (!existing) return state;

          const next: Expense = { ...existing, ...patch, id };
          let balance = state.balance;
          // Reverse old effect
          balance += existing.type === 'income' ? -existing.amount : existing.amount;
          // Apply new effect
          balance += next.type === 'income' ? next.amount : -next.amount;

          return {
            expenses: state.expenses.map((e) => (e.id === id ? next : e)),
            balance,
          };
        }),

      deleteExpense: (id) =>
        set((state) => {
          const expenseToDelete = state.expenses.find((e) => e.id === id);
          if (!expenseToDelete) return state;
          const amountChange =
            expenseToDelete.type === 'income'
              ? -expenseToDelete.amount
              : expenseToDelete.amount;
          return {
            expenses: state.expenses.filter((e) => e.id !== id),
            balance: state.balance + amountChange,
          };
        }),

      addGoal: (goalData) =>
        set((state) => {
          const id = goalData.id || generateId();
          const current = Math.max(0, goalData.currentAmount || 0);
          let balance = state.balance;
          if (current > 0) {
            if (balance < current) {
              // Still create goal but clamp initial to available balance
              const clamped = balance;
              balance = 0;
              return {
                goals: [
                  ...state.goals,
                  { ...goalData, id, currentAmount: clamped },
                ],
                balance,
              };
            }
            balance -= current;
          }
          return {
            goals: [...state.goals, { ...goalData, id, currentAmount: current }],
            balance,
          };
        }),

      updateGoalProgress: (id, amountToAdd) => {
        const state = get();
        const goal = state.goals.find((g) => g.id === id);
        if (!goal) return { ok: false, reason: 'Meta não encontrada.' };
        if (amountToAdd <= 0) return { ok: false, reason: 'Valor inválido.' };
        if (state.balance < amountToAdd) {
          return { ok: false, reason: 'Saldo insuficiente para guardar esse valor.' };
        }
        set({
          balance: state.balance - amountToAdd,
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, currentAmount: g.currentAmount + amountToAdd } : g
          ),
        });
        return { ok: true };
      },

      deleteGoal: (id) =>
        set((state) => {
          const goal = state.goals.find((g) => g.id === id);
          if (!goal) return state;
          return {
            goals: state.goals.filter((g) => g.id !== id),
            balance: state.balance + goal.currentAmount,
            roundUpGoalId: state.roundUpGoalId === id ? null : state.roundUpGoalId,
          };
        }),

      addCategory: (categoryData) =>
        set((state) => {
          const id = categoryData.id || generateId();
          return {
            categories: [
              ...state.categories,
              {
                color: '#FFB7C5',
                ...categoryData,
                id,
              },
            ],
          };
        }),

      updateCategory: (id, patch) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...patch, id } : c
          ),
        })),

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

      setPersonality: (id) => set(() => ({ personality: id })),

      setAiOptIn: (val) => set(() => ({ aiOptIn: val })),

      setRoundUpGoalId: (id) => set(() => ({ roundUpGoalId: id })),

      setNotificationsEnabled: (val) => set(() => ({ notificationsEnabled: val })),

      importExpenses: (incoming) =>
        set((state) => {
          const existingIds = new Set(state.expenses.map((e) => e.id));
          const fresh = incoming.filter((e) => !existingIds.has(e.id));
          let balance = state.balance;
          for (const e of fresh) {
            balance += e.type === 'income' ? e.amount : -e.amount;
          }
          return {
            expenses: [...state.expenses, ...fresh],
            balance,
          };
        }),

      processDueRecurrences: () => {
        const state = get();
        const now = new Date();
        const created: Expense[] = [];
        let expenses = [...state.expenses];
        let balance = state.balance;

        expenses = expenses.map((template) => {
          if (!template.recurrence || template.isRecurringInstance) return template;
          let next = template.recurrence.nextDate;
          const every = template.recurrence.every;
          let current = { ...template };

          while (new Date(next) <= now && created.length < 24) {
            const instance: Expense = {
              id: generateId(),
              title: template.title,
              amount: template.amount,
              category: template.category,
              type: template.type,
              date: next,
              isRecurringInstance: true,
            };
            created.push(instance);
            balance += instance.type === 'income' ? instance.amount : -instance.amount;
            next = advanceRecurrenceDate(next, every);
            current = {
              ...current,
              recurrence: { every, nextDate: next },
            };
          }
          return current;
        });

        if (created.length > 0) {
          set({
            expenses: [...expenses, ...created],
            balance,
          });
        }
        return created;
      },
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
        personality: state.personality,
        aiOptIn: state.aiOptIn,
        roundUpGoalId: state.roundUpGoalId,
        notificationsEnabled: state.notificationsEnabled,
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

        // Soft-merge older shapes missing new fields
        if (candidate && typeof candidate === 'object') {
          const soft = candidate as Partial<MeowneyState>;
          return {
            ...currentState,
            ...DEFAULT_STATE,
            ...soft,
            personality: soft.personality ?? null,
            aiOptIn: soft.aiOptIn ?? false,
            roundUpGoalId: soft.roundUpGoalId ?? null,
            notificationsEnabled: soft.notificationsEnabled ?? false,
            hasSeenTutorial: soft.hasSeenTutorial ?? false,
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

const emptyStoreSubscribe = () => () => {};

export function useHydratedStore<T>(selector: (state: MeowneyStoreState) => T, fallback: T): T {
  const state = useMeowneyStore(selector);
  const mounted = useSyncExternalStore(
    emptyStoreSubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return fallback;
  }

  return state;
}
