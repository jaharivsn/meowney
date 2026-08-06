# Meowney Codebase Analysis & Technical Mapping

## 1. Executive Summary
This document provides a comprehensive map of the **Meowney** codebase (`d:\creative-dev\projetos\pessoal\cases\meowney`), assessing its Next.js App Router architecture, component hierarchy, Tailwind v4 styling system, Zustand state management, test infrastructure, build pipeline, and coverage relative to the **12 Google Stitch screens** (Stitch Project ID: `16777229921405218590`).

---

## 2. Framework & Dependency Architecture

### 2.1 Core Stack
- **Framework**: Next.js `16.2.12` (React `19.2.4`, React DOM `19.2.4`) utilizing the App Router (`src/app`).
- **Language**: TypeScript `^5` (strict configuration in `tsconfig.json`).
- **Styling**: Tailwind CSS `^4` using `@import "tailwindcss";` and `@theme` token overrides in `src/app/globals.css`, configured via `@tailwindcss/postcss` `^4` and `postcss.config.mjs`.
- **State Management & Validation**:
  - `zustand` `^5.0.14` with `persist` middleware (local storage key `'meowney-storage'`) and hydration handling via `useHydratedStore`.
  - `zod` `^4.4.3` schema validation (`MeowneyStateSchema`).
- **UI Components & Animation**: `framer-motion` `^12.43.0`, `lucide-react` `^1.28.0`, `clsx` `^2.1.1`, `tailwind-merge` `^3.6.0`.
- **Iconography**: Google Material Symbols Outlined loaded dynamically via Google Fonts.

### 2.2 Test & Preview Infrastructure
- **Unit & Integration Testing**: `vitest` `^4.1.10`, `@testing-library/react` `^16.3.2`, `@testing-library/dom` `^10.4.1`, `@testing-library/jest-dom` `^7.0.0`, `@vitejs/plugin-react` `^6.0.5`, `jsdom` `^30.0.1`.
- **End-to-End Testing**: `@playwright/test` `^1.62.1` with tests located in `tests-e2e/`.
- **Responsive Dual-Viewport Preview**:
  - `public/dual-preview.html`: Split-screen preview embedding Desktop (`1440x900`) and Mobile (`390x844`) `<iframe>` viewports.
  - `open-dual-browser.ps1`: PowerShell script launching side-by-side Chrome browser instances on Windows.

---

## 3. Directory & File Layout

```
d:\creative-dev\projetos\pessoal\cases\meowney\
├── .agents/                      # Agent metadata & handoffs
├── meowney_logo/
│   └── screen.png                # Meowney logo source asset
├── public/                       # Static public assets & preview
│   ├── add-mockup.png
│   ├── brandkit.jpg
│   ├── dual-preview.html         # Dual-browser preview tool
│   ├── goals-mockup.png
│   ├── hero-mockup-desktop.png
│   ├── hero-mockup-mobile.png
│   ├── hero-mockup-tablet.png
│   ├── kawaii_paw_icon.jpg
│   ├── manifest.json
│   ├── og-image.png
│   └── profile-mockup.png
├── scripts/
│   └── take-app-screenshot.js
├── src/
│   ├── app/                      # App Router root
│   │   ├── app/                  # WebApp route group (/app/*)
│   │   │   ├── add/page.tsx      # Add Transaction route (/app/add)
│   │   │   ├── expenses/page.tsx # Expenses History route (/app/expenses)
│   │   │   ├── goals/page.tsx    # Cat-Stash Goals route (/app/goals)
│   │   │   ├── profile/page.tsx  # Profile & Categories route (/app/profile)
│   │   │   ├── layout.tsx        # App sub-layout (BottomNav + TutorialModal)
│   │   │   └── page.tsx          # Main Dashboard route (/app)
│   │   ├── globals.css           # Tailwind v4 theme & squishy shadow rules
│   │   ├── layout.tsx            # Root HTML layout & font loaders
│   │   └── page.tsx              # Public SaaS Landing Page
│   ├── components/               # React components
│   │   ├── landing/              # Landing Page modular sub-components
│   │   │   ├── AuthorityBar.tsx
│   │   │   ├── BenefitsGrid.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── SocialProofSection.tsx
│   │   │   └── ZigZagFeatures.tsx
│   │   ├── BalanceEditModal.tsx
│   │   ├── BottomNav.tsx
│   │   ├── Header.tsx
│   │   └── TutorialModal.tsx
│   ├── lib/
│   │   ├── __tests__/            # Vitest unit test suite
│   │   │   ├── design-system.test.ts
│   │   │   ├── m3-webapp.test.ts
│   │   │   ├── setup.ts
│   │   │   └── store.test.ts
│   │   ├── schemas.ts            # Zod data schemas
│   │   └── store.ts              # Zustand store definition
│   └── store/
│       └── useMeowneyStore.ts    # Store export alias
├── tests-e2e/                    # Playwright E2E test specs
│   ├── mockup.spec.ts
│   ├── onboarding.spec.ts
│   └── transactions.spec.ts
├── AGENTS.md                     # Next.js 16 breaking change notice
├── meowney_prd.md                # Meowney PRD documentation
├── next.config.ts                # Next.js configuration (remote image patterns)
├── open-dual-browser.ps1         # Windows dual-browser launcher script
├── package.json                  # Scripts & dependencies
├── playwright.config.ts          # Playwright test config
├── PROJECT.md                    # Project roadmap, feature inventory & contracts
├── TEST_INFRA.md                 # Test architecture & coverage specification
└── vitest.config.ts              # Vitest configuration
```

