# Meowney Kawaii System — Stitch Design System

**Project:** Meowney: Kawaii Financial Manager  
**Project ID:** `16777229921405218590`  
**Design System Asset:** `assets/6c627ab841914c219b9e2373be94a73f`  
**Source:** Google Stitch MCP (`get_project`, `list_design_systems`, screen HTML)

---

## Brand & Style

Kawaii Financial aesthetic — playful feline companions + reliable personal finance.  
Visual style: minimalism + tactile “squishy” depth (ultra-rounded corners, soft shadows).

---

## Color Tokens

### Brand accents

| Token | Hex | Usage |
|-------|-----|-------|
| sakura-pink | `#FFB7C5` | CTAs, active nav, brand presence |
| cream-milk | `#FFFDD0` | Financial cards / containers |
| mint-fresh | `#A3E4D7` | Growth, success, income |
| lavender | `#D7BDE2` | Info badges, neutral tags |
| soft-charcoal | `#2B2B2B` | Emphasis on pastel (values, headlines) |
| surface-off-white | `#FAF9F6` | Alternate base layer |

### Material / screen tokens

| Token | Hex |
|-------|-----|
| background / surface / surface_bright | `#fcf9f8` |
| on_background / on_surface | `#1b1c1c` |
| on_surface_variant | `#514345` |
| outline | `#837375` |
| outline_variant | `#d6c2c4` |
| primary / surface_tint | `#864e5a` |
| on_primary | `#ffffff` |
| primary_container | `#ffb7c5` |
| on_primary_container | `#7b4551` |
| on_primary_fixed | `#360c19` |
| secondary | `#60603e` |
| secondary_container | `#e6e5b9` |
| tertiary | `#3d6846` |
| tertiary_container | `#a7d6ad` |
| surface-container-lowest | `#ffffff` |
| surface-container-low | `#f6f3f2` |
| surface-container | `#f0eded` |
| surface-container-high | `#eae7e7` |
| surface-container-highest | `#e4e2e1` |
| surface-dim | `#dcd9d9` |
| error | `#ba1a1a` |

### Screen usage pattern

- **Page background:** `bg-background` → `#fcf9f8` (warm off-white, NOT cream)
- **Cards:** `bg-cream-milk` → `#FFFDD0`
- **Labels / nav titles / links:** `text-primary` → `#864e5a`
- **Values / headlines:** `text-soft-charcoal` → `#2B2B2B`
- **Secondary copy:** `text-on-surface-variant` → `#514345`
- **Primary button:** `bg-sakura-pink text-primary`
- **Header:** `bg-surface/80 backdrop-blur-xl`
- **Bottom nav:** `bg-surface/90`, active `bg-sakura-pink text-primary shadow-inner`

---

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| display-lg | Nunito Sans | 48px | 800 |
| headline-lg | Nunito Sans | 32px | 700 |
| headline-lg-mobile | Nunito Sans | 28px | 700 |
| headline-md | Nunito Sans | 24px | 700 |
| body-lg | Plus Jakarta Sans | 18px | 500 |
| body-md | Plus Jakarta Sans | 16px | 400 |
| data-mono | Plus Jakarta Sans | 16px | 600 |
| label-md | Nunito Sans | 14px | 700 |
| label-sm | Nunito Sans | 12px | 700 |

---

## Shape & Spacing

- **Border radius:** sm 0.5rem, default 1rem, md 1.5rem, lg 2rem, xl 3rem, full 9999px
- **Spacing unit:** 4px
- **Gutter:** 1.5rem
- **Margin mobile:** 1rem
- **Margin desktop:** 2.5rem
- **Container max:** 1200px

---

## Elevation

Avoid harsh drop shadows. Use tonal layering + ambient sakura-tinted shadows.  
Cards: cream-milk + soft diffused shadow (~15% sakura pink opacity).

---

## Exported Screens

| Screen | PNG | HTML |
|--------|-----|------|
| Dashboard | `dashboard.png` | `html/dashboard.html` |
| Expenses | `expenses.png` | `html/expenses.html` |
| Add New Expense | `add-expense.png` | `html/add-expense.html` |
| Cat-Stash Goals | `goals.png` | `html/goals.html` |
| Profile | `profile.png` | `html/profile.html` |
| Cat-Personality | `cat-personality.png` | `html/cat-personality.html` |
| Shader | — | `html/shader.html` |
| Meowney Logo | `meowney-logo.png` | — |
| Cat Mascot | `cat-mascot.png` | — |
| Brandkit Board | `brandkit-board.jpg` | — |
| Meowney PRD | — | `html/prd.md` |

See also `COLORS.md` for quick reference.
