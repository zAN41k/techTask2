import {test} from '@playwright/test';

import {localStorageData} from '../data/localStorage';
import {HomePage} from '../pages/home.page';
import {SearchPage} from '../pages/search.page';
import {setLocalStorage} from '../utils/localStorageUtils';

test.describe('Search flow delete from favorites ', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        await setLocalStorage(page, {
            recentSearches: localStorageData.favoriteSearches,
        });
        await page.goto('/');
    });

    test('Delete a search query from favorites ', async () => {
        await test.step('Navigate to search button', async () => {
            homePage.verifysearchButton();
        });

        await test.step('verify we see a message in a Favorite Release notes have a cross delete button and delete from favorite', async () => {
            searchPage.verifyHitTitle('Release notes');
            searchPage.verifySearchDeleteFrom();
            searchPage.deleteFromFavorite();
        });

        await test.step('after we delete from favorite verify we dont have any favorite and see a message No recent searches', async () => {
            await searchPage.verifyNoResentSearches();
        });
    });
});
