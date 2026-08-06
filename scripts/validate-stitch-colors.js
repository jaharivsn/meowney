const { chromium } = require('playwright');
const path = require('path');

const EXPECT = {
  background: 'rgb(252, 249, 248)',
  primary: 'rgb(134, 78, 90)',
  cream: 'rgb(255, 253, 208)',
};

async function sample(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const style = getComputedStyle(el);
    return {
      backgroundColor: style.backgroundColor,
      color: style.color,
    };
  }, selector);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  const results = { landing: {}, app: {}, ok: true, errors: [] };

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.resolve('stitch-exports/live-landing.png'), fullPage: false });

  const landingBody = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  results.landing.bodyBg = landingBody;
  if (landingBody !== EXPECT.background) {
    results.ok = false;
    results.errors.push(`Landing body bg: got ${landingBody}, want ${EXPECT.background}`);
  }

  const landingPrimary = await page.evaluate(() => {
    const el = document.querySelector('header a span:last-child, header a');
    return el ? getComputedStyle(el).color : null;
  });
  results.landing.logoColor = landingPrimary;
  if (landingPrimary !== EXPECT.primary) {
    results.ok = false;
    results.errors.push(`Landing logo color: got ${landingPrimary}, want ${EXPECT.primary}`);
  }

  await page.goto('http://localhost:3000/app', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.resolve('stitch-exports/live-dashboard.png'), fullPage: false });

  const appBody = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  results.app.bodyBg = appBody;
  if (appBody !== EXPECT.background) {
    results.ok = false;
    results.errors.push(`App body bg: got ${appBody}, want ${EXPECT.background}`);
  }

  const headerTitle = await sample(page, 'header span.font-headline-md');
  results.app.headerTitle = headerTitle?.color;
  if (headerTitle?.color !== EXPECT.primary) {
    results.ok = false;
    results.errors.push(`App header title: got ${headerTitle?.color}, want ${EXPECT.primary}`);
  }

  const creamCard = await sample(page, '.bg-cream-milk');
  results.app.creamCardBg = creamCard?.backgroundColor;
  if (creamCard?.backgroundColor !== EXPECT.cream) {
    results.ok = false;
    results.errors.push(`App cream card: got ${creamCard?.backgroundColor}, want ${EXPECT.cream}`);
  }

  await page.goto('http://localhost:3000/app/profile', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.resolve('stitch-exports/live-profile.png'), fullPage: false });

  const profileBody = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  results.profile = { bodyBg: profileBody };
  if (profileBody !== EXPECT.background) {
    results.ok = false;
    results.errors.push(`Profile body bg: got ${profileBody}, want ${EXPECT.background}`);
  }

  const profileCream = await sample(page, '.bg-cream-milk');
  results.profile.creamCardBg = profileCream?.backgroundColor;
  if (profileCream?.backgroundColor !== EXPECT.cream) {
    results.ok = false;
    results.errors.push(`Profile cream card: got ${profileCream?.backgroundColor}, want ${EXPECT.cream}`);
  }

  await page.goto('http://localhost:3000/app/goals', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.resolve('stitch-exports/live-goals.png'), fullPage: false });

  const goalsBody = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  results.goals = { bodyBg: goalsBody };
  if (goalsBody !== EXPECT.background) {
    results.ok = false;
    results.errors.push(`Goals body bg: got ${goalsBody}, want ${EXPECT.background}`);
  }

  const goalsPrimary = await sample(page, '.text-primary');
  results.goals.primaryColor = goalsPrimary?.color;
  if (goalsPrimary?.color !== EXPECT.primary) {
    results.ok = false;
    results.errors.push(`Goals primary text: got ${goalsPrimary?.color}, want ${EXPECT.primary}`);
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
  process.exit(results.ok ? 0 : 1);
})();
