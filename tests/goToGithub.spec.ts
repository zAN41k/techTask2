import {test} from '@playwright/test';
import {HomePage} from '../pages/home.page';
import {Github} from '../pages/github.page';

test('Open gitHub link via playwright.dev', async ({page}) => {
    const homePage = new HomePage(page);

    await page.goto('/');
    const page2Promise = page.waitForEvent('popup');
    homePage.verifygitHubLink();
    const gitHub = await page2Promise;
    const githubPage = new Github(gitHub);
    await githubPage.verifyGithubPage();
});
