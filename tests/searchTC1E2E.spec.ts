import {test} from '@playwright/test';

import {HomePage} from '../pages/home.page';
import {ReleaseNotes} from '../pages/releaseNotes.page';
import {SearchPage} from '../pages/search.page';
import {linksToVerify} from '../data/testData';

test.describe('End-to-End search flow', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;
    let releaseNotes: ReleaseNotes;
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        releaseNotes = new ReleaseNotes(page);
        await page.goto('/');
    });

    test('Search flow verify the search button , search result and search functionality', async ({
        page,
    }) => {
        await test.step('Verify we located on a main page where we can see the home page link, title, discord icon, gitHub icon, search', async () => {
            homePage.verifyHomePage();
            homePage.verifygitHubIcon();
            homePage.verifyDiscordLink();
            homePage.verifysearchButton();
        });

        await test.step('verify search funstionality we put docs and received proper data', async () => {
            searchPage.verifySearchInput();
            searchPage.verifySearchInputIcone();
            //verify search funstionality we put docs and received proper data
            searchPage.inputTxt('docs');
            await searchPage.verifyLinksVisibility(linksToVerify);
        });

        await test.step('verify search functionality we click to the release note and was redirected to another endpoint', async () => {
            searchPage.searchSelect();
            await page.waitForURL('**/release-notes');
            await releaseNotes.verifyReleaseNotePage('Release notes');
        });
    });
});
