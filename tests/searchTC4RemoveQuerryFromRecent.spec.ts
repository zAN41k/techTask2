import {test} from '@playwright/test';

import {localStorageData} from '../data/localStorage';
import {HomePage} from '../pages/home.page';
import {SearchPage} from '../pages/search.page';
import {setLocalStorage} from '../utils/localStorageUtils';

test.describe('Search flow remove querry from recent ', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        await setLocalStorage(page, {
            recentSearches: localStorageData.recentSearches,
        });
        await page.goto('/');
    });

    test('Delete a search query from recent searches  ', async () => {
        await test.step('Navigate to search button', async () => {
            homePage.verifysearchButton();
        });
        await test.step('verify when we opened search we have a last resent search Release notes', async () => {
            searchPage.verifysearchResultReleaseNotes('Release notes');
        });
        await test.step('verify we have a button remove from favorite', async () => {
            searchPage.verifyRemoveFromFavorite();
            searchPage.removeFromFavoriteQuerry();
        });

        await test.step('verify we dont have any recent searches after we deleted', async () => {
            await searchPage.verifyNoResentSearches();
        });
    });
});
