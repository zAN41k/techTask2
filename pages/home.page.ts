import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeUrl: Locator;
    readonly gitHubLink: Locator;
    readonly discordLink: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.gitHubLink = page.getByRole('link', {name: 'GitHub repository'});
        this.discordLink = page.getByRole('link', {name: 'Discord server'});
        this.searchButton = page.getByRole('button', {
            name: 'Search (Command+K)',
        });
    }

    async verifyHomePage() {
        await expect(this.page).toHaveTitle(/Playwright/);
        await expect(this.page).toHaveURL('https://playwright.dev/');
    }

    async verifygitHubLink() {
        await expect(this.gitHubLink).toBeVisible();
    }

    async verifyDiscordLink() {
        await expect(this.discordLink).toBeVisible();
    }

    async verifysearchButton() {
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
    }
}
