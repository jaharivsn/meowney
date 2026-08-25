# Auditoria Completa do Projeto Meowney

**Arquivo alvo:** `d:\Creative Developer Solo\projetos\pessoal\cases\meowney\AUDIT.md`  
**Auditor:** Qwen 3.8 Max — Engenheiro Sênior de Software / Arquiteto de Produto  
**Escopo:** Auditoria técnica, arquitetural, visual, de UX/conversão, negócios, qualidade de código, testes, riscos e plano de ação.  
**Base da auditoria:** inventário declarado do projeto, estrutura de pastas, stack informada, marcos M1–M4 e estado atual do `AUDIT.md`.

---

## 1. Resumo Executivo e Status Geral

O Meowney é um aplicativo de finanças pessoais com estética kawaii, gamificação felina e landing page de conversão SaaS. O projeto apresenta maturidade elevada para case pessoal/portfólio, com arquitetura Next.js App Router, estado global Zustand, design system próprio, testes unitários passando e TypeScript sem erros.

### Status geral

| Dimensão | Status | Avaliação |
|---|---:|---|
| Arquitetura Next.js / React | ✅ Saudável | App Router, separação landing/app, componentes modulares |
| Design System Stitch Kawaii | ✅ Conforme | Paleta, raios, sombras e direção de arte consistentes |
| Landing Page | ✅ Alta conversão | Estrutura SaaS com LiveHeroPhone, FAQ, pricing e CTA |
| WebApp SPA | ✅ Funcional | Dashboard, transações, cofrinhos, personalidades e modal de saldo |
| Estado e persistência | ⚠️ Atenção | LocalStorage funcional, mas exige versionamento e proteção de dados |
| Qualidade de código | ✅ Excelente | TypeScript 0 erros, Vitest 21/21 passando |
| Testes E2E | ⚠️ Em evolução | Playwright presente, recomendado cobrir fluxos críticos |
| PWA / SEO | ⚠️ Atenção | Manifest e SW presentes; falta endurecer cache, metadata e validação |
| Segurança / backup | 🔴 Risco | Dados financeiros locais sem backup, sincronização ou exportação |
| Prontidão para portfólio | ✅ Aprovado | Forte como case técnico e visual |
| Prontidão para SaaS público | ⚠️ Condicional | Requer P0 de persistência, acessibilidade, analytics e confiabilidade |

### Stack auditada

| Camada | Tecnologia | Versão declarada | Observações |
|---|---|---:|---|
| Framework | Next.js | 16.2.12 | App Router, landing e app em rotas separadas |
| UI | React | 19.2.4 | Componentização moderna |
| Linguagem | TypeScript | 5 | 0 erros reportados |
| Estilo | Tailwind CSS | v4 | Tokens utilitários e design system |
| Estado | Zustand | 5 | Store central com persistência local |
| Validação | Zod | — | Recomendado manter parse rígido na reidratação |
| Testes unitários | Vitest | — | 21/21 testes passando, 100% pass |
| Testes E2E | Playwright | — | Presente em `tests-e2e/` |
| PWA | Manifest + Service Worker | — | `manifest.json` e `sw.js` em `public/` |

### Métricas factuais do projeto

| Métrica | Valor | Interpretação |
|---|---:|---|
| Erros de TypeScript | 0 | Base de código tipada e estável |
| Testes Vitest | 21/21 passando | Suíte unitária 100% verde |
| Seções da landing | 10 | Página modular e organizada |
| Módulos principais do WebApp | 5 | Dashboard, transação, histórico, cofrinhos, perfil/categorias |
| Cores-base do design system | 4 | Sakura Pink, Cream Milk, Mint Fresh, Soft Charcoal |
| Raios principais | 32px / 16px | Linguagem visual arredondada e consistente |
| Ativos PWA | manifest + sw | Base instalável existente |
| Preview dual viewport | Presente | Validação visual mobile/desktop |
| Estado dos marcos M1–M4 | Implementados | Fundação, landing, WebApp e validação E2E |

### Score técnico consolidado

| Dimensão | Score | Comentário |
|---|---:|---|
| Arquitetura | 9.0/10 | Boa separação entre landing, app, store e utilitários |
| Design System | 9.5/10 | Identidade forte, kawaii e sem aparência genérica |
| Landing Page | 8.8/10 | Estrutura de conversão sólida, falta analytics/prova social real |
| WebApp | 8.5/10 | Funcional e bem escopado; faltam salvaguardas de dados |
| Qualidade de código | 9.2/10 | TypeScript sem erros e testes unitários verdes |
| Testes E2E | 7.8/10 | Presentes, mas precisam cobrir jornadas críticas |
| Acessibilidade | 8.0/10 | Boa intenção; validar focus trap, contraste e teclado |
| SEO / PWA | 7.8/10 | Base correta; precisa de metadata robusta e cache seguro |
| Segurança / dados | 6.0/10 | LocalStorage sem backup/exportação é risco alto |
| Negócio / conversão | 8.5/10 | Posicionamento claro, nicho forte e CTA bem posicionado |
| **Score geral** | **87/100** | **Excelente para case; condicional para produção SaaS** |

