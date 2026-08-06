---
name: teste-supremo
description: "Super skill unificada de QA e Testes. Você DEVE usar esta skill sempre que o usuário solicitar a criação de testes E2E, de integração, unitários ou mocks de API. Garante a entrega de testes confiáveis e não-flaky utilizando a stack Playwright e Vitest."
---

# Teste Supremo

A skill definitiva para Garantia de Qualidade. Testes ruins são piores do que não ter testes. Testes intermitentes (flaky tests) destroem a confiança da equipe. Esta skill foca em resiliência e estabilidade.

> Um teste E2E deve testar o comportamento do usuário e o valor de negócio, nunca os detalhes de implementação (como nomes de classes CSS).

---

## §1 — Filosofia Anti-Flaky

| Ban | Por quê | Alternativa |
|-----|---------|-------------|
| Seletores por `.classe` CSS ou hierarquia `div > span` | Qualquer refatoração de UI quebra o teste, mesmo que o botão continue funcionando. | Selecionar OBRIGATORIAMENTE por `data-testid`, Role, ou Texto visível (`getByRole`, `getByTestId`). |
| Depender de API externa real em testes unitários | Redes falham e endpoints saem do ar. | Usar o **MSW (Mock Service Worker)** para interceptar todas as requisições de rede. |
| Testar lógica pesada de backend no Playwright | Lento e frágil. | A lógica do backend testa-se com **Vitest** (Testes de Integração). Playwright (E2E) testa o Happy Path. |
| Waits explícitos (`waitForTimeout(5000)`) | Fica lento quando não precisa, e quebra quando a rede demora 5001ms. | Usar as asserções de auto-retry do Playwright (`await expect(locator).toBeVisible()`). |

---

## §2 — A Stack Suprema Padrão

*   **E2E (Ponta a Ponta)**: Playwright (Standard absoluto).
*   **Unitário e Integração**: Vitest (Mais rápido e moderno que o Jest).
*   **Mocking da Rede**: MSW (Mock Service Worker).

---

## §3 — Estrutura de Testes (Arrange, Act, Assert)

Todo teste deve, visual ou mentalmente, seguir o padrão AAA:
1. **Arrange (Preparar)**: Setup de mocks, inserção no banco de testes.
2. **Act (Agir)**: O clique do usuário, a chamada da função.
3. **Assert (Verificar)**: O que mudou? O DOM foi atualizado? O banco salvou?

---

## §4 — Sistema de Comandos

O usuário e você podem invocar estes comandos para acelerar o desenvolvimento:

| Comando | Descrição da Ação |
|---------|-------------------|
| `/test-plan [funcionalidade]` | Gera um plano de cobertura E2E + Unitário focado nas regras de negócio críticas e casos de borda antes de codar. |
| `/e2e-suite [fluxo]` | Cria um script robusto de Playwright para testar um fluxo ponta-a-ponta (ex: Login, Checkout). |
| `/mock-api` | Cria handlers do MSW para interceptar requisições e devolver respostas determinísticas (mockadas). |

**Como executar os comandos:** Ao ler estes comandos no prompt do usuário, mude imediatamente de "Modo Conversa" para "Modo Engenheiro de QA". Retorne o plano completo ou os arquivos de teste prontos.
