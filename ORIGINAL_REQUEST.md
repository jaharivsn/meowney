# Original User Request

## Initial Request — 2026-08-05T15:16:12Z

Refatoração e refinamento ponta-a-ponta da Landing Page e do WebApp Meowney, combinando o Design System Kawaii do Stitch (#FFB7C5, #FFFDD0, #A3E4D7, #2B2B2B, Nunito/Plus Jakarta) com benchmarks de elite do Lapa.ninja (SaaS) e Mobbin (Finance iOS).

Working directory: d:\creative-dev\projetos\pessoal\cases\meowney
Integrity mode: development

## Requirements

### R1. Fidelidade Estética & Design System Stitch
Manter 100% de conformidade com o `design.md` original do Stitch: cores (Sakura Pink, Cream Milk, Mint Fresh, Soft Charcoal), tipografia (Nunito Sans para headings, Plus Jakarta Sans para dados/corpo), cantos ultra-arredondados (`32px` cards, `16px` botões) e sombras táteis suaves ("squishy").

### R2. Landing Page de Alta Conversão (Lapa.ninja Benchmark)
Garantir estrutura fluida mobile-first com Hero impactante, barra de autoridade, seções de recursos em zigue-zague com visualizações das telas do app, tabela de preços ancorada, prova social e FAQ expansível sem bloqueios de animação.

### R3. WebApp Financeiro Intuitivo (Mobbin Finance iOS Benchmark)
Dashboard com saldo editável e atualizado em tempo real, fluxo de gastos/rendas limpo em `/app/add`, metas/cofrinhos com barras de progresso em `/app/goals`, e gestão de categorias em `/app/profile`, tudo integrado via Zustand e sincronizado no LocalStorage.

### R4. Validação Responsiva Dual-Browser
Criar `public/dual-preview.html` com viewports Desktop (1440x900) e Mobile (390x844) e executar testes de layout sem quebras e sem scroll horizontal indesejado.

## Acceptance Criteria

### Integridade & Funcionalidade
- [ ] O build de produção (`npm run build`) executa sem nenhum erro de compilação ou TypeScript.
- [ ] Todas as transações inseridas em `/app/add` atualizam o saldo do Dashboard e persistem após F5 (LocalStorage).
- [ ] O visualizador `dual-preview.html` exibe as versões Desktop e Mobile perfeitamente sincronizadas.
- [ ] Zero AI-slop: copy limpo, sem termos corporativos vazios, com hierarquia semântica HTML5 e acessibilidade keyboard-friendly.