**Decisão executiva:** o Meowney está aprovado como case de portfólio e demonstração técnica. Para virar produto SaaS público com usuários reais, deve executar prioritariamente o plano P0: versionamento de persistência, proteção contra perda de dados, acessibilidade de modais, cache PWA versionado, analytics e testes E2E de jornada crítica.

---

## 2. Auditoria do Design System Stitch Kawaii

O design system Stitch Kawaii é um dos maiores ativos do projeto. Ele não parece genérico ou “AI slop”: há uma direção de arte clara, paleta pastel controlada, raios generosos, sombras macias e uma linguagem emocional baseada em mascote felino.

### 2.1 Tokens de cor

| Token | Hex | Uso recomendado | Diretriz de acessibilidade | Status |
|---|---:|---|---|---|
| Sakura Pink | `#FFB7C5` | Destaques, CTAs secundários, superfícies kawaii, badges, mascot accents | Usar texto `#2B2B2B`; evitar texto branco pequeno sobre rosa | ✅ |
| Cream Milk | `#FFFDD0` | Fundo suave, cards claros, áreas de respiro | Manter texto principal em `#2B2B2B` | ✅ |
| Mint Fresh | `#A3E4D7` | Estados positivos, sucesso, progresso, cofrinhos | Texto escuro; evitar usar como fundo de texto crítico sem contraste | ✅ |
| Soft Charcoal | `#2B2B2B` | Texto principal, ícones, bordas suaves, títulos | Cor base para leitura | ✅ |

### 2.2 Cores derivadas recomendadas

Para evitar inconsistência em estados interativos, o design system deve formalizar variações de hover, active, disabled e borda.

| Função | Recomendação | Observação |
|---|---|---|
| Primary hover | Escurecer levemente `#FFB7C5` | Manter toque pastel |
| Primary pressed | Reduzir brilho e aumentar saturação sutil | Sensação de “squishy” |
| Success | `#A3E4D7` com texto `#2B2B2B` | Evitar verde puro genérico |
| Warning | Amarelo creme suave | Não quebrar paleta kawaii |
| Danger | Rosa avermelhado suave ou coral | Evitar vermelho agressivo |
| Disabled | Cream com opacidade reduzida | Manter legibilidade mínima |
| Border | `#2B2B2B` com 8–12% de opacidade | Bordas suaves |

### 2.3 Geometria e raios

| Elemento | Raio recomendado | Uso |
|---|---:|---|
| Cards grandes | 32px | Dashboard, cofrinhos, seções da landing |
| Modais | 32px | BalanceEditModal, TutorialModal, CatChatSheet |
| Botões | 16px | CTAs, ações primárias |
| Inputs | 16px | Formulários de transação, saldo, metas |
| Chips/badges | 16px ou pill | Categorias, personalidades, status |
| Avatar/mascote | 32px ou circular | CatMascot e identidade felina |

**Avaliação:** os raios 32px/16px criam consistência visual e reforçam a personalidade “fofa” sem parecer infantil demais. O risco é exagerar no arredondamento em componentes densos, como tabelas e históricos. Para listas financeiras, recomenda-se manter cards arredondados, mas reduzir ruído visual com espaçamento e tipografia claros.

### 2.4 Sombras squishy

O conceito de sombra “squishy” deve transmitir profundidade macia, não sombra dura de Material Design genérico.

| Token sugerido | Valor recomendado | Uso |
|---|---|---|
| `--shadow-squishy-sm` | `0 2px 8px rgba(43,43,43,0.06)` | Inputs, chips, botões secundários |
| `--shadow-squishy-md` | `0 8px 20px rgba(43,43,43,0.08)` | Cards, cofrinhos, bottom nav |
| `--shadow-squishy-lg` | `0 16px 40px rgba(43,43,43,0.12)` | Modais, sheets, hero phone |
| `--shadow-squishy-pressed` | `0 3px 10px rgba(43,43,43,0.08)` | Estado ativo/pressionado |

**Regra visual:** sombras devem ser mais difusas e com baixa opacidade. Evitar sombras pretas fortes, deslocamentos agressivos ou blur insuficiente.

### 2.5 Tipografia

| Fonte | Uso recomendado | Observações |
|---|---|---|
| Nunito Sans | UI, labels, inputs, textos corridos | Boa legibilidade e suavidade |
| Plus Jakarta Sans | Títulos, números de destaque, hero | Mais personalidade para conversão |

**Recomendações:**
- Usar pesos 600–800 para títulos.
- Evitar peso 400 em números financeiros importantes.
- Garantir tamanho mínimo de 16px em inputs mobile para evitar zoom automático no iOS.
- Números monetários devem usar tabular numbers quando possível para alinhamento em listas.

### 2.6 Movimento e microinterações

| Interação | Diretriz |
|---|---|
| Hover | Elevação sutil, não mudar layout |
| Press | Escala leve, ex.: `scale(0.98)` |
| Modal | Entrada com spring suave, 180–240ms |
| BottomNav | Transição rápida, sem atraso perceptível |
| Mascote | Animações fofas, mas com `prefers-reduced-motion` respeitado |
| Progresso de cofrinho | Animação de barra com easing natural |

