# Design System & Aesthetics Audit — Meowney

## Executive Summary

An exhaustive investigation of the Meowney codebase was conducted to evaluate compliance with the Stitch Kawaii Design System specifications outlined in **ORIGINAL_REQUEST.md (Requirement R1)**:
- **Core Color Palette**: Sakura Pink (`#FFB7C5`), Cream Milk (`#FFFDD0`), Mint Fresh (`#A3E4D7`), Soft Charcoal (`#2B2B2B`).
- **Typography**: Nunito Sans (headings & titles), Plus Jakarta Sans (body & financial/data display).
- **Border Radii**: Cards (`32px` / `rounded-3xl` / `rounded-[32px]`), Buttons (`16px` / `rounded-2xl` / `rounded-[16px]`).
- **Tactile Squishy Shadows**: Soft 3D offset depth shadows with interactive click compression (`hover:-translate-y-0.5`, `active:translate-y-1`).

### Core Conclusion
The current codebase has **partial color setup** and basic font imports, but suffers from **significant Design System non-compliance** across all pages (`src/app/page.tsx`, `src/app/app/page.tsx`, `src/app/app/add/page.tsx`, `src/app/app/goals/page.tsx`, `src/app/app/profile/page.tsx`, and component sub-views):
1. **Color Violations**: Extensive usage of a legacy Material 3 `#864e5a` (muddy brownish-red) as `--color-primary` across titles, buttons, icons, and background accents, instead of `#2B2B2B` Soft Charcoal for typography/brand text, `#FFB7C5` Sakura Pink as main brand color, `#FFFDD0` Cream Milk for card background surfaces, and `#A3E4D7` Mint Fresh for positive badges/accents.
2. **Typography Violations**: Missing font utility classes in `@theme` (`--font-sans`, `--font-heading`), broken/undefined classes used in Landing Page (`font-title-lg` and `font-title-md` do not exist in CSS), and fallback `monospace` set for Plus Jakarta Sans (`--font-data-mono: "Plus Jakarta Sans", monospace;`).
3. **Border Radii Violations**: Over 90% of cards in the app use `rounded-lg` (`8px`) or `rounded-xl` (`12px`) instead of the required `32px` (`rounded-3xl` / `rounded-[32px]`). Buttons inconsistently use `8px`, `12px`, or `rounded-full` instead of the required `16px` (`rounded-2xl` / `rounded-[16px]`).
4. **Shadow Violations**: Complete absence of tactile "squishy" shadows. Standard flat or generic Tailwind shadows (`shadow-sm`, `shadow-md`, `shadow-xl`) are used without 3D depth or click feedback.

---

## Detailed Findings

### 1. Colors & Theme Configuration

#### Config Location: `src/app/globals.css` (lines 16-67)
- **Observed `@theme` Variables**:
  ```css
  --color-sakura-pink: #FFB7C5;
  --color-cream-milk: #FFFDD0;
  --color-mint-fresh: #A3E4D7;
  --color-soft-charcoal: #2B2B2B;
  --color-primary: #864e5a; /* LEAKED LEGACY COLOR */
  --color-background: #fcf9f8; /* NOT CREAM MILK */
  --color-surface: #fcf9f8;
  --color-tertiary: #3d6846;
  ```
