import {test, expect} from '@playwright/test';

test('Mock GraphQL response for country data', async ({page}) => {
    // Intercept the GraphQL request and mock response
    await page.route(
        'https://countries.trevorblades.com/',
        async (route, request) => {
            const postData = request.postDataJSON();
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        country: {
                            name: 'Ukraine',
                            capital: 'Kyiv',
                            currency: 'UAH',
                        },
                    },
                }),
            });
            return;
            // Allow other requests to proceed as normal
            await route.continue();
        },
    );

    // Visit a test page (replace with your own test site that makes this request)
    await page.goto('https://countries.trevorblades.com/');

    // Simulate fetching data from the API
    const response = await page.evaluate(async () => {
        const res = await fetch('https://countries.trevorblades.com/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `
          query {
            country(code: "UA") {
              name
              capital
              currency
            }
          }
        `,
            }),
        });
        return res.json();
    });

    //Validate the mocked response
    expect(response.data.country.name).toBe('Ukraine');
    expect(response.data.country.capital).toBe('Kyiv');
    expect(response.data.country.currency).toBe('UAH');
});