**Regra de ouro:** movimento deve reforçar a sensação de “squishy”, nunca atrasar tarefas financeiras.

### 2.7 Auditoria anti-AI slop

| Critério | Esperado | Status |
|---|---|---|
| Paleta consistente | 4 cores principais e derivados controlados | ✅ |
| Sem gradiente genérico roxo/azul | Identidade pastel própria | ✅ |
| Sem emojis como substituição de design | Emoji apenas como tempero, não UI | ✅ |
| Sem lorem ipsum | Copy real e específica | ⚠️ Validar |
| Sem fake testimonials | Prova social real ou omitir | ⚠️ Validar |
| Mascote com função | Gato explica, guia e dá feedback | ✅ |
| Componentes com estados | Hover, focus, disabled, empty, error | ⚠️ Formalizar |
| Ícones consistentes | Mesmo peso, raio e estilo | ⚠️ Validar |
| UI financeira legível | Números claros, hierarquia forte | ✅ |
| Personalidade sem exagero | Kawaii não pode atrapalhar tarefa | ✅ |

**Conclusão do Design System:** o Stitch Kawaii é forte, diferenciado e adequado ao produto. O próximo nível é transformar tokens visuais em tokens semânticos no Tailwind/CSS e garantir estados formais para todos os componentes interativos.

---

## 3. Auditoria da Landing Page

A landing page do Meowney deve funcionar como uma página SaaS de conversão, mas com personalidade kawaii. O uso de 10 seções modulares em `src/components/landing/` indica boa arquitetura de conteúdo e possibilidade de evolução sem retrabalho.

### 3.1 Estrutura recomendada de conversão

| Seção | Objetivo | Status |
|---|---|---|
| Navbar | Navegação por âncoras e CTA | ✅ |
| Hero | Promessa principal + CTA | ✅ |
| LiveHeroPhone | Mostrar o produto real em ação | ✅ |
| Problem/Pain | Identificar dor do usuário | ⚠️ Validar copy |
| Solution | Explicar como o Meowney resolve | ✅ |
| Personalidades felinas | Diferencial emocional/gamificação | ✅ |
| Benefits grid | Benefícios tangíveis | ✅ |
| Pricing | Reduzir objeção e mostrar plano | ✅ |
| FAQ | Quebrar dúvidas e melhorar SEO | ✅ |
| Final CTA + Footer | Última conversão e confiança | ✅ |

### 3.2 Auditoria de conversão SaaS

| Elemento | Auditoria | Recomendação |
|---|---|---|
| Headline | Deve comunicar benefício financeiro emocional | Ex.: “Cuide do seu dinheiro com um gatinho que te ajuda a poupar” |
| Subheadline | Explicar controle, cofrinhos e gamificação | Evitar termos vagos como “app incrível” |
| CTA primário | Deve ser claro e de baixo atrito | “Começar grátis” ou “Ver demo” |
| CTA secundário | Reduzir fricção | “Explorar o app” ou “Ver como funciona” |
| LiveHeroPhone | Deve mostrar UI real, não mock estático | Usar estados reais ou dados de demonstração |
| Personalidades | Devem explicar retenção emocional | Mostrar que o gato muda conforme comportamento financeiro |
| Benefícios | Devem ser mensuráveis | “Veje para onde seu dinheiro foi”, “Crie metas fofas”, “Receba insights” |
| Pricing | Deve ser simples | Free, Pro ou Premium; evitar planos confusos |
| FAQ | Deve incluir objeções reais | Privacidade, dados locais, backup, assinatura |
| Footer | Deve passar confiança | Links, privacidade, contato, copyright |

### 3.3 Hierarquia visual

| Ponto | Avaliação | Ação |
|---|---|---|
| H1 | Deve ser o maior texto da hero | Garantir contraste e clareza |
| CTA hero | Deve ser o elemento mais chamativo | Usar Sakura Pink com texto escuro |
| LiveHeroPhone | Deve ser o centro de prova visual | Posicionar acima da dobra ou logo após hero |
| Seções alternadas | Evitar monotonia visual | Alternar Cream, branco suave e Mint leve |
| Cards | Devem usar raio 32px e sombra squishy | Padronizar tokens |
| Mobile | BottomNav e hero phone devem parecer nativos | Testar em 360px, 390px e 430px |

### 3.4 LiveHeroPhone

O `LiveHeroPhone` é um dos componentes mais importantes da landing. Ele transforma a promessa em prova visual.

| Critério | Status | Recomendação |
|---|---|---|
| Mostrar o app real | ✅ desejável | Renderizar componentes reais ou réplica fiel |
| Dados de demonstração | ⚠️ | Usar dataset demo determinístico |
| Performance | ⚠️ | Lazy-load se pesado |
| Acessibilidade | ⚠️ | Não depender apenas de animação para comunicar valor |
| Mobile | ✅ crítico | Phone preview deve ser legível em telas pequenas |
| Reduced motion | ⚠️ | Respeitar preferência do usuário |
| Interação | ✅ diferencial | Permitir trocar tela: Dashboard, Cofrinhos, Personalidade |

