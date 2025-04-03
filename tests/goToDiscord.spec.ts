import { expect, test } from '@playwright/test';

test('Open Discord via Playwright.dev ', async ({page}) => {
    await page.goto('/');
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('link', {name: 'Discord server'}).click();
    const discord = await page2Promise;

    await expect(discord).toHaveTitle('Playwright - Discord Servers');
    await discord.waitForLoadState();
    await expect(discord).toHaveURL(
        'https://discord.com/servers/playwright-807756831384403968',
    );
});
