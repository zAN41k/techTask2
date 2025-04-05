import {test as base} from '@playwright/test';
import {HomePage} from '../pages/home.page';
import {SearchPage} from '../pages/search.page';
import {ReleaseNotes} from '../pages/releaseNotes.page';
import {Pages} from '../types/pages';

export const test = base.extend<Pages>({
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await page.goto('/');
        await use(homePage);
    },
    searchPage: async ({page}, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },
    releaseNotes: async ({page}, use) => {
        const releaseNotes = new ReleaseNotes(page);
        await use(releaseNotes);
    },
});

export {expect} from '@playwright/test';
