# Comprehensive Gap & Architectural Strategy Analysis — Meowney 1:1 Google Stitch Refactoring

**Author**: Explorer 3 (Gap & Strategy Analyst)  
**Target Project**: Meowney (`d:\creative-dev\projetos\pessoal\cases\meowney`)  
**Stitch Project ID**: `16777229921405218590`  
**Date**: 2026-08-05  

---

## 1. Executive Summary

This document establishes the comprehensive gap analysis and strategic execution blueprint for the 1:1 refactoring of the Meowney financial web application against the 12 target Google Stitch screens. Current codebase inspection reveals structural and aesthetic gaps: legacy Material Design 3 color leakage (`#864e5a`), inconsistent component radii (`8px`/`12px` cards instead of strict `32px`), absent tactile squishy shadows, and incomplete component decomposition for specialized Stitch screens (e.g., Cat-Personality, WebGL Shader, 3D Avatar, Brandkit Board).

To ensure 100% fidelity, zero IDE quota consumption, flawless responsive behavior, and robust quality, this strategy synthesizes **4 core architectural pillars**:
1. **Zero-Cost OmniRoute MCP Fallback Strategy** (`free-stack`, `google-groq-fallback`).
2. **Component Decomposition & Design Token Centralization** (`rounded-[32px]`, `@theme` CSS variables, squishy utilities).
3. **Dual-Viewport Responsive Validation Strategy** (`public/dual-preview.html` Desktop 1440px & Mobile 390px).
4. **Build Verification & Forensic Audit Prevention** (elimination of hardcoded facade tests, clean TypeScript/Next.js build).

---

## 2. Gap Analysis Matrix: 12 Stitch Screens vs Next.js / Tailwind Architecture

| # | Stitch Screen | Screen ID | Intended Function / View | Current Codebase State | Gap & Required Architecture |
|---|---------------|-----------|--------------------------|------------------------|-----------------------------|
| 1 | **Cat-Personality** | `1c1776cc279b40be9de37a877dc5f8fa` | Cat financial archetype card (Economiau, Poupador, Gastoento), level, mood state & badges | Missing dedicated view/component. Currently integrated partially into static profile strings. | Create `src/components/cat/CatPersonalityModal.tsx` & `CatArchetypeCard.tsx`. Expose personality score derived from Zustand transaction state. |
| 2 | **Profile** | `1cc79f9cba6a4907af8e6606e074fe0e` | User cat avatar, category manager (color pickers/icons), settings list, app preferences | Exists at `src/app/app/profile/page.tsx`. Uses `rounded-2xl` (16px) instead of 32px cards and legacy text colors. | Refactor `profile/page.tsx`: apply `rounded-[32px]` to avatar & category cards, replace `#864e5a` with `#2B2B2B`, integrate full category CRUD modal. |
| 3 | **Shader** | `2f73a4701929482cad48b556b33409b6` | Animated WebGL / CSS backdrop shader displaying Sakura Pink & Mint Fresh ambient lighting | Missing WebGL/CSS shader background component. | Build `src/components/ui/ShaderBackground.tsx` using CSS radial gradients and keyframe animation or Canvas WebGL fallback matching Stitch parameters. |
| 4 | **Meowney Logo** | `62afbf0a44954a2cb8fd8da4f4c51a2d` | Brand asset featuring cat ears, coin motif, Nunito Sans bold typography, and squishy badge | Assets exist in `meowney_logo/` and SVG text in `src/components/landing/Navbar.tsx`. Uses legacy `text-primary`. | Standardize `src/components/ui/MeowneyLogo.tsx`. Enforce Nunito Sans font, `#FFB7C5` ear accents, and `#2B2B2B` typography across all headers. |
| 5 | **Kawaii Cat Avatar 3D** | `7e4d9a05edc04935b3b539b9e35f149c` | Interactive 3D / pseudo-3D Kawaii cat avatar reflecting financial health (happy, saving, alert) | Static SVG placeholder in `/public` and inline emoji. | Create `src/components/ui/KawaiiCatAvatar.tsx` with Framer Motion floating animation, expressive SVG asset states, and mood props. |
| 6 | **Expenses** | `8a32eee31be746ab86ab40f48064e2dc` | Transaction history with Income (`+R$`) vs Expense (`-R$`), category filter pills, date grouping | Exists at `src/app/app/expenses/page.tsx`. Cards use `rounded-lg` (8px), missing strict `+R$` formatting. | Refactor `expenses/page.tsx`: enforce `rounded-[32px]`, dynamic Zustand category loading, strict `+R$` / `-R$` color coding (Mint Fresh / Sakura Pink), search input. |
| 7 | **Add New Expense** | `9d59f4ffde0640b4a95ba4c966572043` | Expense/Income toggle, keypad amount input, category grid, date picker, notes, squishy button | Exists at `src/app/app/add/page.tsx`. Uses `rounded-lg` for categories and `rounded-full` for submit CTA. | Refactor `add/page.tsx`: convert categories to `rounded-[32px]` grid cards, submit CTA to `rounded-[16px]` with `shadow-squishy`, type switcher toggle. |
| 8 | **Cat-Stash Goals** | `a3b09e7d2f6f4edcbc145abf2ca0c365` | Piggy bank / Cofrinhos progress cards, target vs current amount, progress bars, deposit modal | Exists at `src/app/app/goals/page.tsx`. Goal cards use `rounded-lg` (8px) and standard progress bar styling. | Refactor `goals/page.tsx`: update goal cards to `rounded-[32px]`, custom cat-themed progress bar (`bg-sakura-pink`), quick deposit modal with tactile buttons. |
| 9 | **Design System** | `asset-stub-assets_6c627ab841914c219b9e2373be94a73f` | Token specifications: colors (`#FFB7C5`, `#FFFDD0`, `#A3E4D7`, `#2B2B2B`), 32px radii, Nunito/Jakarta | Configured in `globals.css` but contains legacy `#864e5a` leak and missing font definitions. | Clean `globals.css`: remove `#864e5a`, declare `@theme` tokens, add `@utility shadow-squishy`, create `src/app/design-system/page.tsx` preview board. |
| 10 | **Dashboard** | `b39eadcd47f4405dbd78c1525f3f6483` | Hero balance card, expense summary, daily spending chart, quick action bar, transaction list | Exists at `src/app/app/page.tsx`. Balance card uses `rounded-xl` (12px), quick stats use `rounded-lg` (8px). | Refactor `app/page.tsx`: balance hero `rounded-[32px]`, stats cards `rounded-[32px]`, integrate `BalanceEditModal.tsx` and recent transaction stream. |
| 11 | **Brandkit Board** | `3640526314918751543` | Board showcase displaying logo marks, color swatches, typography scales, tactile component states | Missing dedicated view. | Create `src/components/brand/BrandkitBoard.tsx` displaying interactive color tokens, logo variants, and squishy button states. |
| 12 | **Meowney PRD** | `ecc43696daa34ca6952369b41a869198` | Product Requirements Document & feature spec documentation | Documented in root `meowney_prd.md` and `PROJECT.md`. Missing in-app documentation modal. | Create `src/components/ui/PrdModal.tsx` to render interactive PRD spec viewer in-app for auditing compliance. |

