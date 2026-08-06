# Plan: Meowney 1:1 Google Stitch Refactoring

## Objectives
Execute 1:1 refactoring across all 12 Google Stitch screens in the Meowney codebase (`d:\creative-dev\projetos\pessoal\cases\meowney`) with zero-cost OmniRoute MCP analysis, dual-viewport browser validation, `npm run build` verification, and Forensic Audit gate.

## 12 Target Stitch Screens (Project ID: 16777229921405218590)
1. Cat-Personality (`1c1776cc279b40be9de37a877dc5f8fa`)
2. Profile (`1cc79f9cba6a4907af8e6606e074fe0e`)
3. Shader (`2f73a4701929482cad48b556b33409b6`)
4. Meowney Logo (`62afbf0a44954a2cb8fd8da4f4c51a2d`)
5. Kawaii Cat Avatar 3D (`7e4d9a05edc04935b3b539b9e35f149c`)
6. Expenses (`8a32eee31be746ab86ab40f48064e2dc`)
7. Add New Expense (`9d59f4ffde0640b4a95ba4c966572043`)
8. Cat-Stash Goals (`a3b09e7d2f6f4edcbc145abf2ca0c365`)
9. Design System (`asset-stub-assets_6c627ab841914c219b9e2373be94a73f`)
10. Dashboard (`b39eadcd47f4405dbd78c1525f3f6483`)
11. Brandkit Board (`3640526314918751543`)
12. Meowney PRD (`ecc43696daa34ca6952369b41a869198`)

## Phased Plan
1. **Phase 0: Survey & Inventory**: Dispatch 3 Explorers in parallel to survey the codebase, extract design specifications, examine Stitch screens, and list all components and pages.
2. **Phase 1: Architecture & Decomposition**: Synthesize survey reports into `PROJECT.md`, establish design tokens, layout contracts, and milestone plan.
3. **Phase 2: Milestone Execution Loop**:
   - Milestone 1: Design Tokens, Typography, Theme & Base Layouts (32px rounded corners, colors, fonts).
   - Milestone 2: Core Components & Screen Batch 1 (Dashboard, Expenses, Add Expense, Cat-Stash Goals).
   - Milestone 3: Screen Batch 2 & Special Components (Cat-Personality, Profile, Shader, Logo, Avatar 3D, Design System, Brandkit Board, PRD).
   - Milestone 4: Dual-Viewport Preview, Build & Forensic Audit Verification.
4. **Phase 3: Final Verification & Hand-off**: Verify `npm run build` passes, check audit status, and notify parent Sentinel.
