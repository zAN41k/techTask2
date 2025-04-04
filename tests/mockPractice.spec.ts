import {test, expect} from '@playwright/test';
import {expectedUser} from '../data/mockUsers';
import {mockUsersResponse} from '../data/mockUsersResponse';

test('Mock API response for users list', async ({page}) => {
    await page.route(
        'https://jsonplaceholder.typicode.com/users',
        async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockUsersResponse),
            });
        },
    );

    // Visit the test site (replace with actual page where API call happens)
    await page.goto('https://jsonplaceholder.typicode.com/');

    // Example: If your site displays users from this API, verify the mock works.
    const users = await page.evaluate(() =>
        fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
            res.json(),
        ),
    );

    expect(users).toHaveLength(2);
    expect(users[0]).toEqual(expectedUser);
});
