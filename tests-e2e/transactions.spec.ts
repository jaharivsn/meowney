import { test, expect } from '@playwright/test';

test.describe('Transactions Flow (Teste Supremo AAA)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a blank page on the domain to set localStorage safely
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.setItem('hasSeenTutorial', 'true');
      window.localStorage.setItem('meowney-storage', JSON.stringify({
        state: { balance: 0, transactions: [], goals: [], categories: [], hasSeenTutorial: true, isHydrated: true },
        version: 0
      }));
    });
  });

  test('should add an income and an expense and update balance', async ({ page }) => {
    // 1. Arrange & Act: Visit app
    await page.goto('/app');
    
    // 2. Assert: Starting balance is 0
    await expect(page.getByTestId('dashboard-balance')).toContainText('0,00');

    // 3. Act: Go to Add page
    await page.goto('/app/add');

    // 4. Act: Add Income
    await page.getByTestId('income-tab').click();
    await page.getByTestId('amount-input').fill('500');
    await page.getByTestId('note-input').fill('Salário de teste');
    await page.getByTestId('submit-btn').click();

    // 5. Assert: Redirected to Expenses
    await expect(page).toHaveURL(/\/app\/expenses/);
    
    // 6. Act: Go back to Dashboard
    await page.goto('/app'); 
    
    // 7. Assert: Balance updated to 500
    await expect(page.getByTestId('dashboard-balance')).toContainText('500');

    // 8. Act: Add Expense
    await page.goto('/app/add');
    await page.getByTestId('expense-tab').click();
    await page.getByTestId('amount-input').fill('50');
    await page.getByTestId('note-input').fill('Ração de teste');
    await page.getByTestId('submit-btn').click();

    // 9. Assert: Final balance is 450
    await page.goto('/app');
    await expect(page.getByTestId('dashboard-balance')).toContainText('450');
  });
});
