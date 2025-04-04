import {test} from '@playwright/test';

import {localStorageData} from '../data/localStorage';
import {SearchPage} from '../pages/search.page';
import {setLocalStorage} from '../utils/localStorageUtils';
import {HomePage} from '../pages/home.page';

test.describe('Adding a search query to favorites ', () => {
    let searchPage: SearchPage;
    let homePage: HomePage;
    test.beforeEach(async ({page}) => {
        searchPage = new SearchPage(page);
        homePage = new HomePage(page);
        await setLocalStorage(page, {
            recentSearches: localStorageData.recentSearches,
        });
        await page.goto('/');
    });

    test('Adding a search query to favorites and verify additional information ', async ({
        page,
    }) => {
        await test.step('open search button in palywright.dev', async () => {
            homePage.verifysearchButton();
        });
        await test.step('verify we have a recent searches Release notes, have cross button, favorite button', async () => {
            searchPage.verifySearchHitMessage();
            searchPage.verifyHitTitle('Release notes');
            searchPage.verifySearchDeleteFrom();
            searchPage.verifyAddToFAvoriteIconeAndAdd();
        });

        await test.step('verify after we added recent dearch to favorite we have a cross delete buttone and remove from favorite', async () => {
            searchPage.verifySearchDeleteFrom();
            searchPage.verifyRemoveFromFavorite();
        });

        await test.step('recent message was changed to Favorite', async () => {
            await searchPage.verifyFavoriteMessage('Favorite');
        });
    });
});
