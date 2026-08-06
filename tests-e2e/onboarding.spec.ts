import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow (Teste Supremo AAA)', () => {
  test('should show tutorial on first visit and disappear after completion', async ({ page }) => {
    // 1. Arrange: Set storage state BEFORE navigation
    await page.addInitScript(() => {
      if (!window.localStorage.getItem('meowney-storage')) {
        window.localStorage.setItem('meowney-storage', JSON.stringify({
          state: {
            balance: 1000,
            expenses: [],
            goals: [],
            categories: [],
            hasSeenTutorial: false
          },
          version: 0
        }));
        window.localStorage.removeItem('hasSeenTutorial');
      }
    });

    // 2. Act: Visit app
    await page.goto('/app');

    // 3. Assert: Modal is visible
    const modalTitle = page.getByTestId('onboarding-title');
    await expect(modalTitle).toBeVisible({ timeout: 15000 });

    // 4. Act: Go through the steps
    // Step 1: Welcome
    await page.getByTestId('onboarding-next-btn').click();
    // Step 2: Register
    await page.getByTestId('onboarding-next-btn').click();
    // Step 3: Goals
    await page.getByTestId('onboarding-next-btn').click();
    // Step 4: Finish (Começar!)
    await page.getByTestId('onboarding-next-btn').click();

    // 5. Assert: Modal is gone
    await expect(modalTitle).toBeHidden();

    // 6. Act: Refresh
    await page.reload();
    
    // 7. Assert: It doesn't come back
    await expect(page.getByTestId('onboarding-title')).toBeHidden();
  });
});