- **Codebase Impact & Misalignments**:
  - `src/app/page.tsx`:
    - Line 84: `text-primary` (`#864e5a`) used on Meowney logo title instead of `#2B2B2B`.
    - Line 90: `bg-sakura-pink text-primary` produces low contrast (`#864e5a` on `#FFB7C5`).
    - Line 266: Pricing CTA uses `bg-primary text-white` (`#864e5a`) instead of Soft Charcoal (`#2B2B2B`) or Sakura Pink (`#FFB7C5`).
  - `src/app/app/page.tsx`:
    - Line 117, 140, 165, 186, 251, 263, 276, 285, 299: Uses `text-primary` (`#864e5a`) for subtitles, icons, sparkline active bars, and tip cards.
  - `src/app/app/add/page.tsx`:
    - Line 69, 86, 90, 110, 127, 132, 147, 166, 187: Uses `text-primary`, `bg-primary`, `ring-primary`.
  - `src/app/app/goals/page.tsx`:
    - Line 86, 100, 137, 147, 165, 185, 223, 237, 246, 288, 334, 350, 383, 400: Uses `text-primary`, `bg-primary`, and progress gradient `from-sakura-pink to-primary`.
  - `src/app/app/profile/page.tsx`:
    - Line 61, 81, 97, 145, 156, 162, 202, 212, 238: Uses `text-primary`, `bg-primary`.
  - `src/components/Header.tsx`:
    - Line 20: Logo title uses `text-primary` (`#864e5a`).
  - `src/components/BottomNav.tsx`:
    - Line 27: Active navigation item uses `bg-sakura-pink text-primary` (`#864e5a`).

---

### 2. Typography & Fonts

#### Config Location: `src/app/layout.tsx` (lines 44-45) & `src/app/globals.css` (lines 68-76)
- **Font Imports**:
  - `Nunito Sans` (weights 200-1000) and `Plus Jakarta Sans` (weights 200-800) are imported via Google Fonts `<link>` in `src/app/layout.tsx`.
- **Theme Mappings & Bugs**:
  - `globals.css` lines 68-76 map font variables to utility names:
    ```css
    --font-label-md: "Nunito Sans", sans-serif;
    --font-headline-lg: "Nunito Sans", sans-serif;
    --font-data-mono: "Plus Jakarta Sans", monospace; /* BUG: monospace fallback */
    --font-display-lg: "Nunito Sans", sans-serif;
    --font-body-lg: "Plus Jakarta Sans", sans-serif;
    --font-label-sm: "Nunito Sans", sans-serif;
    --font-body-md: "Plus Jakarta Sans", sans-serif;
    --font-headline-lg-mobile: "Nunito Sans", sans-serif;
    --font-headline-md: "Nunito Sans", sans-serif;
    ```
  - **Undefined Classes**:
    - In `src/app/page.tsx` (lines 100, 179, 241, 362), headings use `font-title-lg` and `font-title-md`. Neither is declared in `globals.css`, causing fallback browser fonts to be used!
  - **Typography Rule Compliance**:
    - Nunito Sans MUST be mapped to `--font-heading: "Nunito Sans", sans-serif;` so `font-heading` or `font-nunito` works predictably for all titles and headings.
    - Plus Jakarta Sans MUST be mapped to `--font-sans: "Plus Jakarta Sans", sans-serif;` and `--font-data: "Plus Jakarta Sans", sans-serif;` for body copy and monetary/numeric values without `monospace` fallback.

---

### 3. Border Radii Evaluation

#### Requirement:
- **Cards**: `32px` (`rounded-3xl` or `rounded-[32px]`)
- **Buttons**: `16px` (`rounded-2xl` or `rounded-[16px]`)

#### Current Codebase Radius Map:

