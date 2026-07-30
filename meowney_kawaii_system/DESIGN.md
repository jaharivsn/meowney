---
name: Meowney Kawaii System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#514345'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#837375'
  outline-variant: '#d6c2c4'
  surface-tint: '#864e5a'
  primary: '#864e5a'
  on-primary: '#ffffff'
  primary-container: '#ffb7c5'
  on-primary-container: '#7b4551'
  inverse-primary: '#fbb3c1'
  secondary: '#60603e'
  on-secondary: '#ffffff'
  secondary-container: '#e6e5b9'
  on-secondary-container: '#666643'
  tertiary: '#3d6846'
  on-tertiary: '#ffffff'
  tertiary-container: '#a7d6ad'
  on-tertiary-container: '#345e3e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#fbb3c1'
  on-primary-fixed: '#360c19'
  on-primary-fixed-variant: '#6b3743'
  secondary-fixed: '#e6e5b9'
  secondary-fixed-dim: '#cac99f'
  on-secondary-fixed: '#1d1d03'
  on-secondary-fixed-variant: '#484828'
  tertiary-fixed: '#beeec4'
  tertiary-fixed-dim: '#a3d2a9'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#254f30'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
  sakura-pink: '#FFB7C5'
  cream-milk: '#FFFDD0'
  mint-fresh: '#A3E4D7'
  lavender: '#D7BDE2'
  soft-charcoal: '#2B2B2B'
  surface-off-white: '#FAF9F6'
typography:
  display-lg:
    fontFamily: Nunito Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  container-max: 1200px
---

## Brand & Style

The design system is centered around a "Kawaii Financial" aesthetic—merging the playful, comforting world of feline companions with the reliability of personal finance. The brand personality is welcoming, gentle, and encouraging, aimed at users who find traditional fintech intimidating or cold.

The visual style is a blend of **Minimalism** and **Tactile** design. It prioritizes heavy whitespace and clean layouts while incorporating "squishy" physical metaphors through ultra-rounded corners and soft, pillowy depth. The mood is optimistic and friendly, turning financial management into a nurturing experience.

## Colors

The palette uses a soft, pastel-driven logic to reduce "financial anxiety." 

- **Primary (Sakura Pink):** Used for main actions, high-priority status, and brand presence.
- **Secondary (Cream Milk):** Used for large surface areas and containers to keep the UI feeling warm rather than sterile.
- **Accent Palette:** Mint Fresh is reserved for positive financial growth and success states; Lavender is used for informational badges and neutral category tags.
- **Typography (Soft Charcoal):** Avoids pure black to maintain the soft aesthetic while ensuring high legibility against the cream backgrounds.
- **Background:** A very light off-white (#FAF9F6) is used for the base layer to allow Cream Milk containers to "pop" with subtle depth.

## Typography

This design system employs a dual-font strategy to balance personality with utility.

- **Nunito Sans:** Chosen for its rounded terminals and friendly "hand-drawn" quality. It is used exclusively for headers, navigation items, and buttons to reinforce the brand's Kawaii personality.
- **Plus Jakarta Sans:** A modern, highly legible geometric sans-serif used for all data-heavy sections, financial values, and body text. Its clean apertures ensure that numbers are never misread.

Financial figures should use the `data-mono` role, which utilizes the balanced kerning of Plus Jakarta Sans to ensure numbers align cleanly in lists and tables.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to prevent the UI from feeling cluttered.

- **Mobile:** A 4-column grid with 16px margins. Content cards typically span the full width to maximize touch targets.
- **Desktop:** A 12-column grid with 24px gutters. The layout uses "Comfortable" spacing, favoring vertical whitespace to separate financial modules.
- **Grid vs List:**
    - **Grid Layout:** Used for high-level category overviews (e.g., Spending Categories) where cat-paw iconography can be prominent.
    - **List Layout:** Used for transaction history and granular data where readability and vertical scanning are paramount.

## Elevation & Depth

This design system avoids harsh dropshadows. Instead, it uses **Tonal Layering** combined with **Ambient Shadows**.

- **Base Level:** Surface-off-white background.
- **Level 1 (Cards/Containers):** Cream Milk background with a very soft, diffused shadow (15% opacity Sakura Pink or Neutral) to give a "pillowy" effect.
- **Level 2 (Interactive/Active):** Slightly more pronounced shadows or a subtle inner-glow to suggest the element is raised or "squishable."
- **Glassmorphism:** Used sparingly for top navigation bars or floating action buttons, employing a backdrop blur of 10px to maintain focus on the content beneath while feeling airy.

## Shapes

The shape language is "Ultra-Rounded." There are no sharp corners in this design system.

- **Standard Elements:** Buttons and small input fields use a `1rem` (16px) radius.
- **Cards & Containers:** Use `2rem` (32px) or larger to create the "bubble" aesthetic.
- **Paw Motifs:** Interactive icons are often enclosed in a circular or "blob" shaped container that mimics the organic form of a cat paw. 
- **Selection Indicators:** Use pill-shaped (fully rounded) containers for active states in tabs or navigation.

## Components

### Buttons & Interactive
- **Primary Button:** Sakura Pink background, Soft Charcoal text, ultra-rounded. On hover, the button should scale slightly (1.05x) to feel responsive.
- **Paw Interaction:** Include a subtle cat-paw print icon that appears or "presses down" when a button is clicked.

### Cards
- **Financial Cards:** Cream Milk base with a 32px corner radius. Headlines in Nunito, values in Plus Jakarta Sans. Incorporate a subtle "whisker" graphic or paw watermark in the corner for brand reinforcement.

### Inputs & Fields
- **Text Fields:** Soft Charcoal borders (2px) with a 16px radius. Backgrounds should be pure White (#FFFFFF) to provide contrast against the Cream Milk containers.
- **Checkboxes:** Styled as circular "paw pads" that fill with Sakura Pink when selected.

### Chips & Badges
- **Status Chips:** Use Lavender or Mint Fresh with 10% opacity backgrounds and 100% opacity text for high readability and a soft look. Always pill-shaped.

### Navigation
- **Bottom Bar (Mobile):** Floating "pill" design with a backdrop blur. Icons should be chunky and playful, utilizing cat-themed metaphors where appropriate (e.g., a "Home" icon shaped like a cat house).