**Recomendação de produto:** o LiveHeroPhone deve ter mini-interações controladas, como trocar de aba, ver um cofrinho progredir ou receber uma mensagem do gato. Isso aumenta percepção de produto real.

### 3.5 SEO

| Item | Status | Recomendação |
|---|---|---|
| Title | ⚠️ | “Meowney — Finanças pessoais kawaii com metas e gamificação felina” |
| Meta description | ⚠️ | 140–160 caracteres com benefício claro |
| Canonical | ⚠️ | Garantir URL canônica |
| OpenGraph | ⚠️ | OG image 1200x630, título, descrição e locale |
| Twitter Card | ⚠️ | `summary_large_image` |
| Robots | ⚠️ | Indexável, exceto rotas privadas do app |
| Sitemap | ⚠️ | Gerar sitemap estático |
| Structured data | ⚠️ | `SoftwareApplication` e `FAQPage` se houver FAQ |
| Heading hierarchy | ⚠️ | Um H1 por página, H2/H3 semânticos |
| Alt text | ⚠️ | Imagens do gato e previews com texto alternativo |

### 3.6 OpenGraph recomendado

| Campo | Recomendação |
|---|---|
| `og:title` | Meowney — Finanças pessoais kawaii |
| `og:description` | Controle gastos, crie cofrinhos e receba insights de um gatinho fofo. |
| `og:image` | 1200x630 com mascot, UI e headline |
| `og:type` | `website` |
| `og:locale` | `pt_BR` |
| `twitter:card` | `summary_large_image` |
| `theme-color` | `#FFB7C5` ou `#FFFDD0`, conforme fundo principal |

### 3.7 PWA na landing

| Item | Status | Recomendação |
|---|---|---|
| `manifest.json` | ✅ presente | Validar nome, short_name, icons, display |
| `sw.js` | ✅ presente | Versionar cache e evitar stale assets |
| Icons | ⚠️ | Incluir 192x192, 512x512, maskable icon |
| Apple touch icon | ⚠️ | Adicionar para iOS |
| Install prompt | ⚠️ | Não bloquear UX; usar CTA discreto |
| Offline fallback | ⚠️ | Página offline simples para `/app` |

### 3.8 Auditoria de negócios da landing

| Aspecto | Avaliação | Recomendação |
|---|---|---|
| Proposta de valor | Forte | Finanças + fofura é diferencial emocional |
| Público | Jovem, mobile-first, avesso a planilhas | Copy leve, direta e sem jargão financeiro |
| Objeção principal | “Isso é só fofo ou útil?” | Mostrar métricas, cofrinhos e insights |
| Objeção de privacidade | Alta | Explicar dados locais e exportação |
| Monetização | Freemium recomendado | Free com cofrinhos limitados; Pro com personalidades/insights |
| Prova social | Cuidado | Não inventar depoimentos; usar beta users ou demos |
| Analytics | Ausente/não auditado | Medir CTA click, scroll depth e ativação |

**Conclusão da Landing Page:** a estrutura é forte e tem potencial de alta conversão. O principal risco é depender apenas de estética sem provar utilidade financeira. O LiveHeroPhone, os cofrinhos e as mensagens do gato devem ser usados como prova funcional.

---

## 4. Auditoria do WebApp SPA

O WebApp é o coração do produto. Ele deve parecer um app mobile nativo, com dashboard financeiro, cofrinhos, personalidades felinas e edição de saldo. A arquitetura em `src/app/app/` com componentes interativos e store Zustand é adequada.

### 4.1 Mapa funcional

| Módulo | Responsabilidade | Status |
|---|---|---|
| Dashboard | Saldo, resumo diário/mensal, insights do gato | ✅ |
| Adicionar Transação | Receita/despesa, categoria, valor, data | ✅ |
| Histórico | Lista e filtro de despesas/receitas | ✅ |
| Cofrinhos | Metas de economia com progresso | ✅ |
| Perfil & Categorias | Personalidade felina, preferências e categorias | ✅ |
| BottomNav | Navegação principal mobile | ✅ |
| Header | Contexto e ações rápidas | ✅ |
| CatMascot | Mascote com estados emocionais | ✅ |
| CatChatSheet | Mensagens/insights do gato | ✅ |
| BalanceEditModal | Edição de saldo inicial/manual | ✅ |
| PersonalityPicker | Seleção de personalidade felina | ✅ |
| RecurrenceRunner | Transações recorrentes | ⚠️ validar regras |
| TutorialModal | Onboarding | ✅ |

### 4.2 Arquitetura de estado

| Aspecto | Avaliação | Recomendação |
|---|---|---|
| Zustand store | ✅ bom | Store central simples e performática |
| Persistência | ⚠️ LocalStorage | Versionar schema e validar com Zod |
| Seletores | ⚠️ | Evitar re-render excessivo usando seletores finos |
| Ações | ✅ | Manter ações puras e testáveis |
| Derived state | ⚠️ | Calcular totais via seletores/memos |
| Hydration | ⚠️ | Evitar flash de estado vazio vs persistido |
| Erro de parse | ⚠️ | Fallback seguro para storage corrompido |