---

## 4. Mapping of the 12 Google Stitch Screens

Below is the exact mapping between the **12 Google Stitch Screens** (Project ID `16777229921405218590`) and their corresponding code artifacts in the current Meowney workspace:

| # | Stitch Screen Name | Stitch UUID / Asset ID | Current Implementation Path / Status |
|---|-------------------|------------------------|--------------------------------------|
| 1 | **Cat-Personality** | `1c1776cc279b40be9de37a877dc5f8fa` | **Partial/Missing dedicated route**. Integrated into onboarding modal (`src/components/TutorialModal.tsx`) and profile card (`src/app/app/profile/page.tsx`), but lacks a dedicated sub-view or personality selector screen. |
| 2 | **Profile** | `1cc79f9cba6a4907af8e6606e074fe0e` | **Implemented**: `src/app/app/profile/page.tsx` (User avatar, member status, tutorial replay, support email, category manager, FAQ accordion). |
| 3 | **Shader** | `2f73a4701929482cad48b556b33409b6` | **Implemented as CSS Design Tokens**: Shader gradient themes and ambient card effects in `src/app/globals.css` and landing page background gradients (`src/components/landing/HeroSection.tsx`). |
| 4 | **Meowney Logo** | `62afbf0a44954a2cb8fd8da4f4c51a2d` | **Implemented**: Asset located at `meowney_logo/screen.png`, integrated into `src/components/Header.tsx`, `src/components/landing/Navbar.tsx`, and `public/favicon.ico`. |
| 5 | **Kawaii Cat Avatar 3D** | `7e4d9a05edc04935b3b539b9e35f149c` | **Implemented**: Asset `public/kawaii_paw_icon.jpg` and profile picture integration in `Header.tsx` and `Profile.tsx`. |
| 6 | **Expenses** | `8a32eee31be746ab86ab40f48064e2dc` | **Implemented**: `src/app/app/expenses/page.tsx` (List/Grid view toggle, transaction item count, dynamic category filter pills, delete actions, empty state). |
| 7 | **Add New Expense** | `9d59f4ffde0640b4a95ba4c966572043` | **Implemented**: `src/app/app/add/page.tsx` (Gasto/Renda tab toggle, auto-scaling currency input, category selector grid, datetime picker, note textarea, purr-chase submit button). |
| 8 | **Cat-Stash Goals** | `a3b09e7d2f6f4edcbc145abf2ca0c365` | **Implemented**: `src/app/app/goals/page.tsx` (Total saved card, active goal progress bars, contribution modal, new goal creation modal, delete goal action). |
| 9 | **Design System** | `asset-stub-assets_6c627ab841914c219b9e2373be94a73f` | **Implemented**: `@theme` definitions in `src/app/globals.css` (Sakura Pink `#FFB7C5`, Cream Milk `#FFFDD0`, Mint Fresh `#A3E4D7`, Soft Charcoal `#2B2B2B`, `@utility shadow-squishy`, `32px` card radius, `16px` button radius). |
| 10 | **Dashboard** | `b39eadcd47f4405dbd78c1525f3f6483` | **Implemented**: `src/app/app/page.tsx` (Saldo Purr-feito hero card with interactive modal trigger, monthly expenses, active goals count, 7-day spending sparkline chart, recent transactions, tip card, floating FAB button). |
| 11 | **Brandkit Board** | `3640526314918751543` | **Implemented**: `public/brandkit.jpg` asset and `brandkit` skill configuration. |
| 12 | **Meowney PRD** | `ecc43696daa34ca6952369b41a869198` | **Implemented**: Complete PRD documented in `meowney_prd.md`. |

