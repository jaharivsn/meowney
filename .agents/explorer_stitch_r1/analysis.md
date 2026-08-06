# Stitch Specification Mining Report — Meowney 1:1 Google Stitch Refactoring

**Author**: Explorer 2 (Stitch Specification Miner)  
**Target Project**: Meowney (`d:\creative-dev\projetos\pessoal\cases\meowney`)  
**Stitch Project ID**: `16777229921405218590`  
**Date**: 2026-08-05  

---

## 1. Executive Summary

This document presents the authoritative, mined specification for the 1:1 Google Stitch Refactoring of the **Meowney** financial web application. Every screen, component, token, asset, layout rule, design system constraint, and PRD requirement in Google Stitch Project `16777229921405218590` was analyzed and mapped to Next.js 15, React 19, and Tailwind CSS v4.

### Core Discoveries & Mined Specifications:
1. **Design System Tokens**:
   - **Color Palette**: Sakura Pink (`#FFB7C5`), Cream Milk (`#FFFDD0`), Mint Fresh (`#A3E4D7`), Soft Charcoal (`#2B2B2B`), Lavender (`#D7BDE2`), Off-White Surface (`#FAF9F6`). Legacy Material Design color `#864e5a` is completely purged.
   - **Typography Rules**: `Nunito Sans` (weights 200–1000) for all Headings, Section Titles, and Brand Marks. `Plus Jakarta Sans` (weights 200–800) for Body copy, Financial Data, Tables, and Keypad inputs. Monospace font fallback on numeric display is removed.
   - **Border Radii Rules**: Strict `32px` corner radius (`rounded-[32px]` / `rounded-3xl`) for all Cards, Modals, Hero Containers, and Content Boxes. Strict `16px` corner radius (`rounded-[16px]` / `rounded-2xl`) for Buttons, Inputs, Keypads, and Interactive Elements. Full circles (`rounded-full`) are restricted to avatars and pill badges.
   - **Tactile Squishy Shadows**: Soft 3D depth shadows (`0 8px 0 0 #2B2B2B`) with click/press micro-interactions (`active:translate-y-1 active:shadow-[0_4px_0_0_#2B2B2B]`).

2. **12 Stitch Screens Mapped**:
   All 12 Stitch screens were inventoried, categorized, and specified with exact inputs, outputs, UI structures, and error/edge behaviors.

3. **PRD & SaaS Benchmarks**:
   - V1 LocalStorage architecture with Repository Pattern for future Supabase V2 cloud migration.
   - Lapa.ninja SaaS conversion benchmarks integrated into Landing Page (smooth anchor navigation, secondary Hero CTA, 3rd testimonial card, anchored V2 Cloud Sync pricing plan, WCAG 2.1 AA accessibility).
   - Mobbin Finance iOS benchmarks integrated into WebApp (real-time balance editing modal, dynamic category management, income vs expense color differentiation, sparkline chart filtering).

---

