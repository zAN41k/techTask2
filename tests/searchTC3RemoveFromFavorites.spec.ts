import {localStorageData} from '../data/localStorage';
import {setLocalStorage} from '../utils/localStorageUtils';
import {test} from '../fixtures/pages.fixture';

test.describe('Search flow delete from favorites ', () => {
    test.beforeEach(async ({page}) => {
        await setLocalStorage(page, {
            recentSearches: localStorageData.favoriteSearches,
        });
    });

    test('Delete a search query from favorites ', async ({
        homePage,
        searchPage,
    }) => {
        await test.step('Navigate to search button', async () => {
            await homePage.verifyMainPageElements();
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
