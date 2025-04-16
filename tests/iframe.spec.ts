import {test, expect} from '@playwright/test';

test('test', async ({page}) => {
    await page.goto(
        'https://www.lambdatest.com/selenium-playground/iframe-demo/',
    );

    const frame = page.frameLocator('#iFrame1');
    await frame.locator('div.rsw-ce').fill('Hello there');
    expect(await frame.locator('div.rsw-ce').textContent()).toEqual(
        'Hello there2',
    );
});
