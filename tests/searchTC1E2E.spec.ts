//import {test} from '../fixtures/baseTest';
import {test} from '../fixtures/pages.fixture';

import {linksToVerify} from '../data/testData';

test.describe('End-to-End search flow', () => {
    test('Search flow verify the search button , search result and search functionality', async ({
        homePage,
        searchPage,
        releaseNotes,
        page,
    }) => {
        await test.step('Verify we located on a main page where we can see the home page link, title, discord icon, gitHub icon, search', async () => {
            await homePage.verifyMainPageElements();
        });

        await test.step('verify search funstionality we put docs and received proper data', async () => {
            await searchPage.verifySearchInput();
            await searchPage.verifySearchInputIcone();
            await searchPage.inputTxt('docs');
            await searchPage.verifyLinksVisibility(linksToVerify);
        });

        await test.step('verify search functionality we click to the release note and was redirected to another endpoint', async () => {
            searchPage.searchSelect();
            await page.waitForURL('**/release-notes');
            await releaseNotes.verifyReleaseNotePage('Release notes');
        });
    });
});
