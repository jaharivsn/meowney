# Project: Meowney — MVP Refactoring & Feature Hardening

## Architecture
- Framework: Next.js (App Router, React 19)
- Styling: TailwindCSS v4 + Lucide React + Framer Motion
- State & Persistence: Zustand Store synced with LocalStorage, validated via Zod schemas.
- Key Entities:
  - Wallet: `balance: number`
  - Transaction (Expense): `id`, `description`, `amount`, `category`, `date`
  - Goal ("Cat-Stash"): `id`, `title`, `targetAmount`, `currentAmount`, `category`, `deadline` (optional)
  - Tutorial State: `hasSeenTutorial: boolean`

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Store & Zod Validation | Install Zod, implement Zustand store with LocalStorage persistence and Zod validation, remove mock constants. | none | DONE |
| 2 | M2: Page Integrations | Connect `/`, `/expenses`, `/goals`, `/add` to Zustand store; support real transaction addition and balance calculation; display empty states when empty. | M1 | DONE |
| 3 | M3: Profile & Tutorial Modal | Replace settings/notifications on `/profile` with static FAQ, Support link (`mailto:jahari.wav@gmail.com`), and Replay Tutorial button. Build Framer Motion Onboarding Modal triggered on 1st visit & on demand. | M1, M2 | DONE |
| 4 | M4: Quality & Forensic Audit | Run lint/build checks, verify zero hardcoded mock data, check data persistence on refresh, conduct forensic audit. | M1, M2, M3 | DONE |

## Code Layout
- `src/app/` — Next.js pages (`page.tsx`, `expenses/page.tsx`, `goals/page.tsx`, `add/page.tsx`, `profile/page.tsx`, `layout.tsx`)
- `src/components/` — Shared UI components (`BottomNav.tsx`, `Header.tsx`, `TutorialModal.tsx`, `FAQ.tsx`, etc.)
- `src/lib/` or `src/store/` — Zustand store, Zod schemas, types (`useMeowneyStore.ts`, `schemas.ts`, `types.ts`, `store.ts`)

## Interface Contracts
### Store Schema & Methods (`useMeowneyStore`)
- `balance`: `number`
- `expenses`: `Array<{ id: string, title: string, amount: number, category: string, date: string }>`
- `goals`: `Array<{ id: string, title: string, targetAmount: number, currentAmount: number, category: string }>`
- `hasSeenTutorial`: `boolean`
- `addExpense`: `(expense: Omit<Expense, 'id'>) => void`
- `addGoal`: `(goal: Omit<Goal, 'id'>) => void`
- `updateGoalProgress`: `(id: string, amount: number) => void`
- `setHasSeenTutorial`: `(seen: boolean) => void`
- `resetTutorial`: `() => void`
