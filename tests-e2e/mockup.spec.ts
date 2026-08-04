import { test } from '@playwright/test';

test('generate faithful mockup', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate(() => {
    window.localStorage.setItem('meowney-storage', JSON.stringify({
      state: {
        balance: 2350,
        hasSeenTutorial: true,
        isHydrated: true,
        categories: [
          { id: 'cat-1', label: 'Petiscos', type: 'expense', icon: 'set_meal' },
          { id: 'cat-2', label: 'Saúde', type: 'expense', icon: 'medical_services' },
          { id: 'cat-3', label: 'Mesada', type: 'income', icon: 'payments' }
        ],
        transactions: [
          { id: 't-1', amount: 150, type: 'expense', note: 'Petiscos de Salmão', categoryId: 'cat-1', date: new Date().toISOString() },
          { id: 't-2', amount: 350, type: 'expense', note: 'Consulta Vet', categoryId: 'cat-2', date: new Date().toISOString() },
          { id: 't-3', amount: 2850, type: 'income', note: 'Mesada', categoryId: 'cat-3', date: new Date().toISOString() }
        ],
        goals: [
          { id: 'g-1', name: 'Arranhador Torre', target: 500, current: 200, icon: 'pets' }
        ]
      },
      version: 0
    }));
  });
  await page.goto('/app');
  await page.waitForTimeout(1000);

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'public/hero-mockup-mobile.png' });

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'public/hero-mockup-tablet.png' });

  // Desktop
  await page.setViewportSize({ width: 1280, height: 832 });
  await page.screenshot({ path: 'public/hero-mockup-desktop.png' });
});