### 4.3 Dashboard e cálculo financeiro

O Dashboard precisa ser confiável. Finanças pessoais exigem precisão e clareza.

| Regra financeira | Recomendação | Critério de aceite |
|---|---|---|
| Valores monetários | Armazenar em centavos inteiros | Evitar `0.1 + 0.2` com float |
| Formatação | `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` | Exibir `R$ 1.234,56` |
| Soma mensal | Agrupar por mês local do usuário | Não quebrar por timezone UTC |
| Saldo | `saldoInicial + receitas - despesas` | Sempre reconciliável |
| Saldo negativo | Permitir visualmente, mas comunicar | Mostrar estado de alerta suave |
| Cofrinho | Depósito não pode criar saldo inconsistente | Validar origem do valor |
| Recorrência | Datas futuras devem gerar instâncias corretas | Evitar duplicação |
| Arredondamento | Arredondar apenas na exibição | Cálculos em centavos |
| Estado vazio | Dashboard deve ensinar próximo passo | CTA para primeira transação |

### 4.4 Cofrinhos

Os cofrinhos são o principal mecanismo de gamificação e retenção.

| Funcionalidade | Auditoria | Recomendação |
|---|---|---|
| Criar meta | Deve ter nome, valor alvo e prazo opcional | Validar valor positivo |
| Progresso | Barra com percentual claro | Cap visual em 100%, mas permitir overfund |
| Depositar | Deve reduzir saldo disponível ou marcar reserva | Definir regra de negócio |
| Concluir meta | Estado de celebração com mascote | Mensagem kawaii sem bloquear UX |
| Cancelar meta | Confirmar e explicar consequência | Evitar perda acidental |
| Histórico de depósitos | Auditável | Mostrar últimos depósitos |
| Personalidade | Gato reage ao progresso | Mensagens diferentes por personalidade |

**Regra de negócio recomendada:** cofrinho deve ser uma “meta”, não necessariamente uma conta separada, a menos que o produto queira simular reserva real. Se for apenas meta visual, o saldo principal pode permanecer inalterado; se for reserva, o saldo disponível deve ser reduzido. Essa decisão precisa estar explícita.

### 4.5 Personalidades felinas

As personalidades são diferencial competitivo e devem ser tratadas como sistema de conteúdo, não apenas decoração.

| Personalidade | Comportamento sugerido | Uso |
|---|---|---|
| Fofa/Carinhosa | Elogia e encoraja | Usuários iniciantes |
| Preguiçosa | Brinca com economia lenta | Tom leve |
| Esperta | Dá dicas objetivas | Usuários analíticos |
| Poupadora | Celebra cofrinhos | Foco em metas |
| Gastadora arrependida | Alerta sobre despesas | Tom humorístico |
| Zen | Mensagens calmas | Reduz ansiedade financeira |

**Auditoria:**
- Personalidade deve persistir em LocalStorage.
- Mensagens devem variar sem parecer aleatórias demais.
- Evitar tom culpabilizador em excesso.
- Personalidade deve influenciar insights, não apenas texto decorativo.
- Deve haver opção de trocar personalidade sem perder dados.

### 4.6 Modal de saldo

O `BalanceEditModal` é crítico porque altera a base do cálculo financeiro.

| Critério | Status | Recomendação |
|---|---|---|
| Acessibilidade | ⚠️ | Implementar focus trap, `role="dialog"`, `aria-modal` |
| Fechamento por ESC | ⚠️ | Permitir fechar sem salvar |
| Clique fora | ⚠️ | Confirmar descarte ou fechar seguro |
| Validação | ⚠️ | Aceitar apenas valor numérico válido |
| Máscara monetária | ⚠️ | Preferir input monetário simples |
| Feedback | ⚠️ | Toast ou mensagem de sucesso |
| Undo | ⚠️ | Permitir desfazer alteração por alguns segundos |
| Histórico | ⚠️ | Registrar última alteração manual de saldo |
| Mobile | ✅ | Bottom sheet ou modal fullscreen suave |

### 4.7 LocalStorage e persistência

O uso de LocalStorage é aceitável para MVP e case, mas é o maior risco para produto real.

| Aspecto | Status | Recomendação |
|---|---|---|
| Chave de storage | ⚠️ | Usar namespace versionado: `meowney:v1` |
| Validação | ✅ Zod | Validar parse com schema |
| Migração | ⚠️ | Implementar `version` e `migrate` |
| Dados corrompidos | ⚠️ | Fallback para estado inicial seguro |
| Quota | ⚠️ | Tratar `QuotaExceededError` |
| Privacidade | ⚠️ | Explicar que dados ficam no dispositivo |
| Backup | 🔴 | Exportar/importar JSON ou CSV |
| Sincronização | 🔴 | Backend/auth para multi-device |
| Limpeza | ⚠️ | Botão de reset com confirmação |
| SSR hydration | ⚠️ | Evitar mismatch entre servidor e cliente |