## 2. Features Discovered Table

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | **Cat System** | Cat-Personality | Financial archetype card (Economiau, Poupador, Gastoento), level, mood state & badges | Financial history, savings rate | Archetype badge, mood animation, tip | Fallbacks to "Economiau" on zero transactions | Stitch Screen `1c1776cc279b40be9de37a877dc5f8fa` |
| 2 | **User Profile** | Profile & Categories | User avatar, custom category manager (icon/color CRUD), preferences, support link | Custom category title, icon, color | Updated Zustand state, persisted in LocalStorage | Prevents duplicate titles or deleting default categories | Stitch Screen `1cc79f9cba6a4907af8e6606e074fe0e` |
| 3 | **Visual FX** | Shader Background | WebGL / CSS radial gradient backdrop displaying Sakura Pink & Mint Fresh ambient glow | Canvas viewport, animation time | Fluid ambient lighting background | Falls back to static CSS mesh gradient if WebGL unsupported | Stitch Screen `2f73a4701929482cad48b556b33409b6` |
| 4 | **Brand Mark** | Meowney Logo | Vector brand asset with cat ears, coin motif, Nunito Sans typography, squishy badge | Scale prop, dark/light mode toggle | Scalable SVG / React component | Renders text fallback if icon asset fails to load | Stitch Screen `62afbf0a44954a2cb8fd8da4f4c51a2d` |
| 5 | **Visual Asset** | Kawaii Cat Avatar 3D | Interactive 3D / pseudo-3D Kawaii cat avatar reflecting app health (Happy, Saving, Alert) | Current financial state, click events | Animated vector avatar with Framer Motion | Defaults to "Happy" state on initial render | Stitch Screen `7e4d9a05edc04935b3b539b9e35f149c` |
| 6 | **Transaction** | Expenses History | Transaction history with Income (`+R$`, `#A3E4D7`) vs Expense (`-R$`, `#2B2B2B`), filter bar | Search term, selected category pill | List or Grid view of filtered transactions | Shows empty state "Nenhuma ração encontrada" | Stitch Screen `8a32eee31be746ab86ab40f48064e2dc` |
| 7 | **Transaction** | Add New Expense | Keypad entry, Segmented Control toggle (Gasto `-` vs Renda `+`), dynamic category grid, note | Amount, type, category ID, date, note | Stores new transaction in Zustand & updates balance | Displays validation error on 0 or empty amount | Stitch Screen `9d59f4ffde0640b4a95ba4c966572043` |
| 8 | **Financial** | Cat-Stash Goals | Savings goals cards, target vs saved progress, progress bar, quick deposit modal | Goal title, target R$, initial deposit | Progress calculation, celebratory animation on 100% | Rejects deposit exceeding remaining goal amount | Stitch Screen `a3b09e7d2f6f4edcbc145abf2ca0c365` |
| 9 | **Design Token** | Design System Tokens | Centralized Tailwind v4 `@theme` palette, Nunito/Jakarta fonts, 32px/16px radii, squishy shadows | CSS token definitions | Global styling utilities across landing & app | Preventions against unpurged legacy `#864e5a` | Stitch Screen `asset-stub-assets_6c627ab841914c219b9e2373be94a73f` |
| 10 | **Dashboard** | WebApp Dashboard | Hero balance card, balance edit modal, monthly expenses sum, 7-day sparkline, recent list | Store state (balance, expenses, goals) | Interactive dashboard view with FAB navigation | Excludes income transactions from expense sum & sparkline | Stitch Screen `b39eadcd47f4405dbd78c1525f3f6483` |
| 11 | **Brand Identity** | Brandkit Board | Showcase board displaying logo variants, color swatches, typography scale, component states | Interactive preview toggles | Multi-column design system showcase board | None (static showcase view) | Stitch Screen `3640526314918751543` |
| 12 | **Documentation** | Meowney PRD Spec | In-app & file specification of target audience, LocalStorage storage, V2 Supabase roadmap | User click on PRD button/modal | Interactive rendered PRD viewer | Renders fallback markdown viewer | Stitch Screen `ecc43696daa34ca6952369b41a869198` |

---

## 3. Edge Cases & Observed Behaviors Table

| # | Feature | Input / Condition | Observed Behavior | Required Handling / Spec |
|---|---------|-------------------|-------------------|---------------------------|
| 1 | Dashboard Math | Logging an Income transaction in current month | Legacy code added income into `monthlyExpenses` sum | Filter `e.type === 'expense'` in `monthlyExpenses` calculation |
| 2 | Sparkline Chart | Logging an Income transaction | Legacy code added income to daily spending bars | Filter `e.type === 'expense'` in `dailySpend` calculation |
| 3 | Expenses Formatting | Viewing income items in `/app/expenses` | Legacy code hardcoded `-R$` for all transactions | Format as `+R$` with `#A3E4D7` for income, `-R$` with `#2B2B2B` for expense |
| 4 | Category Filter | Creating custom category in `/app/profile` | Legacy `/app/expenses` used static category array | Load categories dynamically from `useHydratedStore((s) => s.categories)` |
| 5 | Balance Editing | Clicking balance card on `/app` | Legacy code triggered browser `window.prompt` | Render accessible `BalanceEditModal` component |
| 6 | Typography Scaling | Large numbers in Add Expense keypad | Text overflows input container on long numbers | Dynamic font scaling (`text-4xl` to `text-2xl` when length > 8) |
| 7 | FAQ Accessibility | Screen reader navigating FAQ accordion | Missing `aria-expanded`, `aria-controls`, icon `aria-hidden` | Add proper ARIA attributes to `<button>`, `motion.div`, and icons |
| 8 | Responsive Viewport | Viewing on mobile (390px) | Fixed width containers cause horizontal scrolling | Use `w-full max-w-md mx-auto` and `px-4` padding |
| 9 | Goal Deletion | Deleting a goal with accrued funds | LocalStorage state updates but leaves balance unchanged | Retain main balance intact when deleting goal container |
| 10 | LocalStorage Hydration | Server-side rendering (SSR) | SSR mismatch between default state and LocalStorage | Use `useHydratedStore` hook with hydration check |

