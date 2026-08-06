# Original User Request

## Initial Request — 2026-08-05T19:46:12Z

Refatoração e alinhamento 1:1 rigoroso de TODAS as 12 telas do projeto Meowney no Google Stitch (ID: 16777229921405218590) utilizando a rotação Zero-Cost via OmniRoute MCP e validação de UI/UX com o subagente Browser.

Working directory: d:\creative-dev\projetos\pessoal\cases\meowney
Integrity mode: development

## Requirements

### R1. Réplica 1:1 das 12 Telas do Stitch
Garantir correspondência idêntica a cada uma das 12 telas do projeto Stitch:
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

### R2. Uso Exclusivo de Rotação OmniRoute MCP
Todas as consultas pesadas de análise, compilação de regras e subagentes devem utilizar a ferramenta `mcp_omniroute_omniroute_chat` com os combos `free-stack` e `google-groq-fallback` para zero consumo de cota da IDE.

### R3. Validação de UI/UX via Browser
Acionar o subagente `browser` para capturar e comparar screenshots em tempo real contra os previews do Stitch e garantir zero inconsistência visual em Desktop e Mobile.

## Acceptance Criteria

### Integridade & Fidelidade Visual
- [ ] 100% de paridade visual 1:1 de cores, tipografia, cantos arredondados (`32px`) e layouts com o Stitch.
- [ ] Compilação `npm run build` bem-sucedida sem erros de TypeScript ou Next.js.
- [ ] Browser validação confirma ausência de quebras responsivas no `dual-preview.html`.
