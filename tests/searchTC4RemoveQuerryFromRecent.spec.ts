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
        homePage.verifysearchButton();
        //verify when we opened search we have a last resent search Release notes
        searchPage.verifysearchResultReleaseNotes('Release notes');
        //verify we have a button remove from favorite
        searchPage.verifyRemoveFromFavorite();
        searchPage.removeFromFavoriteQuerry();
        //verify we don't have any recent searches after we deleted
        await searchPage.verifyNoResentSearches();
    });
});