---

## 4. Exact Design Tokens Specification

### 4.1 Color Palette Tokens (`globals.css`)
```css
@import "tailwindcss";

@theme {
  /* Stitch Kawaii Core Palette */
  --color-sakura-pink: #FFB7C5;      /* Primary Accent / Container */
  --color-cream-milk: #FFFDD0;       /* App Background Surface */
  --color-mint-fresh: #A3E4D7;       /* Positive Accent / Income Badges */
  --color-soft-charcoal: #2B2B2B;    /* Primary Typography / Dark Elements */
  --color-lavender: #D7BDE2;         /* Secondary Accent / Badges */
  --color-surface-off-white: #FAF9F6;/* Card Background Surface */

  /* Mapped Semantic Tokens (Legacy #864e5a Purged) */
  --color-background: var(--color-cream-milk);
  --color-on-background: var(--color-soft-charcoal);
  --color-primary: var(--color-soft-charcoal);
  --color-on-primary: #FFFFFF;
  --color-primary-container: var(--color-sakura-pink);
  --color-on-primary-container: var(--color-soft-charcoal);
  --color-secondary: var(--color-mint-fresh);
  --color-on-secondary: var(--color-soft-charcoal);

  /* Typography Families */
  --font-heading: "Nunito Sans", sans-serif;
  --font-sans: "Plus Jakarta Sans", sans-serif;
  --font-mono: "Plus Jakarta Sans", sans-serif;

  /* Geometry Standard */
  --radius-card: 32px;
  --radius-button: 16px;
  --radius-3xl: 32px;
  --radius-2xl: 16px;
}
```

### 4.2 Tactile Squishy Shadow Utility
```css
@utility shadow-squishy {
  box-shadow: 0 8px 0 0 #2B2B2B, 0 12px 24px -4px rgba(43, 43, 43, 0.12);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 0 0 #2B2B2B, 0 16px 28px -4px rgba(43, 43, 43, 0.15);
  }
  &:active {
    transform: translateY(4px);
    box-shadow: 0 4px 0 0 #2B2B2B, 0 6px 12px -2px rgba(43, 43, 43, 0.1);
  }
}

@utility shadow-squishy-pink {
  box-shadow: 0 8px 0 0 #FFB7C5, 0 12px 24px -4px rgba(255, 183, 197, 0.3);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  &:active {
    transform: translateY(4px);
    box-shadow: 0 4px 0 0 #FFB7C5;
  }
}
```

---

## 5. Screen-by-Screen Deep-Dive Analysis (All 12 Screens)

### 1. Cat-Personality (`1c1776cc279b40be9de37a877dc5f8fa`)
- **Visual Spec**: Modal card displaying user's cat financial archetype ("Economiau", "Poupador", or "Gastoento"). Features 3D cat mood graphic, level progress ring (e.g. Level 4 Poupador), spending efficiency score, and personalized tips.
- **Tokens**: `rounded-[32px]` card container, `#FFB7C5` background, `#2B2B2B` typography, Nunito Sans headers.
- **Component**: `src/components/cat/CatPersonalityModal.tsx`.

### 2. Profile (`1cc79f9cba6a4907af8e6606e074fe0e`)
- **Visual Spec**: Account & Category management page (`/app/profile`). Includes user avatar with status badge, action buttons ("Rever Tutorial", "Falar com Suporte", "Ver PRD"), Category Manager (lists default + custom categories with color swatch and icon), and FAQ accordion.
- **Tokens**: `rounded-[32px]` cards, `rounded-[16px]` buttons with `shadow-squishy`, `#FAF9F6` card backgrounds.
- **Component**: `src/app/app/profile/page.tsx` + `src/components/profile/CategoryManager.tsx`.

