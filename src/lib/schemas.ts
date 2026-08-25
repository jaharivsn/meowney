import { z } from 'zod';

export const PersonalityIdSchema = z.enum([
  'accountant',
  'cheerleader',
  'zen',
  'sassy',
]);

export type PersonalityId = z.infer<typeof PersonalityIdSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  type: z.enum(['expense', 'income']),
  isCustom: z.boolean().optional(),
  color: z.string().optional(),
  monthlyLimit: z.number().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

export const RecurrenceSchema = z
  .object({
    every: z.enum(['week', 'month']),
    nextDate: z.string(),
  })
  .optional();

export const ExpenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.number(),
  category: z.string(),
  type: z.enum(['expense', 'income']),
  date: z.string(),
  recurrence: RecurrenceSchema,
  isRecurringInstance: z.boolean().optional(),
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
  personality: PersonalityIdSchema.nullable().default(null),
  aiOptIn: z.boolean().default(false),
  roundUpGoalId: z.string().nullable().default(null),
  notificationsEnabled: z.boolean().default(false),
});

export type MeowneyState = z.infer<typeof MeowneyStateSchema>;
