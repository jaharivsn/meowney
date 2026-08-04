import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow (Teste Supremo AAA)', () => {
  test('should show tutorial on first visit and disappear after completion', async ({ page }) => {
    // 1. Arrange: Clear local storage explicitly
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.clear();
    });

    // 2. Act: Visit app
    await page.goto('/app');

    // 3. Assert: Modal is visible
    const modalTitle = page.getByTestId('onboarding-title');
    await expect(modalTitle).toBeVisible();

    // 4. Act: Go through the steps
    const nextBtn = page.getByTestId('onboarding-next-btn');
    
    // Passo 1 -> 2
    await nextBtn.click();
    // Passo 2 -> 3
    await nextBtn.click();
    // Passo 3 -> 4
    await nextBtn.click();
    
    // Finish (Começar!)
    await nextBtn.click();

    // 5. Assert: Modal is gone
    await expect(modalTitle).toBeHidden();

    // 6. Act: Refresh
    await page.reload();
    
    // 7. Assert: It doesn't come back
    await expect(page.getByTestId('onboarding-title')).toBeHidden();
  });
});