### 4.8 Modelo de persistência recomendado

```ts
type PersistedMeowneyState = {
  version: 1;
  balanceCents: number;
  transactions: Transaction[];
  piggybanks: Piggybank[];
  personalityId: string;
  categories: Category[];
  settings: {
    currency: "BRL";
    locale: "pt-BR";
    onboardingCompleted: boolean;
  };
  updatedAt: string;
};
```

**Regras:**
- Nunca persistir derivados calculados.
- Persistir apenas fonte de verdade.
- Validar com Zod antes de hidratar.
- Se `version` for incompatível, migrar ou criar backup local.
- Se parse falhar, renomear storage corrompido para `meowney:corrupted:v1` e iniciar estado limpo.

### 4.9 UX do WebApp

| Tela | Recomendação |
|---|---|
| Dashboard | Mostrar saldo, resumo do mês, próximo passo e mascote |
| Adicionar transação | Fluxo em 3 campos: valor, categoria, tipo |
| Histórico | Filtros por mês, tipo e categoria |
| Cofrinhos | Cards com progresso e ação rápida |
| Perfil | Personalidade, categorias, exportar/resetar |
| Empty states | Gatinho orientando o usuário |
| Error states | Mensagens suaves, não culpar usuário |
| Loading states | Skeleton leve, sem spinner agressivo |

**Conclusão do WebApp:** o escopo está bem definido e alinhado ao produto. O principal débito técnico é a confiabilidade da persistência e a precisão de cálculos financeiros. Com centavos inteiros, versionamento e testes de edge cases, o módulo fica pronto para evolução.

---

## 5. Auditoria de Qualidade de Código & Testes

### 5.1 Qualidade de código

| Critério | Status | Observações |
|---|---|---|
| TypeScript | ✅ 0 erros | Excelente sinal de maturidade |
| Tipagem de estado | ⚠️ | Garantir tipos fortes para store e persistência |
| Componentização | ✅ | Componentes separados por responsabilidade |
| Modularização da landing | ✅ | 10 seções em `src/components/landing/` |
| Utilitários | ✅ | `src/lib/` centraliza lógica |
| Store | ✅ | Zustand com persistência e validação Zod |
| Separação UI/lógica | ⚠️ | Manter cálculos fora de componentes visuais |
| Acessibilidade | ⚠️ | Testar teclado, foco e ARIA |
| Lint | ⚠️ | Recomendado ESLint + Prettier no CI |
| Build | ⚠️ | Validar `next build` sem warnings críticos |

### 5.2 Testes unitários com Vitest

Status reportado: **21/21 testes passando, 100% pass**.

| Área | Testes recomendados | Prioridade |
|---|---|---:|
| Design system | Tokens, cores, raios, sombras | Alta |
| Formatação de moeda | BRL, centavos, valores negativos | Alta |
| Cálculo de saldo | Receitas, despesas, saldo inicial | Alta |
| Insights felinos | Mensagens por personalidade e estado | Média |
| Cofrinhos | Progresso, conclusão, overfund | Alta |
| Persistência | Parse, fallback, migração | Alta |
| Datas | Agrupamento mensal, recorrência | Alta |
| Categorias | CRUD e validação | Média |
| Tutorial | Estado de onboarding | Baixa |

**Recomendação:** manter os 21 testes atuais e adicionar suíte de persistência e cálculos financeiros. Para produção, mirar em cobertura mínima de 80% em `src/lib` e `src/store`.

### 5.3 Testes E2E com Playwright

O projeto possui `tests-e2e/`, o que é positivo. Para um produto financeiro, E2E deve cobrir jornadas críticas.

| Jornada | Descrição | Prioridade |
|---|---|---:|
| Landing CTA | Usuário abre landing e clica em “Começar” | Alta |
| Onboarding | Tutorial aparece e pode ser concluído | Média |
| Editar saldo | Usuário abre modal, edita saldo e salva | Alta |
| Adicionar transação | Usuário cria despesa/receita | Alta |
| Dashboard atualiza | Saldo e resumo mudam após transação | Alta |
| Criar cofrinho | Usuário cria meta | Alta |
| Depositar em cofrinho | Progresso atualiza | Alta |
| Trocar personalidade | Personalidade persiste após reload | Média |
| Persistência | Dados permanecem após recarregar | Alta |
| Storage corrompido | App recupera com fallback seguro | Média |
| PWA | Manifest e service worker registrados | Baixa |

### 5.4 Pipeline de qualidade recomendado

| Estágio | Comando/verificação | Bloqueante |
|---|---|---:|
| Typecheck | `tsc --noEmit` | Sim |
| Lint | ESLint | Sim |
| Unit tests | Vitest | Sim |
| E2E | Playwright | Sim para release |
| Build | `next build` | Sim |
| Lighthouse | Performance, A11y, SEO, PWA | Não inicialmente |
| Visual regression | Playwright screenshots ou Chromatic | Opcional |

