# Project: Meowney 1:1 Google Stitch Refactoring

## Architecture
- Framework: Next.js (App Router), React 19, TypeScript, Tailwind CSS v4.
- Design System: Google Stitch Kawaii Design System (Sakura Pink `#FFB7C5`, Cream Milk `#FFFDD0`, Mint Fresh `#A3E4D7`, Soft Charcoal `#2B2B2B`, Nunito Sans headings, Plus Jakarta Sans body/data, `32px` card radius, `16px` button radius, `@utility shadow-squishy`).
- State Management: Zustand with `persist` middleware (LocalStorage key `'meowney-storage'`) and Zod schema validation (`MeowneyStateSchema`).
- Execution Strategy: Zero-cost OmniRoute MCP fallback (`free-stack`, `google-groq-fallback`), dual-viewport browser validation (`public/dual-preview.html`), `npm run build` verification, Forensic Auditor CLEAN gate.

## Feature Inventory (12 Target Stitch Screens & Core Components)
| # | Feature / Screen | Stitch Screen ID | Description | Milestone | Source |
|---|------------------|------------------|-------------|-----------|--------|
| 1 | Design Tokens & Theme Foundation | asset-stub-assets_6c627ab841914c219b9e2373be94a73f & 62afbf0a44954a2cb8fd8da4f4c51a2d | Purge legacy `#864e5a` leak, configure `@theme` in `globals.css` with Stitch palette, font vars, `rounded-[32px]`, `rounded-[16px]`, and `@utility shadow-squishy` | M1 | Survey (Explorer 2 & 3) |
| 2 | Stitch Logo & Branding Tokens | 62afbf0a44954a2cb8fd8da4f4c51a2d | Implement 1:1 Meowney Logo icon/wordmark components with Sakura Pink & Soft Charcoal branding | M1 | Survey (Explorer 2) |
| 3 | Dashboard Refactoring (1:1) | b39eadcd47f4405dbd78c1525f3f6483 | Refactor `/app` Dashboard: 32px card radii, fix monthly expense math filter, fix sparkline expense filter, replace `window.prompt` balance edit with accessible modal | M2 | Survey (Explorer 1 & 2) |
| 4 | Expenses History Refactoring (1:1) | 8a32eee31be746ab86ab40f48064e2dc | Refactor `/app/expenses`: fix income `+R$` vs expense `-R$` formatting bug, load dynamic Zustand store categories in filter bar | M2 | Survey (Explorer 1 & 2) |
| 5 | Add New Expense Refactoring (1:1) | 9d59f4ffde0640b4a95ba4c966572043 | Refactor `/app/add`: 16px button radii (`rounded-[16px]`), tactile squishy shadows, dynamic category picker, quick amount chips | M2 | Survey (Explorer 1 & 2) |
| 6 | Cat-Stash Goals Refactoring (1:1) | a3b09e7d2f6f4edcbc145abf2ca0c365 | Refactor `/app/goals`: 32px card radii (fix legacy 8px), progress bar animation, interactive goal deposit/add modal | M2 | Survey (Explorer 1 & 2) |
| 7 | Cat-Personality System (1:1) | 1c1776cc279b40be9de37a877dc5f8fa | Dedicated Cat-Personality modal/page component: personality quiz results, spending traits, kawaii cat badge | M3 | Survey (Explorer 1 & 2) |
| 8 | Profile & Preferences Refactoring (1:1) | 1cc79f9cba6a4907af8e6606e074fe0e | Refactor `/app/profile`: Category management, avatar selector, personality badge link, reset data confirmation | M3 | Survey (Explorer 1 & 2) |
| 9 | WebGL Shader Backdrop (1:1) | 2f73a4701929482cad48b556b33409b6 | WebGL dynamic backdrop shader (`ShaderBackground.tsx`) with animated CSS mesh gradient fallback for low-power viewports | M3 | Survey (Explorer 2 & 3) |
| 10 | Kawaii Cat Avatar 3D (1:1) | 7e4d9a05edc04935b3b539b9e35f149c | Kawaii Cat 3D interactive avatar component (`KawaiiCatAvatar.tsx`) for Dashboard and Profile hero cards | M3 | Survey (Explorer 2) |
| 11 | Brandkit Board Component (1:1) | 3640526314918751543 | Brandkit Board modal/view (`BrandkitBoard.tsx` / `/app/brandkit`): identity board, color palette chips, logo usage, typography scale | M3 | Survey (Explorer 2) |
| 12 | Meowney PRD Inspector (1:1) | ecc43696daa34ca6952369b41a869198 | Interactive PRD modal/view (`MeowneyPrdModal.tsx` / `/app/prd`): rendered specification viewer for V1 LocalStorage & V2 Supabase roadmap | M3 | Survey (Explorer 2) |
| 13 | Dual-Viewport Responsive Validation | N/A | Validate all 12 Stitch screens in `public/dual-preview.html` across Desktop (1440x900) & Mobile (390x844) viewports using `browser` subagent | M4 | Survey (Explorer 3) |
| 14 | Build & Forensic Audit Gate | N/A | Verify clean `npm run build` compilation, zero facade tests in Vitest/Playwright, and Forensic Auditor CLEAN verdict | M4 | Survey (Explorer 3) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Design Tokens, Branding & Utility Base | `globals.css`, theme variables, `#864e5a` purge, Stitch palette, `rounded-[32px]`, `rounded-[16px]`, `@utility shadow-squishy`, Logo component | none | IN_PROGRESS |
| 2 | M2: WebApp Core Stitch Screens (Batch 1) | `/app/page.tsx` (Dashboard), `/app/expenses/page.tsx`, `/app/add/page.tsx`, `/app/goals/page.tsx`, state math & formatting fixes | M1 | PLANNED |
| 3 | M3: Extended Stitch Screens & Components (Batch 2) | Cat-Personality modal, `/app/profile/page.tsx`, Shader Backdrop, Kawaii Cat Avatar 3D, Brandkit Board, PRD Inspector | M1 | PLANNED |
| 4 | M4: Dual-Preview Validation, Build & Forensic Audit | `public/dual-preview.html` Desktop/Mobile browser verification, `npm run build` verification, Reviewers, Challengers, Forensic Auditor gate | M2, M3 | PLANNED |

## Interface Contracts
### Zustand Store (`useMeowneyStore`)
- `transactions`: `Transaction[]` (`id`, `description`, `amount`, `type`: `'expense' | 'income'`, `category`, `date`)
- `categories`: `Category[]` (`id`, `name`, `color`, `icon`)
- `goals`: `Goal[]` (`id`, `title`, `targetAmount`, `currentAmount`, `deadline`, `icon`)
- `balance`: `number`
- Actions: `addExpense`, `addIncome`, `deleteExpense`, `addCategory`, `deleteCategory`, `updateBalance`, `updateGoalProgress`, `setPersonality`.

## Code Layout
- `src/app/globals.css`: Tailwind CSS v4 `@theme` and `@utility shadow-squishy`.
- `src/app/app/`: Core WebApp routes (`page.tsx`, `add/page.tsx`, `expenses/page.tsx`, `goals/page.tsx`, `profile/page.tsx`).
- `src/components/cat/`: Cat-themed interactive components (`CatPersonalityModal.tsx`, `ShaderBackground.tsx`, `KawaiiCatAvatar.tsx`).
- `src/components/brand/`: Branding components (`MeowneyLogo.tsx`, `BrandkitBoard.tsx`, `MeowneyPrdModal.tsx`).
- `public/dual-preview.html`: Dual-viewport preview container.