| Location | Component / Element | Current Class | Target Requirement | Status |
|----------|---------------------|---------------|--------------------|--------|
| `src/app/app/page.tsx:115` | Balance Hero Card | `rounded-xl` (12px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/page.tsx:163` | Quick Stats Cards | `rounded-lg` (8px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/page.tsx:212` | Chart Card | `rounded-lg` (8px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/page.tsx:260` | Recent Expense Items | `rounded-lg` (8px) | `16px` (`rounded-2xl`) / `32px` | ❌ Non-compliant |
| `src/app/app/page.tsx:284` | Empty State Card | `rounded-xl` (12px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/page.tsx:297` | Tip Card | `rounded-xl` (12px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/add/page.tsx:122` | Category Grid Items | `rounded-lg` (8px) | `16px` (`rounded-2xl`) | ❌ Non-compliant |
| `src/app/app/add/page.tsx:145` | Date Picker Container | `rounded-lg` (8px) | `16px` (`rounded-2xl`) | ❌ Non-compliant |
| `src/app/app/add/page.tsx:165` | Note Container | `rounded-lg` (8px) | `16px` (`rounded-2xl`) | ❌ Non-compliant |
| `src/app/app/add/page.tsx:187` | Purchase CTA Button | `rounded-full` | `16px` (`rounded-2xl`) | ❌ Non-compliant |
| `src/app/app/expenses/page.tsx:156` | Expense Card | `rounded-lg` (8px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/goals/page.tsx:81` | Goals Header Card | `rounded-xl` (12px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/goals/page.tsx:129` | Goal Card | `rounded-lg` (8px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/goals/page.tsx:243` | Create Goal Modal | `rounded-2xl` (16px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/profile/page.tsx:59` | Avatar Card | `rounded-2xl` (16px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/profile/page.tsx:94` | Profile Action Buttons | `rounded-2xl` (16px) | `16px` (`rounded-2xl`) | ✅ Compliant |
| `src/app/app/profile/page.tsx:143` | Categories Card | `rounded-2xl` (16px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/app/app/profile/page.tsx:210` | FAQ Card | `rounded-2xl` (16px) | `32px` (`rounded-3xl`) | ❌ Non-compliant |
| `src/components/BottomNav.tsx:18` | Bottom Navigation Bar | `rounded-xl` (12px) | `24px` / `32px` | ❌ Non-compliant |

---

### 4. Tactile Squishy Shadows

#### Specification:
Kawaii Stitch Design System requires tactile "squishy" shadows with 3D depth and interactive press states (`hover:-translate-y-0.5`, `active:translate-y-1 active:shadow-none`).

#### Current Deficit:
- No utility for squishy shadows exists in `src/app/globals.css`.
- Interactive elements rely on generic flat `shadow-sm`, `shadow-md`, `shadow-xl`.
- Recommended `@utility` addition in `globals.css`:
  ```css
  @utility shadow-squishy {
    box-shadow: 0 8px 0 0 #2B2B2B, 0 12px 24px -4px rgba(43, 43, 43, 0.12);
  }
  @utility shadow-squishy-sm {
    box-shadow: 0 4px 0 0 #2B2B2B, 0 6px 16px -2px rgba(43, 43, 43, 0.08);
  }
  @utility shadow-squishy-pink {
    box-shadow: 0 6px 0 0 #FFB7C5, 0 10px 20px -2px rgba(255, 183, 197, 0.3);
  }
  ```

---

## Actionable Recommendations for Implementers

1. **Refactor `src/app/globals.css` `@theme`**:
   - Replace legacy Material 3 `--color-primary: #864e5a;` with `#2B2B2B` (Soft Charcoal) or `#FFB7C5` (Sakura Pink).
   - Set `--color-background: #FFFDD0;` (Cream Milk) or soft off-white pastel.
   - Configure `--font-heading: "Nunito Sans", sans-serif;` and `--font-sans: "Plus Jakarta Sans", sans-serif;`.
   - Fix `--font-data-mono` fallback from `monospace` to `sans-serif`.
   - Define custom `@theme` variables or custom utilities for `radius-card: 32px;` (`rounded-card`) and `radius-button: 16px;` (`rounded-button`).
   - Add `@utility shadow-squishy`, `@utility shadow-squishy-pink`, and hover/active press micro-animations.

2. **Refactor Component Class Names Across WebApp**:
   - Replace all card containers (`rounded-lg`, `rounded-xl`, `rounded-2xl`) with `rounded-3xl` (`32px`).
   - Replace buttons (`rounded-lg`, `rounded-xl`, `rounded-full`) with `rounded-2xl` (`16px`) and add `shadow-squishy active:translate-y-1`.
   - Replace `text-primary` (`#864e5a`) with `text-soft-charcoal` (`#2B2B2B`), `text-sakura-pink` (`#FFB7C5`), or `text-mint-fresh` (`#A3E4D7`).
   - Replace invalid `font-title-lg` and `font-title-md` on Landing Page with `font-heading font-extrabold`.
