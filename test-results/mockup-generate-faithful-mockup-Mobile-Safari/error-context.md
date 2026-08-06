# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mockup.spec.ts >> generate faithful mockup
- Location: tests-e2e\mockup.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/app/goals", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - banner [ref=f2e2]:
    - generic [ref=f2e3]:
      - generic [ref=f2e4]:
        - img "Meowney Logo" [ref=f2e6]
        - generic [ref=f2e7]: Nova Transação
      - img "Profile" [ref=f2e9] [cursor=pointer]
  - main [ref=f2e10]:
    - generic [ref=f2e12]:
      - button "Gasto (-)" [ref=f2e13]
      - button "Renda (+)" [ref=f2e14]
    - generic [ref=f2e15]:
      - generic [ref=f2e16]:
        - generic [ref=f2e17]: Valor Gasto
        - generic [ref=f2e18]:
          - generic [ref=f2e19]: R$
          - spinbutton "0,00" [active] [ref=f2e20]
      - generic [ref=f2e22]:
        - button "restaurant Comida" [ref=f2e23]:
          - generic [ref=f2e24]: restaurant
          - generic [ref=f2e26]: Comida
        - button "medical_services Saúde" [ref=f2e27]:
          - generic [ref=f2e28]: medical_services
          - generic [ref=f2e30]: Saúde
        - button "sports_esports Lazer" [ref=f2e31]:
          - generic [ref=f2e32]: sports_esports
          - generic [ref=f2e34]: Lazer
        - button "home Casa" [ref=f2e35]:
          - generic [ref=f2e36]: home
          - generic [ref=f2e38]: Casa
      - generic [ref=f2e39]:
        - generic [ref=f2e41]:
          - generic [ref=f2e42]: calendar_today
          - generic [ref=f2e43]:
            - generic [ref=f2e44]: Data e Hora
            - textbox [ref=f2e45]: 2026-08-05T18:43
        - generic [ref=f2e46]:
          - generic [ref=f2e47]:
            - generic [ref=f2e48]: edit_note
            - text: Nota
          - textbox "O que o gatinho comprou?" [ref=f2e49]
      - button "pets Purr-chase" [ref=f2e51]:
        - generic [ref=f2e52]: pets
        - text: Purr-chase
  - navigation [ref=f2e53]:
    - generic [ref=f2e54]:
      - link "pets Início" [ref=f2e55]:
        - /url: /app
        - generic [ref=f2e56]: pets
        - generic [ref=f2e57]: Início
      - link "receipt_long Gastos" [ref=f2e58]:
        - /url: /app/expenses
        - generic [ref=f2e59]: receipt_long
        - generic [ref=f2e60]: Gastos
      - link "stars Metas" [ref=f2e61]:
        - /url: /app/goals
        - generic [ref=f2e62]: stars
        - generic [ref=f2e63]: Metas
      - link "account_circle Perfil" [ref=f2e64]:
        - /url: /app/profile
        - generic [ref=f2e65]: account_circle
        - generic [ref=f2e66]: Perfil
  - button "Open Next.js Dev Tools" [ref=f2e72] [cursor=pointer]
  - alert [ref=f2e78]
  - generic [ref=f2e80]:
    - generic [ref=f2e81]:
      - generic [ref=f2e82]: Passo 1 de 4
      - button "Fechar tutorial" [ref=f2e83]:
        - generic [ref=f2e84]: close
    - generic [ref=f2e86]:
      - generic [ref=f2e87]:
        - generic [ref=f2e88]: pets
        - generic [ref=f2e89]: 🐾
      - generic [ref=f2e90]:
        - heading "Bem-vindo ao Meowney! 🐱" [level=2] [ref=f2e91]
        - paragraph [ref=f2e92]: Seu controle financeiro kawaii
        - paragraph [ref=f2e93]: Controle seus gastos com uma experiência fofa, leve e altamente intuitiva. Acompanhe seu saldo e suas contas no ritmo do seu felino!
    - generic [ref=f2e94]:
      - generic [ref=f2e95]:
        - button "Ir para passo 1" [ref=f2e96]
        - button "Ir para passo 2" [ref=f2e97]
        - button "Ir para passo 3" [ref=f2e98]
        - button "Ir para passo 4" [ref=f2e99]
      - button "Próximo chevron_right" [ref=f2e101]:
        - generic [ref=f2e102]: Próximo
        - generic [ref=f2e103]: chevron_right
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | 
  3  | test('generate faithful mockup', async ({ page }) => {
  4  |   await page.setViewportSize({ width: 390, height: 844 });
  5  |   await page.goto('/');
  6  |   await page.evaluate(() => {
  7  |     window.localStorage.setItem('meowney-storage', JSON.stringify({
  8  |       state: {
  9  |         balance: 2350,
  10 |         hasSeenTutorial: true,
  11 |         isHydrated: true,
  12 |         categories: [
  13 |           { id: 'cat-1', label: 'Petiscos', type: 'expense', icon: 'set_meal' },
  14 |           { id: 'cat-2', label: 'Saúde', type: 'expense', icon: 'medical_services' },
  15 |           { id: 'cat-3', label: 'Mesada', type: 'income', icon: 'payments' }
  16 |         ],
  17 |         transactions: [
  18 |           { id: 't-1', amount: 150, type: 'expense', note: 'Petiscos de Salmão', categoryId: 'cat-1', date: new Date().toISOString() },
  19 |           { id: 't-2', amount: 350, type: 'expense', note: 'Consulta Vet', categoryId: 'cat-2', date: new Date().toISOString() },
  20 |           { id: 't-3', amount: 2850, type: 'income', note: 'Mesada', categoryId: 'cat-3', date: new Date().toISOString() }
  21 |         ],
  22 |         goals: [
  23 |           { id: 'g-1', name: 'Arranhador Torre', target: 500, current: 200, icon: 'pets' }
  24 |         ]
  25 |       },
  26 |       version: 0
  27 |     }));
  28 |   });
  29 |   await page.goto('/app');
  30 |   await page.waitForTimeout(1000);
  31 | 
  32 |   // Hero Mobile
  33 |   await page.setViewportSize({ width: 390, height: 844 });
  34 |   await page.screenshot({ path: 'public/hero-mockup-mobile.png' });
  35 | 
  36 |   // Add Screen
  37 |   await page.goto('/app/add');
  38 |   await page.waitForTimeout(1000);
  39 |   await page.screenshot({ path: 'public/add-mockup.png' });
  40 | 
  41 |   // Goals Screen
> 42 |   await page.goto('/app/goals');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  43 |   await page.waitForTimeout(1000);
  44 |   await page.screenshot({ path: 'public/goals-mockup.png' });
  45 | 
  46 |   // Profile Screen
  47 |   await page.goto('/app/profile');
  48 |   await page.waitForTimeout(1000);
  49 |   await page.screenshot({ path: 'public/profile-mockup.png' });
  50 | });
```