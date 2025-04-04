import {expect, Locator, Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly gitHubLink: Locator;
    readonly discordLink: Locator;
    readonly searchButton: Locator;
    readonly baseURL = 'https://playwright.dev';

    constructor(page: Page) {
        this.page = page;
        this.gitHubLink = page.getByRole('link', {name: 'GitHub repository'});
        this.discordLink = page.getByRole('link', {name: 'Discord server'});
        this.searchButton = page.getByLabel('Search');
    }

    async verifyHomePage() {
        await expect(this.page).toHaveTitle(/Playwright/);
        await expect(this.page).toHaveURL(this.baseURL);
    }

    async verifygitHubLink() {
        await this.gitHubLink.click();
    }

    async verifygitHubIcon() {
        await expect(this.gitHubLink).toBeVisible();
    }

    async verifyDiscordLink() {
        await expect(this.discordLink).toBeVisible();
    }
    async clickDiscordLink() {
        await this.discordLink.click();
    }

    async verifysearchButton() {
        try {
            await expect(this.searchButton).toBeVisible();
            await this.searchButton.click();
        } catch (error) {
            throw new Error(`Failed to click search button: ${error.message}`);
        }
    }
}