### 5.5 Métricas de qualidade recomendadas

| Métrica | Meta |
|---|---:|
| Testes unitários | 100% pass |
| Cobertura em `lib` | ≥ 80% |
| Cobertura em `store` | ≥ 75% |
| Erros TypeScript | 0 |
| Build | Sem erros |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse PWA | ≥ 90 quando aplicável |

**Conclusão de qualidade:** o projeto está acima da média para case pessoal. O próximo passo é transformar testes verdes em confiança de produção com E2E de jornada, testes de persistência e gates de CI.

---

## 6. Matriz de Riscos & Débitos Técnicos

### 6.1 Riscos de alta severidade

| Risco | Impacto | Evidência | Mitigação | Prazo |
|---|---|---|---|---|
| Perda de dados financeiros | Usuário perde saldo/transações | LocalStorage como fonte principal | Versionamento, backup, export/import, validação Zod | P0 |
| Storage corrompido | App quebra ao carregar | Parse sem fallback robusto | Schema Zod + fallback seguro + chave corrompida | P0 |
| Cálculo com float | Erros de arredondamento financeiro | Possível uso de números decimais | Armazenar em centavos inteiros | P0 |
| Service Worker stale cache | Usuário vê versão quebrada antiga | `sw.js` sem versionamento claro | Cache versionado, skipWaiting controlado | P0 |
| Modal de saldo inacessível | Usuário não consegue editar saldo | Falta de focus trap/ARIA | Implementar dialog acessível | P0 |
| Sem backup/sync | Produto inviável para uso real prolongado | Dados apenas locais | Exportar JSON/CSV e planejar backend | P0/P1 |

### 6.2 Riscos de média severidade

| Risco | Impacto | Evidência | Mitigação | Prazo |
|---|---|---|---|---|
| Hidratação inconsistente | UI pisca ou mostra estado errado | Persistência client-side | `hasHydrated` flag e skeleton | P1 |
| Falta de analytics | Não há dados de conversão | Landing sem tracking | Eventos de CTA, scroll e ativação | P1 |
| SEO incompleto | Menor descoberta | Metadata/OG não auditados | Metadata API, OG, sitemap, JSON-LD | P1 |
| Testes E2E insuficientes | Regressões em fluxo crítico | Playwright presente, mas escopo incerto | Cobrir jornadas críticas | P1 |
| Acessibilidade parcial | Exclusão de usuários | Modais e formulários | Auditoria WCAG 2.2 AA | P1 |
| PWA offline frágil | Experiência ruim sem rede | SW simples | Offline fallback e cache estratégico | P1 |
| Recorrência financeira | Duplicação ou datas erradas | RecurrenceRunner | Testes de datas e instâncias | P1 |
| Personalidade sem conteúdo | Diferencial vira decoração | Mensagens podem ser genéricas | Sistema de conteúdo por estado | P1 |

### 6.3 Riscos de baixa severidade

| Risco | Impacto | Evidência | Mitigação | Prazo |
|---|---|---|---|---|
| Copy não validada | Conversão menor | Textos podem precisar refinamento | Teste A/B e revisão de UX writing | P2 |
| Falta de dark mode | Menos alcance visual | Paleta apenas clara | Tokens semânticos para tema escuro | P2 |
| Dual preview desatualizado | Validação visual incorreta | `dual-preview.html` manual | Gerar preview via build/storybook | P2 |
| `llms.txt` desatualizado | Informação para agentes desatualizada | Arquivo presente | Manter como documentação viva | P2 |
| Ícones inconsistentes | Ruído visual | Possível mistura de estilos | Biblioteca única de ícones | P2 |
| Falta de Storybook | Componentes sem catálogo | Projeto cresce | Storybook ou página de design tokens | P2 |

### 6.4 Débitos técnicos priorizados

| Débito | Severidade | Esforço | Valor |
|---|---:|---:|---:|
| Versionamento de LocalStorage | Alta | Médio | Alto |
| Dinheiro em centavos | Alta | Médio | Alto |
| Acessibilidade de modais | Alta | Baixo/Médio | Alto |
| Service Worker versionado | Alta | Médio | Alto |
| Export/import de dados | Alta | Médio | Alto |
| Analytics de conversão | Média | Baixo | Alto |
| E2E de jornadas críticas | Média | Médio | Alto |
| SEO metadata completo | Média | Baixo | Médio |
| Testes de datas/recorrência | Média | Médio | Alto |
| Storybook/design tokens | Baixa | Médio | Médio |

---

## 7. Próximos Passos e Plano de Ação Recomendado

O plano abaixo prioriza estabilidade de dados, acessibilidade, conversão mensurável e evolução para produto real.

### 7.1 P0 — Estabilidade e produção segura (0–7 dias)

