import {test} from '@playwright/test';
import {HomePage} from '../pages/home.page';
import {DiscordPage} from '../pages/discord.page';

test.describe('Discord Navigation Tests', () => {
    test('Open Discord via Playwright.dev', async ({page}) => {
        const homePage = new HomePage(page);
        await page.goto('/');

        const page2Promise = page.waitForEvent('popup');
        await homePage.clickDiscordLink();
        const discordPopup = await page2Promise;

        const discordPage = new DiscordPage(discordPopup);
        await discordPage.verifyDiscordPage();
    });
});
