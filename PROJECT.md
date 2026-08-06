# Project: Meowney Refactoring & Refinement

## Architecture
- Framework: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.
- Design System: Stitch Kawaii Design System (Sakura Pink `#FFB7C5`, Cream Milk `#FFFDD0`, Mint Fresh `#A3E4D7`, Soft Charcoal `#2B2B2B`, Nunito Sans headings, Plus Jakarta Sans body/data, `32px` card radius, `16px` button radius, squishy tactile shadows).
- State Management: Zustand with `persist` middleware (LocalStorage key `'meowney-storage'`) and Zod schema validation (`MeowneyStateSchema`).
- Structure:
  - Landing Page: `src/app/page.tsx` (layout composer) + `src/components/landing/*` (Navbar, HeroSection, AuthorityBar, ZigZagFeatures, PricingSection, SocialProofSection, BenefitsGrid, FaqSection, Footer).
  - WebApp: `src/app/app/page.tsx` (Dashboard), `src/app/app/add/page.tsx` (Add Transaction), `src/app/app/goals/page.tsx` (Cofrinhos/Goals), `src/app/app/profile/page.tsx` (Category Management & Profile), `src/app/app/expenses/page.tsx` (Transaction History).
  - Preview: `public/dual-preview.html` + `open-dual-browser.ps1`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Design Tokens & Theme | Purge `#864e5a`, configure `@theme` in `globals.css` with Stitch colors, fonts, and `@utility shadow-squishy` | M1 | Survey |
| 2 | Component Radii & Styling System | Enforce 32px card radius (`rounded-3xl`) and 16px button radius (`rounded-2xl`) utilities | M1 | Survey |
| 3 | Landing Page Component Decomposition | Modularize `src/app/page.tsx` into `src/components/landing/*` sub-components | M2 | Survey |
| 4 | Landing Page Conversion & Benchmarks | Add smooth anchor navigation (`#recursos`, `#precos`, `#depoimentos`, `#faq`), secondary Hero CTA, 3rd testimonial card, anchored V2 Cloud Sync pricing plan | M2 | Survey |
| 5 | Landing Page Accessibility (WCAG 2.1 AA) | Add `aria-expanded`/`aria-controls` to FAQ accordion, `aria-hidden="true"` to decorative icons | M2 | Survey |
| 6 | Landing Page Asset Synchronization | Connect correct desktop/tablet/mobile mockup frame assets in Hero section | M2 | Survey |
| 7 | WebApp Balance & Expense Math Fixes | Filter `e.type === 'expense'` in `monthlyExpenses` and `dailySpend` calculations on `/app` | M3 | Survey |
| 8 | WebApp Income vs Expense Formatting | Format income as `+R$` and expense as `-R$` on `/app/expenses` transaction list | M3 | Survey |
| 9 | WebApp Dynamic Category Filtering | Load custom categories dynamically from Zustand store on `/app/expenses` filter bar | M3 | Survey |
| 10 | WebApp Interactive Balance Modal | Replace `window.prompt` balance editing with accessible inline modal on `/app` | M3 | Survey |
| 11 | WebApp Aesthetic & Radii Refactor | Enforce 32px card radii, 16px button radii, and Stitch colors across all `/app/*` views | M3 | Survey |
| 12 | Dual-Browser Responsive Preview | Verify `public/dual-preview.html` with Desktop (1440x900) & Mobile (390x844) viewports | M4 | Survey |
| 13 | Build & E2E Acceptance Verification | Ensure `npm run build`, Vitest unit tests, and Playwright E2E tests pass 100% | M4 | Survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Design System Foundation | `src/app/globals.css`, Tailwind theme, Stitch tokens, squishy shadows, radii classes | none | DONE |
| 2 | M2: Landing Page & SaaS Benchmarks | `src/components/landing/*`, `src/app/page.tsx`, Lapa.ninja features, accessibility, assets | M1 | DONE |
| 3 | M3: WebApp Financeiro & Mobbin iOS | `src/app/app/*`, state math fixes, balance modal, dynamic categories, Mobbin UX | M1 | PLANNED |
| 4 | M4: Dual-Browser Preview & E2E Validation | `public/dual-preview.html`, `npm run build`, Vitest, Playwright tests, zero AI-slop check | M2, M3 | PLANNED |

## Interface Contracts
### Zustand Store ↔ WebApp Views
- `useMeowneyStore`: `state.transactions`, `state.categories`, `state.goals`, `state.balance`, `state.addExpense`, `state.addIncome`, `state.deleteExpense`, `state.addCategory`, `state.deleteCategory`, `state.updateBalance`, `state.updateGoalProgress`.
- Persistence: `localStorage.getItem('meowney-storage')`, validated via `MeowneyStateSchema`.

## Code Layout
- `src/app/globals.css`: Tailwind v4 theme definitions and squishy shadow utilities.
- `src/components/landing/`: Modular Landing Page sections (Navbar, HeroSection, AuthorityBar, ZigZagFeatures, PricingSection, SocialProofSection, BenefitsGrid, FaqSection, Footer).
- `src/app/app/`: WebApp routes (Dashboard, Add Transaction, Expenses History, Goals/Cofrinhos, Profile/Category Management).
- `public/dual-preview.html`: Dual-browser desktop + mobile preview.
