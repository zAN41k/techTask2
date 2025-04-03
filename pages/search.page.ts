import {expect, Locator, Page} from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchInputIcone: Locator;
    readonly searchInputText: Locator;
    readonly searchResultReleaseNotes: Locator;
    readonly selectSearch: Locator;
    readonly searchHitMessage: Locator;
    readonly searchHitTitle: Locator;
    readonly searchCrossRemoveFrom: Locator;
    readonly searchAddToFavorite: Locator;
    readonly searchRemoveFromFavorite: Locator;
    readonly searchFavoriteHitMessage: Locator;
    readonly noResentSearches: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', {name: 'Search'});
        this.searchInputIcone = page.locator('#docsearch-label');
        this.searchResultReleaseNotes = page.getByRole('link', {
            name: 'Release notes',
            exact: true,
        });

        this.selectSearch = page.getByRole('link', {
            name: 'Release notes',
            exact: true,
        });
        this.searchHitMessage = page.locator('.DocSearch-Hit-source').first();
        this.searchHitTitle = page.locator('.DocSearch-Hit-title', {
            hasText: 'Release notes',
        });
        this.searchCrossRemoveFrom = page.getByRole('button', {
            name: 'Remove this search from',
        });
        this.searchAddToFavorite = page.getByRole('button', {
            name: 'Save this search',
        });
        this.searchRemoveFromFavorite = page.locator(
            '[title="Remove this search from history"]',
        );
        this.searchFavoriteHitMessage = page.locator('.DocSearch-Hit-source');
        this.noResentSearches = page.locator('.DocSearch-Help', {
            hasText: 'No recent searches',
        });
    }

    async verifySearchInput() {
        await expect(this.searchInput).toBeVisible();
    }
    async verifySearchInputIcone() {
        await expect(this.searchInputIcone).toBeVisible();
    }

    async inputTxt(txt: string) {
        await this.searchInput.fill(txt);
    }
    async verifysearchResultReleaseNotes(txt: string) {
        await this.searchResultReleaseNotes.waitFor({state: 'visible'});
        await expect(this.searchResultReleaseNotes).toBeVisible();
        await expect(this.searchResultReleaseNotes).toHaveText(txt);
    }

    async searchSelect() {
        await this.selectSearch.click();
    }

    async verifySearchHitMessage() {
        await expect(this.searchHitMessage).toBeVisible();
    }

    async verifyHitTitle(txt: string) {
        await expect(this.searchHitTitle).toBeVisible();
        await expect(this.searchHitTitle).toHaveText(txt);
    }

    async verifySearchDeleteFrom() {
        await expect(this.searchCrossRemoveFrom).toBeVisible();
    }

    async deleteFromFavorite() {
        await this.searchCrossRemoveFrom.click();
    }

    async verifyAddToFAvoriteIconeAndAdd() {
        await expect(this.searchAddToFavorite).toBeVisible();
        await this.searchAddToFavorite.click();
    }

    async verifyRemoveFromFavorite() {
        await expect(this.searchRemoveFromFavorite).toBeVisible();
    }

    async removeFromFavoriteQuerry() {
        await this.searchRemoveFromFavorite.click();
    }

    async verifyFavoriteMessage(txt: string) {
        await expect(this.searchFavoriteHitMessage).toHaveText(txt);
    }

    async verifyNoResentSearches() {
        await expect(this.noResentSearches).toHaveText('No recent searches');
    }

    async verifyLinksVisibility(links: {name: string; exact?: boolean}[]) {
        for (const link of links) {
            await expect(this.page.getByRole('link', link)).toBeVisible();
        }
    }
}
