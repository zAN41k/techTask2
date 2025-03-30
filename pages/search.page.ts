import { expect, Locator, Page } from '@playwright/test';

export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchInputIcone: Locator;
    readonly searchInputText: Locator;
    readonly searchResultReleaseNotes: Locator;
    readonly searchResultVersion: Locator;
    readonly searchResultSupportedLanguages: Locator;
    readonly searchResultVsCode: Locator;
    readonly searchResultCanaryRelease: Locator;
    readonly searchResultTotal: Locator;
    readonly selectSearch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', {name: 'Search'});
        this.searchInputIcone = page.locator('#docsearch-label');
        //this.searchInputText = page.getByRole('searchbox', {name: 'Search'});
        this.searchResultReleaseNotes = page.getByRole('link', {
            name: 'Release notes',
            exact: true,
        });
        this.searchResultVersion = page.getByRole('link', {
            name: 'Version 1.51 Release notes',
        });
        this.searchResultSupportedLanguages = page.getByRole('link', {
            name: 'Supported languages',
        });
        this.searchResultVsCode = page.getByRole('link', {
            name: 'Getting started - VS Code',
        });
        this.searchResultCanaryRelease = page.getByRole('link', {
            name: 'Canary releases',
        });
        this.searchResultTotal = page.getByRole('link', {
            name: 'See all 459 results',
        });
        this.selectSearch = page.getByRole('link', {
            name: 'Release notes',
            exact: true,
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
        await expect(this.searchResultReleaseNotes).toBeVisible();
        await expect(this.searchResultReleaseNotes).toHaveText(txt);
    }

    async verifysearchResultVersion(txt: string) {
        await expect(this.searchResultVersion).toBeVisible();
        await expect(this.searchResultVersion).toHaveText(txt);
    }

    async verifysearchResultSupportedLanguages(txt: string) {
        await expect(this.searchResultSupportedLanguages).toBeVisible();
        await expect(this.searchResultSupportedLanguages).toHaveText(txt);
    }

    async verifysearchResultVsCode(txt: string) {
        await expect(this.searchResultVsCode).toBeVisible();
        await expect(this.searchResultVsCode).toHaveText(txt);
    }

    async verifysearchResultCanaryRelease(txt: string) {
        await expect(this.searchResultCanaryRelease).toBeVisible();
        await expect(this.searchResultCanaryRelease).toHaveText(txt);
    }
    async verifysearchResultTotal(txt: string) {
        await expect(this.searchResultTotal).toBeVisible();
        await expect(this.searchResultTotal).toHaveText(txt);
    }

    async searchSelect() {
        await this.selectSearch.click();
    }
}
