import {expect, Page} from '@playwright/test';

export class Github {
    readonly page: Page;
    readonly expectedURL = 'https://github.com/microsoft/playwright';
    readonly expectedTitle =
        'GitHub - microsoft/playwright: Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API.';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Verifies Discord page is loaded correctly
     */
    async verifyGithubPage() {
        await this.page.waitForLoadState();
        await expect(this.page).toHaveTitle(this.expectedTitle);
        await expect(this.page).toHaveURL(this.expectedURL);
    }
}
