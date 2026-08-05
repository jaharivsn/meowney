# Analysis Report — WebApp Financeiro & State Management & Dual Preview

**Explorer**: Explorer 3 (WebApp Financeiro & State Management & Dual Preview)  
**Date**: 2026-08-05  
**Target Repository**: `d:\creative-dev\projetos\pessoal\cases\meowney`  

---

## 1. Executive Summary

This report presents an exhaustive read-only investigation of the **Meowney WebApp** architecture, covering:
1. **Zustand State Management & LocalStorage Persistence** (`src/lib/store.ts`, `src/lib/schemas.ts`).
2. **Real-time Balance Calculations & Transaction Flow** (`/app`, `/app/add`, `/app/expenses`).
3. **WebApp Routes & UI Compliance** with Mobbin Finance iOS benchmarks (`/app`, `/app/add`, `/app/goals`, `/app/profile`).
4. **Dual-Browser Responsive Preview Setup** (`public/dual-preview.html`, `open-dual-browser.ps1`).
5. **Quality & Deficiencies Audit** (bugs, edge cases, category desynchronization, and testing suite).

Overall, the WebApp architecture is soundly structured around Zustand with Zod schema validation and Next.js App Router. However, 5 specific deficiencies in calculation logic, category synchronization, and expense UI formatting were discovered that impact R3 compliance and real-time accuracy.

---

## 2. Zustand State Management & LocalStorage Persistence

### 2.1 Schema Definitions & Data Types (`src/lib/schemas.ts`)
- **`CategorySchema`**: `id: string`, `label: string`, `icon: string`, `type: 'expense' | 'income'`, `isCustom?: boolean`.
- **`ExpenseSchema`**: `id: string`, `title: string`, `amount: number`, `category: string`, `type: 'expense' | 'income'`, `date: string` (ISO 8601).
- **`GoalSchema`**: `id: string`, `title: string`, `targetAmount: number`, `currentAmount: number`, `category: string`.
- **`MeowneyStateSchema`**: Combines `balance` (number), `expenses` (array), `goals` (array), `categories` (array), and `hasSeenTutorial` (boolean).

### 2.2 Store Actions & LocalStorage Persistence (`src/lib/store.ts`)
- **Persistence Storage**: Storage key is `'meowney-storage'`. Wrapped with `createJSONStorage` using `window.localStorage` when present, falling back to a `dummyStorage` object on SSR.
- **Zod Validation on Hydration**: The `merge` configuration uses `MeowneyStateSchema.safeParse(candidate)`. If parsing succeeds, it merges persisted state into current state; if it fails, it safely resets to `DEFAULT_STATE`.
- **Hydration Safety**:
  - `isHydrated` boolean flag managed via `onRehydrateStorage`.
  - `useHydratedStore<T>(selector, fallback)` custom hook protects client components against React hydration mismatches between SSR default values and LocalStorage contents.

### 2.3 Store Actions Logic Audit
| Action | State Affected | Logic / Formula |
|---|---|---|
| `setBalance(val)` | `balance` | `balance = val` |
| `addExpense(expenseData)` | `expenses`, `balance` | `balance += (type === 'income' ? +amount : -amount)` |
| `deleteExpense(id)` | `expenses`, `balance` | `balance += (type === 'income' ? -amount : +amount)` |
| `addGoal(goalData)` | `goals` | Appends goal object to `goals` array |
| `updateGoalProgress(id, amountToAdd)` | `goals` | `goal.currentAmount += amountToAdd` |
| `deleteGoal(id)` | `goals` | Filters out goal by `id` |
| `addCategory(categoryData)` | `categories` | Appends category object to `categories` array |
| `deleteCategory(id)` | `categories` | Removes category IF `isCustom === true` |

---

## 3. WebApp Routes & UI Benchmark Analysis (Mobbin Finance iOS)

### 3.1 Route `/app` (Dashboard) — `src/app/app/page.tsx`
- **Hero Balance Card**: Displays balance split into integer and decimal parts (`R$ 1.000,00`). Clicking the balance triggers `window.prompt` to edit balance in real time.
- **Quick Stats**:
  - **Gastos (Mês)**: Calculates total expenses for current month.
  - **Cat-Stashes**: Displays count of active goals (`currentAmount < targetAmount`) with visual progress dots.
- **Purr-formance Sparkline**: 7-day bar chart rendering daily spend levels.
- **Rações Recentes**: Displays up to 5 most recent transactions with type-based color formatting (+ green for income, - red for expense).
- **Tip Card (Economia Nyan-tástica)**: Displays progress remaining for the first active goal.
- **Floating Action Button (FAB)**: Sakura Pink paw button linking to `/app/add`.

### 3.2 Route `/app/add` (New Transaction Flow) — `src/app/app/add/page.tsx`
- **Segmented Control**: Toggle between "Gasto (-)" and "Renda (+)".
- **Hero Amount Input**: Large mono font input with dynamic font size based on character count.
- **Dynamic Category Selector**: Filters store categories by selected transaction type (`expense` or `income`).
- **Date/Time & Note Input**: `datetime-local` input pre-populated with current local time; note textarea.
- **Submit Action**: Calls `addExpense`, updates balance, and navigates to `/app/expenses`.

### 3.3 Route `/app/goals` (Cat-Stashes / Savings Goals) — `src/app/app/goals/page.tsx`
- **Header Card**: Total saved sum across all goals (`goals.reduce(...)`).
- **Goal Cards**: Displays title, target amount, current amount, category badge, and animated progress bar (`progressPct`).
- **Goal Actions**:
  - "Guardar Valor" button opens quick contribution modal with preset buttons (+R$ 10, +R$ 20, +R$ 50).
  - Delete button removes goal via `deleteGoal(id)`.