---

## 3. Pillar 1: Zero-Cost OmniRoute MCP Fallback Strategy

### 3.1 Objective
To eliminate IDE API token quota consumption during heavy analysis, subagent orchestration, and code auditing, all LLM calls executed through subagent channels must route via the `mcp_omniroute_omniroute_chat` tool using designated zero-cost fallback stacks.

### 3.2 Rotation Stack Definition
- **Primary Combo**: `free-stack`
  - Targets high-throughput free models (e.g. `google/gemini-2.5-flash`, `google/gemini-2.0-flash-exp:free`, `meta-llama/llama-3.3-70b-instruct:free`).
- **Fallback Combo**: `google-groq-fallback`
  - Secondary zero-cost failover tier using Groq LPUs (`groq/llama-3.3-70b`, `groq/mixtral-8x7b-32768`) and Google AI Studio endpoints.

### 3.3 Execution & Exception Protocol
```markdown
1. Query Initiated via `mcp_omniroute_omniroute_chat`
   ├── Payload: Model combo = "free-stack"
   ├── Temperature: 0.2 (deterministic architectural output)
   └── Response Received -> Process Output
2. IF "rate_limit_exceeded" OR "provider_unavailable" (5xx error)
   ├── Failover instantly to `google-groq-fallback`
   ├── Exponential Backoff: Wait 1000ms before retry
   └── Log fallback event to `progress.md`
3. IF payload size > 16,000 tokens
   ├── Compress input context using caveman key-value summarizing
   └── Re-issue request to `free-stack`
```

---

## 4. Pillar 2: Component Decomposition & Design Token Centralization

### 4.1 Tailwind CSS v4 Token Specification (`globals.css`)
All design tokens must be declared in `@theme` inside `src/app/globals.css` with zero hardcoded hex codes outside this file.