### 3. Shader (`2f73a4701929482cad48b556b33409b6`)
- **Visual Spec**: Ambient animated background displaying Sakura Pink (`#FFB7C5`) and Mint Fresh (`#A3E4D7`) radial gradient lights with subtle wave animation behind app hero cards.
- **Tokens**: CSS radial gradients (`radial-gradient(circle, #FFB7C5 0%, transparent 70%)`), backdrop blur (`blur-3xl`), opacity `0.4`.
- **Component**: `src/components/ui/ShaderBackground.tsx`.

### 4. Meowney Logo (`62afbf0a44954a2cb8fd8da4f4c51a2d`)
- **Visual Spec**: Brand mark vector element. Vector cat ears icon in Sakura Pink (`#FFB7C5`) with soft dark border (`#2B2B2B`), combined with "Meowney" Nunito Sans Black typography.
- **Tokens**: Font `Nunito Sans` weight 900, text `#2B2B2B`, icon accent `#FFB7C5`.
- **Component**: `src/components/ui/MeowneyLogo.tsx`.

### 5. Kawaii Cat Avatar 3D (`7e4d9a05edc04935b3b539b9e35f149c`)
- **Visual Spec**: Interactive Kawaii cat avatar. Displays vector cat expressions with subtle 3D shadow depth: Happy (balance > 0), Saving (contributing to goals), Alert (high monthly spending), Purring (hover state).
- **Tokens**: Framer Motion floating keyframes (`translateY: [0, -6, 0]`), scale on click (`scale: 0.95`).
- **Component**: `src/components/ui/KawaiiCatAvatar.tsx`.

### 6. Expenses (`8a32eee31be746ab86ab40f48064e2dc`)
- **Visual Spec**: Transaction history route (`/app/expenses`). Top view mode toggle (List vs Grid), horizontal scrollable category filter pills loaded dynamically from Zustand, search input bar, transaction cards formatted with `+R$` green or `-R$` charcoal.
- **Tokens**: `rounded-[32px]` transaction cards, `rounded-full` category pills, `#A3E4D7` for income text, `#2B2B2B` for expense text.
- **Component**: `src/app/app/expenses/page.tsx`.

### 7. Add New Expense (`9d59f4ffde0640b4a95ba4c966572043`)
- **Visual Spec**: Transaction creation route (`/app/add`). Top Segmented Control (Gasto `-` vs Renda `+`), giant numeric keypad display, dynamic category selection grid (filtered by type), datetime picker, notes textarea, tactile submit button.
- **Tokens**: `rounded-[32px]` category selection grid cards, `rounded-[16px]` submit CTA button with `shadow-squishy`, `#FFB7C5` active state indicator.
- **Component**: `src/app/app/add/page.tsx`.

### 8. Cat-Stash Goals (`a3b09e7d2f6f4edcbc145abf2ca0c365`)
- **Visual Spec**: Savings goals route (`/app/goals`). Top total saved summary card, goal cards showing progress bar with Sakura Pink fill, deposit action button, quick deposit modal (+R$ 10, +R$ 20, +R$ 50 presets), create new goal modal.
- **Tokens**: `rounded-[32px]` goal cards, `rounded-[16px]` deposit buttons, progress bar radius `rounded-full`, Nunito Sans headers.
- **Component**: `src/app/app/goals/page.tsx` + `src/components/goals/DepositModal.tsx`.

### 9. Design System (`asset-stub-assets_6c627ab841914c219b9e2373be94a73f`)
- **Visual Spec**: Design System foundation and interactive preview board (`/design-system`). Specifies exact colors, typography scale, card/button radii, icon set, and squishy shadow states.
- **Tokens**: Full `@theme` configuration in `globals.css` with zero residual legacy colors.
- **Component**: `src/app/design-system/page.tsx` + `src/app/globals.css`.

### 10. Dashboard (`b39eadcd47f4405dbd78c1525f3f6483`)
- **Visual Spec**: Main WebApp route (`/app`). Balance Hero Card (displays integer + decimal parts, click triggers `BalanceEditModal`), Gastos do Mês card (expense only), Cat-Stashes card, 7-day spending sparkline (expense only), recent transactions list (5 items), tip card, floating paw FAB to `/app/add`.
- **Tokens**: `rounded-[32px]` for all cards, `rounded-full` for FAB, `#2B2B2B` text, `#FFB7C5` FAB button with squishy shadow.
- **Component**: `src/app/app/page.tsx` + `src/components/app/BalanceEditModal.tsx`.

