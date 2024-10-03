import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  console.log(
    'Launching browser using Playwright and Chromium, performed once before the start of all test scenarios.'
  );
  browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
  console.log('Closing browser after all scenarios.');
  await browser.close();
});

Before(async () => {
  console.log('Launching new context and page before each individual test scenario.');
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

After(async ({ pickle, result }) => {
  console.log('Closing page after each scenario, result status:', result?.status);
  // Take a screenshot if the scenario failed
  if (result?.status === Status.FAILED) {
    await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png',
    });
  }

  await pageFixture.page.close();
  await context.close();
});
