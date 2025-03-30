import { expect, test } from '@playwright/test';

test.describe('Search flow', () => {
    test('End-to-End search flow', async ({page}) => {
        await page.goto('/');

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
        await expect(page).toHaveURL('https://playwright.dev/');

        // getByRole('link', { name: 'GitHub repository' })
        await page.getByRole('link', {name: 'GitHub repository'});
        await expect(
            page.getByRole('link', {name: 'GitHub repository'}),
        ).toBeVisible();

        //getByRole('link', { name: 'Discord server' })
        await page.getByRole('link', {name: 'Discord server'});
        await expect(
            page.getByRole('link', {name: 'Discord server'}),
        ).toBeVisible();
        //getByRole('button', { name: 'Search (Command+K)' })
        await page.getByRole('button', {name: 'Search (Command+K)'});
        await expect(
            await page.getByRole('button', {name: 'Search (Command+K)'}),
        ).toBeVisible();
        await page.getByRole('button', {name: 'Search (Command+K)'}).click();

        //in search field assertion
        page.getByRole('searchbox', {name: 'Search'});
        await expect(
            page.getByRole('searchbox', {name: 'Search'}),
        ).toBeVisible();
        page.locator('#docsearch-label'); // search icone
        await expect(page.locator('#docsearch-label')).toBeVisible();

        await page.getByRole('searchbox', {name: 'Search'}).fill('docs');

        await page.waitForTimeout(1000);

        // await page.getByRole('button').click();
        // await expect(page.locator('.status')).toHaveText('Submitted');

        page.getByRole('link', {name: 'Release notes', exact: true});
        page.getByRole('link', {name: 'Version 1.51 Release notes'});
        page.getByRole('link', {name: 'Supported languages'});
        page.getByRole('link', {name: 'Getting started - VS Code'});
        page.getByRole('link', {name: 'Canary releases'});
        page.getByRole('link', {name: 'See all 459 results'});

        await expect(
            page.getByRole('link', {name: 'Release notes', exact: true}),
        ).toBeVisible();
        await expect(
            page.getByRole('link', {name: 'Release notes', exact: true}),
        ).toHaveText('Release notes');

        await expect(
            page.getByRole('link', {name: 'Version 1.51 Release notes'}),
        ).toBeVisible();
        await expect(
            page.getByRole('link', {name: 'Version 1.51 Release notes'}),
        ).toHaveText('Version 1.51Release notes');

        await expect(
            page.getByRole('link', {name: 'Supported languages'}),
        ).toBeVisible();

        await expect(
            page.getByRole('link', {name: 'Supported languages'}),
        ).toHaveText('Supported languages');

        await expect(
            page.getByRole('link', {name: 'Getting started - VS Code'}),
        ).toBeVisible();
        await expect(
            page.getByRole('link', {name: 'Getting started - VS Code'}),
        ).toHaveText('Getting started - VS Code');

        await expect(
            page.getByRole('link', {name: 'Canary releases'}),
        ).toBeVisible();
        await expect(
            page.getByRole('link', {name: 'Canary releases'}),
        ).toHaveText('Canary releases');

        await expect(
            page.getByRole('link', {name: 'See all 459 results'}),
        ).toBeVisible();
        await expect(
            page.getByRole('link', {name: 'See all 459 results'}),
        ).toHaveText('See all 459 results');

        //click after search
        await page
            .getByRole('link', {name: 'Release notes', exact: true})
            .click();
        //verify we on Release notes page

        page.getByRole('heading', {name: 'Release notes'});

        await expect(
            page.getByRole('heading', {name: 'Release notes'}),
        ).toHaveText('Release notes');
    });

    test.only('Adding a search query to favorites ', async ({page}) => {
        await page.addInitScript(() => {
            window.localStorage.setItem(
                '__DOCSEARCH_RECENT_SEARCHES__playwright-nodejs',
                JSON.stringify([
                    {
                        url: '/docs/release-notes',
                        content: null,
                        type: 'lvl1',
                        hierarchy: {
                            lvl0: 'Docs',
                            lvl1: 'Release notes',
                            lvl2: null,
                            lvl3: null,
                            lvl4: null,
                            lvl5: null,
                            lvl6: null,
                        },
                        objectID: '1-https://playwright.dev/docs/release-notes',
                        __docsearch_parent: null,
                        __autocomplete_id: 0,
                    },
                ]),
            );
        });

        await page.goto('/');
        await page.getByRole('button', {name: 'Search (Command+K)'}).click();
        //add to favorites

        //recent
        page.locator('.DocSearch-Hit-source').first();
        await expect(
            page.locator('.DocSearch-Hit-source').first(),
        ).toBeVisible();
        // await expect(page.locator('.DocSearch-Hit-source').first()).toHaveText(
        //     'Recent',
        // );

        // release notes txt
        page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'});
        await expect(
            page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'}),
        ).toBeVisible();
        await expect(
            page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'}),
        ).toHaveText('Release notes');

        // Cross remove from favorite visible
        page.getByRole('button', {name: 'Remove this search from'});
        await expect(
            page.getByRole('button', {name: 'Remove this search from'}),
        ).toBeVisible();
        //add to fovorite
        page.getByRole('button', {name: 'Save this search'});
        await expect(
            page.getByRole('button', {name: 'Save this search'}),
        ).toBeVisible();

        await page.getByRole('button', {name: 'Save this search'}).click();
        //remove from favorite from history
        page.locator('[title="Remove this search from history"]');
        await expect(
            page.locator('[title="Remove this search from history"]'),
        ).toBeVisible();

        //after we added to favorite
        //verify textFavorite
        await expect(page.locator('.DocSearch-Hit-source')).toBeVisible();
        await expect(page.locator('.DocSearch-Hit-source')).toHaveText(
            'Favorite',
        );
        //await page.waitForTimeout(5000);
    });
});

