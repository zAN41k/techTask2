import {expect, Locator, Page} from '@playwright/test';

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
        // this.searchButton = page.getByRole('button', {
        //     name: 'Search (Command+K)',
        // });
        this.searchButton = page.getByLabel('Search');
    }

    async verifyHomePage() {
        await expect(this.page).toHaveTitle(
            /Fast and reliable end-to-end testing for modern web apps | Playwright/,
        );
        await expect(this.page).toHaveURL('https://playwright.dev/');
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

    async verifysearchButton() {
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
    }
}
