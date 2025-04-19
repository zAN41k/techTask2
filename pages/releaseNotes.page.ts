import {expect, Locator, Page} from '@playwright/test';

export class ReleaseNotes {
    readonly page: Page;
    readonly releaseNotePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.releaseNotePage = page.getByRole('heading', {
            name: 'Release notes',
        });
    }

    async verifyReleaseNotePage(txt: string) {
        await expect(this.releaseNotePage).toContainText(txt);
    }
}
