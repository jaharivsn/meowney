# Orchestration Plan — Meowney MVP Refactoring

## Phase 1: Setup & Store Implementation (Milestone 1)
- Objective: Install `zod` package if missing, construct Zod schemas for `Expense`, `Goal`, and `StoreState`. Implement Zustand store persistent in LocalStorage with Zod validation.
- Agent: `teamwork_preview_worker` (armed with domain expertise).

## Phase 2: Page Integrations & Mock Removal (Milestone 2)
- Objective: Replace all mock/hardcoded data across `/`, `/expenses`, `/goals`, and `/add` pages. Connect page state directly to `useMeowneyStore`. Add empty state components when transactions or goals lists are empty.
- Agent: `teamwork_preview_worker`.

## Phase 3: Profile Page Refactoring & Onboarding Modal (Milestone 3)
- Objective: Simplify `/profile` page (remove notifications/settings, add FAQ, Support link `mailto:jahari.wav@gmail.com`, and Replay Tutorial button). Create step-by-step Onboarding Tutorial modal using Framer Motion triggered on first visit or via Profile page.
- Agent: `teamwork_preview_worker`.

## Phase 4: Verification, Testing & Forensic Audit (Milestone 4)
- Objective: Run Next.js build (`npm run build`) and linting (`npm run lint`), verify zero hardcoded mock data, check data persistence upon refresh, and run forensic audit.
- Agents: `teamwork_preview_reviewer` + `teamwork_preview_auditor`.
