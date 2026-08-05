# E2E Test Infra: Meowney Refactoring & Refinement

## Test Philosophy
- Opaque-box, requirement-driven testing. No dependency on implementation design details.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory & Test Coverage
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|----------------------|:------:|:------:|:------:|:------:|
| 1 | R1: Design System & Styling | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | R2: Landing Page SaaS Benchmarks | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 3 | R3: WebApp Finance & State | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 4 | R4: Dual-Browser Preview | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test runner: Vitest (`npx vitest run`) + Playwright (`npx playwright test`) + Production Build (`npm run build`).
- E2E Test files: `tests-e2e/transactions.spec.ts`, `tests-e2e/onboarding.spec.ts`, `tests-e2e/mockup.spec.ts`.
- Unit Test files: `src/lib/__tests__/store.test.ts`.

## Coverage Thresholds
- Tier 1: ≥5 per feature area (happy path)
- Tier 2: ≥5 boundary & edge cases per feature area (negative tests, empty states, zero balances)
- Tier 3: Pairwise feature interactions (add transaction -> balance update -> localstorage persistence -> goals progress)
- Tier 4: Real-world user flows (end-to-end finance management session)
