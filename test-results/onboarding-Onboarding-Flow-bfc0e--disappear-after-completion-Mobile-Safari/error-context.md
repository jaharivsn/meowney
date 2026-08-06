# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: onboarding.spec.ts >> Onboarding Flow (Teste Supremo AAA) >> should show tutorial on first visit and disappear after completion
- Location: tests-e2e\onboarding.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.reload: Test timeout of 30000ms exceeded.
Call log:
  - waiting for navigation until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - img "Meowney Logo" [ref=e6]
        - generic [ref=e7]: Dashboard
      - img "Profile" [ref=e9] [cursor=pointer]
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]:
            - paragraph [ref=e15]: Saldo Purr-feito
            - button "Editar saldo" [ref=e16]:
              - generic [ref=e17]: edit
              - text: Editar
          - 'button "Saldo atual: R$ 1.000,00. Clique para editar." [ref=e18] [cursor=pointer]':
            - generic [ref=e19]: R$
            - text: "1.000"
            - generic [ref=e20]: ",00"
          - generic [ref=e21]:
            - generic [ref=e22]: trending_up
            - paragraph [ref=e25]: Com base em suas transações reais 🐾
        - generic: pets
      - generic [ref=e26]:
        - generic [ref=e27]:
          - generic [ref=e28]:
            - generic [ref=e29]: shopping_basket
            - generic [ref=e30]: Gastos (Mês)
          - paragraph [ref=e31]: R$ 0,00
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: savings
            - generic [ref=e36]: Cat-Stashes
          - paragraph [ref=e37]: 0 Ativas
      - generic [ref=e40]:
        - generic [ref=e41]:
          - heading "Purr-formance" [level=3] [ref=e42]
          - generic [ref=e43]: Últimos 7 Dias
        - generic [ref=e44]:
          - generic "R$ 0.00" [ref=e45]
          - generic "R$ 0.00" [ref=e46]
          - generic "R$ 0.00" [ref=e47]
          - generic "R$ 0.00" [ref=e48]
          - generic "R$ 0.00" [ref=e49]
          - generic "R$ 0.00" [ref=e50]
          - generic "R$ 0.00" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]: Q
          - generic [ref=e54]: S
          - generic [ref=e55]: S
          - generic [ref=e56]: D
          - generic [ref=e57]: S
          - generic [ref=e58]: T
          - generic [ref=e59]: Q
      - generic [ref=e60]:
        - generic [ref=e61]:
          - heading "Rações Recentes" [level=3] [ref=e62]
          - link "Ver Tudo" [ref=e63]:
            - /url: /app/expenses
        - generic [ref=e65]:
          - generic [ref=e66]: pets
          - paragraph [ref=e68]: Nenhum gasto registrado ainda! Clique no + de patinha para adicionar 🐾
      - generic [ref=e69]:
        - generic [ref=e70]: lightbulb
        - paragraph [ref=e72]: Economia Nyan-tástica!
        - paragraph [ref=e73]: Crie sua primeira meta na aba 'Metas' para acompanhar seus objetivos com facilidade! 🐱💰
      - link "Adicionar transação" [ref=e75]:
        - /url: /app/add
        - generic [ref=e76]: pets
  - navigation [ref=e78]:
    - generic [ref=e79]:
      - link "pets Início" [ref=e80]:
        - /url: /app
        - generic [ref=e81]: pets
        - generic [ref=e82]: Início
      - link "receipt_long Gastos" [ref=e83]:
        - /url: /app/expenses
        - generic [ref=e84]: receipt_long
        - generic [ref=e85]: Gastos
      - link "stars Metas" [ref=e86]:
        - /url: /app/goals
        - generic [ref=e87]: stars
        - generic [ref=e88]: Metas
      - link "account_circle Perfil" [ref=e89]:
        - /url: /app/profile
        - generic [ref=e90]: account_circle
        - generic [ref=e91]: Perfil
  - button "Open Next.js Dev Tools" [ref=e97] [cursor=pointer]
  - alert [ref=e103]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Onboarding Flow (Teste Supremo AAA)', () => {
  4  |   test('should show tutorial on first visit and disappear after completion', async ({ page }) => {
  5  |     // 1. Arrange: Set storage state BEFORE navigation
  6  |     await page.addInitScript(() => {
  7  |       if (!window.localStorage.getItem('meowney-storage')) {
  8  |         window.localStorage.setItem('meowney-storage', JSON.stringify({
  9  |           state: {
  10 |             balance: 1000,
  11 |             expenses: [],
  12 |             goals: [],
  13 |             categories: [],
  14 |             hasSeenTutorial: false
  15 |           },
  16 |           version: 0
  17 |         }));
  18 |         window.localStorage.removeItem('hasSeenTutorial');
  19 |       }
  20 |     });
  21 | 
  22 |     // 2. Act: Visit app
  23 |     await page.goto('/app');
  24 | 
  25 |     // 3. Assert: Modal is visible
  26 |     const modalTitle = page.getByTestId('onboarding-title');
  27 |     await expect(modalTitle).toBeVisible({ timeout: 15000 });
  28 | 
  29 |     // 4. Act: Go through the steps
  30 |     // Step 1: Welcome
  31 |     await page.getByTestId('onboarding-next-btn').click();
  32 |     // Step 2: Register
  33 |     await page.getByTestId('onboarding-next-btn').click();
  34 |     // Step 3: Goals
  35 |     await page.getByTestId('onboarding-next-btn').click();
  36 |     // Step 4: Finish (Começar!)
  37 |     await page.getByTestId('onboarding-next-btn').click();
  38 | 
  39 |     // 5. Assert: Modal is gone
  40 |     await expect(modalTitle).toBeHidden();
  41 | 
  42 |     // 6. Act: Refresh
> 43 |     await page.reload();
     |                ^ Error: page.reload: Test timeout of 30000ms exceeded.
  44 |     
  45 |     // 7. Assert: It doesn't come back
  46 |     await expect(page.getByTestId('onboarding-title')).toBeHidden();
  47 |   });
  48 | });
  49 | 
```