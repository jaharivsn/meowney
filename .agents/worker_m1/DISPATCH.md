# DISPATCH — Worker (Milestone 1: Design System Foundation)

## Mission
Refactor `src/app/globals.css` and Tailwind theme configurations to establish 100% compliance with R1 Design System Stitch requirements.

## Objectives & Deliverables
1. **Purge Legacy Color `#864e5a` (`--color-primary`)**:
   - Replace all occurrences of `--color-primary` and `#864e5a` in `src/app/globals.css` with Stitch Soft Charcoal (`#2B2B2B`), Sakura Pink (`#FFB7C5`), or Mint Fresh (`#A3E4D7`).
   - Define theme colors in `@theme`:
     - `--color-sakura-pink: #FFB7C5;`
     - `--color-cream-milk: #FFFDD0;`
     - `--color-mint-fresh: #A3E4D7;`
     - `--color-soft-charcoal: #2B2B2B;`
2. **Configure Typography Mappings**:
   - Define `--font-heading: "Nunito Sans", sans-serif;` and `--font-sans: "Plus Jakarta Sans", sans-serif;`.
   - Remove invalid `monospace` fallback for Plus Jakarta Sans.
3. **Implement Tactile Squishy Shadow Utility**:
   - Create `@utility shadow-squishy`:
     - `box-shadow: 0 8px 0 0 #2B2B2B;`
     - Tactile press effect: `transition: all 0.15s ease-in-out;` and active state `active:translate-y-1 active:shadow-none`.
4. **Border Radii Utilities & Alignment**:
   - Ensure utility classes or Tailwind config support 32px card radius (`rounded-3xl` / `rounded-[32px]`) and 16px button radius (`rounded-2xl` / `rounded-[16px]`).
5. **Build & Test Verification**:
   - Execute `npm run build` to verify zero TypeScript or CSS compilation errors.
   - Execute `npx vitest run` to verify all unit tests pass.

## Reference Files
- `ORIGINAL_REQUEST.md`: `d:\creative-dev\projetos\pessoal\cases\meowney\ORIGINAL_REQUEST.md`
- `PROJECT.md`: `d:\creative-dev\projetos\pessoal\cases\meowney\PROJECT.md`
- Explorer 1 Handoff: `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\explorer_survey_1\handoff.md`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
