import { test } from '@playwright/test';

test('generate faithful mockup', async ({ page }) => {
  await page.goto('http://localhost:3000/app');
  await page.evaluate(() => {
    window.localStorage.setItem('hasSeenTutorial', 'true');
    window.localStorage.setItem('meowney-storage', JSON.stringify({
      state: {
        balance: 2350.00,
        hasSeenTutorial: true,
        isHydrated: true,
        categories: [],
        transactions: [],
        goals: []
      },
      version: 0
    }));
  });

  // 1. Ir para a página de adição e criar uma receita
  await page.goto('http://localhost:3000/app/add');
  await page.waitForSelector('[data-testid="income-tab"]');
  await page.getByTestId('income-tab').click();
  await page.getByTestId('amount-input').fill('2350');
  await page.getByTestId('note-input').fill('Salário / Mesada');
  await page.getByTestId('submit-btn').click();
  await page.waitForURL('**/app/expenses');

  // 2. Criar um gasto
  await page.goto('http://localhost:3000/app/add');
  await page.waitForSelector('[data-testid="expense-tab"]');
  await page.getByTestId('expense-tab').click();
  await page.getByTestId('amount-input').fill('150');
  await page.getByTestId('note-input').fill('Petiscos de Salmão');
  await page.getByTestId('submit-btn').click();
  await page.waitForURL('**/app/expenses');

  // 3. Criar uma meta no Stash
  await page.goto('http://localhost:3000/app/goals');
  await page.waitForTimeout(500);

  // Take Dashboard Mobile Screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/app');
  await page.waitForSelector('[data-testid="dashboard-balance"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/hero-mockup-dashboard.png' });

  // Take Dashboard Desktop Screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/app');
  await page.waitForSelector('[data-testid="dashboard-balance"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'public/hero-mockup-desktop.png' });

  // Take Add Screen Screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/app/add');
  await page.waitForSelector('[data-testid="amount-input"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'public/add-mockup.png' });

  // Take Goals Screen Screenshot
  await page.goto('http://localhost:3000/app/goals');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'public/goals-mockup.png' });

  // Take Profile Screen Screenshot
  await page.goto('http://localhost:3000/app/profile');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'public/profile-mockup.png' });
});