# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: transactions.spec.ts >> Transactions Flow (Teste Supremo AAA) >> should add an income and an expense and update balance
- Location: tests-e2e\transactions.spec.ts:16:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/expenses/
Received string:  "http://localhost:3000/app/add"

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    8 × locator resolved to <html lang="pt-BR">…</html>
      - unexpected value "http://localhost:3000/app/add"
  - Test timeout of 30000ms exceeded.

```

```yaml
- banner:
  - img "Meowney Logo"
  - text: Nova Transação
  - img "Profile"
- main:
  - button "Gasto (-)"
  - button "Renda (+)"
  - text: Valor Gasto R$
  - spinbutton "0,00": "50"
  - button "restaurant Comida"
  - button "medical_services Saúde"
  - button "sports_esports Lazer"
  - button "home Casa"
  - text: calendar_today Data e Hora
  - textbox: 2026-08-05T18:43
  - text: edit_note Nota
  - textbox "O que o gatinho comprou?": Ração de teste
  - button "pets Purr-chase"
- navigation:
  - link "pets Início":
    - /url: /app
  - link "receipt_long Gastos":
    - /url: /app/expenses
  - link "stars Metas":
    - /url: /app/goals
  - link "account_circle Perfil":
    - /url: /app/profile
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Transactions Flow (Teste Supremo AAA)', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Navigate to a blank page on the domain to set localStorage safely
  6  |     await page.goto('/');
  7  |     await page.evaluate(() => {
  8  |       window.localStorage.setItem('hasSeenTutorial', 'true');
  9  |       window.localStorage.setItem('meowney-storage', JSON.stringify({
  10 |         state: { balance: 0, transactions: [], goals: [], categories: [], hasSeenTutorial: true, isHydrated: true },
  11 |         version: 0
  12 |       }));
  13 |     });
  14 |   });
  15 | 
  16 |   test('should add an income and an expense and update balance', async ({ page }) => {
  17 |     // 1. Arrange & Act: Visit app
  18 |     await page.goto('/app');
  19 |     
  20 |     // 2. Assert: Starting balance is 0
  21 |     await expect(page.getByTestId('dashboard-balance')).toContainText('0,00');
  22 | 
  23 |     // 3. Act: Go to Add page
  24 |     await page.goto('/app/add');
  25 | 
  26 |     // 4. Act: Add Income
  27 |     await page.getByTestId('income-tab').click();
  28 |     await page.getByTestId('amount-input').fill('500');
  29 |     await page.getByTestId('note-input').fill('Salário de teste');
  30 |     await page.getByTestId('submit-btn').click();
  31 | 
  32 |     // 5. Assert: Redirected to Expenses
  33 |     await expect(page).toHaveURL(/\/app\/expenses/);
  34 |     
  35 |     // 6. Act: Go back to Dashboard
  36 |     await page.goto('/app'); 
  37 |     
  38 |     // 7. Assert: Balance updated to 500
  39 |     await expect(page.getByTestId('dashboard-balance')).toContainText('500');
  40 | 
  41 |     // 8. Act: Add Expense
  42 |     await page.goto('/app/add');
  43 |     await page.getByTestId('expense-tab').click();
  44 |     await page.getByTestId('amount-input').fill('50');
  45 |     await page.getByTestId('note-input').fill('Ração de teste');
  46 |     await page.getByTestId('submit-btn').click();
> 47 |     await expect(page).toHaveURL(/\/app\/expenses/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  48 | 
  49 |     // 9. Assert: Final balance is 450
  50 |     await page.goto('/app');
  51 |     await expect(page.getByTestId('dashboard-balance')).toContainText('450');
  52 |   });
  53 | });
  54 | 
```