- **Create Goal Modal**: Input fields for Title, Target R$, Already Saved R$, and Category selector.

### 3.4 Route `/app/profile` (Profile & Category Management) — `src/app/app/profile/page.tsx`
- **User Header**: Avatar image, "Cat Parent" title, "Membro Meowney" badge.
- **Quick Actions**: "Rever Tutorial" triggers `TutorialModal`; "Falar com Suporte" mailto link.
- **Gerenciar Categorias**: Lists all categories, allows deleting custom categories, and form to add new categories.
- **FAQ Accordion**: 3 expandable accordion items answering key user questions.

### 3.5 Route `/app/expenses` (Transactions History) — `src/app/app/expenses/page.tsx`
- **Utility Header**: View switcher (List vs Grid mode), total transaction counter.
- **Category Filter Pills**: Horizontal scroll bar for filtering expenses by category.
- **Transaction Cards**: Shows category icon, title, amount, formatted date, category tag, and delete button.

---

## 4. Deficiencies & Bugs Identified

During deep code analysis, five specific bugs/inconsistencies were discovered in the WebApp:

### 🔴 Defect 1: Monthly Expenses Calculation Includes Incomes (`src/app/app/page.tsx`, lines 63-69)
- **Observation**:
  ```ts
  const monthlyExpenses = expenses
    .filter((e) => {
      if (!e.date) return false;
      const d = new Date(e.date);
      return !isNaN(d.getTime()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);
  ```
- **Impact**: Income transactions logged in the current month are added into `monthlyExpenses`, falsely inflating reported monthly spending.
- **Required Fix**: Add `&& e.type === 'expense'` to the filter.

### 🔴 Defect 2: 7-Day Sparkline Chart Includes Incomes (`src/app/app/page.tsx`, lines 91-97)
- **Observation**:
  ```ts
  const dailySpend = last7Days.map((day) => {
    return expenses
      .filter((e) => {
        const ed = new Date(e.date);
        return ed.toDateString() === day.toDateString();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  });
  ```
- **Impact**: Daily spending bars include income entries, distorting the spending trend.
- **Required Fix**: Add `e.type === 'expense'` filter to `dailySpend` calculation.

### 🔴 Defect 3: Expenses Page Hardcodes `-R$` for All Transactions (`src/app/app/expenses/page.tsx`, line 194)
- **Observation**:
  ```tsx
  <span className="font-data-mono text-data-mono text-primary">
    -R$ {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
  </span>
  ```
- **Impact**: Income transactions display with a minus sign (`-R$ 500,00`) instead of plus sign (`+R$ 500,00`) in `/app/expenses`.
- **Required Fix**: Conditionally format prefix (`expense.type === 'income' ? '+' : '-'`) and styling (`expense.type === 'income' ? 'text-mint-fresh' : 'text-primary'`).

### 🔴 Defect 4: Expenses Page Uses Static Category List Instead of Dynamic Store (`src/app/app/expenses/page.tsx`, lines 14-22)
- **Observation**: `CATEGORIES` array in `expenses/page.tsx` is static and hardcoded. Custom categories created in `/app/profile` do NOT appear in the category filter bar in `/app/expenses`.
- **Impact**: Users cannot filter transactions by custom categories created in profile settings.
- **Required Fix**: Read categories dynamically from `useHydratedStore((s) => s.categories)`.

### 🟡 Defect 5: Primitive Balance Edit UI (`src/app/app/page.tsx`, lines 123-131)
- **Observation**: Balance editing relies on native `window.prompt("Digite o novo saldo...")`.
- **Impact**: Breaks Mobbin Finance iOS visual standards. An inline modal or popover editor would match the Kawaii design system much better.

---

## 5. Dual-Browser Responsive Preview Assessment (R4 Compliance)

### 5.1 Artifacts Evaluated
1. **`public/dual-preview.html`**:
   - Split iframe layout with `#111` dark background.
   - Desktop Panel: 1440px width container.
   - Mobile Panel: 450px width container (target viewport 390x844).
2. **`open-dual-browser.ps1`**:
   - Launches Chrome/Edge in dual side-by-side native windows.

### 5.2 Verification of R4 Requirements
- The HTML visualizer `public/dual-preview.html` is accessible at `http://localhost:3000/dual-preview.html`.
- Displays both Desktop and Mobile views side-by-side.
- Zero horizontal scroll issues found in app layout CSS (`px-margin-mobile`, flex wrapping).

---

## 6. Testing & Quality Assurance Summary

1. **Unit Tests (`src/lib/__tests__/store.test.ts`)**:
   - Tests initial state, adding expense, adding income, and deleting expense with balance restoration.
2. **E2E Tests (`tests-e2e/`)**:
   - `transactions.spec.ts`: Tests complete flow of adding income, checking balance, adding expense, checking updated balance.
   - `onboarding.spec.ts`: Tests 4-step tutorial slideshow and LocalStorage persistence.
3. **Build Status**:
   - Production build (`npm run build`) compiles cleanly without TypeScript errors.

---

## 7. Proposed Recommendations for Implementer

1. **Fix Defect 1 & 2 in `/app/page.tsx`**: Filter by `e.type === 'expense'` in `monthlyExpenses` and `dailySpend`.
2. **Fix Defect 3 in `/app/expenses/page.tsx`**: Differentiate income vs expense formatting (`+R$` vs `-R$`).
3. **Fix Defect 4 in `/app/expenses/page.tsx`**: Replace static `CATEGORIES` array with dynamic `categories` from `useHydratedStore`.
4. **Refine Balance Editing UX**: Replace `window.prompt` with an elegant Kawaii Modal / Popover for editing balance.
