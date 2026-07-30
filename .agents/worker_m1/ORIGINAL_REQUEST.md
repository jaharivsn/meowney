## 2026-07-30T17:56:29Z
You are Worker M1 for project Meowney.
Your working directory for metadata is: d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m1
Project directory: d:\creative-dev\projetos\pessoal\cases\meowney

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Tasks:
1. Create directory `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m1` and maintain `progress.md` inside it.
2. Check `package.json`. If `zod` is not installed, run `npm install zod` using `run_command` in `d:\creative-dev\projetos\pessoal\cases\meowney`.
3. Create `src/lib/schemas.ts` defining Zod schemas for:
   - ExpenseSchema: id (string), title (string), amount (number), category (string), date (string)
   - GoalSchema: id (string), title (string), targetAmount (number), currentAmount (number), category (string)
   - MeowneyStateSchema: balance (number), expenses (array of Expense), goals (array of Goal), hasSeenTutorial (boolean)
   - Export corresponding TypeScript types inferred from Zod schemas (`z.infer`).
4. Create `src/lib/store.ts` (or `src/store/useMeowneyStore.ts`) implementing Zustand store with LocalStorage persistence (`persist` middleware, key `'meowney-storage'`).
   - Validate hydrated LocalStorage data against `MeowneyStateSchema`. If validation fails or data is corrupted, fall back to safe default state (`balance: 1000`, `expenses: []`, `goals: []`, `hasSeenTutorial: false`).
   - Provide actions:
     - `addExpense(expenseData)`: generates id if missing, appends to `expenses`, subtracts `amount` from `balance`.
     - `deleteExpense(id)`: removes expense, adds `amount` back to `balance`.
     - `addGoal(goalData)`: generates id if missing, appends to `goals`.
     - `updateGoalProgress(id, amountToAdd)`: updates `currentAmount` of goal.
     - `deleteGoal(id)`: removes goal.
     - `setHasSeenTutorial(seen: boolean)`: updates `hasSeenTutorial`.
     - `resetTutorial()`: sets `hasSeenTutorial` to false.
   - Provide a hook or mechanism for SSR hydration safety (e.g. `useHydratedStore` or `isHydrated` state flag) so Next.js pages do not throw hydration mismatch errors.
5. Run build test (`npm run build`) in `d:\creative-dev\projetos\pessoal\cases\meowney` to confirm zero TypeScript or build errors.
6. Write a detailed handoff report in `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m1\handoff.md` summarizing files created, schemas defined, store actions implemented, build test results, and verification details. Send a message back to parent when done.
