## 2026-07-30T20:59:44Z

You are Worker M3 for project Meowney.
Your working directory for metadata is: d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m3
Project directory: d:\creative-dev\projetos\pessoal\cases\meowney

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Objective:
Implement Requirement R2 (Lean Profile Page with static FAQ, Replay Tutorial button, and Support button) and Requirement R3 (Visual Step-by-step Onboarding Tutorial Modal using Framer Motion).

Detailed Instructions:

1. Create directory `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m3` and maintain `progress.md` inside it.

2. **Onboarding Tutorial Modal (`src/components/TutorialModal.tsx`)**:
   - Build a visual step-by-step modal component using Framer Motion.
   - Include 3 or 4 engaging cat-themed onboarding steps:
     - Step 1: "Bem-vindo ao Meowney! 🐱" — Control your expenses with a cute, kawaii experience.
     - Step 2: "Registre suas Rações 🛒" — Log daily expenses easily from the floating paw button.
     - Step 3: "Cat-Stash Goals 💰" — Set savings goals and watch your treat jar fill up!
     - Step 4: "Pronto para começar! ✨" — Keep your cat finances purr-fect.
   - Smooth slide transition animations between steps using `framer-motion` (`AnimatePresence`, `motion.div`).
   - Include Next/Previous/Finish buttons and step indicators (dots).
   - Wire state to `useMeowneyStore`:
     - Opens automatically if `hasSeenTutorial` is `false` (after client hydration).
     - Closing / finishing sets `hasSeenTutorial` to `true` via `setHasSeenTutorial(true)`.
     - Support external open control (e.g. `isOpen`, `onClose` props or store state) so the Profile page can trigger it at any time.

3. **Global Layout Integration (`src/app/layout.tsx` or root client wrapper)**:
   - Ensure `TutorialModal` is rendered so it pops up automatically on first app visit when `hasSeenTutorial` is `false`.

4. **Lean Profile Page (`src/app/profile/page.tsx`)**:
   - Remove ALL complex notification toggles, theme settings, account settings, and extra menus.
   - Build a minimal, clean, high-aesthetic profile layout containing ONLY:
     - User Avatar & Title header ("Cat Parent", "Membro Meowney").
     - **Static FAQ Section**: Accordion or cards answering key questions (e.g., "Como o Meowney guarda meus dados?", "Como funcionam as Cat-Stashes?", "O que acontece ao adicionar um gasto?").
     - **Replay Tutorial Button**: "Rever Tutorial" / "Replay Tutorial", which opens the `TutorialModal`.
     - **Support Button**: "Falar com Suporte", rendered as an anchor tag / link pointing to `mailto:jahari.wav@gmail.com` with a mail icon.
   - Ensure strict compliance with Acceptance Criteria: no theme settings, no notification toggles.

5. Run `npm run build` in `d:\creative-dev\projetos\pessoal\cases\meowney` to confirm 0 compilation or TypeScript errors.

6. Write handoff report in `d:\creative-dev\projetos\pessoal\cases\meowney\.agents\worker_m3\handoff.md` summarizing changes, components created, tutorial steps, profile updates, and build test results. Send message back to parent.
