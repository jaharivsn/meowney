# Original User Request

## 2026-07-30T20:55:41Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Limpar MVP do Meowney, substituir mock data por LocalStorage (Zustand + Zod), focar em Gastos/Metas, e criar Tutorial/FAQ no Perfil enxuto.

Working directory: d:\creative-dev\projetos\pessoal\cases\meowney
Integrity mode: development

## Requirements

### R1. Zustand + Zod LocalStorage Store
Remove all hardcoded data. Implement a Zustand store synced to LocalStorage (validated by Zod schemas). The store must manage global state for: Wallet Balance, Transactions (Expenses), and Goals progress. Wire this store to `/`, `/expenses`, `/goals`, and `/add` pages so data is real and persistent. If store is empty, display empty states.

### R2. Lean Profile Page (FAQ & Support)
Remove the complex settings and notification toggles from `/profile`. Replace it with a minimal view containing only: a static FAQ section, a button to replay the Tutorial, and a Support contact button linking to `mailto:jahari.wav@gmail.com`. 

### R3. Onboarding Tutorial Modal
Implement a visual step-by-step onboarding modal (can use Framer Motion) that appears automatically on the user's very first visit. Track the `hasSeenTutorial` state in LocalStorage.

## Acceptance Criteria

### Persistence & Data Integrity
- [ ] Submitting a new expense in `/add` immediately updates the Dashboard balance and appears in the `/expenses` list.
- [ ] Refreshing the browser (`F5`) retains all transactions, balances, and goals without losing data.
- [ ] The app contains absolutely zero hardcoded mock transactions or fake goals. 

### UI & Features
- [ ] The `/profile` page no longer contains notification toggles or theme settings, only FAQ, Tutorial, and Support (jahari.wav@gmail.com).
- [ ] The Tutorial modal appears on the first app load, and can be manually re-triggered from the Profile page.
