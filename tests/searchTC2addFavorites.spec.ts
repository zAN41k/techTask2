import {localStorageData} from '../data/localStorage';
import {setLocalStorage} from '../utils/localStorageUtils';
import {test} from '../fixtures/pages.fixture';

test.describe('Adding a search query to favorites ', () => {
    test.beforeEach(async ({page}) => {
        await setLocalStorage(page, {
            recentSearches: localStorageData.recentSearches,
        });
    });

    test('Adding a search query to favorites and verify additional information ', async ({
        homePage,
        searchPage,
    }) => {
        await test.step('open search button in palywright.dev', async () => {
            await homePage.verifyMainPageElements();
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