```css
@import "tailwindcss";

@theme {
  /* Core Stitch Color Palette */
  --color-sakura-pink: #FFB7C5;
  --color-cream-milk: #FFFDD0;
  --color-mint-fresh: #A3E4D7;
  --color-soft-charcoal: #2B2B2B;
  --color-lavender: #D7BDE2;
  --color-surface-off-white: #FAF9F6;
  
  /* Mapped Semantic Colors (Purged #864e5a) */
  --color-background: var(--color-cream-milk);
  --color-on-background: var(--color-soft-charcoal);
  --color-primary: var(--color-soft-charcoal);
  --color-on-primary: #FFFFFF;
  --color-primary-container: var(--color-sakura-pink);
  --color-on-primary-container: var(--color-soft-charcoal);
  --color-secondary: var(--color-mint-fresh);
  --color-on-secondary: var(--color-soft-charcoal);

  /* Typography Scales & Families */
  --font-heading: "Nunito Sans", sans-serif;
  --font-sans: "Plus Jakarta Sans", sans-serif;
  --font-mono: "Plus Jakarta Sans", sans-serif;

  /* Corner Radii Standard */
  --radius-card: 32px;
  --radius-button: 16px;
  --radius-3xl: 32px;
  --radius-2xl: 16px;
}

/* Tactile Squishy Shadow Utility */
@utility shadow-squishy {
  box-shadow: 0 8px 0 0 #2B2B2B;
  transition: all 0.15s ease-in-out;
  &:active {
    transform: translateY(4px);
    box-shadow: 0 4px 0 0 #2B2B2B;
  }
}
```

### 4.2 Utility Class Centralization Protocol
- **Card Containers**: Must explicitly use `rounded-[32px]` or `rounded-3xl` + `bg-white` or `bg-surface-off-white` + `border-2 border-[#2B2B2B]` or soft shadow. Hardcoded `rounded-lg`, `rounded-xl`, or `rounded-2xl` on cards are flagged as **LINT FAILURES**.
- **Interactive Buttons**: Must use `rounded-[16px]` or `rounded-2xl` + `shadow-squishy` + `font-heading font-bold`. `rounded-full` is restricted to avatar circles and pill tags.

---

## 5. Pillar 3: Dual-Viewport Responsive Validation Strategy

### 5.1 Dual Preview Architecture (`public/dual-preview.html`)
The dual preview setup permits simultaneous visual inspection of Desktop and Mobile frames:
- **Desktop Panel**: Width 1440px (flex ratio 2), height 900px.
- **Mobile Panel**: Width 390px (max-width 450px, flex shrink 0), height 844px.

### 5.2 Browser Validation Protocol
When validating UI/UX via the `browser` subagent:
1. Launch dev server (`npm run dev` or local preview).
2. Open `public/dual-preview.html`.
3. Capture full-page screenshots of both panels across key routes:
   - `/` (Landing Page)
   - `/app` (Dashboard)
   - `/app/expenses` (Expenses)
   - `/app/add` (Add Expense)
   - `/app/goals` (Cat-Stash Goals)
   - `/app/profile` (Profile & Categories)
4. **Verification Criteria**:
   - Zero horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth`).
   - Touch targets on mobile (buttons, category pills, filter icons) must be ≥ 44x44px.
   - Text contrast ratio ≥ 4.5:1 (Soft Charcoal `#2B2B2B` over Sakura Pink `#FFB7C5` and Cream Milk `#FFFDD0`).
   - Cards retain 32px rounded corners without content clipping.

---

## 6. Pillar 4: Build Verification & Forensic Audit Prevention

### 6.1 Elimination of Hardcoded Facade Tests
Forensic Auditing strictly forbids "facade tests" (tests that pass trivially without asserting real state or logic).
- **Prohibited Patterns**:
  ```ts
  // ❌ FACADE TEST - FORBIDDEN
  it('should render page', () => {
    expect(true).toBe(true);
  });
  ```
- **Mandatory Real Assertion Standard**:
  ```ts
  // ✅ REAL ASSERTION - MANDATORY
  it('should enforce 32px card radius in globals.css', () => {
    const css = fs.readFileSync(globalsCssPath, 'utf8');
    expect(css).toContain('--radius-3xl: 32px;');
    expect(css).not.toContain('864e5a');
  });
  ```

### 6.2 Verification Execution Protocol
Before any milestone handoff, the agent must run and verify:
1. `npx tsc --noEmit` -> Must return 0 errors.
2. `npm run lint` -> Must return 0 ESLint warnings/errors.
3. `npx vitest run` -> 100% test pass rate with real assertions across unit and store tests.
4. `npm run build` -> Clean Next.js build compilation with static page optimization.

---

## 7. Strategic Milestone Roadmap Alignment

- **Milestone 1 (Foundations)**: Purge legacy color `#864e5a`, implement `@theme` Stitch tokens in `globals.css`, declare `@utility shadow-squishy`, fix typography fallbacks, pass `design-system.test.ts`.
- **Milestone 2 (Landing Page & 3D Assets)**: Refactor `src/app/page.tsx` and `src/components/landing/*`, integrate `MeowneyLogo.tsx`, `ShaderBackground.tsx`, and `KawaiiCatAvatar.tsx`.
- **Milestone 3 (WebApp 1:1 Screens)**: Refactor `/app`, `/app/expenses`, `/app/add`, `/app/goals`, `/app/profile`, integrate `CatPersonalityModal.tsx`, `BrandkitBoard.tsx`, and `PrdModal.tsx`.
- **Milestone 4 (Dual Viewport & Forensic Audit)**: Validate `dual-preview.html`, execute Vitest/Playwright test suites, run `npm run build`, and pass final audit gate.