test('Delete a search query to favorites ', async ({page}) => {
    await page.addInitScript(() => {
        window.localStorage.setItem(
            '__DOCSEARCH_FAVORITE_SEARCHES__playwright-nodejs',
            JSON.stringify([
                {
                    url: '/docs/release-notes',
                    content: null,
                    type: 'lvl1',
                    hierarchy: {
                        lvl0: 'Docs',
                        lvl1: 'Release notes',
                        lvl2: null,
                        lvl3: null,
                        lvl4: null,
                        lvl5: null,
                        lvl6: null,
                    },
                    objectID: '1-https://playwright.dev/docs/release-notes',
                    __docsearch_parent: null,
                    __autocomplete_id: 0,
                },
            ]),
        );
    });
    await page.goto('/');
    await page.getByRole('button', {name: 'Search (Command+K)'}).click();

    await expect(
        page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'}),
    ).toBeVisible();
    await expect(
        page.locator('.DocSearch-Hit-title', {hasText: 'Release notes'}),
    ).toHaveText('Release notes');

    await expect(
        page.getByRole('button', {name: 'Remove this search from'}),
    ).toBeVisible();
    await page.getByRole('button', {name: 'Remove this search from'}).click();

    // verify we deleted a favorite
    page.locator('.DocSearch-Help', {hasText: 'No recent searches'});
    await expect(
        page.locator('.DocSearch-Help', {hasText: 'No recent searches'}),
    ).toHaveText('No recent searches');

    // await page.waitForTimeout(3000);
});

test('Delete a search query from recent searches  ', async ({page}) => {
    await page.addInitScript(() => {
        window.localStorage.setItem(
            '__DOCSEARCH_RECENT_SEARCHES__playwright-nodejs',
            JSON.stringify([
                {
                    url: '/docs/release-notes',
                    content: null,
                    type: 'lvl1',
                    hierarchy: {
                        lvl0: 'Docs',
                        lvl1: 'Release notes',
                        lvl2: null,
                        lvl3: null,
                        lvl4: null,
                        lvl5: null,
                        lvl6: null,
                    },
                    objectID: '1-https://playwright.dev/docs/release-notes',
                    __docsearch_parent: null,
                    __autocomplete_id: 0,
                },
            ]),
        );
    });

    await page.goto('/');
    await page.getByRole('button', {name: 'Search (Command+K)'}).click();

    await expect(
        page.getByRole('link', {name: 'Release notes', exact: true}),
    ).toBeVisible();
    await expect(
        page.getByRole('link', {name: 'Release notes', exact: true}),
    ).toHaveText('Release notes');

    await expect(
        page.getByRole('button', {name: 'Save this search'}),
    ).toBeVisible();

    await expect(
        page.locator('[title="Remove this search from history"]'),
    ).toBeVisible();
    await page.locator('[title="Remove this search from history"]').click();
    await expect(
        page.locator('.DocSearch-Help', {hasText: 'No recent searches'}),
    ).toHaveText('No recent searches');
});
