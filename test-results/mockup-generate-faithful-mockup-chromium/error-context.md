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
  - navigating to "http://localhost:3000/app/profile", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=f4e1]:
  - banner [ref=f4e2]:
    - generic [ref=f4e3]:
      - generic [ref=f4e4]:
        - img "Meowney Logo" [ref=f4e6]
        - generic [ref=f4e7]: Perfil
      - img "Profile" [ref=f4e9] [cursor=pointer]
  - main [ref=f4e10]:
    - generic [ref=f4e11]:
      - generic [ref=f4e12]:
        - generic: pets
        - generic [ref=f4e13]:
          - img "Cat Parent Avatar" [ref=f4e15]
          - generic [ref=f4e16]:
            - generic [ref=f4e17]: 🐾
            - generic [ref=f4e18]: Membro Meowney
        - heading "Cat Parent" [level=1] [ref=f4e19]
        - paragraph [ref=f4e20]: Tutor Felino & Mestre do Orçamento
      - generic [ref=f4e21]:
        - button "replay Rever Tutorial Rever guia de primeiros passos do Meowney chevron_right" [ref=f4e22]:
          - generic [ref=f4e23]:
            - generic [ref=f4e24]: replay
            - generic [ref=f4e26]:
              - paragraph [ref=f4e27]: Rever Tutorial
              - paragraph [ref=f4e28]: Rever guia de primeiros passos do Meowney
          - generic [ref=f4e29]: chevron_right
        - link "mail Falar com Suporte jahari.wav@gmail.com open_in_new" [ref=f4e30] [cursor=pointer]:
          - /url: mailto:jahari.wav@gmail.com
          - generic [ref=f4e31]:
            - generic [ref=f4e32]: mail
            - generic [ref=f4e34]:
              - paragraph [ref=f4e35]: Falar com Suporte
              - paragraph [ref=f4e36]: jahari.wav@gmail.com
          - generic [ref=f4e37]: open_in_new
      - generic [ref=f4e38]:
        - generic [ref=f4e39]:
          - generic [ref=f4e40]: category
          - heading "Gerenciar Categorias" [level=2] [ref=f4e42]
        - generic [ref=f4e43]:
          - generic [ref=f4e45]:
            - generic [ref=f4e46]: payments
            - generic [ref=f4e47]:
              - paragraph [ref=f4e48]: Salário
              - paragraph [ref=f4e49]: Renda
          - generic [ref=f4e51]:
            - generic [ref=f4e52]: redeem
            - generic [ref=f4e53]:
              - paragraph [ref=f4e54]: Presente
              - paragraph [ref=f4e55]: Renda
          - generic [ref=f4e57]:
            - generic [ref=f4e58]: restaurant
            - generic [ref=f4e59]:
              - paragraph [ref=f4e60]: Comida
              - paragraph [ref=f4e61]: Gasto
          - generic [ref=f4e63]:
            - generic [ref=f4e64]: medical_services
            - generic [ref=f4e65]:
              - paragraph [ref=f4e66]: Saúde
              - paragraph [ref=f4e67]: Gasto
          - generic [ref=f4e69]:
            - generic [ref=f4e70]: sports_esports
            - generic [ref=f4e71]:
              - paragraph [ref=f4e72]: Lazer
              - paragraph [ref=f4e73]: Gasto
          - generic [ref=f4e75]:
            - generic [ref=f4e76]: home
            - generic [ref=f4e77]:
              - paragraph [ref=f4e78]: Casa
              - paragraph [ref=f4e79]: Gasto
        - generic [ref=f4e80]:
          - heading "Nova Categoria" [level=3] [ref=f4e81]
          - generic [ref=f4e82]:
            - 'textbox "Nome (ex: Salão, Petshop)" [ref=f4e83]'
            - generic [ref=f4e84]:
              - combobox [ref=f4e85]:
                - option "Gasto" [selected]
                - option "Renda"
              - button "Adicionar" [ref=f4e86]
      - generic [ref=f4e87]:
        - generic [ref=f4e88]:
          - generic [ref=f4e89]: help
          - generic [ref=f4e90]:
            - heading "Perguntas Frequentes (FAQ)" [level=2] [ref=f4e91]
            - paragraph [ref=f4e92]: Dúvidas comuns sobre o Meowney
        - generic [ref=f4e93]:
          - button "shield_lock Como o Meowney guarda meus dados? expand_more" [ref=f4e95]:
            - generic [ref=f4e96]:
              - generic [ref=f4e97]: shield_lock
              - generic [ref=f4e98]: Como o Meowney guarda meus dados?
            - generic [ref=f4e99]: expand_more
          - button "savings Como funcionam as Cat-Stashes? expand_more" [ref=f4e101]:
            - generic [ref=f4e102]:
              - generic [ref=f4e103]: savings
              - generic [ref=f4e104]: Como funcionam as Cat-Stashes?
            - generic [ref=f4e105]: expand_more
          - button "receipt_long O que acontece ao adicionar um gasto? expand_more" [ref=f4e107]:
            - generic [ref=f4e108]:
              - generic [ref=f4e109]: receipt_long
              - generic [ref=f4e110]: O que acontece ao adicionar um gasto?
            - generic [ref=f4e111]: expand_more
      - link "home Voltar para o Site Inicial" [ref=f4e113] [cursor=pointer]:
        - /url: /
        - generic [ref=f4e114]: home
        - text: Voltar para o Site Inicial
      - generic [ref=f4e115]:
        - generic [ref=f4e116]: pets
        - generic [ref=f4e117]: Meowney v2.4.1 • Edição Sakura 🐾
  - navigation [ref=f4e118]:
    - generic [ref=f4e119]:
      - link "pets Início" [ref=f4e120] [cursor=pointer]:
        - /url: /app
        - generic [ref=f4e121]: pets
        - generic [ref=f4e122]: Início
      - link "receipt_long Gastos" [ref=f4e123] [cursor=pointer]:
        - /url: /app/expenses
        - generic [ref=f4e124]: receipt_long
        - generic [ref=f4e125]: Gastos
      - link "stars Metas" [ref=f4e126] [cursor=pointer]:
        - /url: /app/goals
        - generic [ref=f4e127]: stars
        - generic [ref=f4e128]: Metas
      - link "account_circle Perfil" [ref=f4e129] [cursor=pointer]:
        - /url: /app/profile
        - generic [ref=f4e130]: account_circle
        - generic [ref=f4e131]: Perfil
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
  42 |   await page.goto('/app/goals');
  43 |   await page.waitForTimeout(1000);
  44 |   await page.screenshot({ path: 'public/goals-mockup.png' });
  45 | 
  46 |   // Profile Screen
> 47 |   await page.goto('/app/profile');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  48 |   await page.waitForTimeout(1000);
  49 |   await page.screenshot({ path: 'public/profile-mockup.png' });
  50 | });
```