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

    // 4. Act: pick personality then go through the steps
    await page.getByTestId("personality-cheerleader").click();
    await page.getByTestId("onboarding-next-btn").click();
    await page.getByTestId("onboarding-next-btn").click();
    await page.getByTestId("onboarding-next-btn").click();
    await page.getByTestId("onboarding-next-btn").click();
    await page.getByTestId("onboarding-next-btn").click();

    // 5. Assert: Modal is gone
    await expect(modalTitle).toBeHidden();

    // 6. Act: Refresh
    await page.reload();
    
    // 7. Assert: It doesn't come back
    await expect(page.getByTestId('onboarding-title')).toBeHidden();
  });
});
