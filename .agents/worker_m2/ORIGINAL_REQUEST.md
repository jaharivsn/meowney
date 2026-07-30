## 2026-07-30T20:58:09Z
You are Worker M2 for project Meowney.
Your working directory for metadata is: d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m2
Project directory: d:\creative-dev\projetos\pessoal\cases\meowney

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Objective:
Refactor `/`, `/expenses`, `/goals`, and `/add` pages to remove ALL hardcoded mock transactions, balances, and fake goals. Connect all pages to `useMeowneyStore` (`src/store/useMeowneyStore.ts` or `src/lib/store.ts`) so data is real, reactive, and persistent in LocalStorage.

Detailed Requirements:

1. Create metadata directory `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m2` and keep `progress.md` inside it.

2. **Dashboard (`src/app/page.tsx`)**:
   - Connect to `useMeowneyStore` (using `useHydratedStore` or hydration check to avoid SSR hydration mismatch).
   - Display real `balance` formatted as BRL currency (R$).
   - Display total monthly expenses and active goals count dynamically.
   - Render recent expenses from `expenses` array.
   - If `expenses` is empty: display a cute, cat-themed empty state ("Nenhum gasto registrado ainda! Clique no + de patinha para adicionar 🐾").
   - Ensure absolutely ZERO hardcoded fake transactions or fake balances remain.

3. **Expenses Page (`src/app/expenses/page.tsx`)**:
   - Connect to `useMeowneyStore`.
   - Support category filter pills ("Todos", "Comida", "Lazer", "Casa", "Saúde", etc.).
   - Support switching between List and Grid views.
   - Dynamically list all real expenses (filtered by category if selected).
   - Format amounts as `R$ X,XX` and date formatted cleanly.
   - If no expenses exist (or no expenses match the filter), display a cute cat-themed empty state ("Nenhuma transação encontrada, miau!").
   - Ensure zero hardcoded mock transactions remain.

4. **Goals Page (`src/app/goals/page.tsx`)**:
   - Connect to `useMeowneyStore`.
   - Display total saved across goals (sum of `currentAmount`).
   - Render each goal dynamically showing title, targetAmount, currentAmount, progress percentage, and category.
   - Add capability to contribute to a goal (`updateGoalProgress`) and create a new goal (`addGoal`) via a clean modal/form button.
   - If `goals` is empty, display a cat-themed empty state ("Sua gavetinha de Cat-Stashes está vazia! Crie uma meta para começar a economizar 🐱💰").
   - Ensure zero hardcoded fake goals remain.

5. **Add Expense Page (`src/app/add/page.tsx`)**:
   - Connect form inputs (Amount, Category, Note/Title, Date) to state.
   - On clicking "Purr-chase" / submit:
     - Validate amount is greater than 0.
     - Call `addExpense` from `useMeowneyStore`.
     - Route user to `/expenses` or `/`.
   - Verify submitting an expense immediately deducts amount from Dashboard balance and adds it to `/expenses`.

6. Run `npm run build` in `d:\creative-dev\projetos\pessoal\cases\meowney` to confirm 0 compilation or TypeScript errors.

7. Write handoff report in `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m2\handoff.md` summarizing changes, pages modified, empty states added, and build test results. Send message back to parent.
