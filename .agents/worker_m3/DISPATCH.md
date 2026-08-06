# DISPATCH — Worker (Milestone 3: WebApp Financeiro & Mobbin iOS Benchmark)

## Mission
Refactor the WebApp routes (`/app`, `/app/add`, `/app/expenses`, `/app/goals`, `/app/profile`), fix transaction calculation defects, upgrade balance editing UX to an inline modal, enable dynamic category filtering, and apply 100% Stitch Design System styling (32px card radii, 16px button radii, squishy shadows).

## Objectives & Deliverables
1. **Transaction Calculation & Formatting Defect Fixes**:
   - `src/app/app/page.tsx`: Filter `e.type === 'expense'` in `monthlyExpenses` and `dailySpend` calculations so income is never added to expense totals.
   - `src/app/app/expenses/page.tsx`: Differentiate transaction amount formatting: format income entries with `+R$` and expense entries with `-R$`.
   - `src/app/app/expenses/page.tsx`: Replace static `CATEGORIES` array with dynamic category subscription from Zustand store (`useMeowneyStore((state) => state.categories)`), enabling custom categories created in `/app/profile` to be filtered.
2. **Mobbin Finance iOS Benchmark UX Upgrade**:
   - `src/app/app/page.tsx`: Replace browser `window.prompt` balance editing with an accessible inline Modal component (`BalanceEditModal`) featuring clean numeric input, quick presets, cancel/save actions, and ARIA dialog attributes.
3. **Stitch Design System Refactor Across WebApp Views**:
   - Refactor card containers across `/app`, `/app/add`, `/app/expenses`, `/app/goals`, `/app/profile` to use `rounded-3xl` (`32px` card radius).
   - Refactor buttons across all `/app/*` views to use `rounded-2xl` (`16px` button radius).
   - Apply `@utility shadow-squishy` or `shadow-squishy` class to prominent cards and primary action buttons.
   - Ensure zero occurrences of legacy `#864e5a` or un-themed colors across all `/app/*` components.
4. **Build & Test Verification**:
   - Run `npm run build` to verify clean production build with 0 TypeScript compilation errors.
   - Run `npx vitest run` to verify unit tests pass 100%.
   - Run `npx playwright test tests-e2e/transactions.spec.ts` (or all Playwright E2E tests) to verify transaction creation, balance updates, and LocalStorage persistence.

## Reference Files
- `ORIGINAL_REQUEST.md`: `d:\creative-dev\projetos\pessoal\cases\meowney\ORIGINAL_REQUEST.md`
- `PROJECT.md`: `d:\creative-dev\projetos\pessoal\cases\meowney\PROJECT.md`
- Explorer 3 Handoff: `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\explorer_survey_3\handoff.md`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## 2026-08-05T15:34:27Z
You are the WebApp Worker for Milestone 3 (M3: WebApp Financeiro & Mobbin iOS Benchmark).
Your working directory is: d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m3
Read DISPATCH.md at: d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m3\DISPATCH.md
Read ORIGINAL_REQUEST.md at: d:\creative-dev\projetos\pessoal\cases\meowney\ORIGINAL_REQUEST.md
Read PROJECT.md at: d:\creative-dev\projetos\pessoal\cases\meowney\PROJECT.md
Read skill instructions at: C:\Users\jahar\.gemini\config\skills\frontend-supremo\SKILL.md
Read skill instructions at: C:\Users\jahar\.gemini\config\skills\backend-supremo\SKILL.md

Execute all tasks described in DISPATCH.md:
1. Fix transaction calculations in `/app` (`monthlyExpenses` and `dailySpend` must filter e.type === 'expense').
2. Format income as +R$ and expenses as -R$ in `/app/expenses`.
3. Load categories dynamically from Zustand store in `/app/expenses`.
4. Replace window.prompt balance editing in `/app` with an accessible inline modal (`BalanceEditModal`).
5. Enforce 32px card radii (`rounded-3xl`), 16px button radii (`rounded-2xl`), Stitch colors, and squishy shadows across all `/app/*` views (`/app`, `/app/add`, `/app/expenses`, `/app/goals`, `/app/profile`).
6. Run `npm run build` and `npx vitest run` to verify zero compilation or test errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write your handoff report to:
d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m3\handoff.md

When complete, notify parent via send_message with build/test results and handoff path.
