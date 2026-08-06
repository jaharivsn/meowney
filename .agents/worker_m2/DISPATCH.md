# DISPATCH — Worker (Milestone 2: Landing Page & SaaS Benchmarks)

## Mission
Decompose `src/app/page.tsx` into modular sub-components under `src/components/landing/`, implement Lapa.ninja SaaS high-conversion benchmarks, and resolve WCAG 2.1 AA accessibility flaws.

## Objectives & Deliverables
1. **Decompose `src/app/page.tsx`**:
   - Extract sub-components into `src/components/landing/`:
     - `Navbar.tsx`
     - `HeroSection.tsx`
     - `AuthorityBar.tsx`
     - `ZigZagFeatures.tsx`
     - `PricingSection.tsx`
     - `SocialProofSection.tsx`
     - `BenefitsGrid.tsx`
     - `FaqSection.tsx`
     - `Footer.tsx`
   - Refactor `src/app/page.tsx` to act as a clean server component layout composer importing these modular sections.
2. **Lapa.ninja SaaS Conversion Benchmarks**:
   - `Navbar`: Add smooth anchor links (`#recursos`, `#precos`, `#depoimentos`, `#faq`).
   - `HeroSection`: Add secondary CTA button ("Ver Recursos" linking to `#recursos`), add trust micro-badge ("+2.400 tutores felizes"), update secondary mockup frame asset link from `/hero-mockup-mobile.png` to `/hero-mockup-desktop.png`.
   - `SocialProofSection`: Add 3rd testimonial card ("Lucas M. - Tutor da Oliver") for 3-column desktop grid symmetry.
   - `PricingSection`: Add comparative V2 Cloud Sync anchored plan ("Em breve" badge, R$ 19,90/mês).
3. **Accessibility (WCAG 2.1 AA)**:
   - `FaqSection`: Add `aria-expanded`, `aria-controls`, `id`, and `role="region"` attributes to FAQ accordion buttons and content containers.
   - Decorative Icons: Add `aria-hidden="true"` to all decorative Material Symbols icon elements (`<span className="material-symbols-outlined">...</span>`).
4. **Stitch Design System Compliance**:
   - Use Stitch colors (`#FFB7C5`, `#FFFDD0`, `#A3E4D7`, `#2B2B2B`), Nunito Sans for headings, Plus Jakarta Sans for text, 32px card radii (`rounded-3xl`), 16px button radii (`rounded-2xl`), and `shadow-squishy`.
5. **Build & Test Verification**:
   - Run `npm run build` to verify clean compilation without TypeScript or CSS errors.
   - Run `npx vitest run` to verify all unit tests pass.

## Reference Files
- `ORIGINAL_REQUEST.md`: `d:\creative-dev\projetos\pessoal\cases\meowney\ORIGINAL_REQUEST.md`
- `PROJECT.md`: `d:\creative-dev\projetos\pessoal\cases\meowney\PROJECT.md`
- Explorer 2 Handoff: `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\explorer_survey_2\handoff.md`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