| Ação | Entregável | Critério de aceite |
|---|---|---|
| Versionar persistência | `meowney:v1` com schema Zod | Storage antigo migra ou cai em fallback seguro |
| Implementar fallback de storage | Estado limpo se parse falhar | App não quebra com JSON inválido |
| Dinheiro em centavos | `amountCents` em transações/saldo | Nenhum cálculo usa float decimal |
| Acessibilidade do modal | Focus trap, ESC, ARIA | Modal navegável por teclado |
| Service Worker seguro | Cache versionado | Atualização não deixa usuário em versão quebrada |
| CI básico | Typecheck, lint, Vitest, build | Pipeline bloqueia release com erro |
| E2E crítico | Landing CTA, saldo, transação, cofrinho | Fluxos principais passando |
| Exportar dados | JSON ou CSV | Usuário consegue baixar dados |

### 7.2 P1 — Produto confiável e mensurável (7–30 dias)

| Ação | Entregável | Critério de aceite |
|---|---|---|
| Analytics | Eventos de CTA, ativação e retenção | Dashboard de métricas mínimo |
| SEO completo | Metadata, OG, sitemap, JSON-LD | Lighthouse SEO ≥ 95 |
| Importar dados | Restauração de backup | Usuário importa JSON/CSV com validação |
| Testes de persistência | Vitest para parse/migração | Cobertura de edge cases |
| Testes de recorrência | RecurrenceRunner validado | Sem duplicação de transações |
| Acessibilidade WCAG | Contraste, labels, teclado | Lighthouse A11y ≥ 95 |
| Empty states | Onboarding e estados vazios | Usuário sempre vê próximo passo |
| Personalidade dinâmica | Mensagens por estado financeiro | Gato reage a saldo, gastos e metas |

### 7.3 P2 — Escala e diferenciação (30–90 dias)

| Ação | Entregável | Critério de aceite |
|---|---|---|
| Backend opcional | Auth e sync | Usuário pode usar local ou conta |
| Multi-device | Sincronização de dados | Dados consistentes entre dispositivos |
| Dark mode kawaii | Tema escuro pastel | Tokens semânticos funcionando |
| Storybook | Catálogo de componentes | Componentes documentados |
| Visual regression | Screenshots E2E | Regressões visuais detectadas |
| A/B testing | Headline, CTA, pricing | Experimentos mensuráveis |
| i18n | pt-BR e en-US | Landing e app traduzíveis |
| Insights avançados | Relatórios por categoria/mês | Gato entrega valor financeiro real |

### 7.4 Roadmap recomendado por impacto

| Prioridade | Iniciativa | Impacto técnico | Impacto de produto |
|---:|---|---:|---:|
| 1 | Persistência versionada | Alto | Alto |
| 2 | Dinheiro em centavos | Alto | Alto |
| 3 | Acessibilidade de modais | Médio | Alto |
| 4 | E2E de jornadas críticas | Alto | Alto |
| 5 | Export/import | Médio | Alto |
| 6 | Analytics | Médio | Alto |
| 7 | SEO/OpenGraph | Médio | Médio |
| 8 | PWA offline | Médio | Médio |
| 9 | Backend/sync | Alto | Alto |
| 10 | Dark mode/Storybook | Baixo | Médio |

### 7.5 KPIs recomendados

| KPI | Meta inicial |
|---|---:|
| CTA click rate na landing | ≥ 20% |
| Scroll depth até LiveHeroPhone | ≥ 60% |
| Ativação: primeira transação criada | ≥ 40% |
| Cofrinho criado em D0 | ≥ 25% |
| Retenção D7 | ≥ 15–20% |
| Testes unitários | 100% pass |
| Cobertura em `lib/store` | ≥ 80% |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Erros de runtime em produção | < 0,5% sessões |

### 7.6 Definition of Done para próxima release

A próxima release pode ser considerada pronta quando:

1. TypeScript permanecer com 0 erros.
2. Vitest permanecer com 21/21 passando e novos testes de persistência/cálculo adicionados.
3. Playwright cobrir criação de transação, edição de saldo, cofrinho e persistência após reload.
4. LocalStorage tiver versão, validação Zod, fallback e exportação.
5. Modal de saldo estiver acessível por teclado.
6. Service Worker tiver cache versionado e atualização segura.
7. Landing tiver metadata, OpenGraph e CTA rastreável.
8. Dashboard calcular saldo corretamente usando centavos.
9. Personalidade felina persistir e reagir ao estado financeiro.
10. Não houver fake data, fake testimonials ou copy genérica na landing.

---

## Conclusão Final

O Meowney é um projeto forte, com identidade visual diferenciada, arquitetura coerente e qualidade técnica acima da média para case pessoal. O design system Stitch Kawaii é consistente, a landing page tem estrutura de conversão SaaS e o WebApp possui funcionalidades suficientes para demonstrar valor real.

O principal ponto de atenção é a transição de demonstração para produto real. Para isso, as prioridades absolutas são:

1. Proteger dados financeiros com versionamento, validação e backup.
2. Garantir precisão monetária com centavos inteiros.
3. Tornar modais e formulários acessíveis.
4. Medir conversão e ativação.
5. Expandir testes E2E para jornadas críticas.

Com essas correções, o Meowney deixa de ser apenas um case visualmente atraente e passa a ser um produto SaaS kawaii com base técnica confiável, potencial de retenção emocional e narrativa forte de portfólio.