---

## 5. Design System & Styling Analysis (`src/app/globals.css`)

### 5.1 Palette & Color Tokens
- `--color-sakura-pink`: `#FFB7C5` (Primary accent & key interactions)
- `--color-cream-milk`: `#FFFDD0` (Card backgrounds & surface containers)
- `--color-mint-fresh`: `#A3E4D7` (Positive financial balance & income indicators)
- `--color-soft-charcoal`: `#2B2B2B` (High-contrast text & squishy shadow edges)
- `--color-lavender`: `#D7BDE2` (Secondary tags & badges)
- `--color-background`: `#FFFDD0` (App root background)

### 5.2 Typography Tokens
- `--font-heading`: `"Nunito Sans", sans-serif` (Headings & display titles)
- `--font-sans`: `"Plus Jakarta Sans", sans-serif` (Body text & data values)
- `--font-data-mono`: `"Plus Jakarta Sans", sans-serif` (Monospaced financial formatting)

### 5.3 Radii & Elevation Utilities
- Card Radius: `--radius-3xl: 32px` (`rounded-3xl`)
- Button Radius: `--radius-2xl: 16px` (`rounded-2xl`)
- Theme Variable: `--shadow-squishy: 0 8px 0 0 #2B2B2B;`
- Current `@utility shadow-squishy` implementation in `globals.css`:
  ```css
  @utility shadow-squishy {
    box-shadow: 0 10px 25px -5px rgba(255, 183, 197, 0.4), 0 4px 12px -2px rgba(43, 43, 43, 0.08);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(1px);
    }
  }
  ```
- **Discrepancy Note**: Unit test `design-system.test.ts:28` expects `@utility shadow-squishy` to contain `box-shadow: 0 8px 0 0 #2B2B2B;`. This discrepancy should be aligned in Phase M1/Refactoring to match the Stitch design system specification (`0 8px 0 0 #2B2B2B`).

---

## 6. Build & Test Readiness Assessment

### 6.1 Package Scripts
- `npm run dev`: Starts Next.js development server.
- `npm run build`: Compiles production build using Next.js 16 (Turbopack).
- `npm run start`: Starts production server.
- `npm run lint`: Executes ESLint.

### 6.2 Test Suite Execution
- **Unit Tests (`npx vitest run`)**: Tests store initialization, expense math (subtracting expenses, adding income, deleting transactions, updating balance), design system token compliance, and category management.
- **E2E Tests (`npx playwright test`)**: Tests complete transaction flow (`transactions.spec.ts`), onboarding tutorial behavior (`onboarding.spec.ts`), and screenshot generation (`mockup.spec.ts`).

---

## 7. Operational Observations & Recommendations for Refactoring
1. **Cat-Personality Dedicated Screen**: The 1st Stitch screen (`Cat-Personality`) is currently embedded inside modal/profile views. If a 1:1 screen match is required, a dedicated `/app/personality` route or view state should be evaluated.
2. **Next.js 16 Strict Rules**: As highlighted in `AGENTS.md`, Next.js 16 includes breaking changes around dynamic APIs and layout params. Code quality must maintain compliance.
3. **Responsive Preview Readiness**: `public/dual-preview.html` and `open-dual-browser.ps1` are pre-configured for instant dual-viewport verification (1440x900 Desktop & 390x844 Mobile).
