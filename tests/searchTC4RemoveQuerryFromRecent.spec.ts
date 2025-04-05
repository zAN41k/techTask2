import {localStorageData} from '../data/localStorage';
import {setLocalStorage} from '../utils/localStorageUtils';
import {test} from '../fixtures/pages.fixture';

test.describe('Search flow remove querry from recent ', () => {
    test.beforeEach(async ({page}) => {
        await setLocalStorage(page, {
            recentSearches: localStorageData.recentSearches,
        });
    });

    test('Delete a search query from recent searches  ', async ({
        searchPage,
        homePage,
    }) => {
        await test.step('Navigate to search button', async () => {
            await homePage.verifyMainPageElements();
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
