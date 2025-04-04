import {expect, Page} from '@playwright/test';

export class DiscordPage {
    readonly page: Page;
    private readonly expectedTitle = 'Playwright - Discord Servers';
    private readonly expectedURL =
        'https://discord.com/servers/playwright-807756831384403968';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Verifies Discord page is loaded correctly
     */
    async verifyDiscordPage() {
        await this.page.waitForLoadState();
        await expect(this.page).toHaveTitle(this.expectedTitle);
        await expect(this.page).toHaveURL(this.expectedURL);
    }
}
