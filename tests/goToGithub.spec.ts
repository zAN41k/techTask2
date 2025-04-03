import { expect, test } from '@playwright/test';

test('Open gitHublink', async ({page}) => {
    await page.goto('/');
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', {name: 'GitHub repository'}).click();
    const gitHub = await page2Promise;

    await expect(gitHub).toHaveTitle(
        'GitHub - microsoft/playwright: Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API.',
    );
    await gitHub.waitForLoadState();
    await expect(gitHub).toHaveURL('https://github.com/microsoft/playwright');
});
