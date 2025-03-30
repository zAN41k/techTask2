import { expect, test } from '@playwright/test';

import { HomePage } from '../pages/home.page';
import { ReleaseNotes } from '../pages/releaseNotes.page';
import { SearchPage } from '../pages/search.page';

test.describe('Search flow', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;
    let releaseNotes: ReleaseNotes;
    test.beforeEach(async ({page}) => {
        // Initialize page objects
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        releaseNotes = new ReleaseNotes(page);

        // Navigate to the home page
        await page.goto('/');
    });

    // test('End-to-End search flow', async ({page}) => {
    //     //const homePage = new HomePage(page);
    //     //const searchPage = new SearchPage(page);
    //     //const releaseNotes = new ReleaseNotes(page);

    //     await page.goto('/');
    //     homePage.verifyHomePage();
    //     homePage.verifygitHubLink();
    //     homePage.verifyDiscordLink();
    //     homePage.verifysearchButton();

    //     searchPage.verifySearchInput();
    //     searchPage.verifySearchInputIcone();
    //     searchPage.inputTxt('docs');
    //     searchPage.verifysearchResultReleaseNotes('Release notes');
    //     searchPage.verifysearchResultVersion('Version 1.51Release notes');
    //     searchPage.verifysearchResultSupportedLanguages('Supported languages');
    //     searchPage.verifysearchResultVsCode('Getting started - VS Code');
    //     searchPage.verifysearchResultCanaryRelease('Canary releases');
    //     searchPage.verifysearchResultTotal('See all 459 results');

    //     //click after search
    //     // await page
    //     //     .getByRole('link', {name: 'Release notes', exact: true})
    //     //     .click();
    //     //verify we on Release notes page
    //     searchPage.searchSelect();

    //     //await page.waitForTimeout(4000);
    //     page.getByRole('heading', {name: 'Release notes'});

    //     await expect(
    //         page.getByRole('heading', {name: 'Release notes'}),
    //     ).toHaveText('Release notes');
    //     //await page.waitForURL('**/release-notes'); // Waits until the URL changes

    //     //releaseNotes.verifyReleaseNotePage('Release notes');
    // });

    test('Adding a search query to favorites ', async ({page}) => {
        await page.addInitScript(() => {
            window.localStorage.setItem(
                '__DOCSEARCH_RECENT_SEARCHES__playwright-nodejs',
                JSON.stringify([
                    {
                        url: '/docs/release-notes',
                        content: null,
                        type: 'lvl1',
                        hierarchy: {
                            lvl0: 'Docs',
                            lvl1: 'Release notes',
                            lvl2: null,
                            lvl3: null,
                            lvl4: null,
                            lvl5: null,
                            lvl6: null,
                        },
                        objectID: '1-https://playwright.dev/docs/release-notes',
                        __docsearch_parent: null,
                        __autocomplete_id: 0,
                    },
                ]),
            );
        });

        await page.goto('/');
        await page.getByRole('button', {name: 'Search (Command+K)'}).click();
        //add to favorites
        //homePage.verifysearchButton();

        //recent
        page.locator('.DocSearch-Hit-source').first();
        await expect(
            page.locator('.DocSearch-Hit-source').first(),
        ).toBeVisible();
        // await expect(page.locator('.DocSearch-Hit-source').first()).toHaveText(
        //     'Recent',
        // );

        // release notes txt
        page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'});
        await expect(
            page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'}),
        ).toBeVisible();
        await expect(
            page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'}),
        ).toHaveText('Release notes');

        // Cross remove from favorite visible
        page.getByRole('button', {name: 'Remove this search from'});
        await expect(
            page.getByRole('button', {name: 'Remove this search from'}),
        ).toBeVisible();
        //add to fovorite
        page.getByRole('button', {name: 'Save this search'});
        await expect(
            page.getByRole('button', {name: 'Save this search'}),
        ).toBeVisible();

        await page.getByRole('button', {name: 'Save this search'}).click();
        //remove from favorite from history
        page.locator('[title="Remove this search from history"]');
        await expect(
            page.locator('[title="Remove this search from history"]'),
        ).toBeVisible();

        //after we added to favorite
        //verify textFavorite
        await expect(page.locator('.DocSearch-Hit-source')).toBeVisible();
        await expect(page.locator('.DocSearch-Hit-source')).toHaveText(
            'Favorite',
        );
        //await page.waitForTimeout(5000);
    });
});
