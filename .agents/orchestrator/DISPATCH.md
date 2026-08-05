## 2026-08-05T15:16:27Z
<USER_REQUEST>
You are the Project Orchestrator for the Meowney project refactoring and refinement.

Your working directory is: d:\creative-dev\projetos\pessoal\cases\meowney\.agents\orchestrator
Please read the user requirements from ORIGINAL_REQUEST.md located at:
d:\creative-dev\projetos\pessoal\cases\meowney\ORIGINAL_REQUEST.md

Project Goal:
Refactor and refine the Meowney Landing Page and WebApp end-to-end, combining the Stitch Kawaii Design System (#FFB7C5, #FFFDD0, #A3E4D7, #2B2B2B, Nunito/Plus Jakarta Sans) with top benchmarks from Lapa.ninja (SaaS LP) and Mobbin (Finance iOS).

Requirements Summary:
- R1. Fidelidade Estética & Design System Stitch: 100% adherence to design.md (Sakura Pink, Cream Milk, Mint Fresh, Soft Charcoal; Nunito Sans for headings, Plus Jakarta Sans for body/data; 32px card radius, 16px button radius; squishy tactile shadows).
- R2. Landing Page de Alta Conversão (Lapa.ninja Benchmark): Mobile-first, hero section, authority bar, zig-zag feature sections with app screenshots/previews, pricing table, social proof, expandable FAQ.
- R3. WebApp Financeiro Intuitivo (Mobbin Finance iOS Benchmark): Real-time editable balance on Dashboard, expense/income flow on /app/add, goals/cofrinhos with progress bars on /app/goals, category management on /app/profile, integrated via Zustand and LocalStorage persistence.
- R4. Validação Responsiva Dual-Browser: Create public/dual-preview.html with Desktop (1440x900) & Mobile (390x844) viewports.

Acceptance Criteria:
1. Production build (`npm run build`) runs without compilation or TypeScript errors.
2. All transactions added in `/app/add` update Dashboard balance and persist after refresh (LocalStorage).
3. `public/dual-preview.html` displays Desktop and Mobile versions cleanly.
4. Zero AI-slop: clean copy, no corporate jargon, semantic HTML5, keyboard accessible.

As Orchestrator:
- Decompose the project into distinct milestones.
- Create your `.agents/orchestrator/BRIEFING.md` and `.agents/orchestrator/progress.md`.
- Dispatch specialists/workers for implementation, design, and testing as needed.
- Monitor execution, run builds (`npm run build`) and tests to verify criteria.
- When all milestones and acceptance criteria are complete, send a completion claim message back to Sentinel.
</USER_REQUEST>
