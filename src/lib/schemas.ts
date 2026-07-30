import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  type: z.enum(['expense', 'income']),
  isCustom: z.boolean().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

export const ExpenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.number(),
  category: z.string(),
  type: z.enum(['expense', 'income']),
  date: z.string(),
});

export type Expense = z.infer<typeof ExpenseSchema>;

export const GoalSchema = z.object({
  id: z.string(),
  title: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  category: z.string(),
});

export type Goal = z.infer<typeof GoalSchema>;

export const MeowneyStateSchema = z.object({
  balance: z.number(),
  expenses: z.array(ExpenseSchema),
  goals: z.array(GoalSchema),
  categories: z.array(CategorySchema),
  hasSeenTutorial: z.boolean(),
});

export type MeowneyState = z.infer<typeof MeowneyStateSchema>;