### 11. Brandkit Board (`3640526314918751543`)
- **Visual Spec**: Brand identity showcase component. Visual board presenting logo variants, color palette swatches with hex values, typography pairings (Nunito Sans + Plus Jakarta Sans), and squishy button states.
- **Tokens**: Multi-column responsive grid container, `rounded-[32px]` cards.
- **Component**: `src/components/brand/BrandkitBoard.tsx`.

### 12. Meowney PRD (`ecc43696daa34ca6952369b41a869198`)
- **Visual Spec**: Product Requirements Document viewer component (`PrdModal.tsx` & `meowney_prd.md`). Renders full PRD specifications (target audience, LocalStorage V1, Supabase V2 roadmap, design principles) in an accessible modal.
- **Tokens**: `rounded-[32px]` modal container, `rounded-[16px]` action buttons, markdown viewer styling.
- **Component**: `src/components/ui/PrdModal.tsx` + root `meowney_prd.md`.

---

## 6. OmniRoute Zero-Cost Execution Strategy

To satisfy **Requirement R2**, all heavy subagent requests, prompt structuring, and code auditing must utilize `mcp_omniroute_omniroute_chat` with zero-cost provider combos:
- **Primary Combo**: `free-stack` (`google/gemini-2.5-flash`, `google/gemini-2.0-flash-exp:free`, `meta-llama/llama-3.3-70b-instruct:free`).
- **Fallback Combo**: `google-groq-fallback` (`groq/llama-3.3-70b`, `groq/mixtral-8x7b-32768`).

---

## 7. Dual-Browser Responsive Preview Roadmap

To satisfy **Requirement R3**, responsive compliance must be continuously verified via `public/dual-preview.html`:
1. Side-by-side rendering:
   - **Desktop**: 1440px width x 900px height.
   - **Mobile**: 390px width x 844px height.
2. Verification Gates:
   - Zero horizontal overflow.
   - All interactive targets ≥ 44x44px on mobile.
   - Card radius strictly `32px` (`rounded-[32px]`) on both viewports.
   - Button radius strictly `16px` (`rounded-[16px]`) on both viewports.

---

## 8. Concrete Handoff Checklist for Implementers

1. **Globals & Theme Refactor**:
   - Update `src/app/globals.css` with `@theme` Stitch tokens (`#FFB7C5`, `#FFFDD0`, `#A3E4D7`, `#2B2B2B`).
   - Add `@utility shadow-squishy` and `@utility shadow-squishy-pink`.
   - Ensure font families `--font-heading` (Nunito Sans) and `--font-sans` (Plus Jakarta Sans) are registered.

2. **Component Radii Enforcement**:
   - Update all card containers across `/app`, `/app/expenses`, `/app/add`, `/app/goals`, `/app/profile` to `rounded-[32px]` (`rounded-3xl`).
   - Update all action buttons to `rounded-[16px]` (`rounded-2xl`) with `shadow-squishy`.

3. **Defect Fixes**:
   - Fix `monthlyExpenses` filter in `src/app/app/page.tsx` (`e.type === 'expense'`).
   - Fix `dailySpend` filter in `src/app/app/page.tsx` (`e.type === 'expense'`).
   - Fix income prefix formatting in `src/app/app/expenses/page.tsx` (`+R$` in green `#A3E4D7`).
   - Connect dynamic categories in `src/app/app/expenses/page.tsx`.
   - Replace `window.prompt` with `BalanceEditModal.tsx`.

4. **Stitch Screen Components**:
   - Create `src/components/cat/CatPersonalityModal.tsx`.
   - Create `src/components/ui/ShaderBackground.tsx`.
   - Create `src/components/ui/KawaiiCatAvatar.tsx`.
   - Create `src/components/ui/MeowneyLogo.tsx`.
   - Create `src/components/brand/BrandkitBoard.tsx`.
   - Create `src/components/ui/PrdModal.tsx`.
